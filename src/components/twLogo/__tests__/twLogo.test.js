import { mount } from '@vue/test-utils';
import TwLogo from '../twLogo.vue';

describe('Tw Logo', () => {
  it('should pick a default image if no key is passed by prop', () => {
    const wrapper = mount(TwLogo);
    const image = wrapper.find('img');
    expect(image.attributes('src')).toBe('img/logos/timebox-works_logo-default.png');
  });

  it('should pick a image full name when image key is passed by prop', () => {
    const wrapper = mount(TwLogo, {
      propsData: {
        type: 'rounded',
      },
    });
    const image = wrapper.find('img');
    expect(image.attributes('src')).toBe('img/logos/timebox-works_logo-rounded.png');
  });
});
