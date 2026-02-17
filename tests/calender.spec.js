const {test, expect}=require("@playwright/test");


test("calender validation",async({page})=>
{
    const monthnum="6";
    const date="13";
    const year="2026";
    const expectedList=[monthnum,date,year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputgroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthnum)-1).click();
    
    await page.locator("//abbr[text()='"+date+"']").click();

    const inputs= page.locator(".react-date-picker__inputGroup__input");

    for(let i=0;i< expectedList.length;++i)
    {
        const value=await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);
    }
}
);
