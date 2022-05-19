import React, { useContext } from "react";
import CardList from "../components/CardList";
import { useRouter } from "next/router";
import { PlusIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import getCampaignInstance from "../web3/utils/campaign";
import getFactoryInstance from "../web3/utils/factory";
import { Web3Context } from "./_app";
import WalletAlert from "../components/WalletAlert";
import { timestampToDate } from "../utils/utils.js";
import { web3 } from "../utils/web3";

const CampaignIndex = (props) => {
  const { campaigns = [], campaignsSummary = [] } = props;
  const router = useRouter();
  const [userInfo] = useContext(Web3Context);
  /**
   * Helper method to remap campaigns and render them in a CardList component
   * @returns {JSX.Element}
   */
  const renderCampaigns = () => {
    const items = campaigns.map((address, i) => {
      if (campaignsSummary.length > 0) {
      let campaignProgess = 1;
      let progress = 0;
      try {
        if (campaignsSummary[i][4] !== 0) {
          progress = Math.round(campaignsSummary[i][0] / campaignsSummary[i][4] * 100);
          campaignProgess = (progress === 0) ? 1 : ((progress > 100) ? 100 : progress);
        }
      } catch(e) {
        console.log(e.message);
      }
        return {
        title: campaignsSummary[i][2],
        subtitle: address,
        description: campaignsSummary[i][3], 
        campaignProgess: campaignProgess,
        raisedFunding: web3.utils.fromWei(campaignsSummary[i][6].toString(), "ether") + " MATIC (" + progress.toString() + "%)",
        deadline: timestampToDate(campaignsSummary[i][7]).toLocaleDateString(),
        campaignStatus: campaignsSummary[i][9],
        campaignGoal: web3.utils.fromWei(campaignsSummary[i][4].toString(), "ether") + " MATIC",       
      };
    } else {
      return {
        title: "data is loading...",
        subtitle: address,
        description: "", 
        campaignProgess: "",
        raisedFunding: "",
        deadline: "",
        campaignStatus: "",
        campaignGoal: ""        
      };
    }
    });
    return <CardList items={items} showButton showProgress showStat/>;
  };

  const CampaignButton = () => {
    return (
      <button
        type="button"
        className={classNames(
          "inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
        )}
        onClick={() => router.push("/campaigns/new")}
      >
        <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        Create a campaign
      </button>
    );
  };
  return (
    <>
      <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex flex-col justify-start mb-3 sm:mb-0">
          <h3 className="text-1xl font-extrabold text-center sm:text-left tracking-tight text-gray-700 sm:text-2xl">
            Campaigns
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            List of campaign contracts
          </p>
        </div>
        <div className="my-auto">{CampaignButton()}</div>
      </div>
      {(!userInfo || (userInfo && !userInfo.account)) && (
        <div className="w-8/12 mx-auto mt-4">
          <WalletAlert
            title="Connect wallet first!"
            subtitle="Please make sure to connect your wallet before continuing!"
          />
        </div>
      )}
      {campaigns.length ? (
        <div>{renderCampaigns()}</div>
      ) : (
        <div className="mt-4">
          <div className="w-10/12 sm:w-6/12 mx-auto mt-6 border-2 border-gray-300 border-dashed rounded-lg p-8 sm:p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No projects
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a campaign.
            </p>
            <div className="mt-6">{CampaignButton()}</div>
          </div>
        </div>
      )}
    </>
  );
};

/**
 * Fetches a list of deployed campaigns and their description from the blockchain on the server before render
 * @returns {Promise<{campaignDescriptions: string[], campaigns: string[]}>}
 */
CampaignIndex.getInitialProps = async () => {
  let campaigns = [];
  let campaignsSummary = [];

  const contractInstance = await getFactoryInstance();
  try {
  campaigns = await contractInstance.methods.getDeployedCampaigns().call();
  } catch (e) {
    campaigns = [];
  };
  
  try {
    campaignsSummary = await Promise.all(
    campaigns.map(async (address) => {
      const campaign = await getCampaignInstance(address);
      return await campaign.methods.getCampaignSummary().call();
      })
    );
  } catch (e) {
    console.log(e.message);
  };
  return {
    campaigns,
    campaignsSummary
  };
};
  // campaignSummary = campaignsSummary[i]
  //   contractBalance: campaignSummary[0],
  //   managerAddress: campaignSummary[1],
  //   title: campaignSummary[2],
  //   description: campaignSummary[3],
  //   campaignGoal: campaignSummary[4],
  //   contributorsCount: campaignSummary[5],
  //   raisedFunding: campaignSummary[6],
  //   deadline: campaignSummary[7],
  //   currentTimestamp: campaignSummary[8]
  //   campaignStatus: campaignSummary[9]

export default CampaignIndex;
