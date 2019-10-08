import { mount } from '@vue/test-utils';
import sinon from 'sinon';
import TwButton from '@/components/twButton/twButton.vue';

describe('Tw Button component', () => {
  it('should add active class when required', () => {
    const active = true;
    const callback = () => {};
    const wrapper = mount(TwButton, {
      propsData: { active, callback },
    });
    expect(wrapper.classes()).toContain('active');
  });

  it('should add disabled class when required', () => {
    const disabled = true;
    const callback = () => {};
    const wrapper = mount(TwButton, {
      propsData: { disabled, callback },
    });
    expect(wrapper.classes()).toContain('disabled');
  });

  it('should add size class when required', () => {
    const size = 'lg';
    const callback = () => {};
    const wrapper = mount(TwButton, {
      propsData: { size, callback },
    });
    expect(wrapper.classes()).toContain('btn-lg');
  });

  it('should show error when wrong size class is passed', () => {
    console.error = sinon.spy();
    const size = 'other-value';
    const callback = () => {};
    mount(TwButton, {
      propsData: { size, callback },
    });
    expect(console.error.called).toBe(true);
  });

  it('should add primary type class when no type is passed by prop', () => {
    const callback = () => {};
    const wrapper = mount(TwButton, {
      propsData: { callback },
    });
    expect(wrapper.classes()).toContain('btn-primary');
  });

  it('should show error when wrong type class is passed', () => {
    console.error = sinon.spy();
    const type = 'other-value';
    const callback = () => {};
    mount(TwButton, {
      propsData: { type, callback },
    });
    expect(console.error.called).toBe(true);
  });

  it('should add normal type class when required', () => {
    const type = 'success';
    const callback = () => {};
    const wrapper = mount(TwButton, {
      propsData: { type, callback },
    });
    expect(wrapper.classes()).not.toContain('btn-primary');
    expect(wrapper.classes()).toContain('btn-success');
  });

  it('should add outline type class when required', () => {
    const type = 'success';
    const outline = true;
    const callback = () => {};
    const wrapper = mount(TwButton, {
      propsData: { type, outline, callback },
    });
    expect(wrapper.classes()).not.toContain('btn-primary');
    expect(wrapper.classes()).not.toContain('btn-outline-primary');
    expect(wrapper.classes()).toContain('btn-outline-success');
  });

  it('should do action when button is clicked and it is not disabled', () => {
    const callback = sinon.spy();
    const wrapper = mount(TwButton, {
      propsData: { callback },
    });
    wrapper.trigger('click');
    expect(callback.called).toBe(true);
  });
  it('should not do action when button is clicked and it is disabled', () => {
    const callback = sinon.spy();
    const disabled = true;
    const wrapper = mount(TwButton, {
      propsData: { callback, disabled },
    });
    wrapper.trigger('click');
    expect(callback.called).toBe(false);
  });
});
