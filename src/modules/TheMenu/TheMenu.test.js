import { mount } from '@vue/test-utils';
import TheMenu from './TheMenu.vue';

const mountComponent = () => mount(TheMenu, {
  stubs: {
    RouterLink: true,
  },
});

describe('The Footer', () => {
  it('should render nav tag', () => {
    const wrapper = mountComponent();
    const nav = wrapper.find('nav');
    expect(nav.exists()).toBe(true);
  });

  it('should render nav tag with correct class', () => {
    const wrapper = mountComponent();
    const nav = wrapper.find('nav');
    expect(nav.classes()).toContain('tw-menu');
  });
});
