import { Locator, Page } from "@playwright/test";
import dotenv from 'dotenv';
export class RegisterPage
{
readonly page: Page;
readonly Emailfield: Locator;
readonly Passwordfield: Locator;
readonly Passwordrepeatfield: Locator;
readonly signup: Locator;
readonly signuplink:Locator;
constructor(page: Page)
{
this.page=page;
this.Emailfield          = page.getByLabel('E-mail');
 this.Passwordfield       = page.locator('input[type="password"]').nth(0);  // ✅ first password field
  this.Passwordrepeatfield = page.locator('input[type="password"]').nth(1);
this.signup=page.getByRole('button',{name:'Sign up'});
this.signuplink=page.getByRole('link',{name:'Sign up'});

}
async goto()
{
  await this.page.goto('/online-store.html');
await this.page.waitForLoadState('networkidle');
}
// function fill email data
 async fillEmailAddress(email:string)
 { await this.Emailfield.waitFor({state:'visible',timeout:10_000});
  await this.Emailfield.clear();
  await this.Emailfield.fill(email);

 }
 //fill password field
 async fillPassword(password:string)
 {
  await this.Passwordfield.clear();
  await this.Passwordfield.fill(password);
 }
 //fill confirmpassword
 async fillConfirmPassword(confirmpassword:string)
 {
  await this.Passwordrepeatfield.clear();
  await this.Passwordrepeatfield.fill(confirmpassword);
 }

 async fillRegisterForm(data:{email:string;password:string;confirmPassword:string})
 {
  await this.signuplink.click();
await this.fillEmailAddress(data.email);
await this.fillPassword(data.password);
await this.fillConfirmPassword(data.confirmPassword);
await this.signup.click();
    await this.page.waitForLoadState('networkidle');


 }
}