/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"6cf6db37-b7f7-4016-ab30-bc248cfbe03c",variableType:93}
 */
var svy_sec_currentdate;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"676f7c2b-dc60-4227-a727-1533373d0320",variableType:4}
 */
var svy_sec_element_id = 0;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"fcdbb390-483c-49d7-9508-ba2e0ec48608"}
 */
var svy_sec_elt_id = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"bd4e5729-f3e2-4fe6-8981-f2a98b74ed6d"}
 */
var svy_sec_form_id = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"c29792c7-0035-40c0-a1e5-6b0f3f1c6313",variableType:4}
 */
var svy_sec_group_id;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"5505460c-4525-4f8a-8da9-9fef2e5bf815",variableType:4}
 */
var svy_sec_mod_id;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"EB905850-F738-4983-9ED7-2E0252406BC7"}
 */
var svy_sec_organization_id = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"f3b4d3d5-1882-4a1e-93bc-20764b4c0985"}
 */
var svy_sec_owner_id = '';

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"1998b701-1e71-4bf0-bf50-b651f2d70739",variableType:4}
 */
var svy_sec_security_key_id;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"94ff1cba-f5e1-4d77-85ad-a197636e6a7f"}
 */
var svy_sec_trigger_form = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"4f7750f9-2284-479e-8fea-58d9be7de8b9",variableType:4}
 */
var svy_sec_user_id;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"A06CA15F-EB8E-45CE-84CD-4CAB2206818D",variableType:4}
 */
var svy_sec_user_org_id = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"dde4c6e9-e33b-4de7-9195-cc96cc585cf6"}
 */
var svy_sec_username = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"C885B180-20B3-46E1-AA9A-7E59B46B35AF"}
 */
var svy_sec_version = '6.0.1.86';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"567f5c2c-613f-43d9-a634-40a2d54faca0"}
 */
var svy_sec_view_mode = '';

/**
 *	Deletes a record
 *
 * @author Sanneke Aleman
 * @since 2007-05-24
 * @param {JSEvent} _event
 * @return  none
 *
 * @properties={typeid:24,uuid:"cc95218e-1079-4faf-98d2-4dec24ffca83"}
 */
function svy_sec_deleteRecord(_event) {
	var _form = _event.getFormName();
	var _ok = i18n.getI18NMessage('svy.fr.lbl.ok')
	var _no = i18n.getI18NMessage('svy.fr.lbl.no')
	var _answer = globals.svy_mod_dialogs_global_showQuestionDialog(i18n.getI18NMessage('svy.fr.lbl.record_delete'), i18n.getI18NMessage('svy.fr.dlg.delete'), _ok, _no);
	if (_answer == _ok) {
		forms[_form].controller.deleteRecord()
	}
}

/**
 *	Get all the keys where the logged in user has rights for, result a string of all the keys in the variable globals.nav.keys
 *
 * @author Sanneke Aleman
 * @since 2008-11-04
 * @return  none
 *
 * @properties={typeid:24,uuid:"688d0322-0396-4431-a3b9-c7f01eedbb53"}
 */
function svy_sec_getSecurityKeys() {
	var _server = globals.nav_db_framework
	var _query = '	SELECT DISTINCT	surd.security_key_id \
					FROM			sec_user_right surd \
					WHERE			(surd.security_key_id IN \
							(SELECT	ssk.security_key_id  \
							FROM	sec_security_key ssk, \
									sec_user_right sur, \
									sec_user_in_group sug \
							WHERE	ssk.security_key_id = sur.security_key_id \
							AND		sur.group_id = sug.group_id \
							AND		sug.user_org_id = ? \
							AND		(ssk.module_id IS NULL OR ssk.module_id IN \
									(SELECT	som.module_id \
									FROM	sec_owner_in_module som \
									WHERE	som.owner_id = ? \
									AND		(som.start_date IS NULL OR som.start_date <= ?) \
									AND		(som.end_date IS NULL OR som.end_date >= ? )))) \
					AND NOT EXISTS \
						(SELECT	* \
						FROM	sec_user_right surd2 \
						WHERE	surd.security_key_id = surd2.security_key_id \
						AND		surd2.user_org_id = ? \
						AND		surd2.is_denied = 1)) \
					OR	surd.user_org_id = ? \
					AND	(surd.is_denied IS NULL \
					OR	surd.is_denied = 0) ';

	// MAVariazione - also consider keys associated with the modules only
//	var _query = "SELECT DISTINCT	surd.security_key_id \
//					FROM	\
//						sec_user_right surd \
//					WHERE	\
//						(\
//						surd.security_key_id IN\
//								( \
//									SELECT	ssk.security_key_id \
//									FROM	sec_security_key ssk \
//									INNER JOIN sec_user_right sur \
//										ON ssk.security_key_id = sur.security_key_id \
//									INNER JOIN sec_user_in_group sug \
//										ON sur.group_id = sug.group_id \
//									WHERE \
//										sur.user_org_id = ? \
//										AND \
//										(\
//											ssk.module_id IS NULL OR ssk.module_id IN \
//												( \
//													SELECT	som.module_id \
//													FROM	sec_owner_in_module som \
//													WHERE	som.owner_id = ? \
//													AND	(som.start_date IS NULL OR som.start_date <= ?) \
//													AND	(som.end_date IS NULL OR som.end_date >=  ?) \
//												) \
//										) \
//								) \
//								AND NOT EXISTS \
//									( \
//										SELECT	* \
//										FROM	sec_user_right surd2 \
//										WHERE	surd.security_key_id = surd2.security_key_id \
//										AND		surd2.user_org_id = ? \
//										AND		surd2.is_denied = 1 \
//									) \
//						) \
//						OR	surd.user_org_id = ? \
//						AND	(surd.is_denied IS NULL OR surd.is_denied = 0) \
//					\
//					UNION \
//					\
//					SELECT 	ssk.security_key_id \
//					FROM	sec_security_key ssk \
//						INNER JOIN sec_owner_in_module som \
//							ON som.module_id = ssk.module_id \
//						WHERE	som.owner_id = ?\
//							AND	(som.start_date IS NULL OR som.start_date <= ?) \
//							AND	(som.end_date IS NULL OR som.end_date >=  ?) \
//							AND NOT EXISTS \
//							(\
//								SELECT	* \
//								FROM	sec_user_right surd \
//								WHERE	surd.security_key_id = ssk.security_key_id \
//								AND		surd.user_org_id = ? \
//								AND		surd.is_denied = 1 \
//							)";
	
	var _args = new Array()
	_args[0] = globals.svy_sec_lgn_user_org_id
	// MAVariazione - usa il proprietario di login invece che quello dell'utenza
	_args[1] = globals.svy_sec_lgn_owner_id;//_args[1] = globals.owner_id
	_args[2] = new Date()
	_args[3] = new Date()
	_args[4] = globals.svy_sec_lgn_user_org_id;
	_args[5] = globals.svy_sec_lgn_user_org_id;
	
	// MAVariazione
//	_args[6] = globals.owner_id;
//	_args[7] = new Date();
//	_args[8] = new Date();
//	_args[9] = globals.svy_sec_lgn_user_org_id;

	var _dataset = databaseManager.getDataSetByQuery(_server, _query, _args, -1);

	if (_dataset.getMaxRowIndex() > 0) {
		var _array = _dataset.getColumnAsArray(1)
		globals.nav.keys = _array.join(',')
	} else {
		globals.nav.keys = -1
	}
}

/**
 * TODO generated, please specify type and doc for the params
 * @param _user_org_id
 *
 * @properties={typeid:24,uuid:"EE547EC1-3928-447E-838A-482E0ACC515E"}
 */
function svy_sec_getUserOrgSecurityKeys(_user_org_id) {
	var _server = globals.nav_db_framework
	var _query = '	SELECT DISTINCT	surd.security_key_id \
					FROM			sec_user_right surd \
					WHERE			(surd.security_key_id IN \
							(SELECT	ssk.security_key_id  \
							FROM	sec_security_key ssk, \
									sec_user_right sur, \
									sec_user_in_group sug \
							WHERE	ssk.security_key_id = sur.security_key_id \
							AND		sur.group_id = sug.group_id \
							AND		sug.user_org_id = ? \
							AND		(ssk.module_id IS NULL OR ssk.module_id IN \
									(SELECT	som.module_id \
									FROM	sec_owner_in_module som \
									WHERE	som.owner_id = ? \
									AND		(som.start_date IS NULL OR som.start_date <= ?) \
									AND		(som.end_date IS NULL OR som.end_date >= ? )))) \
					AND NOT EXISTS \
						(SELECT	* \
						FROM	sec_user_right surd2 \
						WHERE	surd.security_key_id = surd2.security_key_id \
						AND		surd2.user_org_id = ? \
						AND		surd2.is_denied = 1)) \
					OR	surd.user_org_id = ? \
					AND	(surd.is_denied IS NULL \
					OR	surd.is_denied = 0) ';

	// MAVariazione - also consider keys associated with the modules only
//	var _query = "SELECT DISTINCT	surd.security_key_id \
//					FROM	\
//						sec_user_right surd \
//					WHERE	\
//						(\
//						surd.security_key_id IN\
//								( \
//									SELECT	ssk.security_key_id \
//									FROM	sec_security_key ssk \
//									INNER JOIN sec_user_right sur \
//										ON ssk.security_key_id = sur.security_key_id \
//									INNER JOIN sec_user_in_group sug \
//										ON sur.group_id = sug.group_id \
//									WHERE \
//										sur.user_org_id = ? \
//										AND \
//										(\
//											ssk.module_id IS NULL OR ssk.module_id IN \
//												( \
//													SELECT	som.module_id \
//													FROM	sec_owner_in_module som \
//													WHERE	som.owner_id = ? \
//													AND	(som.start_date IS NULL OR som.start_date <= ?) \
//													AND	(som.end_date IS NULL OR som.end_date >=  ?) \
//												) \
//										) \
//								) \
//								AND NOT EXISTS \
//									( \
//										SELECT	* \
//										FROM	sec_user_right surd2 \
//										WHERE	surd.security_key_id = surd2.security_key_id \
//										AND		surd2.user_org_id = ? \
//										AND		surd2.is_denied = 1 \
//									) \
//						) \
//						OR	surd.user_org_id = ? \
//						AND	(surd.is_denied IS NULL OR surd.is_denied = 0) \
//					\
//					UNION \
//					\
//					SELECT 	ssk.security_key_id \
//					FROM	sec_security_key ssk \
//						INNER JOIN sec_owner_in_module som \
//							ON som.module_id = ssk.module_id \
//						WHERE	som.owner_id = ?\
//							AND	(som.start_date IS NULL OR som.start_date <= ?) \
//							AND	(som.end_date IS NULL OR som.end_date >=  ?) \
//							AND NOT EXISTS \
//							(\
//								SELECT	* \
//								FROM	sec_user_right surd \
//								WHERE	surd.security_key_id = ssk.security_key_id \
//								AND		surd.user_org_id = ? \
//								AND		surd.is_denied = 1 \
//							)";
	
	var _args = new Array()
	_args[0] = _user_org_id
	// MAVariazione - usa il proprietario di login invece che quello dell'utenza
	_args[1] = globals.svy_sec_owner_id;
	_args[2] = new Date()
	_args[3] = new Date()
	_args[4] = _user_org_id
	_args[5] = _user_org_id;
	
	// MAVariazione
//	_args[6] = globals.owner_id;
//	_args[7] = new Date();
//	_args[8] = new Date();
//	_args[9] = globals.svy_sec_lgn_user_org_id;

	var _dataset = databaseManager.getDataSetByQuery(_server, _query, _args, -1);

	return _dataset;
}

/**
 *	Gets a property from the user properties
 *
 * @author Paul Bakker
 * @since 2008-11-04
 * @param {String} _propertyName the property name
 * @return  The user property
 *
 * @properties={typeid:24,uuid:"072cceef-64aa-4f5b-bd86-52225f107992"}
 */
function svy_sec_getUserProperty(_propertyName) {
	_propertyName = _propertyName.replace(/\s/g,"_");

	if (!_propertyName) {
		application.output('getUserProperty called without mandatory params', LOGGINGLEVEL.ERROR);
		return null;
	}
	return application.getUserProperty(_propertyName) + '';
}

/**
 *	Set the security on servoy elements by using security.setSecuritySettings()
 *  This method relies on the method svy_sec_getSecurityKeys to return correct keys
 *
 * @author Sanneke Aleman
 * @since 2008-11-04
 *
 * @properties={typeid:24,uuid:"e09dfdec-b5b9-4a1c-b97a-f1c41a1fe3d5"}
 */
function svy_sec_setElementRightsWithKeys() {
	// query all the element right from the sec_ tables
	var _server = globals.nav_db_framework
	var _query = ' SELECT \
						se.servoy_element_id, \
						(SELECT sum(se_fe.flag_editable) \
						FROM 		sec_element se_fe \
						WHERE 		se_fe.security_key_id IN (' + globals.nav.keys + ') and \
									se.servoy_element_id =  se_fe.servoy_element_id \
						GROUP BY 	se_fe.servoy_element_id), \
						(SELECT 	sum(se_se.flag_visible) \
						FROM 		sec_element se_se \
						WHERE 		se_se.security_key_id IN (' + globals.nav.keys + ') and \
									se.servoy_element_id =  se_se.servoy_element_id \
						GROUP BY	se_se.servoy_element_id) \
						FROM 		sec_element se\
   						GROUP BY 	se.servoy_element_id'

	var _dataset = databaseManager.getDataSetByQuery(_server, _query, null, -1);

	var _colNames = new Array()
	_colNames[0] = 'id'
	_colNames[1] = 'flags'
	var _sec_dataset = databaseManager.createEmptyDataSet(0, _colNames)
	var _row

		//convert the rights to a good dataset for the funtion security.setSecuritySettings
	for (var i = 1; i <= _dataset.getMaxRowIndex(); i++) {
		_row = new Array()
		_row[0] = _dataset.getValue(i, 1)
		if (_dataset.getValue(i, 2) > 0 && _dataset.getValue(i, 3) > 0) {
			_row[1] = (1 | 2)
		} else if (_dataset.getValue(i, 2) > 0) {
			_row[1] = 2
		} else if (_dataset.getValue(i, 3) > 0) {
			_row[1] = 1
		} else {
			_row[1] = 0
		}
		_sec_dataset.addRow(_row)

	}

	//get the table security  // 1 = READ / 2 = INSERT / 4 = UPDATE / 8 = DELETE / 16 = TRACKING;
	_server = globals.nav_db_framework
	_query = ' SELECT \
									st.server_name, \
									st.table_name, \
									(max(st.flag_read) * 1) ,\
									(max(st.flag_insert) *2) , \
									(max(st.flag_update) * 4),\
									(max(st.flag_delete) * 8) , \
									(max(st.flag_tracking) * 16)\
						FROM 		sec_table st \
						WHERE 		st.security_key_id IN (' + globals.nav.keys + ') \
						GROUP BY	st.server_name, st.table_name\
						ORDER BY	st.table_name desc '

	_dataset = databaseManager.getDataSetByQuery(_server, _query, null, -1);

	//convert the rights to a good dataset for the funtion security.setSecuritySettings
	var _object = new Object()
	var _name
	for (var j = 1; j <= _dataset.getMaxRowIndex(); j++) {
		if (_dataset.getValue(j, 2) != '-1')// not all tables
		{
			_name = _dataset.getValue(j, 1) + '.' + _dataset.getValue(j, 2)
			_object[_name] = new Object()
			_object[_name].fRead = _dataset.getValue(j, 3)
			_object[_name].fInsert = _dataset.getValue(j, 4)
			_object[_name].fUpdate = _dataset.getValue(j, 5)
			_object[_name].fDelete = _dataset.getValue(j, 6)
			_object[_name].fTracking = _dataset.getValue(j, 7)

		} else //all tables
		{
			/** @type {String} */
			var _servername = _dataset.getValue(j, 1)
			var _tables = databaseManager.getTableNames(_servername)
			for (var k = 0; k < _tables.length; k++) {
				_name = _dataset.getValue(j, 1) + '.' + _tables[k]
				if (_object[_name]) // Object allready exists, synchronise properties
				{
					if (_dataset.getValue(j, 3) > 0 && _object[_name].fRead < 0) {
						_object[_name].fRead = _dataset.getValue(j, 3)
					}
					if (_dataset.getValue(j, 4) > 0 && _object[_name].fInsert < 0) {
						_object[_name].fInsert = _dataset.getValue(j, 4)
					}
					if (_dataset.getValue(j, 5) > 0 && _object[_name].fUpdate < 0) {
						_object[_name].fUpdate = _dataset.getValue(j, 5)
					}
					if (_dataset.getValue(j, 6) > 0 && _object[_name].fDelete < 0) {
						_object[_name].fDelete = _dataset.getValue(j, 6)
					}
					if (_dataset.getValue(j, 7) > 0 && _object[_name].fTracking < 0) {
						_object[_name].fTracking = _dataset.getValue(j, 7)
					}
				} else // Object doesn't exist jet
				{
					_object[_name] = new Object()
					_object[_name].fRead = _dataset.getValue(j, 3)
					_object[_name].fInsert = _dataset.getValue(j, 4)
					_object[_name].fUpdate = _dataset.getValue(j, 5)
					_object[_name].fDelete = _dataset.getValue(j, 6)
					_object[_name].fTracking = _dataset.getValue(j, 7)
				}
			}
		}
	}
	for (var m in _object) {
		_row = new Array()
		_row[0] = m
		_row[1] = Math.abs(_object[m].fRead) + Math.abs(_object[m].fInsert) + Math.abs(_object[m].fUpdate) + Math.abs(_object[m].fDelete) + Math.abs(_object[m].fTracking)
		_sec_dataset.addRow(_row)
	}
	security.setSecuritySettings(_sec_dataset)

}

/**
 *	Saves a value to the user property file
 *
 * @author Sanneke Aleman
 * @since 2008-11-04
 * @param {String} _propertyName
 * @param {String} _propertyValue
 *
 * @properties={typeid:24,uuid:"87f464c4-6a83-4056-aa6b-e314c8ca51ee"}
 */
function svy_sec_setUserProperty(_propertyName, _propertyValue) {
	_propertyName = _propertyName.replace(/\s/g,"_");

	if (!_propertyName || (!_propertyValue == null && _propertyValue != 0)) {
		application.output('saveUserProperty called without mandatory params', LOGGINGLEVEL.ERROR);
		return;
	}
	application.setUserProperty(_propertyName, _propertyValue);
}

/**
 *	Creates a new record
 *
 * @author Sanneke Aleman
 * @since 2008-11-04
 * @param {JSEvent} [_event]
 * @param {String} [_form]
 *
 * @properties={typeid:24,uuid:"6b0f56d6-f667-4a00-b962-2b93076198d9"}
 */
function svy_sec_newRecord(_event, _form) {

	if (_form == undefined) {
		_form = _event.getFormName()
	}
	
	forms[_form].controller.newRecord()	
}

/**
 *	Method to set you background color in a table, returns the color of the cell
 *
 * @author Sanneke Aleman
 * @since 2009-11-04
 * @param {Number}	_rowindex
 * @param {Boolean} _isSelected
 * @param {String} _field_type
 * @param {String} _dataproviderid
 * @param {String} _form_name
 * @param {Object} _state
 * @return  {String} color, like #FF0000
 *
 *
 * @properties={typeid:24,uuid:"72e107eb-95d5-4506-bad9-a690b1f9a9b3"}
 */
function svy_sec_rowBg(_rowindex, _isSelected, _field_type, _dataproviderid, _form_name, _state) {

	if (_isSelected) {
		return "#3D80DF" //"#3D80DF" 006699 #d8e7ab
	} else {
		if (_rowindex % 2 == 0) {
			return "#ffffff" // #fff
		} else {
			return "#f0f0f0" // #ff0000
		}
	}
}

/**
 *	Counts days to a date
 *
 * @author Sanneke Aleman
 * @since 2008-11-04
 * @param {Date} _date
 * @param {Number} _numberOfDays nr of days (can be negative)
 * @return {Date} date + nr of days   (attention, time will be set to 0)
 *
 * @properties={typeid:24,uuid:"5dae3b1c-f2d2-4924-806c-806a62879ed0"}
 */
function svy_sec_datePlusDays(_date, _numberOfDays) {
	var _millisPerDay = 86400000
	if (_date.getHours() + _date.getMinutes() + _date.getSeconds() + _date.getMilliseconds() != 0) {
		_date.setHours(0)
		_date.setMinutes(0)
		_date.setSeconds(0)
		_date.setMilliseconds(0)
	}

	var _millis = _date.valueOf() + _numberOfDays * _millisPerDay + 60 * 60 * 1000 // add 1 hour summertime
	var _returnDate = new Date(_millis)

	_returnDate.setHours(0)
	_returnDate.setMinutes(0)
	_returnDate.setSeconds(0)
	_returnDate.setMilliseconds(0)

	return _returnDate
}

/**
 *	Gets the owner id, supposed to be changed, to be used with deeplinking
 *
 * @author Sanneke Aleman
 * @since 2008-11-04
 * @return owner id
 *
 * @properties={typeid:24,uuid:"c580d0b4-1346-454d-a716-60ffd5386c14"}
 */
function svy_sec_getOwnerId() {
	return globals.svy_sec_owner_id
}

/**
 *
 * @properties={typeid:24,uuid:"2D873811-6DCA-400D-94E8-975193074983"}
 * @SuppressWarnings(wrongparameters)
 */
function svy_sec_setTableFilters() {
	// query all the element right from the sec_ tables
	var _server = globals.nav_db_framework
	var _query = 'SELECT \
						table_filter_id \
						FROM 		sec_table_filter \
						WHERE 		security_key_id IN (' + globals.nav.keys + ')'

	/** @type {JSFoundSet<db:/svy_framework/sec_table_filter>} */
	var _foundset = databaseManager.getFoundSet(_server, 'sec_table_filter')
	_foundset.loadRecords(_query)
	var _rec, _value;
	for (var i = 1; i <= _foundset.getSize(); i++) {
		_rec = _foundset.getRecord(i)
		if (/globals\./.test(_rec.filter_value))
		{
			var _global = _rec.filter_value.match(/(globals\.\w*)/)[0];
			_value = _rec.filter_value.replace(/(globals\.\w*)/, eval(_global));
		}
		else if(_rec.filter_value)
		{
			// MAVariazione - check for comma separated values when using IN
			var _split_value = _rec.filter_value.split(',');
			if(_split_value.length > 0)
				_value = _split_value;
			else
				_value = _rec.filter_value;
		}
		if(_rec.server_name && _rec.table_name && _rec.filter_field_name)
		   databaseManager.addTableFilterParam(_rec.server_name, _rec.table_name, _rec.filter_field_name, _rec.filter_operator, _value, _rec.name)
	}
}

/**
 * @param {String} _server The framework servername
 * 
 * @properties={typeid:24,uuid:"22CE6038-F148-4BB4-A926-2C18AEF0306D"}
 */
function svy_sec_createHash(_server) {
	if (!_server) {
		_server = "svy_framework";
	}
	
	//create hash
	var _tables = ["sec_owner", "sec_user_in_group", "sec_user_password", "sec_user_in_group", "sec_user_right", "sec_security_key", "sec_element", "sec_table", "sec_table_filter"];
	var _jsTable, _columns;
	
	var _start = application.getServerTimeStamp();
	var _query, _ds, _hash = "";
	for (var i = 0; i < _tables.length; i++) {
		_query = "SELECT "
		
		_jsTable = databaseManager.getTable(_server, _tables[i]);
		_columns = _jsTable.getColumnNames().filter(function(x) { return (x != "hash")});
		
		_query += _columns.join(", ");
		_query +=  " FROM " + _tables[i];
		
		_ds = databaseManager.getDataSetByQuery(_server, _query, [], -1);
		_hash += utils.stringMD5HashBase64(_ds.getAsText("","","",false));
	}
	
	_hash = utils.stringMD5HashBase64(_hash);
	var _end = application.getServerTimeStamp();
	var _ms = _end.valueOf() - _start.valueOf();
	application.output("hash time: " + _ms + "ms");
	
	return _hash;
}

/**
 * @param {JSRecord} [rec]
 * @param {String} [_server]
 * @properties={typeid:24,uuid:"9D373EE4-3CD7-4576-BA4F-8B85EE7AFCD6"}
 */
function svy_sec_saveHash(rec, _server) {
	if (!_server) {
		_server = databaseManager.getDataSourceServerName(rec.foundset.getDataSource());
	}
	/** @type {JSFoundSet<db:/svy_framework/sec_owner>} */
	var _fs = databaseManager.getFoundSet(_server,"sec_owner");
	_fs.loadRecords(databaseManager.convertToDataSet([owner_id]))
	var _owner = _fs.getRecord(1);
	if (globals.svy_sec_needHashCheck()) {
		var _hash = svy_sec_createHash(_server);
		_owner.hash = _hash;
	}
}

/** 
 * @author Joas de Haan
 * @param {String} _ownerName
 * @param {String} _serverName
 * @properties={typeid:24,uuid:"1985C723-26C4-4E81-977C-2246E72F5E2A"}
 * @AllowToRunInFind
 */
function svy_sec_checkHash(_ownerName, _serverName) {
	if (!_serverName) {
		_serverName = "svy_framework";
	}
	/** @type {JSFoundSet<db:/svy_framework/sec_owner>} */
	var _fs = databaseManager.getFoundSet(_serverName,"sec_owner");
	_fs.find();
	_fs.name = _ownerName;
	var _cnt = _fs.search();

	if (_cnt == 1) {
		var _owner = _fs.getRecord(1);
		if (_owner) {
			var _hash = svy_sec_createHash(_serverName);
			if (_owner.hash == _hash) {
				return true;
			}
		}
	}
	return false;
}

/**
 * Method that determines if the security hash should be checked.
 * If this method returns true, the framework will create a hash of the data in the security tables and save that in sec_owner.hash
 * The hash will be checked at login.
 * If the security data is changed from outside of Servoy, the hash is not correct and users can't login anymore.
 * This prevents users from giving themselves more privileges by meddling with the database.
 * 
 * @author Joas de Haan
 * @returns Boolean
 * 
 * @properties={typeid:24,uuid:"25BE23F4-8F56-4CE9-98C8-F99DAEFE5B93"}
 */
function svy_sec_needHashCheck() {
	return false; //Return true in this method to enable security hash check
}

/**
 * @param {JSRecord<db:/svy_framework/sec_user>} _rec_user
 * @param {String} _password 
 * @param {String} _password_control
 * @return {String}
 * @properties={typeid:24,uuid:"E172C36E-E9C7-4540-BF1A-9DC24E907EF6"}
 */
function svy_sec_setUserPassword(_rec_user, _password, _password_control) {
	
	// check if there is an owner
	if (!_rec_user.owner_id) {
		return null // there is no organization
	}

	globals.svy_sec_organization_id = _rec_user.sec_user_to_sec_user_org.organization_id	

	var _rec
	/** @type {JSRecord<db:/svy_framework/sec_owner>} */
	var _rec_own = _rec_user.owner_id;
	
	// new password and retype have to be the same
	if(_password != _password_control)
	{
		return i18n.getI18NMessage('svy.fr.dlg.password_not_equal')
	}	
	
	//password can not contain same begin as username
	var _username = _rec_user.user_name
	if(_rec_own.password_same_letters)
	{
		var pw_sameletters = 3
		
		if (_password.substr(0, pw_sameletters) == _username.substr(0, pw_sameletters))
		{
			return i18n.getI18NMessage('svy.fr.dlg.password_same_begin')  
		}
	}
		
	if(_rec_own.password_num_let)
	{
		// password have to contain letters and numbers
		if ( !(/[0-9]/.test(_password) && /[a-zA-Z]/.test(_password)) ) 
		{
			return i18n.getI18NMessage('svy.fr.dlg.password_contain_letters_numbers')
		}
	}
	
	
	// password have to be longer as owner wants
	if(_rec_own.password_min_lenght && _password.length < _rec_own.password_min_lenght)
	{
		return i18n.getI18NMessage('svy.fr.dlg.password_min_length', [_rec_own.password_min_lenght]) 
	}
	
	// password cannot exceed a certain size
	if (_rec_own.password_max_length && _password.length > _rec_own.password_max_length) {
		return i18n.getI18NMessage('svy.fr.dlg.password_max_length', [_rec_own.password_max_length])
	}
	
	// password has to be unique for a certain amount of previous passwords
	if (_rec_own.password_unique_before_reuse) {
		// no password you already had, x times back
		_rec_user.sec_user_to_sec_user_password.sort('end_date desc');		
		var _end_for = _rec_own.password_unique_before_reuse;
		
		if(_rec_user.sec_user_to_sec_user_password.getSize() < 10) {	
			_end_for = _rec_user.sec_user_to_sec_user_password.getSize();
		}
		
		for (var i = 1; i <= _end_for; i++) {
			_rec = _rec_user.sec_user_to_sec_user_password.getRecord(i);
			if(_rec.password_value == utils.stringMD5HashBase64(_password)) {
				return i18n.getI18NMessage('svy.fr.dlg.password_unique_before_reuse', [_rec_own.password_unique_before_reuse]);
			}			
		}
	}
	
//	// password has to be unique with 10 previous passwords
//	if( _rec_own.password_10times)
//	{
//		// no password you already had, 10 times back
//		_rec_user.sec_user_to_sec_user_password.sort('end_date desc')
//		var _end_for = 10
//		if(_rec_user.sec_user_to_sec_user_password.getSize() < 10)
//		{	
//			_end_for = _rec_user.sec_user_to_sec_user_password.getSize() 
//		}
//		for ( var i = 1 ; i <= _end_for ; i++ )
//		{
//			_rec = _rec_user.sec_user_to_sec_user_password.getRecord(i)
//			if(_rec.password_value == utils.stringMD5HashBase64(_password))
//			{
//				return i18n.getI18NMessage('svy.fr.dlg.password_10_times') 
//			}
//			
//		}
//	}	
	
	globals.svy_sec_currentdate = new Date()

	if(databaseManager.hasRecords(_rec_user,'') && databaseManager.hasRecords(_rec_user.sec_user_to_sec_user_password$current_date))
	{
		for ( i = 1 ; i <= _rec_user.sec_user_to_sec_user_password$current_date.getSize(); i++ )
		{
			_rec_user.sec_user_to_sec_user_password$current_date.end_date = new Date()
		}
	}
	
	_rec_user.sec_user_to_sec_user_password.newRecord()
	_rec_user.sec_user_to_sec_user_password.start_date = new Date()
	var _renew = 900000
	if(_rec_own.password_renew)// if renew is not entered the password will be valid 900000 days
	{
		_renew =_rec_own.password_renew
	}
	_rec_user.sec_user_to_sec_user_password.end_date = globals.svy_sec_datePlusDays(new Date(),_renew);
	_rec_user.sec_user_to_sec_user_password.password_value = utils.stringMD5HashBase64(_password);
	
	if(!databaseManager.saveData(_rec_user.sec_user_to_sec_user_password.getSelectedRecord()))
	{
		databaseManager.rollbackTransaction();
		
		databaseManager.startTransaction();
		
		/** JSFoundset<db:/svy_framework/sec_user_password>*/
	    var fsUserPwd = databaseManager.getFoundSet('svy_framework','sec_user_password');
	    var recNew = fsUserPwd.getRecord(fsUserPwd.newRecord());
	    if(recNew)
	    {
	    	recNew.user_id = _rec_user.user_id;
	    	recNew.start_date = new Date();
	    	recNew.end_date = globals.svy_sec_datePlusDays(new Date(),_renew);
	    	recNew.password_value = utils.stringMD5HashBase64(_password);
	    	
	    	var sqlUserPwd = 'SELECT MAX(user_password_id) FROM sec_user_password';
	    	var dsUserPwd = databaseManager.getDataSetByQuery('svy_framework',sqlUserPwd,null,1);
	    	
	    	recNew.user_password_id = dsUserPwd.getValue(1,1) + 1;
	    }
	    
	    if(!databaseManager.commitTransaction())
	    {
	    	databaseManager.rollbackTransaction();
	    	return "Errore durante il salvataggio della password";
	    }
		   
	}
			
	return null;
}

/**
 * Record after-insert trigger.
 *
 * @param {JSRecord} record record that is inserted
 *
 * @properties={typeid:24,uuid:"C448E650-EA11-4268-A856-926F8BE785A7"}
 */
function afterRecordInsert_sec_element(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-update trigger.
 *
 * @param {JSRecord} record record that is updated
 *
 * @properties={typeid:24,uuid:"EADB1CEA-BE39-46A4-A17C-C7C151BD9AE7"}
 */
function afterRecordUpdate_sec_element(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-delete trigger.
 *
 * @param {JSRecord} record record that is deleted
 *
 * @properties={typeid:24,uuid:"35E06137-7BD7-493F-8DFE-111B946080B5"}
 */
function afterRecordDelete_sec_element(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-insert trigger.
 *
 * @param {JSRecord} record record that is inserted
 *
 * @properties={typeid:24,uuid:"1EC57B5F-7F1C-40CF-8697-6950C6E59B94"}
 */
function afterRecordInsert_sec_group(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-update trigger.
 *
 * @param {JSRecord} record record that is updated
 *
 * @properties={typeid:24,uuid:"0DC8E2F3-538D-4EC8-992C-C275CC1BEA4E"}
 */
function afterRecordUpdate_sec_group(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-delete trigger.
 *
 * @param {JSRecord} record record that is deleted
 *
 * @properties={typeid:24,uuid:"FB9011DE-BD5E-4143-84E8-0459097EBE0F"}
 */
function afterRecordDelete_sec_group(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-insert trigger.
 *
 * @param {JSRecord} record record that is inserted
 *
 * @properties={typeid:24,uuid:"BF875356-8BC4-42DD-867C-5EF424661046"}
 */
function afterRecordInsert_sec_module(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-update trigger.
 *
 * @param {JSRecord} record record that is updated
 *
 * @properties={typeid:24,uuid:"7A58A8D9-2381-4E18-9EC0-322545200CF0"}
 */
function afterRecordUpdate_sec_module(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-delete trigger.
 *
 * @param {JSRecord} record record that is deleted
 *
 * @properties={typeid:24,uuid:"E611B262-11D7-48D5-9567-B5A1B059555D"}
 */
function afterRecordDelete_sec_module(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-insert trigger.
 *
 * @param {JSRecord} record record that is inserted
 *
 * @properties={typeid:24,uuid:"A08EB8D2-D973-422B-868B-70364E340FB6"}
 */
function afterRecordInsert_sec_owner_in_module(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-update trigger.
 *
 * @param {JSRecord} record record that is updated
 *
 * @properties={typeid:24,uuid:"15D82675-F787-476D-A101-6807FCB098A2"}
 */
function afterRecordUpdate_sec_owner_in_module(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-delete trigger.
 *
 * @param {JSRecord} record record that is deleted
 *
 * @properties={typeid:24,uuid:"73C72595-D3E4-4DBA-9DFA-389A542BD05E"}
 */
function afterRecordDelete_sec_owner_in_module(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-insert trigger.
 *
 * @param {JSRecord} record record that is inserted
 *
 * @properties={typeid:24,uuid:"102E4F2C-4472-4F8F-BC7D-FA1C63C39D8F"}
 */
function afterRecordInsert_sec_owner(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-update trigger.
 *
 * @param {JSRecord} record record that is updated
 *
 * @properties={typeid:24,uuid:"8BD2280C-46BB-4FBF-A96E-368B9A1A52ED"}
 */
function afterRecordUpdate_sec_owner(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-delete trigger.
 *
 * @param {JSRecord} record record that is deleted
 *
 * @properties={typeid:24,uuid:"511206B9-A373-4500-AA25-F9F530E933FB"}
 */
function afterRecordDelete_sec_owner(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-insert trigger.
 *
 * @param {JSRecord} record record that is inserted
 *
 * @properties={typeid:24,uuid:"D69AF406-7754-4960-B098-33F78A8245A6"}
 */
function afterRecordInsert_sec_security_key(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-update trigger.
 *
 * @param {JSRecord} record record that is updated
 *
 * @properties={typeid:24,uuid:"988A9854-6468-4703-8D3A-104702C4C3E6"}
 */
function afterRecordUpdate_sec_security_key(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-delete trigger.
 *
 * @param {JSRecord} record record that is deleted
 *
 * @properties={typeid:24,uuid:"D71F42EC-86AA-485F-ABDA-A7509BF94993"}
 */
function afterRecordDelete_sec_security_key(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-insert trigger.
 *
 * @param {JSRecord} record record that is inserted
 *
 * @properties={typeid:24,uuid:"B3C7586B-316B-4FB9-95DD-0F9F8BBB6D27"}
 */
function afterRecordInsert_sec_table_filter(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-update trigger.
 *
 * @param {JSRecord} record record that is updated
 *
 * @properties={typeid:24,uuid:"04F56CB5-2EE6-4E22-92CA-DCCD3F615DF3"}
 */
function afterRecordUpdate_sec_table_filter(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-delete trigger.
 *
 * @param {JSRecord} record record that is deleted
 *
 * @properties={typeid:24,uuid:"318A37C5-F1A9-4DEA-A636-23AB9306D479"}
 */
function afterRecordDelete_sec_table_filter(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-insert trigger.
 *
 * @param {JSRecord} record record that is inserted
 *
 * @properties={typeid:24,uuid:"B3477335-A809-49F2-97CE-F9FB23BAD22F"}
 */
function afterRecordInsert_sec_table(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-update trigger.
 *
 * @param {JSRecord} record record that is updated
 *
 * @private
 *
 * @properties={typeid:24,uuid:"58650DEC-7D83-49D8-BED5-8F8015089DCB"}
 */
function afterRecordUpdate_sec_table(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-delete trigger.
 *
 * @param {JSRecord} record record that is deleted
 *
 * @properties={typeid:24,uuid:"94C4CD0C-1478-46EB-9E50-3FFA26A08CA4"}
 */
function afterRecordDelete_sec_table(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-insert trigger.
 *
 * @param {JSRecord} record record that is inserted
 *
 * @properties={typeid:24,uuid:"ED215E14-7E1F-469B-A725-B0768BC8F91D"}
 */
function afterRecordInsert_sec_user_in_group(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-update trigger.
 *
 * @param {JSRecord} record record that is updated
 *
 * @properties={typeid:24,uuid:"CAEB9FFD-1F7E-4F12-B6CA-0F6106E97A91"}
 */
function afterRecordUpdate_sec_user_in_group(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-delete trigger.
 *
 * @param {JSRecord} record record that is deleted
 *
 * @properties={typeid:24,uuid:"A9655E95-BE8D-4862-A707-7DD9D0CB09A8"}
 */
function afterRecordDelete_sec_user_in_group(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-insert trigger.
 *
 * @param {JSRecord} record record that is inserted
 *
 * @properties={typeid:24,uuid:"A8C3079A-00AC-47F1-9BE0-434974690677"}
 */
function afterRecordInsert_sec_user_password(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-update trigger.
 *
 * @param {JSRecord} record record that is updated
 *
 * @properties={typeid:24,uuid:"7CB04796-609C-4AB0-AF12-A35CA8C70377"}
 */
function afterRecordUpdate_sec_user_password(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-delete trigger.
 *
 * @param {JSRecord} record record that is deleted
 *
 * @properties={typeid:24,uuid:"507F81C4-1641-4C76-8B94-F81DCB5C67EB"}
 */
function afterRecordDelete_sec_user_password(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-insert trigger.
 *
 * @param {JSRecord} record record that is inserted
 *
 * @properties={typeid:24,uuid:"D9BA0953-7CD1-41C3-9339-3B47CABAC332"}
 */
function afterRecordInsert_sec_user_right(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-update trigger.
 *
 * @param {JSRecord} record record that is updated
 *
 * @properties={typeid:24,uuid:"3FB27954-A3B8-42AF-9834-22EA809A2DEB"}
 */
function afterRecordUpdate_sec_user_right(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-delete trigger.
 *
 * @param {JSRecord} record record that is deleted
 *
 * @properties={typeid:24,uuid:"F8A71634-86CA-4FAD-BF79-3D97A3E5CBD8"}
 */
function afterRecordDelete_sec_user_right(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-insert trigger.
 *
 * @param {JSRecord} record record that is inserted
 *
 * @properties={typeid:24,uuid:"1C01C7C5-3CA3-499B-B7AA-E91FA6BE7C2B"}
 */
function afterRecordInsert_sec_user_table_properties(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-update trigger.
 *
 * @param {JSRecord} record record that is updated
 *
 * @properties={typeid:24,uuid:"BA031CA3-C15F-4EA6-8A4E-69D87B772D4E"}
 */
function afterRecordUpdate_sec_user_table_properties(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-delete trigger.
 *
 * @param {JSRecord} record record that is deleted
 *
 * @properties={typeid:24,uuid:"1EE89685-08EA-4A0D-A85F-95CB5E2CC252"}
 */
function afterRecordDelete_sec_user_table_properties(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-insert trigger.
 *
 * @param {JSRecord} record record that is inserted
 *
 * @properties={typeid:24,uuid:"205578C4-45E7-43C0-9C48-95C36E9580A6"}
 */
function afterRecordInsert_sec_user(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-update trigger.
 *
 * @param {JSRecord} record record that is updated
 *
 * @properties={typeid:24,uuid:"47AEF0E9-2D73-42F2-A43B-FA44D716F060"}
 */
function afterRecordUpdate_sec_user(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * Record after-delete trigger.
 *
 * @param {JSRecord} record record that is deleted
 *
 * @properties={typeid:24,uuid:"05555344-71D2-45D0-A68F-936456896998"}
 */
function afterRecordDelete_sec_user(record) {
	globals.svy_sec_saveHash(record)
}

/**
 * This method will build a selection dialog for the specified foundset
 * 
 * @author Vincent Schuurhof
 * @since 2011-07-09
 * 
 * @param {String} dataSource the data source on which the selection dialog will be based
 * @param {JSDataSet} displayDataSet the data set with primary keys which will be used to display a foundset
 * @param {Array} returnDataProviders the data providers which will be returned after selection
 * @param {Array<Object>} displayDataProviders the data providers which should be displayed in the dialog
 * @param {Array<String>} displayDataProviderTitles the title of each displayed data provider
 * @param {Array<Number>} displayDataProvidersWidth the width of the each displayed data provider
 * @param {Number} dialogHeight the height of the selection dialog
 * @param {Boolean} multiSelect flag if multiple records can be selected
 * 
 * @properties={typeid:24,uuid:"42AA7130-B12F-48C4-ABF4-C128B12FBAFA"}
 * @SuppressWarnings(unused)
 */
function svy_sec_showSelectionDialog(dataSource, displayDataSet, returnDataProviders, displayDataProviders, displayDataProviderTitles, displayDataProvidersWidth, dialogHeight, multiSelect) {
	if (displayDataSet.getMaxRowIndex() == 0) {
		globals.svy_mod_dialogs_global_showInfoDialog(null, i18n.getI18NMessage('svy.fr.dlg.no_records_to_select'), i18n.getI18NMessage('svy.fr.lbl.ok'));
		return null;
	}
	
	var serverName = databaseManager.getDataSourceServerName(dataSource);
	var tableName = databaseManager.getDataSourceTableName(dataSource);
	var formName = 'svy_sec_selection_dialog_' + tableName;
	
	if (history.removeForm(formName)) {
		solutionModel.removeForm(formName);
	}
	
	var form = solutionModel.cloneForm(formName, solutionModel.getForm('svy_sec_selection_dialog'));
	form.dataSource = dataSource;
	form.styleName = 'leaf_style';
	
	var x = 0;
	
	// if multi-select then add a selection checkbox
	if (multiSelect) {
		solutionModel.getDataSourceNode(dataSource).removeCalculation('is_selected');
		var calculation = solutionModel.getDataSourceNode(dataSource).newCalculation('function is_selected() { return; }', JSVariable.INTEGER);
		
		var selectionField = form.newField('is_selected', JSField.CHECKS, x, 22, 20, 20);
		selectionField.name = 'is_selected';
		selectionField.transparent = false;
		selectionField.anchors = SM_ANCHOR.NORTH | SM_ANCHOR.SOUTH;
		selectionField.styleClass = 'table';
		
		var selectionHeader = form.newLabel('', x, 0, 20, 20);
		selectionHeader.labelFor = 'is_selected';
		selectionHeader.styleClass = 'table_header';
		selectionHeader.transparent = false;
		x += 20;
	}
	
	// add data providers to the form
	for (var i = 0; i < displayDataProviders.length; i++) {
		var field = form.newField(displayDataProviders[i], JSField.TEXT_FIELD, x, 20 , displayDataProvidersWidth[i], 20);
		field.name = displayDataProviders[i];
		field.editable = false;
		field.styleClass = 'table';
		field.anchors = SM_ANCHOR.NORTH | SM_ANCHOR.EAST | SM_ANCHOR.WEST;
		
		var header = form.newLabel(displayDataProviderTitles[i], x, 0, displayDataProvidersWidth[i], 20);
		header.labelFor = displayDataProviders[i];
		header.styleClass = 'table_header';
		header.horizontalAlignment = SM_ALIGNMENT.LEFT;
		header.transparent = false;
		header.anchors = SM_ANCHOR.NORTH | SM_ANCHOR.EAST | SM_ANCHOR.WEST;
		
		x += displayDataProvidersWidth[i];
	}
	
	forms[formName].controller.recreateUI();
	forms[formName].foundset.loadRecords(displayDataSet);
	
	if (multiSelect) {
		for (var j = 1; j <= forms[formName].foundset.getSize(); j++) {
			forms[formName].foundset.setSelectedIndex(j);
			forms[formName].foundset['is_selected'] = 0;
		}
	}
	
	if (application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT) {
		/** @type {Continuation} */
		forms[formName]['continuation'] = new Continuation();
	}
	
	globals.svy_mod_showFormInDialog(forms[formName], null, null, x, dialogHeight, i18n.getI18NMessage('svy.fr.lbl.selection'), true, false, formName, true);
	
	if (application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT) {
		new Continuation();
	} else {
		return forms[formName].buttonClicked;
	}
	
	return null;
}