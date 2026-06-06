/**
 * tests/register.spec.ts
 *
 * Full end-to-end test suite for the skoda registration flow.
 *
 * Flow:
 *   HomePage-> Sign Up link
 *   → Step 1: Personal Info 
 *   → Dashboard ✅
 */
import { test, expect } from '../fixtures/pages.fixture';
import { RegisterPage }  from '../pages/RegisterPage';
import { validRegistration,invalidRegistrations } from '../test-data/register.data';
// ════════════════════════════════════════════════════════════════════
//  FULL E2E — Fill Registration with invalid data
// ════════════════════════════════════════════════════════════════════

test.describe('TC01 -invalidEmail registration flow',()=>{
test('Full registration',
  async({registerPage})=>{
   // const registerPage = new RegisterPage(page);
   // await registerPage.goto();
    await registerPage.fillRegisterForm(invalidRegistrations.invalidEmail);

  }
  );
});

// ════════════════════════════════════════════════════════════════════
//  FULL E2E — Complete Registration with personal data
// ════════════════════════════════════════════════════════════════════

test.describe('TC02 -Registartion Form-Full registration flow',()=>{
test('Full registration',
  async({registerPage })=>{
   // const registerPage = new RegisterPage(page);
   // await registerPage.goto();
    await registerPage.fillRegisterForm(validRegistration);
  }
  );
});




