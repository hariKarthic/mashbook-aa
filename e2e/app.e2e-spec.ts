import { ScrapbookPage } from './app.po';

describe('scrapbook App', () => {
  let page: ScrapbookPage;

  beforeEach(() => {
    page = new ScrapbookPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('sb works!');
  });
});
