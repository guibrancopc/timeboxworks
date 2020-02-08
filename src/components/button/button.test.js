import { mount } from '@vue/test-utils';
import TwButton from './Button.vue';

function mountComponent(propsData, slots) {
  return mount(TwButton, { propsData, slots });
}

describe('Tw Button component', () => {
  it('should add disabled class when required', () => {
    const wrapper = mountComponent({ disabled: true });
    expect(wrapper.classes()).toContain('disabled');
  });

  it('should add size class when required', () => {
    const wrapper = mountComponent({ size: 'lg' });
    expect(wrapper.classes()).toContain('btn-lg');
  });

  it('should add primary type class when no type is received by prop', () => {
    const wrapper = mount(TwButton);
    expect(wrapper.classes()).toContain('btn-primary');
  });

  it('should show error when wrong size prop is received', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    mountComponent({ size: 'wrong-value' });
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('should show error when wrong type prop is received', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    mountComponent({ type: 'wrong-value' });
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('should add normal template prop when required', () => {
    const wrapper = mountComponent({ template: 'success' });
    expect(wrapper.classes()).not.toContain('btn-primary');
    expect(wrapper.classes()).toContain('btn-success');
  });

  it('should add outline template class when required', () => {
    const wrapper = mountComponent({ template: 'success', outline: true });
    expect(wrapper.classes()).not.toContain('btn-primary');
    expect(wrapper.classes()).not.toContain('btn-outline-primary');
    expect(wrapper.classes()).toContain('btn-outline-success');
  });

  it('should do action when button is clicked and it is not disabled', () => {
    const wrapper = mount(TwButton);
    wrapper.trigger('click');
    expect(wrapper.emitted().click).toBeTruthy();
  });

  it('should not do action when button is clicked and it is disabled', () => {
    const wrapper = mountComponent({ disabled: true });
    wrapper.trigger('click');
    expect(wrapper.emitted().click).toBeFalsy();
  });

  it('should mount button with text received by default slot', () => {
    const wrapper = mountComponent({}, { default: 'Button Text' });
    const button = wrapper.find('button');
    expect(button.text()).toBe('Button Text');
  });
});
