const {test, expect}=require("@playwright/test");
const { text } = require("node:stream/consumers");

test("Playwright Special Locators",async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("Button",{name:"Submit"}).click();
    await page.getByRole("link",{name:"Shop"}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();

}
);