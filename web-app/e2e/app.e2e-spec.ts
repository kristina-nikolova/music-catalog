import { MusicCatalogAppPage } from './app.po';

describe('music-catalog-app App', function() {
  let page: MusicCatalogAppPage;

  beforeEach(() => {
    page = new MusicCatalogAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
