import { describe, expect, it } from "vitest";
import { isNullable } from "./isNullable";

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