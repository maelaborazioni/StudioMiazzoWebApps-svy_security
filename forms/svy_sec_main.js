/**
 * @properties={typeid:35,uuid:"BB5A489F-5576-43CF-BF26-940DEE3FA026",variableType:-4}
 */
var autoSave = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"EC4A4968-D530-4B9E-A742-83C44D1566EB",variableType:12}
 */
var searchArgument = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 * @param {String} tab the selected tab
 *
 * @private
 *
 * @properties={typeid:24,uuid:"97833D08-378C-43AC-B5CD-86CCBCE46DBB"}
 */
function switchTab(event, tab) {
	var tabs = ['owners', 'modules', 'users', 'groups', 'keys'];
	
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
	
	elements.tab_main.tabIndex = 'tab_' + tab;
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 * 
 * @properties={typeid:24,uuid:"BF55BA6E-40B2-4287-8BC7-4E0A03A7E506"}
 */
function onShow(firstShow, event) {
	autoSave = databaseManager.getAutoSave();
	databaseManager.setAutoSave(true);
	
	switchTab(null, 'owners');
	
	controller.focusFirstField();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"F410001D-F46F-4820-B3FE-3B4B254E4612"}
 */
function doSearch(event) {
	
	/** @type {Number} */
	var _tabIndex = elements.tab_main.tabIndex;
	forms[elements.tab_main.getTabFormNameAt(_tabIndex)].doSearch();
	
	controller.focusField('searchArgument', false);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"38BE4DF6-BFD1-4BF2-B96B-EB1B3C639C2C"}
 */
function clearSearch(event) {
	searchArgument = null;
	doSearch(null);
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"6287C9A6-F119-419A-AB5D-5EF796035534"}
 */
function onHide(event) {
	databaseManager.setAutoSave(autoSave);
	
	return true;
}
