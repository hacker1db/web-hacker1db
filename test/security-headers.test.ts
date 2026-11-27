import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

// Every page is prerendered, so SvelteKit can only deliver its CSP as a
// <meta http-equiv> tag. Browsers ignore frame-ancestors in a meta policy, and
// the meta tag sets no other security headers, so vercel.json must send them.
const vercel = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));

function headersFor(path: string): Record<string, string> {
	const out: Record<string, string> = {};
	for (const rule of vercel.headers ?? []) {
		if (new RegExp(`^${rule.source}$`).test(path)) {
			for (const h of rule.headers) out[h.key.toLowerCase()] = h.value;
		}
	}
	return out;
}

test('every path gets anti-framing, nosniff, and referrer headers', () => {
	for (const path of ['/', '/posts/', '/posts/CyberSecurity/x/', '/images/a.png']) {
		const h = headersFor(path);
		assert.match(h['content-security-policy'] ?? '', /frame-ancestors 'none'/, path);
		assert.equal(h['x-frame-options'], 'DENY', path);
		assert.equal(h['x-content-type-options'], 'nosniff', path);
		assert.ok(h['referrer-policy'], path);
	}
});

test('header CSP does not restrict scripts, so the per-page meta hashes still work', () => {
	// Browsers enforce every policy they receive. A script-src in the header
	// without the per-page hydration hashes would block SvelteKit's inline script.
	assert.doesNotMatch(headersFor('/')['content-security-policy'], /script-src|default-src/);
});

test('SvelteKit still emits the hashed script CSP in each page', () => {
	const config = readFileSync(new URL('../vite.config.ts', import.meta.url), 'utf8');
	assert.match(config, /csp:\s*\{\s*mode:\s*'auto'/);
	assert.match(config, /'script-src':\s*\['self'\]/);
	assert.match(config, /'object-src':\s*\['none'\]/);
});
