import { shallowMount } from '@vue/test-utils';
import TwHeading from './Heading.vue';

describe('Tw Heading', () => {
  it('should render h1 tag by default', () => {
    const wrapper = shallowMount(TwHeading);
    expect(wrapper.find('h1').exists()).toBe(true);
  });

  it('should render heading tag with size passed by prop', () => {
    const wrapper = shallowMount(TwHeading, {
      propsData: {
        size: 3,
      },
    });
    expect(wrapper.find('h3').exists()).toBe(true);
  });

  it('should console a error when wrong value is passed for sizing', () => {
    const consoleErrorTemp = global.console.error;
    const wrapper = shallowMount(TwHeading, {
      propsData: {
        size: 8,
      },
    });
    expect(wrapper.find('h1').exists()).toBe(true);
    expect(global.console.error.called).toBe(true);
    global.console.error = consoleErrorTemp;
  });
});
