import { mount } from '@vue/test-utils';
import TwContainer from './container.vue';

const mountComponent = (propsData, slots) => mount(TwContainer, { propsData, slots });

describe('Tw Container', () => {
  it('should be initialized with default classes', () => {
    const wrapper = mountComponent();
    expect(wrapper.classes()).toContain('container');
    expect(wrapper.classes()).toContain('tw-container');
  });

  it('should be initialized with class fluid-container when required by prop', () => {
    const wrapper = mountComponent({ fullwidth: true });
    expect(wrapper.classes()).toContain('container-fluid');
    expect(wrapper.classes()).not.toContain('container');
  });

  it('should render div with internal content received by slot', () => {
    const wrapper = mountComponent({}, { default: 'Internal Content' });
    expect(wrapper.text()).toBe('Internal Content');
  });
});
