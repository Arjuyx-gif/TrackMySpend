import { describe, it, expect } from 'vitest';
import { formatCurrency } from '@/lib/utils';

describe('Utils Functions', () => {
  describe('formatCurrency', () => {
    it('formats positive numbers correctly', () => {
      expect(formatCurrency(1000)).toBe('₹1,000.00');
      expect(formatCurrency(50.5)).toBe('₹50.50');
    });

    it('formats zero correctly', () => {
      expect(formatCurrency(0)).toBe('₹0.00');
    });

    it('formats negative numbers correctly', () => {
      expect(formatCurrency(-500)).toBe('-₹500.00');
    });

    it('handles large numbers', () => {
      // Indian numbering system uses lakhs (1,00,000 = 1 lakh)
      expect(formatCurrency(1000000)).toBe('₹10,00,000.00');
    });
  });
});
