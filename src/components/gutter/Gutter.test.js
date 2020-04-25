import { mount } from '@vue/test-utils';
import TwGutter from './Gutter.vue';

const mountComponent = (propsData, slots) => mount(TwGutter, { propsData, slots });

describe('Tw Gutter', () => {
  it('should add margin top class when its required by "top" prop', () => {
    const wrapper = mountComponent({ top: true });
    expect(wrapper.classes()).toContain('tw-u-margin--top');
  });

  it('should add margin bottom class when its required by "bottom" prop', () => {
    const wrapper = mountComponent({ bottom: true });
    expect(wrapper.classes()).toContain('tw-u-margin--bottom');
  });

  it('should add margin left class when its required by "left" prop', () => {
    const wrapper = mountComponent({ left: true });
    expect(wrapper.classes()).toContain('tw-u-margin--left');
  });

  it('should add margin right class when its required by "right" prop', () => {
    const wrapper = mountComponent({ right: true });
    expect(wrapper.classes()).toContain('tw-u-margin--right');
  });

  it('should add margin top and bottom classes when its required by "vertical" prop', () => {
    const wrapper = mountComponent({ vertical: true });
    expect(wrapper.classes()).toContain('tw-u-margin--top');
    expect(wrapper.classes()).toContain('tw-u-margin--bottom');
  });

  it('should add margin left and right classes when its required by "horizontal" prop', () => {
    const wrapper = mountComponent({ horizontal: true });
    expect(wrapper.classes()).toContain('tw-u-margin--left');
    expect(wrapper.classes()).toContain('tw-u-margin--right');
  });

  it('should add all margin sides classes when its required by "full" prop', () => {
    const wrapper = mountComponent({ full: true });
    expect(wrapper.classes()).toContain('tw-u-margin--top');
    expect(wrapper.classes()).toContain('tw-u-margin--bottom');
    expect(wrapper.classes()).toContain('tw-u-margin--left');
    expect(wrapper.classes()).toContain('tw-u-margin--right');
  });

  it('should add inline block class when its required by "inlineBlock" prop', () => {
    const wrapper = mountComponent({ inlineBlock: true });
    expect(wrapper.classes()).toContain('tw-u-display--inline-block');
  });

  it('should render div with internal content received by slot', () => {
    const wrapper = mountComponent({}, { default: 'Internal Content' });
    expect(wrapper.text()).toBe('Internal Content');
  });
});
