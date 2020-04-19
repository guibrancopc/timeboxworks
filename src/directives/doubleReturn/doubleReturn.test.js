import doubleReturn from './doubleReturn';

describe('Double Return Directive', () => {
  it('should not add event listener when directive is disabled', () => {
    const el = {
      addEventListener: jest.fn(),
    };
    const binding = {
      value: {
        disabled: true,
      },
    };
    doubleReturn.bind(el, binding);
    expect(el.addEventListener).not.toHaveBeenCalled();
  });

  it('should add event listener when directive is not disabled', () => {
    const el = {
      addEventListener: jest.fn(),
    };
    const binding = {
      value: {
        disabled: false,
      },
    };
    doubleReturn.bind(el, binding);
    expect(el.addEventListener).toHaveBeenCalledTimes(1);
    expect(el.addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
  });

  describe('on Enter keydown', () => {
    it('should not modify input value when user has selected any part of text', () => {
      const event = {
        key: 'Enter',
        target: {
          value: 'Sample value',
          selectionStart: 3,
          selectionEnd: 5,
        },
      };
      const el = {
        addEventListener(eventType, callback) {
          callback(event);
        },
      };
      doubleReturn.bind(el);
      expect(event.target.value).toBe('Sample value');
    });

    it('should add breakline when there is no selected part of text', () => {
      const event = {
        key: 'Enter',
        target: {
          value: 'Sample value',
          selectionStart: 5,
          selectionEnd: 5,
        },
      };
      const el = {
        addEventListener(eventType, callback) {
          callback(event);
        },
      };
      doubleReturn.bind(el);
      expect(event.target.value).toBe('Sampl\ne value');
    });

    it('should add breakline when input is empty', () => {
      const event = {
        key: 'Enter',
        target: {
          value: '',
        },
      };
      const el = {
        addEventListener(eventType, callback) {
          callback(event);
        },
      };
      doubleReturn.bind(el);
      expect(event.target.value).toBe('\n');
    });

    it('should add breakline when there is even quantity of return in last sequence', () => {
      const event = {
        key: 'Enter',
        target: {
          value: 'Sample \n text \n\n for test \n\n',
          selectionStart: 28,
          selectionEnd: 28,
        },
      };
      const el = {
        addEventListener(eventType, callback) {
          callback(event);
        },
      };
      doubleReturn.bind(el);
      expect(event.target.value).toBe('Sample \n text \n\n for test \n\n\n');
    });

    it('should not add breakline when there is odd quantity of return in last sequence', () => {
      const event = {
        key: 'Enter',
        target: {
          value: 'Sample \n text \n\n for test \n\n\n',
          selectionStart: 29,
          selectionEnd: 29,
        },
      };
      const el = {
        addEventListener(eventType, callback) {
          callback(event);
        },
      };
      doubleReturn.bind(el);
      expect(event.target.value).toBe('Sample \n text \n\n for test \n\n\n');
    });
  });

  describe('on Backspace keydown', () => {
    it('should not modify input value when user has selected any part of text', () => {

    });

    it('should remove last item from the cursor to behind when last character is breakline and there is even quantity of it in last sequence', () => {

    });

    it('should no remove last item from cursor to behind when last character is not breakline', () => {

    });

    it('should no remove last item from cursor to behind when there is odd quantity of breaklines in last sequence', () => {

    });
  });
});
