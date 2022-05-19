import Web3 from "web3";

let provider;

/**
 * Assigns provider based on application state
 */
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {

  provider = window.ethereum;
} else if (typeof window !== "undefined" && window.web3) {

  provider = window.web3.currentProvider;
} else {
  provider = new Web3.providers.HttpProvider(process.env.FACTORY_PROVIDER);
}

const web3 = new Web3(provider);

/**
 * Handles connecting to a Metamask wallet
 * @param setUserInfo - set context hook
 * @param toast -toast instance
 * @returns {Promise<void>}
 */
const handleWalletConnect = async (setUserInfo, toast) => {
  let isChanged = false;
  try {
    if (provider) {
      if (
        typeof window !== "undefined" &&
        !window.ethereum &&
        window.web3.currentProvider
      ) {
        toast.error(
          "Please update to a newer version of Metamask! The one you're using is not supported anymore!"
        );
        return;
      } else if (
        typeof window === "undefined" &&
        !window.web3 &&
        !window.ethereum
      ) {
        toast.success("Server mode on, network node is provided by Infura!");
      }

      await provider.request({ method: "eth_requestAccounts" });

      // Make sure to recognize if someone changes their metamask account
      provider.on("accountsChanged", async (accounts) => {
        console.log(accounts, "accountsChanged!")

        await saveWalletInfo(setUserInfo, toast);
        isChanged = true;
      });

      !isChanged && await saveWalletInfo(setUserInfo, toast);
    }
  } catch (err) {
    toast.error(
      "There was an error fetching your accounts. Make sure your network client is configured correctly!"
    );
  }
};

/**
 * Saves retrieved wallet (user) information to the context
 * @param setUserInfo - set context hook
 * @param toast - toast instance
 * @returns {Promise<void>}
 */
const saveWalletInfo = async (setUserInfo, toast) => {
  try {
    const userAccount = await web3.eth.getAccounts();
    if (userAccount.length === 0) {
      toast.error("Please connect your metamask wallet!");
    }

    const chainId = await web3.eth.getChainId();
    const account = userAccount[0];
    let ethBalance = account && (await web3.eth.getBalance(account));
    if (ethBalance) {
      ethBalance = web3.utils.fromWei(`${ethBalance}`, "ether");
    }

    setUserInfo({
      connectionId: chainId,
      account,
      balance: ethBalance,
    });
  } catch (e) {
    toast.error(e.message);
  }
};

export { web3, provider, handleWalletConnect, saveWalletInfo };
