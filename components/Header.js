import React, { useContext, useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Metamask from "/resources/icons/metamask.svg";
import Mosaic from "/resources/images/mosaic.jpg";
import BreadCrumb from "./BreadCrumb";
import { Web3Context } from "../pages/_app";
import { toast } from "react-hot-toast";
import classNames from "classnames";
import { handleWalletConnect } from "../utils/web3";
import { useRouter } from "next/router";

/**
 * Top "navigation" bar - header
 * @returns {JSX.Element}
 * @constructor
 */
const Header = () => {
  const [userInfo, setUserInfo, network] = useContext(Web3Context);
  const [profileImg, setProfileImg] = useState(Metamask);
  // const [profileImg, setProfileImg] = useState('');
const router = useRouter();
  
  useEffect(() => {
    userInfo && userInfo.connectionId && setProfileImg(Mosaic);
    !userInfo || (userInfo && !userInfo.account) && setProfileImg(Metamask);
    // !userInfo || (userInfo && !userInfo.account) && setProfileImg('');
  }, [userInfo]);

  const renderConnectDiv = (isMobile = false) => {
    return !userInfo || (userInfo && !userInfo.account) ? (
      <div
        className={classNames(
          isMobile ? "m-5" : "",
          "max-w-max flex items-center group cursor-pointer transition-all border-2 border-white hover:border-violet-100 hover:scale-90 p-1 rounded-md"
        )}
        onClick={() => handleWalletConnect(setUserInfo, toast)}
      >
        <p className="ml-4 mr-4 text-sm font-medium text-white group-hover:text-violet-100">
          Connect Wallet
        </p>

        {/* <div className="ml-3 relative flex-shrink-0">
          <div className="bg-violet-600 rounded-full flex text-sm text-white ">
            <Image
              src={profileImg}
              alt="profile-logo"
              height={35}
              width={35}
              className="m-auto rounded-full"
            />
          </div>
        </div> */}
      </div>
    ) : (
      <div
        className={classNames(
          isMobile && "mb-1 mr-1",
          "flex items-center group cursor-pointer transition-all p-1 rounded-md"
        )}
        onClick={() => null}
      >
        <div className="ml-4 mt-4 mb-2 truncate">
          <h3 className="text-sm leading-6 font-medium text-white">
            {userInfo.account}
          </h3>
          <p className=" text-xs text-violet-200">{userInfo.balance} MATIC</p>
        </div>

        <div className="ml-3 relative flex-shrink-0">
          <div className="bg-violet-600 rounded-full flex text-sm text-white">
            {/* <Image
              src={profileImg}
              alt="profile-logo"
              height={35}
              width={35}
              className="m-auto rounded-full"
            /> */}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="min-h-full">
        <div className="bg-violet-700 pb-32">
          <Disclosure
            as="nav"
            className="bg-violet-700 border-b border-violet-300 border-opacity-25 lg:border-none"
          >
            {({ open }) => (
              <>
                <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                  <div className="relative h-16 flex items-center justify-between lg:border-b lg:border-violet-400 lg:border-opacity-25">
                    <div className="px-2 flex items-center lg:px-0">
                      <div className="flex flex-shrink-0 flex-row">
                        <img
                          className="block h-8 w-8"
                          src="https://tailwindui.com/img/logos/workflow-mark-indigo-300.svg"
                          alt="Workflow"
                        />
                        <a className="text-xl font-bold text-violet-300 ml-2" href="#"
                          onClick={() => router.push("/")}>
                          Web3 crowdfunding
                        </a>
                      </div>
                    </div>
                    {/*<div className="flex-1 px-2 flex justify-center lg:ml-6 lg:justify-end">*/}
                    {/*  <div className="max-w-lg w-full lg:max-w-xs">*/}
                    {/*    <label htmlFor="search" className="sr-only">*/}
                    {/*      Search*/}
                    {/*    </label>*/}
                    {/*    <div className="relative text-gray-400 focus-within:text-gray-600">*/}
                    {/*      <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">*/}
                    {/*        <SearchIcon*/}
                    {/*          className="h-5 w-5"*/}
                    {/*          aria-hidden="true"*/}
                    {/*        />*/}
                    {/*      </div>*/}
                    {/*      <input*/}
                    {/*        id="search"*/}
                    {/*        className="block w-full bg-white py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-violet-600 focus:ring-white focus:border-white sm:text-sm"*/}
                    {/*        placeholder="Search"*/}
                    {/*        type="search"*/}
                    {/*        name="search"*/}
                    {/*      />*/}
                    {/*    </div>*/}
                    {/*  </div>*/}
                    {/*</div>*/}
                    <div className="flex lg:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="bg-violet-600 p-2 rounded-md inline-flex items-center justify-center text-violet-200 hover:text-white hover:bg-violet-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-violet-600 focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <MenuIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                    <div className="hidden lg:block lg:ml-4">
                      {network === 80001 && userInfo && userInfo.account && renderConnectDiv(false)}
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="lg:hidden">
                  {network === 80001 && userInfo && userInfo.account && renderConnectDiv(true)}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <div className="py-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {network === 80001 && userInfo && userInfo.account && (
              <BreadCrumb />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
