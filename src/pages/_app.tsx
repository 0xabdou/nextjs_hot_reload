import '../styles/globals.scss';
import {AppProps} from "next/app";
import useInjection from "../injection/useInjection";
import CustomHead from "../components/custom-head";
import useDimensionsFix from "../utils/mobile/useDimensionsFix";
import {Provider} from 'react-redux';
import container from "../injection/inversify.config";
import {AppStore} from "../store/store";
import TYPES from "../injection/types";

const App = ({Component, pageProps}: AppProps) => {
  // Fixes some visual bugs in some mobile browsers
  useDimensionsFix();
  // Hook for dependency injection
  const ready = useInjection();

  return (
    <>
      <CustomHead/>
      {ready &&
      <Provider store={container.get<AppStore>(TYPES.AppStore)}>
        <Component {...pageProps} />
      </Provider>
      }
      {ready || <div/>}
    </>
  );
};

export default App;
