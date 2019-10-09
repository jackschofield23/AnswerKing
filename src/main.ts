import { Aurelia } from 'aurelia-framework';
import { DialogConfiguration } from 'aurelia-dialog';
import { HttpClient } from 'aurelia-fetch-client';
import { PLATFORM } from 'aurelia-pal';

import environment from './environment';

import './scss/styles.scss';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('aurelia-validation'))
    .plugin(
      PLATFORM.moduleName('aurelia-dialog'),
      (config: DialogConfiguration) => {
        config.useDefaults();
        config.useCSS('');

        config.settings.centerHorizontalOnly = true;
      }
    )
    .feature(PLATFORM.moduleName('resources/index'));

  const http = new HttpClient().configure(config => {
    config.withBaseUrl('http://localhost:5000/api/');
  });

  aurelia.container.registerInstance(HttpClient, http);

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
