/**
 * Create a new password for a user
 *
 * @author Sanneke Aleman
 * @since 2008-05-04
 *
 * @properties={typeid:24,uuid:"103f8c19-c7bf-41d0-ae84-a5705e70d5de"}
 */
function newPassword()
{
	controller.newRecord()
	start_date = new Date()
	end_date = globals.svy_sec_datePlusDays(new Date(), 30);
}

/**
 * Show new password dialog
 *
 * @author Sanneke Aleman
 * @since 2008-05-04
 *
 * @properties={typeid:24,uuid:"a9e7f3be-8e27-4120-8039-3a7cfa2f6a95"}
 */
function dialogNewPassword()
{
	globals.svy_sec_trigger_form = controller.getName()
	globals.svy_mod_showFormInDialog(forms.svy_sec_password_new,null,null,null,null,null,true,false,'svy_sec_password_new')
}
