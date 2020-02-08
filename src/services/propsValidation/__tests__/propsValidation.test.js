import { validValues } from '../propsValidation';

describe('Props Validation Service validValues', () => {
  it('should return false when valid props list exists and when value is invalid', () => {
    const validProps = ['value-1', 'value-2'];
    const result = validValues(validProps).validator('wrong-value');
    expect(result).toBe(false);
  });

  it('should return true when valid props list exists and when value is valid', () => {
    const validProps = ['value-1', 'value-2'];
    const result = validValues(validProps).validator('value-2');
    expect(result).toBe(true);
  });

  it('should return true when prop does not have validation list', () => {
    const result = validValues(undefined).validator('value-2');
    expect(result).toBe(true);
  });

  it('should return true when no parameter is passed to public method', () => {
    const result = validValues(['valid-value']).validator(undefined);
    expect(result).toBe(true);
  });
});
