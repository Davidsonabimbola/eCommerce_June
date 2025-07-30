import { test, expect } from '@playwright/test';
import { registration } from '../utils/Register_ErrorMessages';
import signupFeatures from '../pages/Registration';

export interface userDetails {
        email : string
        firstName : string
        lastName : string
        phoneNumber : string
        password : string
        occupation: string

    }


    let signup : signupFeatures

    test.beforeEach(async({page})=>{
        await page.goto('https://rahulshettyacademy.com/client/')
        signup = new signupFeatures(page)
    })

test.describe('Register new user',()=>{

     const newUser : userDetails ={
        email : "timmy_0087@example.com",
        firstName : "Timmo",
        lastName : 'Banks',
        phoneNumber : '2359087632',
        password : '12.Nopassword.12',
        occupation : 'Student'

    }

test('successfully register new user', async ({ page }) => {
    await signup.clickRegister()
    await signup.inputFirstName(newUser.firstName)
    await signup.inputLastName(newUser.lastName)
    await signup.inputEmail(newUser.email)
    await signup.inputPhoneNumber(newUser.phoneNumber)
    await signup.chooseOccupation(newUser.occupation)
    await signup.inputPassword(newUser.password)
    await signup.input_confirmPassword(newUser.password)
    await signup.clickCheckBox()
    await signup.submitButton()


    
  });


  test('error Messages for missing Mandatory fields', async ({ page }) => { 

    await signup.clickRegister()
    await signup.inputFirstName(newUser.firstName)
    await signup.chooseOccupation(newUser.occupation)
    await signup.clickCheckBox()
    await signup.submitButton()
    await signup.validate_errorMessages(registration.email_error)
    await signup.validate_errorMessages(registration.telephone)
    await signup.validate_errorMessages(registration.password)
    await signup.validate_errorMessages(registration.confirmPassword)
    
  });


   test('error Messages for missing Mandatory First name field', async ({ page }) => { 
    await signup.clickRegister()
    await signup.inputLastName(newUser.lastName)
    await signup.inputEmail(newUser.email)
    await signup.inputPhoneNumber(newUser.phoneNumber)
    await signup.chooseOccupation(newUser.occupation)
    await signup.inputPassword(newUser.password)
    await signup.input_confirmPassword(newUser.password)
    await signup.clickCheckBox()
    await signup.submitButton()
    await expect(await page.getByText(registration.firstName_Error)).toBeVisible()
    
  });

})

