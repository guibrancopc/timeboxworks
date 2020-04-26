import { mount } from '@vue/test-utils';
import TwHeading from './Heading.vue';

const mountComponent = (propsData, slots) => mount(TwHeading, { propsData, slots });

describe('Tw Heading', () => {
  it('should render heading h1 by default', () => {
    const wrapper = mountComponent();
    const h1 = wrapper.find('h1');
    expect(h1.exists()).toBe(true);
  });

  it('should render heading h1 when "xl" size passed by prop', () => {
    const wrapper = mountComponent({ size: 'xl' });
    const h1 = wrapper.find('h1');
    expect(h1.exists()).toBe(true);
  });

  it('should render heading h2 when "lg" size passed by prop', () => {
    const wrapper = mountComponent({ size: 'lg' });
    const h1 = wrapper.find('h2');
    expect(h1.exists()).toBe(true);
  });

  it('should render heading h3 when "md" size passed by prop', () => {
    const wrapper = mountComponent({ size: 'md' });
    const h1 = wrapper.find('h3');
    expect(h1.exists()).toBe(true);
  });

  it('should render heading h4 when "sm" size passed by prop', () => {
    const wrapper = mountComponent({ size: 'sm' });
    const h1 = wrapper.find('h4');
    expect(h1.exists()).toBe(true);
  });

  it('should render heading h5 when "xs" size passed by prop', () => {
    const wrapper = mountComponent({ size: 'xs' });
    const h1 = wrapper.find('h5');
    expect(h1.exists()).toBe(true);
  });

  it('should render heading h6 with "xxs" size passed by prop', () => {
    const wrapper = mountComponent({ size: 'xxs' });
    const h1 = wrapper.find('h6');
    expect(h1.exists()).toBe(true);
  });

  it('should console a error when wrong value is passed for sizing', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    mountComponent({ size: 'wrong-value' });
    expect(console.error).toHaveBeenCalledTimes(1);
    console.error.mockRestore();
  });

  it('should render heading with internal content received by slot', () => {
    const wrapper = mountComponent({}, { default: 'Internal Content' });
    expect(wrapper.text()).toBe('Internal Content');
  });
});
