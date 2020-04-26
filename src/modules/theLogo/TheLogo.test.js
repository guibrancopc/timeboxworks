import { mount } from '@vue/test-utils';
import TwTheLogo from './TheLogo.vue';

const mountComponent = propsData => mount(TwTheLogo, { propsData });

describe('Tw Logo', () => {
  it('should initialize an image with correct alt text', () => {
    const wrapper = mountComponent();
    const img = wrapper.find('img');
    expect(img.attributes('alt')).toBe('Timebox Works Logo');
  });

  it('should retrieve the default image when no type is received by prop', () => {
    const wrapper = mountComponent();
    expect(wrapper.vm.currentLogo.uri).toContain('logo-default');
  });

  it('should retrieve the rounded image when this type is received by prop', () => {
    const wrapper = mountComponent({ type: 'rounded' });
    expect(wrapper.vm.currentLogo.uri).toContain('logo-rounded');
  });

  it('should retrieve a hourglass image when this type is received by prop', () => {
    const wrapper = mountComponent({ type: 'hourglass' });
    expect(wrapper.vm.currentLogo.uri).toContain('logo-hourglass');
  });

  it('should setup image width when it is received by prop', () => {
    const wrapper = mountComponent({ width: 45 });
    const img = wrapper.find('img');
    expect(img.attributes('style')).toContain('width: 45px');
  });
});
