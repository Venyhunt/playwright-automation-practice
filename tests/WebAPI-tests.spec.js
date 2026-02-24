const {test, expect,request}=require("@playwright/test");

const LoginPayload={userEmail: "vishwa.joshi@bacancy.us", userPassword: "Abc@1234"};
let token;

test.beforeAll( async()=>
{
   const ApiContext=await request.newContext();
  const LoginResponse=await ApiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {data:LoginPayload } )

    expect(LoginResponse.ok()).toBeTruthy();  //checks for sucess codes like 200,201 etcc...
    const LoginResponseJson= await LoginResponse.json();
    token=LoginResponseJson.token;
    console.log(token);

}

);

//test.beforeEach();

test("ecom website test",async ({page})=>
{
  await page.addInitScript(value =>
  {
    window.localStorage.setItem('token',value);
  },
  token
  );

  
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  //await expect(page).toHaveTitle("Let's Shop");
  //await page.locator("#userEmail").fill("vishwa.joshi@bacancy.us");
  //await page.locator("[type='password']").fill("Abc@1234");
  //await page.locator("#login").click();
  const name="ZARA COAT 3";
  const products=await page.locator(".card-body");

  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();
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

  await page.locator("[routerLink*='cart']").click();
  await page.locator("div li").first().waitFor();
  const bool=await page.locator("h3",{hasText:name}).isVisible();
  expect(bool).toBeTruthy();
  console.log(bool);
  await page.locator("text=Checkout").click();
 
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
  await page.locator("[placeholder*='Country']").pressSequentially("ind");
  const options= await page.locator(".ta-results");
  await options.waitFor();
  const optionscount=await options.locator("button").count();
  for(let i=0; i< optionscount; ++i)
  {
    const text=await options.locator("button").nth(i).textContent();
    if(text === " India")
    {
      //click
      await options.locator("button").nth(i).click();
      break;
    }
  }
  await expect(page.locator(".user__name [type='text']").first()).toHaveText("vishwa.joshi@bacancy.us");
 await page.locator(".btnn.action__submit.ng-star-inserted").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  // await page.pause();
  const orderid= await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log(orderid);

  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
 const rows= await page.locator("tbody tr");
 for(let i=0;i<await rows.count();++i)
 {
    const rowOrderid= await rows.nth(i).locator("th").textContent();
    if(orderid.includes(rowOrderid))
    {
      await rows.nth(i).locator("button").first().click();
      break;
    }
 }

  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderid.includes(orderIdDetails)).toBeTruthy();
}
);