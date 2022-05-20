import Head from "next/head";
import "/resources/styles/globals.css";
import MainLayout from "../components/Layout";
import { createContext, useEffect, useState } from "react";
import { web3, provider, saveWalletInfo } from "../utils/web3";
import ErrorBoundary from "../components/ErrorBoundary";
import LogIn from "/components/Templates/SignIn";

export const Web3Context = createContext([{}, () => {}]);


const MyApp = ({ Component, pageProps }) => {
  const [userInfo, setUserInfo] = useState();
  const [network, setNetwork] = useState("");
  
  /**
   * Checks if the selected network in Metamask is the Rinkeby test network and
   * prompts to change it if not
   * @returns {Promise<void>}
   */
  const fetch = async () => {
    const network = await web3.eth.getChainId();
    setNetwork(network);

      if (network !== 80001) { // mumbai
        await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13881" }],
      });
    }
  };

  useEffect(() => {
    fetch();

    const handleChainChange = async (chainId) => {
      console.log(chainId, "chain changed!")
      await saveWalletInfo(setUserInfo, toast);
      chainId !== "0x13881" && window.location.reload();
    }
    
    provider.on("chainChanged", handleChainChange);
    return () => provider.removeListener('chainChanged', handleChainChange);
  }, [userInfo]);

  const Layout = Component.layout ?? MainLayout;

  return (
    <Web3Context.Provider value={[userInfo, setUserInfo, network]}>
      <Head>
        <title>Web3 Crowdfunding</title>
      </Head>
      <Layout>
         <ErrorBoundary FallbackComponent={<p>Something went wrong!</p>}>
            {network === 80001 && userInfo && userInfo.account ? (
              <Component {...pageProps} />
            ) : (
              <>
                <LogIn />
              </>
            )}
          </ErrorBoundary>
      </Layout> 
    </Web3Context.Provider>
  );
};

export default MyApp;
