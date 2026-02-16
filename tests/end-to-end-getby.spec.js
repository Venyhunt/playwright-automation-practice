const {test, expect}=require("@playwright/test");
const { text } = require("node:stream/consumers");

test("ecom website test",async ({page})=>
{

  const name="ZARA COAT 3";
  const products=await page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await expect(page).toHaveTitle("Let's Shop");
  await page.getByPlaceholder("email@example.com").fill("vishwa.joshi@bacancy.us");
  await page.getByPlaceholder("enter your passsword").fill("Abc@1234");
  await page.getByRole('button',{name:"Login"}).click();
  //await page.waitForLoadState("networkidle");

  await page.locator(".card-body b").last().waitFor();
  console.log(await page.locator(".card-body b").allTextContents());

  await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:'Add To Cart'}).click();
  await page.getByRole('listitem').getByRole('button',{name:"Cart"}).click();


  await page.locator("div li").first().waitFor();
  await expect(page.getByText("ZARA COAT 3")).toBeVisible() ;
  await page.getByRole('button',{name:"Checkout"}).click();
 
  await page.locator(".payment__shipping").first().waitFor();
  await page.locator("input[type='text']").first().fill("3456 8643 3324");
  const dropdown1=page.locator("select.input.ddl").first();
  await dropdown1.selectOption("12");
  const dropdown2=page.locator("select.input.ddl").last();
  await dropdown2.selectOption("31");
  await page.locator(".input.input.txt").nth(1).fill("344");
  await page.locator("input.input.txt").nth(2).fill("Vishwa Joshi");
  await page.locator("input[name='coupon']").fill("DISCOUNT20");
  await page.locator("button[type='submit']").click();
  await expect(page.locator("text=* Invalid Coupon")).toBeVisible();
  await expect(page.locator(".user__name [type='text']").first()).toHaveText("vishwa.joshi@bacancy.us");


  await page.getByPlaceholder("Select Country").pressSequentially("ind");
  
  await page.getByRole('button',{name: " India"}).nth(1).click();
  await page.getByText("PLACE ORDER").click();
  await expect( page.getByText(" Thankyou for the order. ")).toBeVisible();
  // await page.pause();
  
}
);