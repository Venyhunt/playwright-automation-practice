const {test, expect}=require("@playwright/test");

test('Popup Validation',async ({page})=>
{
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/", { waitUntil: 'domcontentloaded' });
  //await page.goto("https://www.google.com/");
  //await page.goBack();
  //await page.goForward();
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();
  await page.locator("#confirmbtn").click();
  page.on('dialog',dialog => dialog.accept());
  await page.locator("#mousehover").click();
  const framepage=await page.frameLocator("#courses-iframe");
  await framepage.locator("li a[href*='lifetime-access']:visible").click();
  const textcheck=await framepage.locator(".text h2").textContent();
  console.log(textcheck.split(" ")[1]);
}
);