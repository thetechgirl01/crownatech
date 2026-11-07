import test from 'node:test';
import assert from 'node:assert/strict';
import { publicProjectLink } from './publicLinks.js';

test('blocks Stripe test Payment Links and Checkout Sessions, including encoded paths', () => {
  for (const url of [
    'https://buy.stripe.com/test_placeholder',
    'https://checkout.stripe.com/c/pay/cs_test_placeholder',
    'https://checkout.stripe.com/pay/cs_test_placeholder',
    'https://BUY.STRIPE.COM/%74est_placeholder',
    'https://checkout.stripe.com/c/pay/%63s_test_placeholder',
  ]) assert.equal(publicProjectLink(url), null);
});
test('retains valid destinations without blocking unrelated paths', () => {
  assert.equal(publicProjectLink('https://example.com/project'), 'https://example.com/project');
  assert.equal(publicProjectLink('https://buy.stripe.com/approved-live-link'), 'https://buy.stripe.com/approved-live-link');
  assert.equal(publicProjectLink('https://example.com/test_project'), 'https://example.com/test_project');
});
test('rejects unsupported schemes, missing values and malformed URLs', () => {
  for (const value of [undefined, null, '', 'not a url', 'javascript:alert(1)', 'data:text/html,test', 'https://buy.stripe.com/%invalid', 'https://name:example@example.test']) assert.equal(publicProjectLink(value), null);
});
