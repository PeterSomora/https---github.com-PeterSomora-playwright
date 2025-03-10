import { test } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { HomePage } from '../page-objects/HomePage';
import { NewEmailPage } from '../page-objects/NewEmailPage';
test.setTimeout(45000);
test('Send mail with attachement', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const newEmailPage = new NewEmailPage(page);
    const email = 'Test email with attachment';
    const recipient = 'indraavitechaero@proton.me';
    const filePath = 'C:\\Users\\Somora\\indraavitechaero.txt';
    
    await test.step('Login to application', async () => {
        await loginPage.goto();
        await loginPage.login(
            process.env.PROTON_EMAIL as string,
            process.env.PROTON_PASSWORD as string
        );
    });

    await test.step('Create new email', async () => {
        await newEmailPage.createNewEmail(email);
    });

    await test.step('Add recipient', async () => {
        await newEmailPage.selectRecipient(recipient);
    });

    await test.step('Attach file', async () => {
        await newEmailPage.attachFile(filePath);
    });

    await test.step('Send email', async () => {
        await newEmailPage.sendEmail();
    });

    await test.step('Sign out', async () => {
        await homePage.signOut();
    });
});