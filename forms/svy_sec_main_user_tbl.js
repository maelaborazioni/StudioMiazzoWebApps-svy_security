/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"67CD5545-8DCA-4EF6-8CD7-BB6CACF4A62B"}
 */
function deleteRecord(event)
{
	var _btnOK = i18n.getI18NMessage('svy.fr.lbl.ok');
	if(globals.svy_mod_dialogs_global_showQuestionDialog(null, i18n.getI18NMessage('svy.fr.dlg.delete_user'), _btnOK, i18n.getI18NMessage('svy.fr.lbl.cancel')) == _btnOK) 
	{
		var idLavoratore = foundset.sec_user_to_sec_user_to_lavoratori.idlavoratore;
		var idUser = foundset.user_id
		if(foundset.sec_user_to_sec_user_org.getSize() > 0)
		{
			globals.DIALOGS.showWarningDialog('Non è possibile eliminare un utente ancora associato ad una o più organizzazioni',
				                              'Elimina record utente',
											  i18n.getI18NMessage('svy.fr.lbl.ok'));
		    return;
		}
		
		if(foundset.sec_user_to_sec_user_to_lavoratori.deleteRecord())
			globals.DIALOGS.showWarningDialog('Record in sec_user_to_sec_user_lavoratori cancellato, idlavoratore : ' + idLavoratore,
				                              'Elimina record utente',
											  i18n.getI18NMessage('svy.fr.lbl.ok'));
		else
			globals.DIALOGS.showWarningDialog('Record in sec_user_to_sec_user_lavoratori non cancellato, idlavoratore : ' + idUser,
				                             'Elimina record utente',
											 i18n.getI18NMessage('svy.fr.lbl.ok'));
		if(foundset.deleteRecord())
			globals.DIALOGS.showWarningDialog('Record in sec_user cancellato, idlavoratore : ' + idUser,
				                              'Elimina record utente',
											  i18n.getI18NMessage('svy.fr.lbl.ok'));
		else
			globals.DIALOGS.showWarningDialog('Record in sec_user non cancellato, idlavoratore : ' + idUser,
				                              'Elimina record utente',
											  i18n.getI18NMessage('svy.fr.lbl.ok'));
		
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"5F7D8C71-A05C-480D-BBB7-F9CBD4075D8A"}
 */
function addRecord(event) {
	foundset.newRecord();
	forms.svy_sec_main_user.foundset.owner_id = globals.svy_sec_owner_id;
	forms.svy_sec_main_user.controller.focusFirstField();
}
