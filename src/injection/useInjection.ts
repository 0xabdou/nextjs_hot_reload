import {useEffect, useState} from "react";
import {initDependencies} from "./inversify.config";

const useInjection = (): boolean => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const init = async () => {
      await initDependencies();
      setReady(true);
    };
    init().then();
  }, []);
  return ready;
};

export default useInjection;