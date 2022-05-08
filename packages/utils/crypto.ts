import { createHash, randomBytes } from 'crypto';

export function hash(text: string): string {
  const sha256 = createHash('sha256');
  return sha256.update(text).digest('base64');
}

export function generateRandomToken(): string {
  return randomBytes(32).toString('base64');
}
