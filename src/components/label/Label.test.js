import { mount } from '@vue/test-utils';
import TwLabel from './Label.vue';

const mountLabel = propsData => mount(TwLabel, { propsData });

describe('Tw Label', () => {
  it('should render a label with default class', () => {
    const wrapper = mountLabel({ text: 'sample text' });
    const label = wrapper.find('label');
    expect(label.classes()).toContain('tw-label');
  });

  it('should render a label with text inside', () => {
    const wrapper = mountLabel({ text: 'sample text' });
    const label = wrapper.find('label');
    expect(label.text()).toBe('sample text');
  });

  it('should set "for" attribute in label', () => {
    const wrapper = mountLabel({ for: 'sample-id' });
    const label = wrapper.find('label');
    expect(label.attributes('for')).toBe('sample-id');
  });

  it('should show required symbol when label is required', () => {
    const wrapper = mountLabel({ required: true });
    const requiredElement = wrapper.find('span.tw-label__required');
    expect(requiredElement.exists()).toBe(true);
  });

  it('should not show required symbol when label is not required', () => {
    const wrapper = mountLabel({ required: false });
    const requiredElement = wrapper.find('span.tw-label__required');
    expect(requiredElement.exists()).toBe(false);
  });
});
