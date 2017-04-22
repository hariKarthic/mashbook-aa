import { browser, element, by } from 'protractor';

export class ScrapbookPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('sb-root h1')).getText();
  }
}
