import puppeteer from "puppeteer";

describe("End to end testing", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it("contains the application's name", async () => {
    await page.goto('http://localhost:5000');
    await page.waitForSelector('#title');
    let element = await page.$('#title');
    let title = await page.evaluate(el => el.textContent, element);
    expect(title).toContain("Show Reel Application");
  });

  
  // it("all clips (standard: PAL, definititon: SD) should add up to a predefined duration ", async () => {
    
  // });

  afterAll(() => browser.close());
});