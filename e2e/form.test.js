import puppeteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(30000);

describe("Inn Form", () => {
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
      headless: true,
      slowMo: 50,
      devtools: true,
    });

    page = await browser.newPage();
  });

  test("Button should render on page start", async () => {
    await page.goto("http://localhost:9000");

    await page.waitForSelector(".btn-tooltip");
  });

  test("Tooltip (hidden) appeared on the page", async () => {
    await page.goto("http://localhost:9000");

    await page.waitForSelector(".btn-tooltip");
    await page.waitForSelector(".tooltip");

    const tooltipClasses = await page.evaluate(() => {
      const tooltip = document.querySelector(".tooltip");
      return tooltip ? Array.from(tooltip.classList) : [];
    });
    expect(tooltipClasses).toStrictEqual(["tooltip", "hide-tooltip"]);
  }, 20000);

  test("Tooltip (visible) appeared on the page", async () => {
    await page.goto("http://localhost:9000");

    await page.waitForSelector(".btn-tooltip");
    await page.waitForSelector(".tooltip");

    const button = await page.$(".btn-tooltip");
    await button.click();

    const tooltipClasses = await page.evaluate(() => {
      const tooltip = document.querySelector(".tooltip");
      return tooltip ? Array.from(tooltip.classList) : [];
    });
    expect(tooltipClasses).toStrictEqual(["tooltip"]);
  }, 20000);

  afterAll(async () => {
    await browser.close();
    server.kill();
  });
});
