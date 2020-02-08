import { shallowMount } from '@vue/test-utils';
import TwLogo from './logo.vue';

describe('Tw Logo', () => {
  it('should pick a default image if no key is passed by prop', () => {
    const wrapper = shallowMount(TwLogo);
    const image = wrapper.find('img');
    expect(image.attributes('src')).toBe('img/logos/timebox-works_logo-default.png');
  });

  it('should pick a image full name when image key is passed by prop', () => {
    const wrapper = shallowMount(TwLogo, {
      propsData: {
        type: 'rounded',
      },
    });
    const image = wrapper.find('img');
    expect(image.attributes('src')).toBe('img/logos/timebox-works_logo-rounded.png');
  });

  it('should set width when it is passed by prop', () => {
    const wrapper = shallowMount(TwLogo, {
      propsData: {
        width: '15px',
      },
    });
    const image = wrapper.find('img');
    expect(image.attributes('style')).toBe('width: 15px;');
  });
});
