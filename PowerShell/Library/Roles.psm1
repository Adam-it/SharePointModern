## Set role in web with given permissions (Remove or AddSet)
function Set-SiteRole(
    [Parameter(Mandatory=$True)]$OperationType,
    [Parameter(Mandatory=$True)]$Name,
    [Parameter(Mandatory=$True)]$Description,
    [Parameter(Mandatory=$True)]$Roles,
    [Parameter(Mandatory=$True)]$Context)
{
	$RolesFinishedCorrectly = $true
	Try
    {
        Show-Log -Level "INFO" -Message "Roles setup -> $OperationType $Name"
        if($OperationType -eq 'Remove')
        {
            $SPRole = Private-CheckIfRoleExists -RoleName $Name
            if($SPRole -ne $null)
            {
                Remove-PnPRoleDefinition -Identity $Name -Force
            }
        }
        elseif($OperationType -eq 'AddSet')
        {
            $SPRole = Private-CheckIfRoleExists -RoleName $Name
            if($SPRole -ne $null)
            {
                Remove-PnPRoleDefinition -Identity $Name -Force
            }
            $Permissions = Private-GetRolesPermissions -Role $Roles
            $SPRole = New-Object "Microsoft.SharePoint.Client.RoleDefinitionCreationInformation"
            $SPRole.Name = $Name
            $SPRole.Description = $Description
            $SPRole.BasePermissions = $Permissions
            $Context.Web.RoleDefinitions.Add($SPRole)
            $Context.ExecuteQuery()
        }
        else
        {
            Throw New-Object System.FormatException "OperationType is not supported"
        }
        Show-Log -Level "INFO" -Message "Roles setup -> $OperationType $Name -> finished successfully"
	}
	Catch
    {
        $RolesFinishedCorrectly = $false
		$ErrorMessage = $_.Exception.Message
		Show-Log -Level "ERROR" -Message $ErrorMessage
	}
	return $RolesFinishedCorrectly
}
Export-ModuleMember -Function 'Set-SiteRole'

## Get Microsoft.SharePoint.Client.BasePermissions list based on xml
function Private-GetRolesPermissions([Parameter(Mandatory=$True)]$Roles)
{
	$Permissions = New-Object "Microsoft.SharePoint.Client.BasePermissions"
	Try 
	{    
        foreach ($Role in $Roles -split ',')
        {
            if($Role -eq 'ManageLists')
            {
                $Permissions.Set([Microsoft.SharePoint.Client.PermissionKind]::ManageLists)
            }
            if($Role -eq 'BreakCheckout')
            {
                $Permissions.Set([Microsoft.SharePoint.Client.PermissionKind]::CancelCheckout)
            }
            if($Role -eq 'InsertListItems')
            {
                $Permissions.Set([Microsoft.SharePoint.Client.PermissionKind]::AddListItems)
            }
            if($Role -eq 'EditListItems')
            {
                $Permissions.Set([Microsoft.SharePoint.Client.PermissionKind]::EditListItems)
            }
            if($Role -eq 'DeleteListItems')
            {
                $Permissions.Set([Microsoft.SharePoint.Client.PermissionKind]::DeleteListItems)
            }
            if($Role -eq 'ViewListItems')
            {
                $Permissions.Set([Microsoft.SharePoint.Client.PermissionKind]::ViewListItems)
            }
            if($Role -eq 'ApproveItems')
            {
                $Permissions.Set([Microsoft.SharePoint.Client.PermissionKind]::ApproveItems)
            }
            if($Role -eq 'OpenItems')
            {
                $Permissions.Set([Microsoft.SharePoint.Client.PermissionKind]::OpenItems)
            }
            if($Role -eq 'ViewVersions')
            {
                $Permissions.Set([Microsoft.SharePoint.Client.PermissionKind]::ViewVersions)
            }
            if($Role -eq 'DeleteVersions')
            {
                $Permissions.Set([Microsoft.SharePoint.Client.PermissionKind]::DeleteVersions)
            }
            if($Role -eq 'CreateAlerts')
            {
                $Permissions.Set([Microsoft.SharePoint.Client.PermissionKind]::CreateAlerts)
            }
            if($Role -eq 'ViewFormPages')
            {
                $Permissions.Set([Microsoft.SharePoint.Client.PermissionKind]::ViewFormPages)
            }
            if($Role -eq 'ManagePermissions')
            {
                $Permissions.Set([Microsoft.SharePoint.Client.PermissionKind]::ManagePermissions)
            }
            if($Role -eq 'ViewUsageData')
            {
                $Permissions.Set([Microsoft.SharePoint.Client.PermissionKind]::ViewUsageData)
            }
            if($Role -eq 'ManageSubwebs')
            {
                $Permissions.Set([Microsoft.SharePoint.Client.PermissionKind]::ManageSubwebs)
            }
            if($Role -eq 'ManageWeb')
            {
                $Permissions.Set([Microsoft.SharePoint.Client.PermissionKind]::ManageWeb)
            }
            if($Role -eq 'ThemeWeb')
            {
                $Permissions.Set([Microsoft.SharePoint.Client.PermissionKind]::ApplyThemeAndBorder)
            }
            if($Role -eq 'BrowseDirectories')
            {
                $Permissions.Set([Microsoft.SharePoint.Client.PermissionKind]::BrowseDirectories)
            }
            if($Role -eq 'CreateSscSite')
            {
                $Permissions.Set([Microsoft.SharePoint.Client.PermissionKind]::CreateSscSite)
            }
            if($Role -eq 'ViewPages')
            {
                $Permissions.Set([Microsoft.SharePoint.Client.PermissionKind]::ViewPages)
            }
            if($Role -eq 'EnumeratePermissions')
            {
                $Permissions.Set([Microsoft.SharePoint.Client.PermissionKind]::EnumeratePermissions)
            }
            if($Role -eq 'BrowseUserInfo')
            {
                $Permissions.Set([Microsoft.SharePoint.Client.PermissionKind]::BrowseUserInfo)
            }
            if($Role -eq 'ManageAlerts')
            {
                $Permissions.Set([Microsoft.SharePoint.Client.PermissionKind]::ManageAlerts)
            }
            if($Role -eq 'UseRemoteAPIs')
            {
                $Permissions.Set([Microsoft.SharePoint.Client.PermissionKind]::UseRemoteAPIs)
            }
            if($Role -eq 'UseClientIntegration')
            {
                $Permissions.Set([Microsoft.SharePoint.Client.PermissionKind]::UseClientIntegration)
            }
            if($Role -eq 'ManagePersonalViews')
            {
                $Permissions.Set([Microsoft.SharePoint.Client.PermissionKind]::ManagePersonalViews)
            }
            if($Role -eq 'AddDelPrivateWebParts')
            {
                $Permissions.Set([Microsoft.SharePoint.Client.PermissionKind]::AddDelPrivateWebParts)
            }
            if($Role -eq 'UpdatePersonalWebParts')
            {
                $Permissions.Set([Microsoft.SharePoint.Client.PermissionKind]::UpdatePersonalWebParts)
            }
        }
	}
    Catch {  
		Show-Log -Level "ERROR" -Message "Roles setup -> Could not get role defenition"
		$ErrorMessage = $_.Exception.Message
		Show-Log -Level "ERROR" -Message $ErrorMessage
	}    
	return $Permissions
}

## Check if role is present in web
function Private-CheckIfRoleExists([Parameter(Mandatory=$True)][string]$RoleName)
{
	$Role = $null
	Try 
	{    
		$Role = Get-PnPRoleDefinition -Identity $RoleName -ErrorAction 'silentlycontinue'
		if($Role -ne $null)
		{
			Show-Log -Level "INFO" -Message "Roles setup -> Role already exists"
		}
		else
		{
			Show-Log -Level "INFO" -Message "Roles setup -> Role does not exist"
		}
	}
    Catch {
		$Role = $null
	}    
	return $Role
}