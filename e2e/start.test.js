import puppeteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(30000);
describe("Page start", () => {
  let browser;
  let page;
  let server;

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on("error", reject);
      server.on("message", (message) => {
        if (message === "ok") {
          resolve();
        }
      });
    });
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });

    page = await browser.newPage();
  });

  test("start", async () => {
    await page.goto("http://localhost:9000");

    await page.waitForSelector("body");
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });
});
