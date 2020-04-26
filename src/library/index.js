import './styles/index.scss';
import components from './components';
import plugins from './plugins';


export const TwComponents = Vue => {
  Vue.use(components);
  Vue.use(plugins);
};
