import Head from "next/head";
import useZoomFix from "../utils/mobile/useZoomFix";

/**
 * Put global head tags here
 */

const CustomHead = () => {
  // Fixes zoom on rotation on ios phones
  const viewport = useZoomFix();

  return (
    <Head>
      <title>Enhanced boilerplate</title>
      <meta id='viewport' name="viewport" content={viewport} key='viewport'/>
    </Head>
  );
};

export default CustomHead;