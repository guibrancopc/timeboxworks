import dialogs from './dialogs';

const { customConfirm } = dialogs;

describe('Dialogs Service', () => {
  it('should open dialog when service is called', () => {
    window.confirm = jest.fn();
    customConfirm('sample-text');
    expect(window.confirm).toHaveBeenCalledWith('sample-text');
  });
});
