$ErrorActionPreference = "Stop"
$Url = "<URL>"

Try
{
    Import-Module ".\Library\ExampleSPLibrary.psd1" -Force

    Show-Log -Level "INFO" -Message "==========START=========="

    Show-Log -Level "INFO" -Message "Verify SharePointPnPPowerShellOnline module"
    $IsPnPInstalled = Test-PnP
    if($IsPnPInstalled -eq $false)
    {
        $Message = "SharePointPnPPowerShellOnline module was NOT verified correctly -> exit"
        Show-Log -Level "ERROR" -Message $Message
        Throw New-Object System.FormatException $Message
    }
    else
    {
        Show-Log -Level "INFO" -Message "SharePointPnPPowerShellOnline module verified"
    }

    ## Get SharePoint tenat admin credentials
    $Credential = Get-Credential -Message "Enter Login & Password of SharePoint tenat admin:"
    [SecureString]$SecurePass = ConvertTo-SecureString $Credential.GetNetworkCredential().password -AsPlainText -Force
    [System.Management.Automation.PSCredential]$PSCredentials = New-Object System.Management.Automation.PSCredential($Credential.GetNetworkCredential().username, $SecurePass)
    
    Show-Log -Level "INFO" -Message "Check SiteCollection"
    $Context = Test-CheckIfSiteCollectionExists -Url $Url -PSCredentials $PSCredentials
    if($Context -eq $null)
    {
        $Message = "Context is null -> exit"
        Show-Log -Level "ERROR" -Message $Message
        Throw New-Object System.FormatException $Message
    }

    Show-Log -Level "INFO" -Message "Add custom role to Site"
    Set-SiteRole -OperationType 'AddSet' -Name 'CustomRole' -Description 'CustomRole' -Roles 'ManageLists,EditListItems,DeleteListItems,ViewListItems' -Context $Context

    Show-Log -Level "INFO" -Message "Add custom group to Site"
    Set-SiteGroup -OperationType 'AddSet' -Title 'CustomGroup' -Description 'CustomGroup' -WebRole 'CustomRole' -Context $Context
}
Catch
{
    $ErrorMessage = $_.Exception.Message
    Show-Log -Level "ERROR" -Message $ErrorMessage
}
Finally
{
    Show-Log -Level "INFO" -Message "===========END==========="
}