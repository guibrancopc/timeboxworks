import { mount } from '@vue/test-utils';
import meetingForm from './meetingForm.vue';

const TwFormStub = {
  name: 'TwFormStubComponent',
  template: '<form><slot /></form>',
};

const TwFormDatetimepickerStub = {
  name: 'TwFormDatetimepickerStub',
  template: '<input />',
  props: {
    customValidation: Function,
  },
};

const mountComponent = () => mount(meetingForm, {
  stubs: {
    RouterLink: true,
    TwContainer: true,
    TwRow: true,
    TwCol: true,
    TwHeading: true,
    TwGutter: true,
    TwForm: TwFormStub,
    TwFormField: true,
    TwFormInput: true,
    TwFormDatetimePicker: TwFormDatetimepickerStub,
    TwFormInputsList: true,
    TwFormTextarea: true,
    TwFormResetButton: true,
    TwFormSubmitButton: true,
    TwPage: true,
  },
});

describe('Meeting Form Page', () => {
  it('should validate true when start time is before end time', () => {
    const wrapper = mountComponent();
    const formDatetimePickerStubAll = wrapper.findAll(TwFormDatetimepickerStub);
    const startDateTimeInput = formDatetimePickerStubAll.at(0);
    const endDateTimeInput = formDatetimePickerStubAll.at(1);
    startDateTimeInput.vm.$emit('input', '2020-02-24T13:00:00.000Z');
    endDateTimeInput.vm.$emit('input', '2020-02-24T14:00:00.000Z');
    expect(startDateTimeInput.vm.customValidation()).toBe(true);
    expect(endDateTimeInput.vm.customValidation()).toBe(true);
  });

  it('should validate false when start time is before end time', () => {
    const wrapper = mountComponent();
    const formDatetimePickerStubAll = wrapper.findAll(TwFormDatetimepickerStub);
    const startDateTimeInput = formDatetimePickerStubAll.at(0);
    const endDateTimeInput = formDatetimePickerStubAll.at(1);
    startDateTimeInput.vm.$emit('input', '2020-02-24T13:00:00.000Z');
    endDateTimeInput.vm.$emit('input', '2020-02-24T10:00:00.000Z');
    expect(startDateTimeInput.vm.customValidation()).toBe('Start time should be before End time');
    expect(endDateTimeInput.vm.customValidation()).toBe('Start time should be before End time');
  });
});
