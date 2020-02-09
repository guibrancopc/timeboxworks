import { mount } from '@vue/test-utils';
import TwPage from './Page.vue';

const mountComponent = slots => mount(TwPage, { slots });

describe('Tw Page', () => {
  it('should render div with corret class', () => {
    const wrapper = mountComponent();
    const div = wrapper.find('div');
    expect(div.classes()).toContain('tw-page');
  });

  it('should render div with internal content received by slot', () => {
    const wrapper = mountComponent({ default: 'Internal Content' });
    expect(wrapper.text()).toBe('Internal Content');
  });
});
