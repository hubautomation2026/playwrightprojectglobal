/**
 * test-data/register.data.ts
 *
 * All test data for the registration flow.
 * Uses timestamps so each run creates a unique email (avoids "already registered" errors).
 */

/** Generate a unique email per test run */
function uniqueEmail(): string {
  return  `test${Date.now()}@skodatest.com`;
}

/** Valid user for happy-path registration */
export const validRegistration = {
  
  email:           uniqueEmail(),
  password:        'Test@1234!',
  confirmPassword: 'Test@1234!'
};


/** Invalid registration scenarios */
export const invalidRegistrations = {
  passwordMismatch: {
    
    email:           uniqueEmail(),
    password:        'Test@1234!',
    confirmPassword: 'WrongPass!',
    description:     'passwords do not match',
  },
  
  invalidEmail: { 
    email:           'not-an-email',
    password:        'Test@1234!',
    confirmPassword: 'Test@1234!',
    description:     'invalid email format',
  },
  missingPassword: {
    email:           uniqueEmail(),
    password:        '',
    confirmPassword: '',
    description:     'empty password fields',
  },
};