/**
 * Set the valuelist with the server names
 *
 * @author Sanneke Aleman
 * @since 2008-05-04
 *
 * @properties={typeid:24,uuid:"c214dbd3-4355-40f0-b628-904c16e65779"}
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
 * @properties={typeid:24,uuid:"575dee32-c863-432a-86c3-4da6257a1cad"}
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

	var _display_tables = [].concat(_tables);
	_display_tables.unshift('i18n:svy.fr.lbl.all_tables')
	var _real_tables = [].concat(_tables);
	_real_tables.unshift('-1')
	application.setValueListItems('svy_sec_tablenames', _display_tables, _real_tables )
}

/**
 * On show, set the valuelists tables and servers
 *
 * @author Sanneke Aleman
 * @since 2008-05-04
 *
 * @properties={typeid:24,uuid:"23bb9af1-a1e5-47a8-85b3-8c78dc67b5b3"}
 */
function onShow()
{
	setVLserverNames()
	setVLtableNames()
}

/**
 * Close form
 *
 * @author Sanneke Aleman
 * @since 2008-05-04
 * @param {JSEvent} _event
 *
 * @properties={typeid:24,uuid:"46dd4e99-2511-4b6c-9f7a-1900cecf07b9"}
 */
function closeForm(_event)
{
	globals.svy_mod_closeForm(_event)
}
