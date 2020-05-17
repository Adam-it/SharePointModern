## Set group on Web with given permission (Remove or AddSet)
function Set-SiteGroup(
    [Parameter(Mandatory=$True)]$OperationType, 
    [Parameter(Mandatory=$True)]$Title, 
    [Parameter(Mandatory=$True)]$Description, 
    [Parameter(Mandatory=$True)]$WebRole, 
    [Parameter(Mandatory=$True)]$Context)
{
	$GroupsFinishedCorrectly = $true
	Try
    {
        Show-Log -Level "INFO" -Message "Groups setup -> $OperationType $Title"
        if($OperationType -eq 'Remove')
        {
            $SPGroup = Private-CheckIfGroupExists -GroupName $Title
            if($SPGroup -ne $null)
            {
                Remove-PnPGroup -Identity $Title -Force
            }
        }
        elseif($OperationType -eq 'AddSet')
        {
            $SPGroup = Private-CheckIfGroupExists -GroupName $Title
            if($SPGroup -eq $null)
            {
                $SPGroup = New-PnPGroup -Title $Title -Description $Description			
            }
            else
            {
                Set-PnPGroup -Identity $Title -Title $Title -Description $Description
            }
            Set-PnPGroupPermissions -Identity $Title -AddRole $WebRole
        }
        else
        {
            Throw New-Object System.FormatException  "OperationType is not supported"
        }
        Show-Log -Level "INFO" -Message "Groups setup -> $OperationType $Title -> finished successfully"
	}
	Catch
    {
        $GroupsFinishedCorrectly = $false
		$ErrorMessage = $_.Exception.Message
	}
	return $GroupsFinishedCorrectly
}
Export-ModuleMember -Function 'Set-SiteGroup'

## Check if group with this name is present on Web
function Private-CheckIfGroupExists([Parameter(Mandatory=$True)][string]$GroupName)
{
	$Group = $null
	Try 
	{    
		$Group = Get-PnPGroup -Identity $GroupName -ErrorAction 'silentlycontinue'
		if($Group -ne $null)
		{
			Show-Log -Level "INFO" -Message "Groups setup -> Group already exists"
		}
		else
		{
			Show-Log -Level "INFO" -Message "Groups setup -> Group does not exist"
		}
	}
    Catch {
		$Group = $null   
	}    
	return $Group
}
