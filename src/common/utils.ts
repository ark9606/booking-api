import { v4 } from 'uuid';

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function generateUUID(): string {
  return v4();
}
