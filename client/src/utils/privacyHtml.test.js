import test from 'node:test';
import assert from 'node:assert/strict';
import { privacyHtml } from './privacyHtml.js';
import { privacySections, privacyReviewDate } from '../content/privacy.js';

test('script-free privacy draft includes every section and an explicit draft status', () => {
  const html = privacyHtml(privacySections, privacyReviewDate);
  for (const section of privacySections) assert(html.includes(`id="${section.id}"`));
  assert(html.includes('Draft for owner review'));
  assert(html.includes('name="robots" content="noindex"'));
  assert(!html.includes('<script'));
});
test('authored content is escaped in the standalone document', () => {
  const html = privacyHtml([{ id: 'safe', title: '<unsafe>', paragraphs: ['<script>alert("fixture")</script>'] }], '2026-11-07');
  assert(!html.includes('<script>'));
  assert(html.includes('&lt;script&gt;'));
  assert(html.includes('&lt;unsafe&gt;'));
});
