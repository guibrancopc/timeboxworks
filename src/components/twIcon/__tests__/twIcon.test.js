import '../images/calendar.svg';
import '../images/angle_down.svg';
import { mount } from '@vue/test-utils';
import Icon from '../icon.vue';

describe('Icon component', () => {
  // it('', () => {
  //   jest.mock('./../images/calendar.svg', () => 'calendar.svg');
  //   const wrapper = mount(Icon, {
  //     propsData: {
  //       name: 'calendar',
  //       size: 'md',
  //     },
  //   });
  //   expect(wrapper.vm.calendar).toBe(true);
  //   // expect(wrapper.attributes('src')).toBe('');
  // });

  it('should insert size class when valid type is received by prop.', () => {
    const wrapper = mount(Icon, {
      propsData: {
        name: 'calendar',
        size: 'md',
      },
    });
    expect(wrapper.classes('ca-icon-md')).toBe(true);
  });

  it('should return a error when invalid icon is requested.', () => {
    global.console.error = jest.fn();
    mount(Icon, {
      propsData: {
        name: 'some-wrong-icon',
      },
    });
    expect(global.console.error).toHaveBeenCalled();
  });

  it('should return a error when invalid size is requested.', () => {
    global.console.error = jest.fn();
    mount(Icon, {
      propsData: {
        name: 'calendar',
        size: 'some-wrong-size',
      },
    });
    expect(global.console.error).toHaveBeenCalled();
  });

  it('should fill alt attribute with icon name.', () => {
    const wrapper = mount(Icon, {
      propsData: {
        name: 'calendar',
        size: 'some-wrong-size',
      },
    });
    expect(wrapper.attributes('alt')).toBe('Icon calendar');
  });
});
