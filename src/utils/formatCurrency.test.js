import formatCurrency from './formatCurrency';

describe('formatCurrency', () => {
  it('should format positive numbers correctly', () => {
    expect(formatCurrency(10)).toBe('R$\xa010,00');
    expect(formatCurrency(1234.56)).toBe('R$\xa01.234,56');
  });

  it('should format zero correctly', () => {
    expect(formatCurrency(0)).toBe('R$\xa00,00');
  });

  it('should format numbers with decimal values correctly', () => {
    expect(formatCurrency(12.3)).toBe('R$\xa012,30');
    expect(formatCurrency(0.5)).toBe('R$\xa00,50');
  });

  it('should return a string with the correct currency symbol and formatting', () => {
    const formatted = formatCurrency(123.45);
    expect(typeof formatted).toBe('string');
    expect(formatted.startsWith('R$\xa0')).toBe(true);
    // Check for comma as decimal separator for pt-BR
    expect(formatted.includes(',')).toBe(true); 
  });
});
