/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"B9432D4C-227F-4431-BA3F-A907A6983BEF"}
 */
function onRecordSelection(event) {
	if (foundset.sec_user_to_sec_user_login_attempt.getSize() > 5) {
		elements.btn_cleanLoginAttempts.enabled = true;
	} else {
		elements.btn_cleanLoginAttempts.enabled = false;
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"1CD1856A-B9CB-4CD6-8A81-7D735C303AA2"}
 */
function cleanLoginAttempts(event) {
	var _fsLoginAttempts = foundset.sec_user_to_sec_user_login_attempt.duplicateFoundSet();
	_fsLoginAttempts.unrelate();
	_fsLoginAttempts.sort('attempt_datetime asc')
	
	while (_fsLoginAttempts.getSize() > 5) {
		_fsLoginAttempts.deleteRecord();
	}
	
	elements.btn_cleanLoginAttempts.enabled = false;
}
