import dialogs from './dialog';

const { confirm } = dialogs;

describe('Dialogs Service', () => {
  it('should open dialog when service is called', () => {
    window.confirm = jest.fn();
    confirm('sample-text');
    expect(window.confirm).toHaveBeenCalledWith('sample-text');
  });
});
