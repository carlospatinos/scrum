import { ACTIONS_FETCH, ACTIONS_SUCCESS, ACTIONS_FAILURE, LIBRARY_ROOT } from './constants';
/**
 * Generates an action type by concatenating the library, feature name and key.
 *
 * @param {String} library
 * @param {String} featureName
 * @param {String} key
 */
const generateActionType = (library, featureName, key) => `${library}/${featureName}/${key}`;

/**
 * Generates a partial implementation of `generateActionType` fixing library and featureName.
 *
 * @param {String} library
 * @param {String} featureName
 */
const generateFeatureActionType = (library, featureName) => key =>
  generateActionType(library, featureName, key);

/**
 * Generates the three default action types, baseAction,  successAction and failureAction of a given feature.
 *
 * @param {*} { library = LIBRARY_ROOT, featureName, restVerb = ACTIONS_FETCH }
 * @returns
 */
const generateActionTypes = ({ library = LIBRARY_ROOT, featureName, restVerb = ACTIONS_FETCH }) => {
  const baseActionKey = `${restVerb}_${featureName.toUpperCase()}`;
  const featureActionType = generateFeatureActionType(library, featureName);
  const baseAction = featureActionType(baseActionKey);
  const successAction = featureActionType(`${baseActionKey}_${ACTIONS_SUCCESS}`);
  const failureAction = featureActionType(`${baseActionKey}_${ACTIONS_FAILURE}`);
  return { baseAction, successAction, failureAction };
};
/**
 * Generates a context action, it handles the three action types of a given feature action.
 * - dispatchFxn( type: action.baseAction): Before invoking the `apiFxn`/
 * - dispatchFxn( type: action.successAction): When the response of  `apiFxn` is received.
 * - dispatchFxn( type: action.baseAction):  When an error  of `apiFxn` is received.
 *
 * @param {Function} dispatchFxn - The dispatcher function.
 * @param {Function} apiFxn - The API function to invoke.
 * @param {Object} action - The baseAction, successAction and failureAction of a given feature.
 */
const generateAction = (dispatchFxn, apiFxn, action) => async req => {
  const initialAction = {
    type: action.baseAction,
    payload: {},
  };
  dispatchFxn(initialAction);

  try {
    const response = await apiFxn(req);
    console.log('response.data', response.data);
    dispatchFxn({
      type: action.successAction,
      payload: response.data,
    });
    return response;
  } catch (e) {
    dispatchFxn({
      type: action.failureAction,
      error: e.message,
    });
    return undefined;
  }
};

/**
 * Context utility , it generates actions types and actions.
 */
const ContextUtil = { generateActionType, generateActionTypes, generateAction };
export default ContextUtil;
