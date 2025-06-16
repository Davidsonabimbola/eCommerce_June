import { test, expect } from '@playwright/test';
import { LoginFeatures } from '../pages/Login';
import { login } from '../utils/Register_ErrorMessages';



export interface loginDetails {
        email : string
        password : string
        
    }


    let login_features : LoginFeatures


test.beforeEach(async ({page})=>{
await page.goto('https://rahulshettyacademy.com/client/')
login_features = new LoginFeatures(page)
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
    await login_features.inputEmail(userCredentials.email)
    await login_features.inputPassword(userCredentials.password)
    await login_features.clickLogin()
    await login_features.validate_successful_login()

})


test('invalid login email',async ({page})=>{

    await login_features.inputEmail(wrongCredentials.email)
    await login_features.inputPassword(userCredentials.password)
    await login_features.clickLogin()
    await login_features.validate_login_error(login.unsuccessfulLogin)
    
    
})


test('invalid login password',async ({page})=>{

    await login_features.inputEmail(userCredentials.email)
    await login_features.inputPassword(wrongCredentials.password)
    await login_features.clickLogin()
    await login_features.validate_login_error(login.unsuccessfulLogin)
    
})


test('successfully logout user',async ({page})=>{
    await login_features.inputEmail(userCredentials.email)
    await login_features.inputPassword(userCredentials.password)
    await login_features.clickLogin()
    await login_features.validate_successful_login()
    await login_features.logoutUser()

})


})