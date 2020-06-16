module.exports = {
  '@tags': ['google'],
  'google advanceed Search: Elon Musk'(browser) {
    const mainQuery = 'Elon Musk';
    const mainQueryInputSelector = 'input[name="as_q"]';
    const languageDropdownOpenerSelector = '#lr_button';
    const languageDropdownValueSelector = '.goog-menuitem[value="lang_zh-CN"]';
    const submitButtonSelect = '.jfk-button[type="submit"]';
    const resultsPageQuerySelector = `#searchform input[name="q"][value="${mainQuery}"]`
    const resultsPageLanguageSelector = '[aria-label="简体中文网页"]'
    browser
      .url('https://www.google.com/advanced_search')
      .setValue(mainQueryInputSelector, mainQuery)
      .click(languageDropdownOpenerSelector)
      // .perform(() => {
      //   debugger;
      // })
      .click(languageDropdownValueSelector)
      .click(submitButtonSelect)

      .assert.urlContains("q=Elon+Musk", 'Query is Elon Musk')

    browser.assert.visible(resultsPageQuerySelector, 'UI: Elon Musk is set in query')
    browser.assert.containsText(resultsPageLanguageSelector, '简体中文网页', 'UI: china is set in query')
    browser.saveScreenshot('tests_output/google.png')
  }
}  