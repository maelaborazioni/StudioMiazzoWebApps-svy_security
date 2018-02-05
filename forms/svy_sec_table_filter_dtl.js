/**
 * Set the valuelist with the server names
 *
 * @author Sanneke Aleman
 * @since 2008-05-04
 *
 * @properties={typeid:24,uuid:"84DC0566-0EE9-436A-8CBE-193FFD65E0D8"}
 */
function setVLserverNames()
{
	var _servers = databaseManager.getServerNames().sort()
	application.setValueListItems('svy_sec_servernames',_servers.sort())
}

/**
 * Set the valuelist with the table names
 *
 * @author Sanneke Aleman
 * @since 2008-05-04
 *
 * @properties={typeid:24,uuid:"DE37E672-07CE-45CE-A043-EBFB9FCCDCC0"}
 */
function setVLtableNames()
{
	var _tables
	if(server_name)
	{
		 _tables = databaseManager.getTableNames(server_name).sort()
	}
	else
	{
		 _tables = new Array()
	}

	application.setValueListItems('svy_sec_tablenames', _tables, _tables )
}

/**
 *
 * @properties={typeid:24,uuid:"D9E17EC5-9FC6-46AF-956F-DC928DC85D01"}
 */
function validate() {
	if(server_name && table_name)
	{
		return true
		
	}
	if(!server_name)
	{
		elements.server_name.requestFocus()
	}
	else
	{
		elements.table_name.requestFocus()
	}
	globals.DIALOGS.showWarningDialog(i18n.getI18NMessage('svy.fr.lbl.warning'), i18n.getI18NMessage('svy.fr.dlg.server_table'));
		
	return false
}

/**
 * On show, set the valuelists tables and servers
 *
 * @author Sanneke Aleman
 * @since 2008-05-04
 * @param {JSEvent} _event
 *
 * @properties={typeid:24,uuid:"2B05A615-7576-4881-83F6-289F365F62B1"}
 */
function onShow(_event)
{
	setVLserverNames()
	setVLtableNames()
	setVLfieldNames(_event)
}

/**
 * Close form
 *
 * @author Sanneke Aleman
 * @since 2008-05-04
 * @param {JSEvent} _event
 *
 * @properties={typeid:24,uuid:"6428BC8A-C089-4A35-9957-170C9DC6160D"}
 */
function closeForm(_event)
{
	globals.svy_mod_closeForm(_event)
}

/**
 * Handle focus element gaining focus.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean} proceed to next on-focus-gained handler
 *
 * @properties={typeid:24,uuid:"EAC71F41-5D25-4D2A-BB31-FB2BD19217D0"}
 */
function setVLfieldNames(event) {
	//set the valuelist for the fields	
	if(server_name && table_name)
	{
		var _jsTable = databaseManager.getTable(server_name, table_name)
		var _fields = _jsTable.getColumnNames().sort()
		application.setValueListItems('svy_sec_fieldnames', _fields)
	}
	return true
}
