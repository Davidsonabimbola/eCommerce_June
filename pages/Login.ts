import { Locator, Page,expect } from "@playwright/test";


export  class LoginFeatures{
    private page: Page


    constructor(page:Page){
        this.page = page

    }

    async inputEmail(email:string){
        await expect(this.page.locator('input[id="login"]')).toBeVisible()
    await this.page.locator('input[id="userEmail"]').pressSequentially(email)
    }


    async inputPassword(password:string){
        await this.page.locator('[id="userPassword"]').pressSequentially(password)
    }

    async clickLogin(){
        await this.page.locator('input[id="login"]').click()
    
    }

    async validate_successful_login(){
        await expect(this.page.getByRole('button',{name:' HOME '})).toBeVisible()

    }

    async validate_login_error(errorMessage: string){
        await expect(this.page.getByText(errorMessage)).toBeVisible()
    }

    async logoutUser(){
        await this.page.getByRole('button',{name:'Sign Out'}).click()
    await expect(this.page.locator('[id="login"]')).toBeVisible()
    }


}