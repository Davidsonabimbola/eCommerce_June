import { test, expect } from '@playwright/test';
import { registration } from '../utils/Register_ErrorMessages';

export interface userDetails {
        email : string
        firstName : string
        lastName : string
        phoneNumber : string
        password : string

    }

    test.beforeEach(async({page})=>{
        await page.goto('https://rahulshettyacademy.com/client/')
    })

test.describe('Register new user',()=>{

     const newUser : userDetails ={
        email : "timmy_004@example.com",
        firstName : "Timmy",
        lastName : 'Banks',
        phoneNumber : '2359087632',
        password : '12.Nopassword.12'

    }

test('successfully register new user', async ({ page }) => {
    await page.locator('a').getByText('Register here').click()
    await page.locator('input[id="firstName"]').fill(newUser.firstName)
    await page.locator('input[id="lastName"]').fill(newUser.lastName)
    await page.locator('input[id="userEmail"]').fill(newUser.email)
    await page.locator('input[id="userMobile"]').fill(newUser.phoneNumber)
    const occupationDropdown = await page.locator('[formcontrolname="occupation"]')
    await occupationDropdown.selectOption('Student')
    await page.locator('input[id="userPassword"]').fill(newUser.password)
    await page.locator('input[id="confirmPassword"]').fill(newUser.password)
    await page.locator('input[type="checkbox"]').nth(0).check()
    await page.locator('input[id="login"]').click()


    
  });


  test('error Messages for missing Mandatory fields', async ({ page }) => { 
    await page.locator('a').getByText('Register here').click()
    await page.locator('input[id="firstName"]').fill(newUser.firstName)  
    const occupationDropdown = await page.locator('[formcontrolname="occupation"]')
    await occupationDropdown.selectOption('Student')
    await page.locator('input[type="checkbox"]').nth(0).check()
    await page.locator('input[id="login"]').click()
    await expect(await page.getByText(registration.email_error)).toBeVisible()
    await expect(await page.getByText(registration.telephone)).toBeVisible()
    await expect(await page.getByText(registration.password)).toBeVisible()
    await expect(await page.getByText(registration.confirmPassword)).toBeVisible()
  });


   test('error Messages for missing Mandatory First name field', async ({ page }) => { 
    await page.locator('a').getByText('Register here').click()
    await page.locator('input[id="lastName"]').fill(newUser.lastName)
    await page.locator('input[id="userEmail"]').fill(newUser.email)
    await page.locator('input[id="userMobile"]').fill(newUser.phoneNumber)
    const occupationDropdown = await page.locator('[formcontrolname="occupation"]')
    await occupationDropdown.selectOption('Student')
    await page.locator('input[id="userPassword"]').fill(newUser.password)
    await page.locator('input[id="confirmPassword"]').fill(newUser.password)
    await page.locator('input[type="checkbox"]').nth(0).check()
    await page.locator('input[id="login"]').click()
    await expect(await page.getByText(registration.firstName_Error)).toBeVisible()
    
  });

})

