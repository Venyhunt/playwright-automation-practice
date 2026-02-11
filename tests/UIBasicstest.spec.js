 const {test, expect}=require("@playwright/test");
const { text } = require("node:stream/consumers");

 test("playwright test 1",async ({browser})=>
 {
   const context= await browser.newContext(); 
   const page= await context.newPage();
   page.goto("https://gemini.google.com/app")
   await expect(page).toHaveTitle("Google Gemini");
   await console.log (await page.title());
 }
);


test("playwright test 2",async ({page})=>
 {
   await page.goto("https://www.google.com");
   await expect(page).toHaveTitle("Google");
   await page.locator('textarea[name="q"]').fill("ahemdabad");
   
 }
);

test("demo website tests",async ({page})=>
{
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await expect(page).toHaveTitle("Let's Shop");

  await page.locator("#userEmail").fill("vishwa.joshi@bacancy.us");
  await page.locator("[type='password']").fill("Abc@1234");
  await page.locator("#login").click();
 // await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").last().waitFor();
  console.log(await page.locator(".card-body b").allTextContents());
}
);

test("website test 2",async ({page})=>
{
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.locator("#username").fill("rahulshettyacademy");
  await page.locator("#password").fill("Learning@830$3mK2")
  const dropdown=page.locator("select.form-control");
  const docLink= page.locator("[href*='documents-request']");
  await dropdown.selectOption("consult");
  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();
  //await page.locator("#login").click();
  await expect(page.locator(".radiotextsty").last()).toBeChecked();
  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();
  console.log(await page.locator("#terms").isChecked());
  await expect(docLink).toHaveAttribute("class","blinkingText");

}
);

test.only("child window handling",async ({browser})=>
  {
    const context= await browser.newContext(); 
    const page= await context.newPage();
    const username= await page.locator("#username");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const docLink= page.locator("[href*='documents-request']");
    

  const [newPag]=await Promise.all( 
   [
    context.waitForEvent('page'),
    docLink.click(),
   ] )

    const mytext = await newPag.locator('.red').textContent()
    console.log(mytext);
    const arraytext= mytext.split("@");
    const domain=arraytext[1].split(" ")[0];
    //console.log(domain);

    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
    
  }
);