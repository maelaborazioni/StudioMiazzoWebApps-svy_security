/**
 *	closes the form in dialog
 *
 * @author Sanneke Aleman
 * @since 2000-05-04
 * @param {JSEvent} _event
 * 
 * @properties={typeid:24,uuid:"68c64a3e-382b-476e-9157-18f85d1df4d1"}
 */
function closeForm(_event)
{
	globals.svy_mod_closeForm(_event)
}

/**
 *	Creates a new element records, with a servoy element UUID and a formname
 *
 * @author Sanneke Aleman
 * @since 2008-05-04
 * @param {JSEvent} _event
 * 
 * @properties={typeid:24,uuid:"6f86274f-53d6-4428-807c-9a847ea442e3"}
 */
function createElementItem(_event)
{
	if (globals.svy_sec_form_id != null) 
	{	
		forms.svy_sec_main_key_element_tbl.controller.newRecord() 
		forms.svy_sec_main_key_element_tbl.servoy_element_id = globals.svy_sec_elt_id
		forms.svy_sec_main_key_element_tbl.servoy_form_id = globals.svy_sec_form_id
		forms.svy_sec_main_key_element_tbl.element_name = application.getValueListDisplayValue('svy_sec_elements', globals.svy_sec_elt_id)
		forms.svy_sec_main_key_element_tbl.form_name = application.getValueListDisplayValue('svy_sec_forms', globals.svy_sec_form_id)
	
	} 
	else 
	{
		plugins.dialogs.showErrorDialog("i18n:svy.fr.dlg.no_form_selected",  "i18n:svy.fr.dlg.no_form_selected", 'i18n:svy.fr.lbl.ok')
	}
	databaseManager.saveData()
	
	globals.svy_mod_closeForm(_event)
}

/**
 *	Initalizes the element valuelist, needs the form (globals.svy_sec_form_id) to be filled in.
 *
 * @author Sanneke Aleman
 * @since 2008-05-04
 * 
 * @properties={typeid:24,uuid:"d7e54265-c1e7-4761-945f-82619d3b8a7c"}
 */
function initElementVL()
{
	var _elements = security.getElementUUIDs(globals.svy_sec_form_id);
	 _elements.sort(1,true);
	 application.setValueListItems('svy_sec_elements',_elements.getColumnAsArray(1),_elements.getColumnAsArray(2));
	 globals.svy_sec_elt_id = null;
}

/**
 *	Initalizes the form valuelist and sorts it.
 *
 * @SuppressWarnings(deprecated)
 * @author Sanneke Aleman
 * @since 2008-05-04
 * 
 * @properties={typeid:24,uuid:"a7398cb6-14a3-434a-87b8-03f693829ab1"}
 */
function initFormVL()
{
	
	var _form = forms.allnames.sort()
	
	application.setValueListItems('svy_sec_forms',  _form,  _form);
	globals.svy_sec_form_id = null;
	globals.svy_sec_elt_id = null;


}
