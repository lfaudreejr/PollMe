import { PollmePage } from './app.po';

describe('pollme App', () => {
  let page: PollmePage;

  beforeEach(() => {
    page = new PollmePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
