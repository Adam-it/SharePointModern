$ErrorActionPreference = "Stop"
$Url = "<URL TO SITECOLLECTION>"

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

    Show-Log -Level "INFO" -Message "Columns setup"
    $Group = "TestGroup"
    Set-SiteColumn -OperationType 'AddSet' -DisplayName 'testTextColumn1' -InternalName 'testTextColumn1' -Context $Context -Required $true -Type 'Text' -Group $Group
    Set-SiteColumn -OperationType 'AddSet' -DisplayName 'testNumberColumn1' -InternalName 'testNumberColumn1' -Context $Context -Required $true -Type 'Number' -Group $Group
    Set-SiteColumn -OperationType 'AddSet' -DisplayName 'testBooleanColumn1' -InternalName 'testBooleanColumn1' -Context $Context -Required $true -Type 'Boolean' -Group $Group
    Set-SiteColumn -OperationType 'AddSet' -DisplayName 'testChoiceColumn1' -InternalName 'testChoiceColumn1' -Context $Context -Required $true -Type 'Choice' -Group $Group -Choices 'ChoiceA, ChoiceB, ChoiceC'

    Show-Log -Level "INFO" -Message "ContentType setup"
    $CTName = 'TestContentType'
    Set-SiteContentType -OperationType 'AddSet' -Name $CTName -Description 'this is a test CT' -Group 'TestContentTypes' -ParentContentType 'Element' -Context $Context
    
    Show-Log -Level "INFO" -Message "Adding Columns to ContentType"
    Add-PnPFieldToContentType -Field 'testTextColumn1' -ContentType $CTName
    Add-PnPFieldToContentType -Field 'testNumberColumn1' -ContentType $CTName
    Add-PnPFieldToContentType -Field 'testBooleanColumn1' -ContentType $CTName
    Add-PnPFieldToContentType -Field 'testChoiceColumn1' -ContentType $CTName

    Show-Log -Level "INFO" -Message "List setup"
    $ListName = 'testList'
    Set-SiteList -OperationType 'AddSet' -Name $ListName -DisplayName 'testList' -Type 'GenericList'
    Add-PnPContentTypeToList -List $ListName -ContentType $CTName -DefaultContentType
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