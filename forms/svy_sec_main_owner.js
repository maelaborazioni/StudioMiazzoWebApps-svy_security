/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"B15650AA-CCE6-4B9A-8409-549E4EE99BF8"}
 */
function onRecordSelection(event) {
	forms.svy_sec_main_owner_key_applied_tbl.loadRecords();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 * @param {String} tab the selected tab
 * 
 * @private
 *
 * @properties={typeid:24,uuid:"A7A84194-6AD9-48D0-8B06-A5FAA88138CB"}
 */
function switchTab(event, tab) {
	var tabs = ['organizations', 'modules'];
	
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
	
	elements.tab_organizations_modules.tabIndex = 'tab_' + tab;
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"03376405-243C-4E9C-848B-60D507462CE2"}
 * @AllowToRunInFind
 */
function onShow(firstShow, event) {
	if (firstShow) {
		switchTab(null, 'organizations');
	}
	
	doSearch();
}

/**
 * @properties={typeid:24,uuid:"9D251427-5AE4-4385-ACCC-16770BF2F912"}
 * @AllowToRunInFind
 */
function doSearch() {
	if (forms.svy_sec_main.searchArgument) {
		foundset.find();
		foundset.name = '#%' + forms.svy_sec_main.searchArgument + '%';
		if (!foundset.search()) {
			forms.svy_sec_main_owner_key_applied_tbl.loadRecords();
		}
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
 * @properties={typeid:24,uuid:"4A4553D5-6265-4E09-B00D-F236802237F5"}
 */
function addOwner(event) {
	forms.svy_sec_main_owner_tbl.addRecord(event);
}
