/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"2A25261C-8182-44ED-BCC7-2C8C1C47D495",variableType:4}
 */
var administratorLevel = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 * @param {String} tab the selected tab
 *
 * @private
 *
 * @properties={typeid:24,uuid:"065F0421-41EC-4AC5-8F26-D5851E3F217B"}
 */
function switchTab(event, tab) {
	var tabs = ['rights', 'owners_modules','users_groups','keys_groups','keys_cathegories'];
	
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
 * @properties={typeid:24,uuid:"9887996A-6597-435C-AF1C-21EC62AD922A"}
 * @AllowToRunInFind
 */
function onShow(firstShow, event) 
{
	if (firstShow) {
		switchTab(null, 'rights');
	}
	
	doSearch();
}

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"F8551C6B-82A0-468D-A0F1-116F73E08201"}
 */
function onRecordSelection(event) {
	forms.svy_sec_main_key_owner_applied_tbl.loadRecords();
}

/**
 * @properties={typeid:24,uuid:"02CA5246-7151-498C-813F-6DD2861FB36F"}
 * @AllowToRunInFind
 */
function doSearch() 
{
	foundset.find();
	foundset.is_client = 0;
	
	if (forms.svy_sec_main.searchArgument) 
	{
		foundset.name = '#%' + forms.svy_sec_main.searchArgument + '%';
	}
		
	if (!foundset.search()) 
	{
		forms.svy_sec_main_key_owner_applied_tbl.loadRecords();
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"4EAFD226-C7B3-4145-9F98-417AEF82A410"}
 */
function addRecord(event) {
	forms.svy_sec_main_key_tbl.addRecord(event);
}

/**
 * Handle focus gained event of the element.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"6BB582BC-D187-4995-9343-B2E4931F4910"}
 */
function onFocusGained(event) 
{
	elements.tab_keys.enabled = false;
}

/**
 * Handle focus lost event of the element.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"EF434C3C-D0D5-4578-82C7-40202D772CC6"}
 */
function onFocusLost(event) 
{
	elements.tab_keys_groups.enabled = true;
}
/**
 * Handle changed data, return false if the value should not be accepted. In NGClient you can return also a (i18n) string, instead of false, which will be shown as a tooltip.
 *
 * @param {String} oldValue old value
 * @param {String} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"01896597-ECB1-4DD8-826B-81E98E7BA8E2"}
 */
function onDataChange(oldValue, newValue, event) 
{
	elements.tab_keys.enabled = true;
	return true
}
