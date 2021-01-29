import '../styles/globals.scss';
import {AppProps} from "next/app";
import useInjection from "../injection/useInjection";
import CustomHead from "../components/custom-head";
import useDimensionsFix from "../utils/mobile/useDimensionsFix";
import {Provider} from 'react-redux';
import container from "../injection/inversify.config";
import {AppStore} from "../store/store";
import TYPES from "../injection/types";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import React from "react";


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
      <ToastContainer/>
    </>
  );
};

export default App;
