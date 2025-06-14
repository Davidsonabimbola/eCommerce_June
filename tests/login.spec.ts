import { test, expect } from '@playwright/test';



export interface loginDetails {
        email : string
        password : string
        
    }


test.beforeEach(async ({page})=>{
await page.goto('https://rahulshettyacademy.com/client/')
})


test.describe('login features',()=>{


    const userCredentials : loginDetails = {
        email : 'timmy_004@example.com',
        password : '12.Nopassword.12',
        
    }

    const wrongCredentials : loginDetails = {
        email: 'timmy_001@example.com',
        password : '12.Nopassword.13'
    }

test('successfully login user',async ({page})=>{
    await expect(page.locator('input[id="login"]')).toBeVisible()
    await page.locator('input[id="userEmail"]').pressSequentially(userCredentials.email)
    await page.locator('[id="userPassword"]').pressSequentially(userCredentials.password)
    await page.locator('input[id="login"]').click()
    await expect(page.getByRole('button',{name:' HOME '})).toBeVisible()

})


test('invalid login email',async ({page})=>{
    await page.locator('input[id="userEmail"]').pressSequentially(wrongCredentials.email)
    await page.locator('[id="userPassword"]').pressSequentially(userCredentials.password)
    await page.locator('input[id="login"]').click()
    await expect(page.getByText('Incorrect email or password.')).toBeVisible()
    
})


test('invalid login password',async ({page})=>{
    await page.locator('input[id="userEmail"]').pressSequentially(userCredentials.email)
    await page.locator('[id="userPassword"]').pressSequentially(wrongCredentials.password)
    await page.locator('input[id="login"]').click()
    await expect(await page.getByText('Incorrect email or password.')).toBeVisible()
    
})


test('successfully logout user',async ({page})=>{
    await expect(page.locator('input[id="login"]')).toBeVisible()
    await page.locator('input[id="userEmail"]').pressSequentially(userCredentials.email)
    await page.locator('[id="userPassword"]').pressSequentially(userCredentials.password)
    await page.locator('input[id="login"]').click()
    await expect(page.getByRole('button',{name:' HOME '})).toBeVisible()
    await page.getByRole('button',{name:'Sign Out'}).click()
    await expect(page.locator('[id="login"]')).toBeVisible()

})


})