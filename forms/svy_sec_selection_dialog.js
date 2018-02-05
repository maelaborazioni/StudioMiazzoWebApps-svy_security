/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"D6DD46AB-CCF1-4015-87B1-7D60C95607F1",variableType:12}
 */
var buttonClicked = null;

/**
 * @type Continuation
 *
 * @properties={typeid:35,uuid:"31C44183-FCAE-44FF-A95C-95BA470D53D3",variableType:-4}
 */
var continuation = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"9B08625B-39FF-4F8F-846B-40F50BB2BCF4",variableType:12}
 */
var previousSearchArgument = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"86E2FE2E-F857-4D82-B4E3-6467E1FF93DA",variableType:12}
 */
var searchArgument = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"F3CFB4F3-4692-4746-AC95-37F79BF02CCD",variableType:4}
 */
var selectedAll = null;

/**
 * @properties={typeid:35,uuid:"9F8FCBF2-5B29-4596-9D3A-09E57507415C",variableType:-4}
 */
var selectedFoundset = null;

/**
 * @properties={typeid:35,uuid:"A5C83C5C-5EB6-454B-A0DB-9D898BF0FBEB",variableType:-4}
 */
var selectedRecord = null;

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"2674550A-3EB1-4F2F-A071-B0B72B4D934E"}
 * @AllowToRunInFind
 */
function onShow(firstShow, event) {
	buttonClicked = null;
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"02FCF9B5-0149-49DC-947C-D956F9F1D805"}
 */
function onHide(event) {
	if (!buttonClicked && application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT) {
		continuation('cancel');
	}
	
	return true
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"5C53D39C-D9CC-49FF-B59C-7D2CE4509A49"}
 */
function onCancel(event) {
	buttonClicked = 'cancel';
	globals.svy_mod_closeForm(event);
	
	if (application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT) {
	continuation(buttonClicked);
}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"B0054B5A-D704-46B7-AD5E-6780899C2734"}
 */
function onSelect(event) {
	buttonClicked = 'select';
	globals.svy_mod_closeForm(event);
	
	if (application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT) {
		continuation(buttonClicked);
	}
}
