/**
 * test-data/login.data.ts
 *
 * Centralised test data for login scenarios.
 * Credentials are pulled from .env for security.
 */
import dotenv from 'dotenv';
dotenv.config();

export const validUser = {
  email:    process.env.VALID_EMAIL    ?? 'your-email@example.com',
  password: process.env.VALID_PASSWORD ?? 'your-password',
};

export const invalidUsers = {
  wrongPassword: {
   email:    process.env.VALID_EMAIL    ?? 'your-email@example.com',
  password: process.env.INVALID_PASSWORD ?? 'your-password'
    },
  wrongEmail: {
    email:    'nonexistent@motqan.ai',
    password: process.env.VALID_PASSWORD ?? 'your-password',
    description: 'wrong email + valid password',
  },
  bothWrong: {
    email:    'fake@fake.com',
    password: 'fakepassword123',
    description: 'wrong email + wrong password',
  },
};

export const edgeCases = {
  emptyEmail: {
    email:    '',
    password: 'somepassword',
    description: 'empty email field',
  },
  emptyPassword: {
    email:    'someone@motqan.ai',
    password: '',
    description: 'empty password field',
  },
  bothEmpty: {
    email:    '',
    password: '',
    description: 'both fields empty',
  },
  sqlInjection: {
    email:    "' OR '1'='1",
    password: "' OR '1'='1",
    description: 'SQL injection attempt',
  },
  xssAttempt: {
    email:    '<script>alert("xss")</script>@test.com',
    password: '<script>alert("xss")</script>',
    description: 'XSS attempt in fields',
  },
  longEmail: {
    email:    'a'.repeat(256) + '@test.com',
    password: 'password123',
    description: 'extremely long email (256+ chars)',
  },
};