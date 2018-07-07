const Application = require('spectron').Application
const assert = require('assert')
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path')
describe('Application launch', function () {
  this.timeout(30000)

  before(function () {
    this.app = new Application({
      path: electronPath,
      // The following line tells spectron to look and use the main.js file
      // and the package.json located 1 level above.
      args: [path.join(__dirname, '..')]
    })
    return this.app.start()
  })

  after(function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop()
    }
  })

  it('shows an initial window', function () {
    return this.app.client.getWindowCount().then(function (count) {
      assert.equal(count, 1)
      // Please note that getWindowCount() will return 2 if `dev tools` are opened.
      // assert.equal(count, 2)
    })
  })

  it('supports VerusCoin selection', function () {
    this.app.client.getText("document.getElementsByClassName('Select-arrow')[1]").then(function (result) {
      console.log('The Select-arrow selection returns ' + result)
    })
  })
})

