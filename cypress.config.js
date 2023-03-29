const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: null,
    video: false,
    supportFile: false,
    specPattern: '**/perftest/atest/**/*.js',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
