import { createSign, generateKeyPairSync } from 'node:crypto';

// Test-only: signs Clerk-shaped M2M JWTs so the real Clerk SDK verifies them locally.
const { privateKey, publicKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });

export const TEST_JWT_KEY = publicKey.export({ type: 'spki', format: 'pem' }).toString();
export const NEWSLETTER_MACHINE_ID = 'mch_newsletter';
export const BLOG_MACHINE_ID = 'mch_blog';

const base64url = (value: string): string => Buffer.from(value).toString('base64url');

export function signM2MToken(
	overrides: { sub?: string; scopes?: string; expiresIn?: number } = {},
	key = privateKey
): string {
	const now = Math.floor(Date.now() / 1000);
	const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT', kid: 'ins_test' }));
	const payload = base64url(
		JSON.stringify({
			jti: 'mt_test',
			sub: overrides.sub ?? NEWSLETTER_MACHINE_ID,
			scopes: overrides.scopes ?? BLOG_MACHINE_ID,
			iat: now - 10,
			nbf: now - 10,
			exp: now + (overrides.expiresIn ?? 300)
		})
	);
	const signature = createSign('RSA-SHA256').update(`${header}.${payload}`).sign(key, 'base64url');
	return `${header}.${payload}.${signature}`;
}

export const otherPrivateKey = generateKeyPairSync('rsa', { modulusLength: 2048 }).privateKey;
