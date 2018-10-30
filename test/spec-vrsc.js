const Application = require('spectron').Application
const assert = require('assert')
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path')
const chai = require('chai')
const timeout = 7500;
describe('Application launch testing native VRSC coin', function () {
  this.timeout(timeout)
  before(function () {
    this.gotDomReadyCount = 0
    this.app = new Application({
      path: electronPath,
      // The following line tells spectron to look and use the main.js file
      // and the package.json located 1 level above.
      args: [path.join(__dirname, '..')],
      startTimeout: timeout,
      waitTimeout: timeout
    })
    return this.app.start()
  })

  after(function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop()
    }
  })

  it('opens a window', function (done) {
    this.app.client.waitUntilWindowLoaded()
      .getWindowCount().then(function (count) {
        assert.equal(count, 1)
        done()
      })
  })

  it('has a native coin list that takes vrsc', function (done) {
    // Wait for the left button for native mode coins is visible
    this.app.client.element('#react-select-3--value').waitForVisible(3000)
    // Click on it and enter vrsc<enter>
    this.app.client.element('#react-select-3--value').click().keys('vrsc\r\n').then(function () {
      done()
    })
  })

  it('delays for a bit', function() {
    return new Promise(function(resolve) {
      setTimeout(resolve, 500, true);
    });
  })

  it('has VRSC in the HTML body', function(done) {
    this.app.client.getHTML('body').then(function (html) {
      assert(html.includes('VRSC'), 'Did not find VRSC coin')
      done()
    })
  })
})

