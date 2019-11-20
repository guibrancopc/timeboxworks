import dynamicHeight from '../dynamicHeight';

describe('Dynamic Height Directive', () => {
  it('should set overflow hidden when initialized', () => {
    const binding = {};
    const el = {
      style: {
        overflow: '',
      },
      addEventListener: jest.fn(),
    };
    dynamicHeight.bind(el, binding);
    expect(el.style.overflow).toBe('hidden');
  });

  it('should set minimal height when requested', () => {
    const binding = {
      value: {
        minHeight: '30px',
      },
    };
    const el = {
      style: {
        overflow: '',
      },
      addEventListener: jest.fn(),
    };
    dynamicHeight.bind(el, binding);
    expect(el.style['min-height']).toBe('30px');
  });

  it('should add input event listener on element when directive is bounded', () => {
    const binding = {};
    const el = {
      style: {
        overflow: '',
      },
      addEventListener: jest.fn(),
    };
    dynamicHeight.bind(el, binding);
    expect(el.addEventListener).toHaveBeenCalled();
  });

  it('should remove input event listener when directive is unbounded', () => {
    const binding = {};
    const el = {
      style: {
        overflow: '',
      },
      removeEventListener: jest.fn(),
    };
    dynamicHeight.unbind(el, binding);
    expect(el.removeEventListener).toHaveBeenCalled();
  });

  it('sould do nothing when directive is disabled', () => {
    const binding = {
      value: {
        disabled: true,
      },
    };
    const el = {
      style: {
        overflow: '',
      },
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };
    dynamicHeight.bind(el, binding);
    dynamicHeight.unbind(el, binding);
    expect(el.addEventListener).not.toHaveBeenCalled();
    expect(el.removeEventListener).not.toHaveBeenCalled();
  });

  it('should update element height with scroll height', () => {
    const binding = {};
    const options = {
      target: {
        scrollHeight: 50,
        style: {
          height: '10px',
        },
      },
    };
    const el = {
      style: {
        overflow: '',
      },
      addEventListener: (eventType, callback) => {
        callback(options);
      },
    };
    dynamicHeight.bind(el, binding);
    expect(options.target.style.height).toBe('50px');
  });
});
