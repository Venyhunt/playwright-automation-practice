const {test, expect}=require("@playwright/test");
const { text } = require("node:stream/consumers");

test("ecom website test",async ({page})=>
{

  const name="ZARA COAT 3";
  const products=await page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await expect(page).toHaveTitle("Let's Shop");
  await page.locator("#userEmail").fill("vishwa.joshi@bacancy.us");
  await page.locator("[type='password']").fill("Abc@1234");
  await page.locator("#login").click();
  // await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").last().waitFor();
  console.log(await page.locator(".card-body b").allTextContents());

  const count=await products.count();
  for(let i=0;i<count;++i)
  {
    if( await products.nth(i).locator("b").textContent() === name)
    {
        //add to cart
        await products.nth(i).locator("text= Add To Cart").click();
        break;
    }
  }
  await page.pause();

}
);