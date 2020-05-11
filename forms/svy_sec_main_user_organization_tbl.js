/**
 * @type {Array}
 *
 * @properties={typeid:35,uuid:"A9E77228-136E-4DCB-9AED-EDDA9F626AB4",variableType:-4}
 */
var addRecordParameters = new Array();

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"BBDB7064-F7E5-4953-BBA7-1F9552A626C5"}
 */
var addRecordQuery = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"B92B1E7E-8482-43B1-AC18-2FE21ED9F522"}
 */
function deleteRecord(event)
{
	var sql = "delete from sec_user_org \
               where user_org_id = ?";
    var success = plugins.rawSQL.executeSQL('svy_framework',
                                            sql,
	                                        [foundset.user_org_id]);
    if(success)
    {
    	plugins.rawSQL.flushAllClientsCache('svy_framework',
    		                                'sec_user_org');
    	forms['ma_sec_main_user_security'].setValueList();
    }
    else
	   globals.DIALOGS.showErrorDialog('Record non eliminato,riprovare','Elimina organizzazione - utente');
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"8C96A6E8-5764-4F52-A61E-4B8EBAF1E0D0"}
 */
function addRecord(event) {
	var _query = 'SELECT so.organization_id \
	              FROM sec_organization so \
	              INNER JOIN sec_owner sow ON so.owner_id = sow.owner_id \
	              WHERE so.organization_id NOT IN \
	              (SELECT organization_id FROM sec_user_org WHERE user_id = ?) \
	              ORDER BY sow.name,so.name';
	var _arguments = [forms.svy_sec_main_user_access.foundset.user_id];
	var _dataSet = databaseManager.getDataSetByQuery(globals.nav_db_framework, _query, _arguments, -1);
	
	if (globals.svy_sec_showSelectionDialog('db:/svy_framework/sec_organization', _dataSet, ['organization_id'], ['name', 'sec_organization_to_sec_owner.name'], ['Organization', 'Owner'], [200, 200], 600, true) == 'select') {
		var tempFoundset = forms['svy_sec_selection_dialog_sec_organization'].foundset.duplicateFoundSet();
		tempFoundset.sort('sec_organization_to_sec_owner.name asc, name asc');
		for (var i = 1; i <= tempFoundset.getSize(); i++) {
			tempFoundset.setSelectedIndex(i);
			
			if (tempFoundset['is_selected'] == 1) {
				foundset.newRecord();
				foundset.organization_id = tempFoundset['organization_id'];
			}
		}
		
		databaseManager.saveData();
	}
}
