/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"621C6594-94D6-416C-9CDD-AC80CBCF4ABE",variableType:4}
 */
var administratorLevel = null;

/**
 * @type {String}
 * 
 * @properties={typeid:35,uuid:"62785D0E-188E-48BA-9E10-19DF91D49703"}
 */
var vOwnerID = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 * @param {String} tab the selected tab
 *
 * @private
 *
 * @properties={typeid:24,uuid:"741BE025-38C4-4FF7-852D-B3A8302F568D"}
 */
function switchTab(event, tab) {
	var tabs = ['roles','security', 'access', 'login_attempts'];
	
	for (var i = 0; i < tabs.length; i++) {
		if (tabs[i] == tab) {
			elements['tab_left_' + tabs[i]].setImageURL('media:///tab_blue_left.png');
			elements['tab_right_'+ tabs[i]].setImageURL('media:///tab_blue_right.png');
			elements['tab_'+ tabs[i]].setImageURL('media:///tab_blue_btw.png');
			elements['lbl_'+ tabs[i]].setFont('Verdana, 1, 10');
			elements['lbl_'+ tabs[i]].fgcolor = '#ffffff';
		} else {
			elements['tab_left_'+ tabs[i]].setImageURL('media:///tab_grey_left.png');
			elements['tab_right_'+ tabs[i]].setImageURL('media:///tab_grey_right.png');
			elements['tab_'+ tabs[i]].setImageURL('media:///tab_grey_btw.png');
			elements['lbl_'+ tabs[i]].setFont('Verdana, 0, 10');
			elements['lbl_'+ tabs[i]].fgcolor = '#000000';
		}
	}
	
	elements.tab_security_details.tabIndex = 'tab_' + tab;
	
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"94A8D00C-B6A2-43AC-91E1-1834B0905CE9"}
 * @AllowToRunInFind
 */
function onShow(firstShow, event) {
	doSearch();
	
	if (firstShow) {
		enableDisableOwnerID();
		switchTab(null, 'access');
	}
	
	databaseManager.setAutoSave(false);
}

/**
 * @properties={typeid:24,uuid:"50157ED7-A862-46F5-BC6B-9CBD93C37628"}
 */
function enableDisableOwnerID() {
	// MAVariazione - Super admin can do anything
	if (databaseManager.hasRecords(foundset.sec_user_to_sec_user_org)
			&& _to_sec_user$user_id.flag_super_administrator) 
		elements.owner_id.enabled = true;	
}

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"E22D92A2-6A8C-4803-83DA-48A0F4D790C0"}
 */
function onRecordSelection(event) {
	enableDisableOwnerID();
	
	if (!foundset.flag_system_administrator && !foundset.flag_super_administrator) {
		administratorLevel = null;
	} else {
		if (foundset.flag_system_administrator == 1) {
			administratorLevel = 1;
		}
		if (foundset.flag_super_administrator == 1) {
			administratorLevel = 2;
		}
	}
	
	forms.svy_sec_main_user_security.setValueList();
	forms.svy_sec_main_user_security.filterOrganization();
	forms.svy_sec_main_user_security.enableDisableForm();
}

/**
 * Handle changed data.
 *
 * @param oldValue old value
 * @param newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"BBE41013-49F1-48F5-B8B9-2B935F8E6A9F"}
 */
function onDataChangeAdministratorLevel(oldValue, newValue, event) {
	if (!administratorLevel) {
		foundset.flag_system_administrator = null;
		foundset.flag_super_administrator = null;
	} else if (administratorLevel == 1) {
		foundset.flag_system_administrator = 1;
		foundset.flag_super_administrator = null;
	} else if (administratorLevel == 2) {
		foundset.flag_system_administrator = 1;
		foundset.flag_super_administrator = 1;
	}
	
	databaseManager.saveData();
	
	return true;
}

/**
 * @properties={typeid:24,uuid:"EB802F59-7231-45FF-ACA8-33D9F81BE107"}
 * @AllowToRunInFind
 */
function doSearch() {
	if (forms.svy_sec_main.searchArgument) {
		foundset.find();
		foundset.name_compound = '#%' + forms.svy_sec_main.searchArgument + '%';
		foundset.search();
	} else {
		foundset.loadAllRecords();
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"29C37720-40FB-47C6-813C-A0CB51CD9B3D"}
 */
function addUser(event) 
{
	forms.svy_sec_main_user_tbl.addRecord(event);
}

/**
 * Handle changed data.
 *
 * @param oldValue old value
 * @param newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"5A568A4A-F68F-4EA1-AE6C-1AA75AF28B3A"}
 */
function onDataChange(oldValue, newValue, event) 
{
	return true;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"7DD59FC2-B659-4430-9F21-DA197994665F"}
 * @AllowToRunInFind
 */
function filterOwner(event) {
	
	if(!vOwnerID)
		globals.DIALOGS.showWarningDialog('Filtraggio gruppi','Selezionare un proprietario su cui filtrare');
	else if(foundset.find())
	{
		foundset.owner_id = vOwnerID;
		foundset.search();
	}
	else
		globals.DIALOGS.showWarningDialog('Filtraggio gruppi','Filtraggio non riuscito');
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"025CD33E-B050-44E7-A08C-DD8815881B2D"}
 */
function unfilterOwner(event) {
	
	foundset.loadAllRecords();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"E7F44AAF-DCD3-4CF3-8DB7-AFB39849A0D4"}
 */
function onActionMailButton(event) 
{
		var mailAddress = ['giovanni.tizzoni@studiomiazzo.it','giovanni.tizzoni@gmail.com'];
		var properties = new Array();
		properties[0] = 'mail.smtp.host=smtp.sparkpostmail.com';
		properties[1] = 'mail.smtp.port=587';
		properties[2] = 'mail.smtp.auth=true';
		properties[3] = 'mail.smtp.username=SMTP_Injection';
		properties[4] = 'mail.smtp.password=015e2b306072ac4b7de06a8143a98e16cc550ae6';
		properties[5] = 'mail.smtp.starttls.enable=true';
		var subject = "Test mail PresenzaSemplice";
		var msgText = "<html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"></head>";
		msgText += "<body>Cordiali saluti.</body></html>";
		
		for(var i = 0; i < mailAddress.length; i++)
		{
			var success = plugins.mail.sendMail
			(mailAddress[i],
				'I am X <noreply@peoplegest.it>',
				subject,
				msgText,
				null,
				null,
				null,
				properties);
			if (!success)
				globals.svy_mod_dialogs_global_showErrorDialog(mailAddress[i],plugins.mail.getLastSendMailExceptionMsg(),'OK');
			else
				globals.svy_mod_dialogs_global_showInfoDialog(mailAddress[i],'Test mail inviata correttamente','OK');
		}	
}

/**
 * Handle focus gained event of the element.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"AFF87A63-15AA-4CE9-B39E-1492AB89EDD3"}
 */
function onFocusGained(event) 
{
	elements.tab_users.enabled = false;
	application.output('focus gained ' + event.getElementName());
}

/**
 * Handle focus lost event of the element.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"AA1BB205-6E68-4129-B3F6-9C3FD2A76066"}
 */
function onFocusLost(event) 
{
	elements.tab_users.enabled = true;
	application.output('focus lost ' + event.getElementName());
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"9C62DBA5-D66F-42BC-B410-1C7269D8AA7E"}
 */
function onActionEdit(event)
{
	updateState(true);	
}

/**
 * Aggiorna visualizzazione
 *  
 * @param enable
 *
 * @properties={typeid:24,uuid:"2C2FF52D-C557-4EDE-B794-E1E16EE87527"}
 */
function updateState(enable)
{
	elements.tab_users.enabled =
	elements.btn_edit.enabled = !enable;
		
	elements.btn_save.enabled =
	elements.btn_cancel.enabled =
	elements.username.enabled =
	elements.name.enabled =
	elements.surname.enabled =
    elements.phonenumber.enabled =
    elements.mail.enabled =
    elements.description.enabled =
    elements.image.enabled = enable;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"EF63DF8E-D3CC-4839-9E10-4D17C7AC3E93"}
 */
function onActionConfirm(event) 
{
	updateState(false);
	// saving data...
	if(!databaseManager.saveData())
	{
		databaseManager.rollbackTransaction();
		globals.svy_mod_dialogs_global_showInfoDialog('Gestione utenze','Non è stato possibile salvare i dati','Ok');
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"F1AB2298-378F-426A-8E7B-FEBCFFC50262"}
 */
function onActionCancel(event) 
{
	updateState(false);
	// rollback modifies...
	databaseManager.rollbackTransaction();
}
