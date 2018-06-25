/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"30A68538-B48C-44E3-B9AF-1D20E6DBAAEA"}
 */
function deleteRecord(event) 
{
//	globals.svy_mod_dialogs_global_showWarningDialog('Eliminazione chiave dal gruppo','Verificare metodo di eliminazione...','');
	foundset.deleteRecord(foundset.getSelectedRecord());
}

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"83883F66-C40B-4409-BED1-E169FA184155"}
 */
function addRecord(event) 
{
	var _query = 'SELECT sec_security_key_group_id, name, description, admin_only \
                  FROM sec_security_key_group sskg \
                  WHERE sskg.sec_security_key_group_id NOT IN \
                  (SELECT sec_security_key_group_id FROM sec_security_key_to_group \
                  WHERE security_key_id = ?)';

	var _arguments = [forms.svy_sec_main_key_tbl.security_key_id];

	if (!_to_sec_user$user_id.flag_super_administrator) {
		_query += ' AND admin_only != 1';
	}

	_query += ' ORDER BY sskg.name';

	var _dataSet = databaseManager.getDataSetByQuery(globals.nav_db_framework, _query, _arguments, -1);

	if (globals.svy_sec_showSelectionDialog('db:/svy_framework/sec_security_key_group',
											_dataSet,
											['sec_security_key_group_id'],
											['sec_security_key_to_group_to_sec_security_key_group.name'],
											['Gruppo chiave'],
											[500],
											650,
											true) == 'select') 
	{
		var tempFoundset = forms['svy_sec_selection_dialog_sec_security_key_group'].foundset.duplicateFoundSet();
		for (var i = 1; i <= tempFoundset.getSize(); i++) {
			tempFoundset.setSelectedIndex(i);

			if (tempFoundset['is_selected'] == 1) {
				foundset.newRecord();
				foundset.sec_security_key_group_id = tempFoundset['sec_security_key_group_id'];
				foundset.security_key_id = forms.svy_sec_main_key_tbl.security_key_id
			}
		}

		databaseManager.saveData();

		forms.svy_sec_main_key_group_tbl.foundset.loadRecords();
	}
	
	forms.svy_sec_main.controller.readOnly = false;
}