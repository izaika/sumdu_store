import * as actionTypes from './types';

export const startProcess = process => ({ type: actionTypes.START_PROCESS, process });
export const stopProcess = process => ({ type: actionTypes.STOP_PROCESS, process });
