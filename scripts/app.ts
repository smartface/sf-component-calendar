/* globals lang */
import '@smartface/native';
import Application from '@smartface/native/application';
import System from '@smartface/native/device/system';
import 'i18n/i18n'; // Generates global lang object
import { errorStackBySourceMap } from '@smartface/source-map';

// Set uncaught exception handler, all exceptions that are not caught will
// trigger onUnhandledError callback.
Application.on('unhandledError', (e: UnhandledError) => {
  const error = errorStackBySourceMap(e);
  const message = {
    message: System.OS === System.OSType.ANDROID ? error.message : e.message,
    stack: error.stack
  };
  if (message.stack) {
    console.error('Unhandled Error: ', message);
    alert(JSON.stringify(message, null, 2), e.type || lang.applicationError);
  }
});

import 'start';
