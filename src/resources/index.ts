import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./elements/nav/main-nav'),
    PLATFORM.moduleName('./elements/product-card/product-card'),

    PLATFORM.moduleName('./value-converters/date-time-format'),
  ]);
}
