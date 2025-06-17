import {test as baseTest,Page} from '@playwright/test'
import { LoginFeatures } from '../pages/Login'
import Credentials from '../utils/Credentials'


let page: Page
let creds = Credentials


export const test = baseTest.extend<{
    loginPage: LoginFeatures
    loggedInPage : Page

}>

({


    loginPage: async ({page},use)=>{
        await page.goto('https://rahulshettyacademy.com/client/')
        const loginPage = new LoginFeatures(page)
        use(loginPage)
    },


    loggedInPage: async ({page,loginPage},use)=>{
        const userCreds = creds.validCredentials()
        await loginPage.inputEmail(userCreds.email)
        await loginPage.inputPassword(userCreds.password)
        await loginPage.clickLogin()
        await loginPage.validate_successful_login()
        use(page)
    }
}
)
export const expect = baseTest.expect