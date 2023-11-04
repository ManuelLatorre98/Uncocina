import 'react-native-gesture-handler';
import { Provider} from 'react-redux';
import { store } from './src/store/store';
import IndexApp from './src/components/IndexApp';



export default function App() {

  return (
    <Provider store={store}>
      <IndexApp />
    </Provider>
  );
}


