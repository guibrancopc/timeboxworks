import { mount } from '@vue/test-utils';
import TheFooter from './TheFooter.vue';

const mountComponent = () => mount(TheFooter, {
  stubs: {
    TwLogo: '<div>logo</div>',
  },
});

describe('The Footer', () => {
  it('should render footer tag', () => {
    const wrapper = mountComponent();
    const footer = wrapper.find('footer');
    expect(footer.exists()).toBe(true);
  });

  it('should render footer tag with correct class', () => {
    const wrapper = mountComponent();
    const footer = wrapper.find('footer');
    expect(footer.classes()).toContain('tw-footer');
  });

  it('should render rounded logo', () => {
    const wrapper = mountComponent();
    const footer = wrapper.find('[type=rounded]');
    expect(footer.exists()).toBe(true);
  });
});
