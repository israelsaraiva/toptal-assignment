import { createHmac } from 'crypto';

export function hashPassword(password: string) {
  return createHmac('sha256', password).digest('hex');
}
