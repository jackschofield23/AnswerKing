module.exports = {
  moduleNameMapper: {
    '^aurelia-binding$': '<rootDir>/node_modules/aurelia-binding',
  },
  modulePaths: ['<rootDir>/src', '<rootDir>/node_modules'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.(css|less|sass|scss|styl|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'jest-transform-stub',
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: 'unit.*\\.spec\\.ts$',
  setupFiles: ['<rootDir>/test/unit/jest-pretest.ts'],
  testEnvironment: 'node',
  snapshotSerializers: ['<rootDir>/test/unit/dom-element.ts'],
};
