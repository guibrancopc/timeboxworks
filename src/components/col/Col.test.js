import { mount } from '@vue/test-utils';
import TwCol from './Col.vue';

const mountComponent = slots => mount(TwCol, { slots });

describe('Tw Col component', () => {
  it('should render div with corret class', () => {
    const wrapper = mountComponent();
    const div = wrapper.find('div');
    expect(div.classes()).toContain('tw-col');
  });

  it('should render div with internal content received by slot', () => {
    const wrapper = mountComponent({ default: 'Internal Content' });
    expect(wrapper.text()).toBe('Internal Content');
  });
});
