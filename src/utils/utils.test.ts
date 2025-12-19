import { describe, expect, it, vi } from "vitest";

import { isNullable } from "./isNullable";
import { generateMockJWT, getDecodedToken } from './jwt';

describe('isNullable Utility Function', () => {
  it('testing on null validator', () => {
    expect(isNullable<null>(null)).toBe(true);
  });
  it('testing on undefined validator', () => {
    expect(isNullable<undefined>(undefined)).toBe(true);
  });
  it('testing on string validator', () => {
    expect(isNullable<string>('')).toBe(true);
    expect(isNullable<string | null>(null)).toBe(true);
    expect(isNullable<string | undefined>(undefined)).toBe(true);
    expect(isNullable<string>('not empty')).toBe(false);
  });
  it('testing on number validator', () => {
    expect(isNullable<number>(NaN)).toBe(true);
    expect(isNullable<number | null>(null)).toBe(true);
    expect(isNullable<number | undefined>(undefined)).toBe(true);
    expect(isNullable<number>(42)).toBe(false);
  });
  it('testing on boolean validator', () => {
    expect(isNullable<boolean | null>(null)).toBe(true);
    expect(isNullable<boolean | undefined>(undefined)).toBe(true);
    expect(isNullable<boolean>(true)).toBe(false);
    expect(isNullable<boolean>(false)).toBe(false);
  });
  it('testing on object validator', () => {
    expect(isNullable<null>(null)).toBe(true);
    expect(isNullable<undefined>(undefined)).toBe(true);
    expect(isNullable<object>({})).toBe(false);
    expect(isNullable<object>({ key: 'value' })).toBe(false);
    expect(isNullable<number[]>([])).toBe(true);
    expect(isNullable<number[]>([1, 2, 3])).toBe(false);
  });
  it('testing on unknown type validator', () => {
    expect(isNullable<symbol>(Symbol('test'))).toBe(false);
    expect(isNullable<bigint>(BigInt(10))).toBe(false);
  });
  it('testing on mixed type validator', () => {
    expect(isNullable<string | number>('')).toBe(true);
    expect(isNullable<string | number>(NaN)).toBe(true);
  });
});


describe('JWT Utilities', () => {
  it('should generate a valid mock JWT string format', () => {
    const token = generateMockJWT('john', 'editor');
    const parts = token.split('.');
    
    expect(parts).toHaveLength(3);
    expect(typeof token).toBe('string');
  });

  it('should decode a generated token correctly', () => {
    const user = 'test-user';
    const role = 'admin';
    const token = generateMockJWT(user, role);
    const decoded = getDecodedToken(token);

    expect(decoded).not.toBeNull();
    expect(decoded?.user).toBe(user);
    expect(decoded?.role).toBe(role);
    expect(decoded).toHaveProperty('exp');
    expect(decoded).toHaveProperty('iat');
  });

  it('should return null if token is not provided', () => {
    expect(getDecodedToken(null)).toBeNull();
    expect(getDecodedToken('')).toBeNull();
  });

  it('should return null and log error for invalid token format', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    const invalidToken = "invalid.token.format";
    const result = getDecodedToken(invalidToken);

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });

  it('should handle malformed base64 strings', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    const malformedToken = "header.NOT_BASE64_JSON.signature";
    const result = getDecodedToken(malformedToken);

    expect(result).toBeNull();
    
    consoleSpy.mockRestore();
  });
});