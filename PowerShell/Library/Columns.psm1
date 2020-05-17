## Check if column is present on Web
function Test-CheckIfColumnExists(
    [Parameter(Mandatory=$True)][string]$ColumnName, 
    [string]$ListName)
{
	$Column = $null
	Try 
	{    
		if($ListName -eq "")
		{
			$Column = Get-PnPField -Identity $ColumnName  -ErrorAction 'silentlycontinue'
		}
		else
		{
			$Column = Get-PnPField -Identity $ColumnName -List $ListName  -ErrorAction 'silentlycontinue'
        }
        
		if($Column -ne $null)
		{
			Show-Log -Level "INFO" -Message "Columns setup -> Column already exists"
		}
		else
		{
			Show-Log -Level "INFO" -Message "Columns setup -> Column does not exist"
		}
	}
    Catch {
		$Column = $null   
		Show-Log -Level "INFO" -Message "Columns setup -> Column does not exist"
	}    
	return $Column
}
Export-ModuleMember -Function 'Test-CheckIfColumnExists'

## Set Column (Remove or AddSet)
function Set-SiteColumn(
    [Parameter(Mandatory=$True)]$OperationType,
    [Parameter(Mandatory=$True)]$DisplayName,
    [Parameter(Mandatory=$True)]$InternalName,
    [Parameter(Mandatory=$True)]$Context,
    $Required,
    $Type,
    $Group,
    $Choices)
{
	$ColumnsFinishedCorrectly = $true
	Try
    {
        Show-Log -Level "INFO" -Message "Columns setup -> $OperationType $DisplayName"
        if($OperationType -eq 'Remove')
        {
            $SPColumn = Test-CheckIfColumnExists -ColumnName $InternalName
            
            if($SPColumn -ne $null)
            {
                Remove-PnPField -Identity $InternalName -Force
            }
        }
        elseif($OperationType -eq 'AddSet')
        {
            $Type = Private-GetRolesFieldType -Type $Type
            $SPColumn = Test-CheckIfColumnExists -ColumnName $InternalName
            
            if($SPColumn -eq $null)
            {
                $SPColumn = Add-PnPField -InternalName $InternalName -DisplayName $DisplayName -Group $Group -Type $Type
            }
            else
            {
                Set-PnPField -Identity $InternalName -Values @{Title=$DisplayName;Group=$Group}
            }

            if($Choices -ne $null)
            {
                $FieldChoiceValues = @()
                foreach ($Choice in $Choices -split ',')
                {
                        $FieldChoiceValues += $Choice
                }
                $SPColumn.Choices = $FieldChoiceValues
                $SPColumn.Update()
                $Context.ExecuteQuery()
            }

            Set-PnPField -Identity $InternalName -Values @{Required=$Required}
        }
        else
        {
            Throw New-Object System.FormatException "OperationType is not supported"
        }
        Show-Log -Level "INFO" -Message "Columns setup -> $OperationType $DisplayName -> finished successfully"
	}
	Catch
    {
        $ColumnsFinishedCorrectly = $false
		$ErrorMessage = $_.Exception.Message
		Show-Log -Level "ERROR" -Message $ErrorMessage
	}
	return $ColumnsFinishedCorrectly
}
Export-ModuleMember -Function 'Set-SiteColumn'

## Get Column type based on one specified in .xml
function Private-GetRolesFieldType([Parameter(Mandatory=$True)]$Type)
{
	$SPType = $null
	Try 
	{    
		if($Type -eq 'Choice')
		{
			$SPType = [Microsoft.SharePoint.Client.FieldType]::Choice
		}
		elseif($Type -eq 'Boolean')
		{
			$SPType = [Microsoft.SharePoint.Client.FieldType]::Boolean
		}
		elseif($Type -eq 'DateTime')
		{
			$SPType = [Microsoft.SharePoint.Client.FieldType]::DateTime
		}
		elseif($Type -eq 'Note')
		{
			$SPType = [Microsoft.SharePoint.Client.FieldType]::Note
		}
		elseif($Type -eq 'Number')
		{
			$SPType = [Microsoft.SharePoint.Client.FieldType]::Number
		}
		elseif($Type -eq 'Text')
		{
			$SPType = [Microsoft.SharePoint.Client.FieldType]::Text
		}
		elseif($Type -eq 'User')
		{
			$SPType = [Microsoft.SharePoint.Client.FieldType]::User
		}
	}
    Catch {  
		Show-Log -Level "ERROR" -Message "Columns setup -> Could not get column type"
		$ErrorMessage = $_.Exception.Message
		Show-Log -Level "ERROR" -Message $ErrorMessage
	}    
	return $SPType
}