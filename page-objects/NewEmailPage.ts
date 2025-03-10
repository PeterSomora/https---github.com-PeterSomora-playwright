import { Page, Locator } from '@playwright/test';
import { HomePage } from './HomePage';
export class NewEmailPage {
    readonly page: Page;
    readonly userMenu: Locator;
    readonly signOut: Locator;
    readonly newMessageButton: Locator;
    readonly subjectField: Locator;
    readonly toButton: Locator;
    readonly searchContactField: Locator;
    readonly nameCheckbox: Locator;
    readonly submitContactButton: Locator;
    readonly fileInput: Locator;
    readonly sendButton: Locator;
    readonly messageSentNotification: Locator;
    readonly emailBody: Locator;

    constructor(page: Page) {
        this.page = page;        
        this.newMessageButton = page.getByRole('button', { name: 'New message' });
        this.subjectField = page.getByTestId('composer:subject');
        this.toButton = page.getByTestId('composer:to-button');
        this.searchContactField = page.locator('//input[@placeholder="Search name, email or group"]');
        this.nameCheckbox = page.locator('//strong[text()="Name"]/../../../div/label/input');
        this.submitContactButton = page.getByTestId('modal:contactlist:submit');
        this.fileInput = page.locator('input[type="file"]');
        this.sendButton = page.getByTestId('composer:send-button');     
        this.messageSentNotification = page.getByText('Message sent.'); 
        this.emailBody = page.locator('[data-testid="rooster-iframe"]').contentFrame().locator('#rooster-editor div').first();
        }
    
    private get homePage() {
        return new HomePage(this.page);
    }

    async createNewEmail(subject: string) {
        await this.homePage.newMessageButton.click();
        await this.page.waitForTimeout(1000);
        await this.emailBody.click();
        await this.emailBody.fill(subject);
        await this.subjectField.fill(subject);
        
    }

    async selectRecipient(email: string) {
        await this.toButton.click();
        await this.searchContactField.fill(email);
        await this.searchContactField.click();
        await this.nameCheckbox.click();
        await this.submitContactButton.click();
    }

    async attachFile(filePath: string) {
        await this.fileInput.setInputFiles(filePath);
    }

    async sendEmail() {
        await this.sendButton.click();
        await this.messageSentNotification.waitFor({ state: 'visible', timeout: 12000 });
    }
}