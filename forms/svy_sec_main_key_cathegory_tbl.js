/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"E908A811-0C94-4CD5-B33C-E9221A007BC9"}
 */
function deleteRecord(event) 
{
	//globals.svy_mod_dialogs_global_showWarningDialog('Eliminazione categoria dal gruppo','Verificare metodo di eliminazione...','');
	foundset.deleteRecord(foundset.getSelectedRecord());
}

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"34F89609-87B2-479C-81D5-57596823538E"}
 */
function addRecord(event) 
{
	var _query = 'SELECT sec_security_key_cathegory_id, level, name, description \
                  FROM sec_security_key_cathegory sskc \
                  WHERE sskc.sec_security_key_cathegory_id NOT IN \
                  (SELECT sec_security_key_cathegory_id FROM sec_security_key_to_cathegory \
                  WHERE security_key_id = ?)';

	var _arguments = [forms.svy_sec_main_key_tbl.security_key_id]; //sec_security_key

	_query += ' ORDER BY sskc.name asc';

	var _dataSet = databaseManager.getDataSetByQuery(globals.nav_db_framework, _query, _arguments, -1);

	if (globals.svy_sec_showSelectionDialog('db:/svy_framework/sec_security_key_cathegory',
		_dataSet,
		['sec_security_key_cathegory_id'],
		['name'],
		['Categoria chiave'],
		[500],
		650,
		true) == 'select') {
		var tempFoundset = forms['svy_sec_selection_dialog_sec_security_key_cathegory'].foundset.duplicateFoundSet();
		for (var i = 1; i <= tempFoundset.getSize(); i++) {
			tempFoundset.setSelectedIndex(i);

			if (tempFoundset['is_selected'] == 1) {
				foundset.newRecord();
				foundset.sec_security_key_cathegory_id = tempFoundset['sec_security_key_cathegory_id'];
				foundset.security_key_id = forms.svy_sec_main_key_tbl.security_key_id;
			}
		}

		databaseManager.saveData();

		forms.svy_sec_main_key_cathegory_tbl.foundset.loadRecords();
	}
}
