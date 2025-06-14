import { Locator, Page,expect } from "@playwright/test";

class signupFeatures{
    private page : Page
    private registerButton: Locator
    private firstName_Field: Locator
    private lastName_Field : Locator
    private email_Field : Locator
    private phoneNumber_Field : Locator
    private occupation: Locator
    private password_Field: Locator
    private confirm_password_Field : Locator
    



    constructor(page:Page){
        this.page = page
        this.registerButton = this.page.locator('a').getByText('Register here')
        this.firstName_Field = this.page.locator('input[id="firstName"]')
        this.lastName_Field = this.page.locator('input[id="lastName"]')
        this.email_Field = this.page.locator('input[id="userEmail"]')
        this.phoneNumber_Field = this.page.locator('input[id="userMobile"]')
        this.occupation = this.page.locator('[formcontrolname="occupation"]')
        this.password_Field = this.page.locator('input[id="userPassword"]')
        this.confirm_password_Field = this.page.locator('input[id="confirmPassword"]')

    }

    async clickRegister(){
        this.registerButton.click()
    }

    async inputFirstName(firstname:string){
        this.firstName_Field.fill(firstname)
    }

    async inputLastName(lastName:string){
        this.lastName_Field.fill(lastName)
    }

    async inputEmail(email:string){
        this.email_Field.fill(email)
    }

    async inputPhoneNumber(phoneNumber:string){
        this.phoneNumber_Field.fill(phoneNumber)
    }

    async chooseOccupation(occupation:string){
        this.occupation.selectOption(occupation)
    }

    async inputPassword(password:string){
        this.password_Field.fill(password)
    }

    async input_confirmPassword(password:string){
        this.confirm_password_Field.fill(password)
    }

    async clickCheckBox(){
        await this.page.locator('input[type="checkbox"]').nth(0).check()
    }

    async submitButton(){
        this.page.locator('input[id="login"]').click()
    }

    async validate_errorMessages(errorMessage: string){
        await expect(await this.page.getByText(errorMessage)).toBeVisible()
    }


}
export default signupFeatures