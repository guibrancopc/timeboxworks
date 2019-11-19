import { shallowMount } from '@vue/test-utils';
import sinon from 'sinon';
import TwTitle from '../title.vue';

describe('Tw Title', () => {
  it('should render h1 tag by default', () => {
    const wrapper = shallowMount(TwTitle);
    expect(wrapper.find('h1').exists()).toBe(true);
  });

  it('should render heading tag with size passed by prop', () => {
    const wrapper = shallowMount(TwTitle, {
      propsData: {
        size: 3,
      },
    });
    expect(wrapper.find('h3').exists()).toBe(true);
  });

  it('should console a error when wrong value is passed for sizing', () => {
    const consoleErrorTemp = global.console.error;
    global.console.error = sinon.spy();
    const wrapper = shallowMount(TwTitle, {
      propsData: {
        size: 8,
      },
    });
    expect(wrapper.find('h1').exists()).toBe(true);
    expect(global.console.error.called).toBe(true);
    global.console.error = consoleErrorTemp;
  });
});
