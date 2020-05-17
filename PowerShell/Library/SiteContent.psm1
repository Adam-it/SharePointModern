## Check if sitecollection exists 
function Test-CheckIfSiteCollectionExists(
    [Parameter(Mandatory=$True)][string]$Url, 
    [Parameter(Mandatory=$True)]$PSCredentials)
{
	$Context = $null
	Try 
	{    
		Connect-PnPOnline -Url $Url -Credentials $PSCredentials
		$Context = Get-PnPContext
		Show-Log -Level "INFO" -Message "SiteCollection setup -> Site exists"
	}
    Catch {
		$Context = $null   
		Show-Log -Level "INFO" -Message "SiteCollection setup -> Site does not exist"
	}    
	return $Context
}
Export-ModuleMember -Function 'Test-CheckIfSiteCollectionExists'

function Set-SiteList(
    [Parameter(Mandatory=$True)]$OperationType,
    [Parameter(Mandatory=$True)]$Name,
    [Parameter(Mandatory=$True)]$DisplayName,
    [Parameter(Mandatory=$True)]$Type)
{
    $SiteContentFinishedCorrectly = $true
	Try
	{
        Show-Log -Level "INFO" -Message "SiteContent setup -> $OperationType $Name"
        if($OperationType -eq 'Remove')
        {
            $SPList = Private-CheckIfListExists -ListName $Name
            if($SPList -ne $null)
            {
                Remove-PnPList -Identity $Name -Force
            }
        }
        elseif($OperationType -eq 'AddSet')
        {
            $SPList = Private-CheckIfListExists -ListName $Name
            if($SPList -eq $null)
            {
                New-PnPList -Title $Name -Template $Type
                $SPList = Private-CheckIfListExists -ListName $Name
            }
        }
        else
        {
            Throw New-Object System.FormatException  "OperationType is not supported"
        }
        Show-Log -Level "INFO" -Message "Run setup xml -> SiteContent setup -> $OperationType $Name -> finished successfully"
	}
	Catch
    {
        $SiteContentFinishedCorrectly = $false
		$ErrorMessage = $_.Exception.Message
		Show-Log -Level "ERROR" -Message $ErrorMessage
	}
	return $SiteContentFinishedCorrectly
}
Export-ModuleMember -Function 'Set-SiteList'

## Check if list exists in current context based on given name
function Private-CheckIfListExists([Parameter(Mandatory=$True)][string]$ListName)
{
	$List = $null
	Try 
	{    
		$List = Get-PnPList -Identity $ListName -ErrorAction 'silentlycontinue'
		if($List -ne $null)
		{
			Show-Log -Level "INFO" -Message "Run setup xml -> SiteContent setup -> List already exists"
		}
		else
		{
			Show-Log -Level "INFO" -Message "Run setup xml -> SiteContent setup -> List does not exist"
		}
	}
    Catch {
		$List = $null
	}    
	return $List
}