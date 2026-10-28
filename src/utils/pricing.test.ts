import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateProjectEstimate,
  formatINR,
  generateWhatsAppUrl,
  validateEnquiryForm,
} from './pricing';

test('calculateProjectEstimate correctly computes subtotal, 20% discount and total', () => {
  // Starter is 7999, 20% discount is 1600, total is 6399
  const res = calculateProjectEstimate('starter', [], 20);
  assert.equal(res.subtotal, 7999);
  assert.equal(res.discount, 1600);
  assert.equal(res.total, 6399);
});

test('calculateProjectEstimate with addons computes correctly', () => {
  // Business (14999) + CMS (4999) = 19998
  const res = calculateProjectEstimate('business', ['cms'], 20);
  assert.equal(res.subtotal, 19998);
  assert.equal(res.discount, 4000);
  assert.equal(res.total, 15998);
});

test('formatINR formats currency in Indian numbering format', () => {
  const formatted = formatINR(14999);
  assert.match(formatted, /14,999/);
});

test('generateWhatsAppUrl builds well-formed WhatsApp deep link', () => {
  const url = generateWhatsAppUrl({
    name: 'Aarav Sharma',
    packageName: 'Business — ₹14,999',
    message: 'Need redesign for luxury D2C fashion',
    estimatedTotal: 14999,
  });

  assert.ok(url.startsWith('https://wa.me/917020674916?text='));
  assert.ok(url.includes('Aarav%20Sharma'));
  assert.ok(url.includes('Business'));
});

test('validateEnquiryForm validates mandatory fields and IT Act checkbox', () => {
  const invalid = validateEnquiryForm({
    name: '',
    whatsapp: '123',
    package: '',
    agreedToTerms: false,
  });

  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.whatsapp);
  assert.ok(invalid.errors.package);
  assert.ok(invalid.errors.agreedToTerms);

  const valid = validateEnquiryForm({
    name: 'Rohan Mehta',
    whatsapp: '+91 9876543210',
    package: 'Business - Rs 14,999',
    message: 'Looking forward to work together',
    agreedToTerms: true,
  });

  assert.equal(valid.isValid, true);
  assert.deepEqual(valid.errors, {});
});
