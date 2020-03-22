import { mount } from '@vue/test-utils';
import TheHeader from './TheHeader.vue';
import TheMenu from '../theMenu/TheMenu.vue';

const mountComponent = () => mount(TheHeader, {
  stubs: {
    RouterLink: true,
    TwLogo: true,
    TwContainer: true,
  },
});

describe('The Header', () => {
  it('should render header tag', () => {
    const wrapper = mountComponent();
    const header = wrapper.find('header');
    expect(header.exists()).toBe(true);
  });

  it('should render header tag with correct class', () => {
    const wrapper = mountComponent();
    const header = wrapper.find('header');
    expect(header.classes()).toContain('tw-header');
  });

  it('should render the menu', () => {
    const wrapper = mountComponent();
    const header = wrapper.find(TheMenu);
    expect(header.exists()).toBe(true);
  });
});
