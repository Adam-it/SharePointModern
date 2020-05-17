## print string log line with current timestamp
function Show-Log(
		[Parameter(Mandatory=$False)][ValidateSet("INFO","WARN","ERROR")][String]$Level = "INFO",
		[Parameter(Mandatory=$True)][string]$Message)
{
	$TimeStamp = (Get-Date).toString("yyyy/MM/dd HH:mm:ss")
    $Line = "$TimeStamp $Level -> $Message"
	Write-Host $Line
}
Export-ModuleMember -Function "Show-Log"

## check if PnP Module is installed in current machine
function Test-PnP() 
{
	$IsPnPInstalled = $true
	Try
    {
		Show-Log -Level "INFO" -Message "Checking SharePointPnPPowerShellOnline installation"
		$SharePointPnPPowerShellOnline = Get-Module SharePointPnPPowerShellOnline -ListAvailable | Select-Object Name,Version | Sort-Object Version -Descending
		if($SharePointPnPPowerShellOnline -eq $null)
		{
			Show-Log -Level "WARN" -Message "SharePointPnPPowerShellOnline is not installed"
			Show-Log -Level "INFO" -Message "Starting SharePointPnPPowerShellOnline installation"
			Install-Module SharePointPnPPowerShellOnline
		}
		else
		{
			Show-Log -Level "INFO" -Message "SharePointPnPPowerShellOnline is already installed"
		}
	}
	Catch
    {
        $IsPnPInstalled = $false
	}
	return $IsPnPInstalled
}
Export-ModuleMember -Function "Test-PnP"