import { Page, Locator } from '@playwright/test';
import { LoginPage } from './LoginPage';

export class HomePage {
    readonly page: Page;
    readonly userMenu: Locator;
    readonly signOutButton: Locator;
    readonly newMessageButton: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.userMenu = page.locator('//span[text()="indraavitechaero@proton.me"]');
        this.signOutButton = page.locator('//button[text()="Sign out"]');
        this.newMessageButton = page.getByRole('button', { name: 'New message' });
    }

    private get loginPage() {
        return new LoginPage(this.page);
    }

    async signOut() {
        await this.userMenu.click();       
        await this.signOutButton.click();
        await this.loginPage.username.waitFor({ state: 'visible' });           
}
}