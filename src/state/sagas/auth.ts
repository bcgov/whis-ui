import {all, delay, put, select, takeLatest} from 'redux-saga/effects'
import Keycloak from "keycloak-js";
import {
  AUTH_INITIALIZE_COMPLETE,
  AUTH_INITIALIZE_REQUEST,
  AUTH_REFRESH_TOKEN,
  AUTH_REQUEST_COMPLETE,
  AUTH_REQUEST_ERROR,
  AUTH_SIGNIN_REQUEST,
  AUTH_UPDATE_TOKEN_STATE
} from "../actions";
import {TracksConfig} from "../config";
import {getConfiguration} from "../utilities/config_helper";


const MIN_TOKEN_FRESHNESS = 2 * 60; //want our token to be good for atleast this long at all times
const GRACE_PERIOD = 10; // get a new one with this much time to spare

let keycloakInstance = null;

function* keepTokenFresh() {

  yield keycloakInstance.updateToken(MIN_TOKEN_FRESHNESS);
  yield put({type: AUTH_UPDATE_TOKEN_STATE});

  const expiresIn = keycloakInstance.tokenParsed['exp']
    - Math.ceil(new Date().getTime() / 1000)
    + keycloakInstance.timeSkew;

  // wait until the time is right
  yield delay((expiresIn - GRACE_PERIOD) * 1000);
  yield put({type: AUTH_REFRESH_TOKEN});
}

function* initializeAuthentication() {
  const config: TracksConfig = yield select(getConfiguration);

  keycloakInstance = Keycloak(
    {
      clientId: config.KEYCLOAK_CLIENT_ID,
      realm: config.KEYCLOAK_REALM,
      url: config.KEYCLOAK_URL,
    });

  const authStatus = yield keycloakInstance.init(
    {
      checkLoginIframe: false,
      onLoad: 'check-sso',
    }
  );

  console.log(keycloakInstance);

  yield put({
    type: AUTH_INITIALIZE_COMPLETE,
    payload: {
      authenticated: authStatus
    }
  });

  if (authStatus) {
    // schedule our refresh
    yield put({type: AUTH_REFRESH_TOKEN});
  }
}

function* handleSigninRequest(action) {
  try {
    const newVar = yield keycloakInstance.login();
    yield put({type: AUTH_REQUEST_COMPLETE, payload: {}});
    yield put({type: AUTH_REFRESH_TOKEN});
  } catch (e) {
    yield put({type: AUTH_REQUEST_ERROR});
  }
}

function* authenticationSaga() {
  yield all([
    takeLatest(AUTH_INITIALIZE_REQUEST, initializeAuthentication),
    takeLatest(AUTH_SIGNIN_REQUEST, handleSigninRequest),
    takeLatest(AUTH_REFRESH_TOKEN, keepTokenFresh)
  ]);
}

export default authenticationSaga;
export {keycloakInstance};
