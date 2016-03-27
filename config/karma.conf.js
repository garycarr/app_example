module.exports = function(config) {
  config.set(
    {
      basePath: '../',
      frameworks: ['mocha', 'jquery-1.11.0', 'sinon', 'chai', 'sinon-chai', 'phantomjs-shim'],
      browsers: ['PhantomJS'],
      reporters: ['spec', 'coverage', 'junit'],
      colors: true,

      logLevel: config.LOG_WARN,

      files: [
        './src/**/tests/**/*.spec.js'
      ],

      preprocessors: {
        './src/**/tests/**/*.spec.js': ['webpack', 'sourcemap']
      },
      
      coverageReporter: {
        dir: 'reports/coverage',
        reporters: [
          {type: 'html', subdir: 'html'},
          {type: 'text', subdir: '.', file: 'coverage.txt'},
          {type: 'cobertura', subdir: '.', file: 'coverage.xml'}
        ]
      },

      junitReporter: {
        outputDir: 'reports/test',
        outputFile: 'test-results.xml',
        suite: '',
        useBrowserName: false
      },

      webpack: require('./karma.webpack.config.js'),

      webpackMiddleware : {
        noInfo : true
      },

      plugins: [
        'karma-chai',
        'karma-coverage',
        'karma-jquery',
        'karma-junit-reporter',
        'karma-mocha',
        'karma-mocha-reporter',
        'karma-notify-reporter',
        'karma-nyan-reporter',
        'karma-phantomjs-launcher',
        'karma-phantomjs-shim',
        'karma-sinon',
        'karma-sinon-chai',
        'karma-sourcemap-loader',
        'karma-spec-reporter',
        'karma-webpack'
      ],

      port: 9876,
      reportSlowerThan: 500,
      captureTimeout: 20000,
      singleRun: true,
      autoWatch: true,

      // the following configuration increases the timeouts as Jenkins can
      // fail the build waiting for PhantomJS to start.
      //
      // https://github.com/karma-runner/karma/issues/598

      browserDisconnectTimeout : 10000, // default 2000
      browserDisconnectTolerance : 1,   // default 0
      browserNoActivityTimeout : 60000, // default 10000

    });
};
