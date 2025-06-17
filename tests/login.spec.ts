import { test, expect } from '@playwright/test';
import { LoginFeatures } from '../pages/Login';
import { login } from '../utils/Register_ErrorMessages';
import Credentials from '../utils/Credentials';


    
    let login_features : LoginFeatures
    let credentials = Credentials


test.beforeEach(async ({page})=>{
await page.goto('https://rahulshettyacademy.com/client/')
login_features = new LoginFeatures(page)
})


test.describe('login features',()=>{
    const validCreds = credentials.validCredentials()
    const invalidCreds = credentials.invalidCredentials()
    


   

test('successfully login user',async ({page})=>{
    await login_features.inputEmail(validCreds.email)
    await login_features.inputPassword(validCreds.password)
    await login_features.clickLogin()
    await login_features.validate_successful_login()

})


test('invalid login email',async ({page})=>{

    await login_features.inputEmail(invalidCreds.email)
    await login_features.inputPassword(validCreds.password)
    await login_features.clickLogin()
    await login_features.validate_login_error(login.unsuccessfulLogin)
    
    
})


test('invalid login password',async ({page})=>{

    await login_features.inputEmail(validCreds.email)
    await login_features.inputPassword(invalidCreds.password)
    await login_features.clickLogin()
    await login_features.validate_login_error(login.unsuccessfulLogin)
    
})


test('successfully logout user',async ({page})=>{
    await login_features.inputEmail(validCreds.email)
    await login_features.inputPassword(validCreds.password)
    await login_features.clickLogin()
    await login_features.validate_successful_login()
    await login_features.logoutUser()

})


})