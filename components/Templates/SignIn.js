import { useContext } from "react";
import WalletAlert from "../WalletAlert";
import { handleWalletConnect } from "../../utils/web3";
import { Toaster, toast } from "react-hot-toast";
import { Web3Context } from "../../pages/_app";
import { useRouter } from "next/router";

/**
 * Login component that is shown when Metamask is not connected to the test network and there is no
 * account information in the context
 * @returns {JSX.Element}
 * @constructor
 */
const Login = () => {
  const [_userInfo, setUserInfo] = useContext(Web3Context);
  const router = useRouter();

  const handleClick = () => {
    handleWalletConnect(setUserInfo, toast);
    router.push("/");
  }
  return (
    <div className="flex p-10">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            {/* <img
              className="h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            /> */}
            <h2 className="mt-6 text-2xl font-extrabold text-gray-900">
              Connect to your Metamask wallet
            </h2>
          </div>

          <div className="mt-4 mb-6">
            <button
              type="button"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              // onClick={() => handleWalletConnect(setUserInfo, toast)}
              onClick={() => handleClick()}
            >
              Connect Wallet
            </button>
          </div>
          <WalletAlert
            title="Connect wallet first!"
            subtitle="Please make sure to connect your Polygon compatible wallet AND select the Mumbai test network before continuing!"
          />
          <Toaster />
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover rounded-lg"
          src="https://i.ibb.co/nRT77GX/crowdfunding.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Login;
