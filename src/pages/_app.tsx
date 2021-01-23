import '../styles/globals.scss';
import {AppProps} from "next/app";
import useInjection from "../injection/useInjection";
import CustomHead from "../components/custom-head";
import useDimensionsFix from "../utils/mobile/useDimensionsFix";

const App = ({Component, pageProps}: AppProps) => {
  // Fixes some visual bugs in some mobile browsers
  useDimensionsFix();
  // Hook for dependency injection
  const ready = useInjection();


  console.log('RENDERED');
  return (
    <>
      <CustomHead/>
      {ready && <Component {...pageProps} />}
      {ready || <div/>}
    </>
  );
};

export default App;
