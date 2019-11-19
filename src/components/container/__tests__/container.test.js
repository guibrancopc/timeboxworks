import { shallowMount } from '@vue/test-utils';
import TwContainer from '../container.vue';

describe('Tw Container', () => {
  it('should be initialized with class container by default', () => {
    const wrapper = shallowMount(TwContainer);
    expect(wrapper.classes()).toContain('container');
  });

  it('should be initialized with class fluid-container when required by prop', () => {
    const wrapper = shallowMount(TwContainer, {
      propsData: {
        fullwidth: true,
      },
    });
    expect(wrapper.classes()).toContain('container-fluid');
    expect(wrapper.classes()).not.toContain('container');
  });
});
