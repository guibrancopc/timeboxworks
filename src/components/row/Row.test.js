import { mount } from '@vue/test-utils';
import TwRow from './Row.vue';

const mountComponent = slots => mount(TwRow, { slots });

describe('Tw Row', () => {
  it('should render div with corret class', () => {
    const wrapper = mountComponent();
    const div = wrapper.find('div');
    expect(div.classes()).toContain('tw-row');
  });

  it('should render div with internal content received by slot', () => {
    const wrapper = mountComponent({ default: 'Internal Content' });
    expect(wrapper.text()).toBe('Internal Content');
  });
});
