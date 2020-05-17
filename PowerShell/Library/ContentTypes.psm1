## Set Content type with given columns (Remove or AddSet)
function Set-SiteContentType(
    [Parameter(Mandatory=$True)]$OperationType,
    [Parameter(Mandatory=$True)]$Name,
    [Parameter(Mandatory=$True)]$Description,
    [Parameter(Mandatory=$True)]$Group,
    [Parameter(Mandatory=$True)]$ParentContentType,
    [Parameter(Mandatory=$True)]$Context)
{
	$CTFinishedCorrectly = $true
	Try
    {
        Show-Log -Level "INFO" -Message "ContentType setup -> $OperationType $Name"
        if($OperationType -eq 'Remove')
        {
            $SPContentType = Private-CheckIfContentTypeExists -ContentTypeName $Name
            if($SPContentType -ne $null)
            {
                Remove-PnPContentType -Identity $Name -Force
            }
        }
        elseif($OperationType -eq 'AddSet')
        {
            $SPContentType = Private-CheckIfContentTypeExists -ContentTypeName $Name
            if($SPContentType -eq $null)
            {
                Show-Log -Level "INFO" -Message "ContentType setup -> Checking if $ParentContentType exists"
                $SPParentContentType = Private-CheckIfContentTypeExists -ContentTypeName $ParentContentType
                if($SPParentContentType -eq $null)
                {
                    Throw New-Object System.FormatException "Parent content type was not found"
                }
                $SPContentType = Add-PnPContentType -Name $Name -Description $Description -Group $Group -ParentContentType $SPParentContentType
            }
            else
            {
                $SPContentType.Name = $Name
                $SPContentType.Description = $Description
                $SPContentType.Group = $Group
                $SPContentType.Update($true)
                $Context.ExecuteQuery()
            }
        }
        else
        {
            Throw New-Object System.FormatException "OperationType is not supported"
        }
        Show-Log -Level "INFO" -Message "ContentType setup -> $OperationType $Name -> finished successfully"
	}
	Catch
    {
        $CTFinishedCorrectly = $false
		$ErrorMessage = $_.Exception.Message
		Show-Log -Level "ERROR" -Message $ErrorMessage
	}
	return $CTFinishedCorrectly
}
Export-ModuleMember -Function 'Set-SiteContentType'

## Check if Content type is present on Web
function Private-CheckIfContentTypeExists([Parameter(Mandatory=$True)][string]$ContentTypeName)
{
	$ContentType = $null
	Try 
	{    
		$ContentType = Get-PnPContentType -Identity $ContentTypeName -ErrorAction 'silentlycontinue'
        
        if($ContentType -ne $null)
		{
			Show-Log -Level "INFO" -Message "ContentType already exists"
		}
		else
		{
			Show-Log -Level "INFO" -Message "ContentType does not exist"
		}
	}
    Catch {
		$ContentType = $null
	}    
	return $ContentType
}