/*******************************************************************************
 * Copyright IBM Corp. 2018
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *******************************************************************************/
// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
      basePath: '..',
      files: [
      ],
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
          require('karma-jasmine'),
          require('karma-chrome-launcher'),
          require('karma-phantomjs-launcher'),
          require('@angular-devkit/build-angular/plugins/karma'),
          require('karma-coverage-istanbul-reporter')
      ],
      client:{
        clearContext: false // leave Jasmine Spec Runner output visible in browser
      },
      coverageIstanbulReporter: {
          reports: [ 'html', 'lcovonly', 'text-summary'],
          fixWebpackSourcePaths: true
      },
      webpack: { node: { fs: 'empty', } },
      angularCli: {
        environment: 'dev'
      },
      reporters: ['progress'],
      port: 9876,
      colors: true,
      autoWatch: true,
      browsers: ['Chrome', 'PhantomJS'],
      browserNoActivityTimeout: 60000,
      browserDisconnectTimeout: 30000,
      captureTimeout: 60000
  });
};
