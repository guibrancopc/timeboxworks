import { mount } from '@vue/test-utils';
import TwButton from '../button.vue';

describe('Tw Button component', () => {
  beforeEach(() => {
    global.console.error = jest.fn();
  });

  it('should add disabled class when required', () => {
    const wrapper = mount(TwButton, {
      propsData: { disabled: true },
    });
    expect(wrapper.classes()).toContain('disabled');
  });

  it('should add size class when required', () => {
    const wrapper = mount(TwButton, {
      propsData: { size: 'lg' },
    });
    expect(wrapper.classes()).toContain('btn-lg');
  });

  it('should add primary type class when no type is passed by prop', () => {
    const wrapper = mount(TwButton);
    expect(wrapper.classes()).toContain('btn-primary');
  });

  it('should show error when wrong size class is passed', () => {
    const wrapper = () => {
      mount(TwButton, {
        propsData: { size: 'other-value' },
      });
    };
    expect(wrapper).toThrow();
  });

  it('should show error when wrong type class is passed', () => {
    const wrapper = () => {
      mount(TwButton, {
        propsData: { type: 'other-value' },
      });
    };
    expect(wrapper).toThrow();
  });

  it('should add normal template class when required', () => {
    const wrapper = mount(TwButton, {
      propsData: { template: 'success' },
    });
    expect(wrapper.classes()).not.toContain('btn-primary');
    expect(wrapper.classes()).toContain('btn-success');
  });

  it('should add outline template class when required', () => {
    const wrapper = mount(TwButton, {
      propsData: { template: 'success', outline: true },
    });
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
    const wrapper = mount(TwButton, {
      propsData: {
        disabled: true,
      },
    });
    wrapper.trigger('click');
    expect(wrapper.emitted().click).toBeFalsy();
  });
});
