import React, { useState } from "react";
import { useRouter } from "next/router";
import getCampaignInstance from "../../../web3/utils/campaign";
import CardList from "../../../components/CardList";
import ContributeCTA from "../../../components/ContributeCTA";
import CampaignResult from "../../../components/CampaignResult";
import SuccessModal from "../../../components/Modals/SuccessModal";
import ErrorModal from "../../../components/Modals/ErrorModal";
import { Toaster, toast } from "react-hot-toast";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import Card from "../../../components/Card";
import { web3 } from "../../../utils/web3";
import { shortErrorMessage, timestampToDate, timestampGapToDays } from "../../../utils/utils.js";
/**
 * Shows campaign details like required min. contribution, contract balance,
 * manager's address, etc.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const CampaignDetails = (props) => {
  
  const {
    campaignAddress,
    contractBalance,
    managerAddress,
    title,
    description,
    campaignGoal,
    contributorsCount,
    raisedFunding,
    deadline,
    currentTimestamp,
    campaignStatus
  } = props;
  
  const router = useRouter();
  const [tokenInput, setTokenInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [refundModalOpen, setRefundModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const getAccounts = async () => await web3.eth.getAccounts();
  const currAccounts = getAccounts();
  const currentAccount = currAccounts[0];
  let campaignStatusSubtitle = "";
  /**
   * Handles contributing to a campaign
   * @param e Event object
   * @returns {Promise<void>}
   */
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const loadingToast = toast.loading(
      "Your transaction is pending, please wait..."
    );
    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = await getCampaignInstance(router.query.cid);
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(tokenInput, "ether"),
      });
      setSuccessModalOpen(true);
    } catch (e) {
      setErrorMessage(shortErrorMessage(e.message));
      setErrorModalOpen(true);
    }
    toast.dismiss(loadingToast);
    setIsSubmitting(false);
  };

  const handleOnWithdraw = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const loadingToast = toast.loading(
      "Your transaction is pending, please wait..."
    );
    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = await getCampaignInstance(router.query.cid);
      await campaign.methods.withdraw().send({
        from: accounts[0],
      });
      setWithdrawModalOpen(true);
      } catch (e) {
      setErrorMessage(shortErrorMessage(e.message));
      setErrorModalOpen(true);
    }
    toast.dismiss(loadingToast);
    setIsSubmitting(false);
  };

  const handleOnRefund = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const loadingToast = toast.loading(
      "Your transaction is pending, please wait..."
    );
    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = await getCampaignInstance(router.query.cid);
      await campaign.methods.refund().send({
        from: accounts[0],
      });
      setRefundModalOpen(true);
      } catch (e) {
      setErrorMessage(shortErrorMessage(e.message));
      setErrorModalOpen(true);
    }
    toast.dismiss(loadingToast);
    setIsSubmitting(false);
  };
  /**
   * Renders contract details in cards in a grid layout
   * @returns {JSX.Element}
   */
  const renderCards = () => {
    const daysLeft = timestampGapToDays(currentTimestamp, deadline);
    if (daysLeft > 0) {
      campaignStatusSubtitle = "Days left: " + daysLeft.toString();
    } else {
      campaignStatusSubtitle = campaignStatus;
    };
    const items = [
      {
        title: "Campaign Goal",
        subtitle: web3.utils.fromWei(campaignGoal.toString(), "ether"),
        description: "This is the final goal of the campaign (in MATIC)",
      },
      {
        title: "Fundraised amount",
        subtitle: web3.utils.fromWei(raisedFunding.toString(), "ether"), 
        description: "Total amount of MATIC that has been contributed so far",
      },
      {
        title: "Campaign Deadline",
         subtitle: timestampToDate(deadline).toLocaleDateString(),
        description: "Date when campaign expires on (maximum 60 days)",
      },
      {
        title: "Contract balance",
        subtitle: web3.utils.fromWei(contractBalance.toString(), "ether"),
        description: "Current balance of the campaign contract (in MATIC)",
      },
      
      {
        title: "Number of contributors",
        subtitle: contributorsCount,
        description: "Number of people contributed to this project",
      },
      {
        title: "Campaign status",
        subtitle: campaignStatusSubtitle,
        description: "Current status of the campaign", 
      },
    ];
    return (
      <div>
        <Card title={title} description={description} campaignAddress={campaignAddress} managerAddress={managerAddress} />
        <CardList items={items} />
      </div>
    );
  };

  return (
    <>
      <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex flex-col justify-start mb-3 sm:mb-0">
          <h3 className="text-1xl font-extrabold text-center sm:text-left tracking-tight text-gray-700 sm:text-2xl">
            Campaign Details
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            See stats about your campaign's performance
          </p>
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row">
        <div className="lg:w-7/12">{renderCards()}</div>
        <div className="lg:w-5/12">
        {(campaignStatus == "Succeeded") ? (
          <>
            <CampaignResult
              title1={"This campaign has been finished successfully."}
              title2={"Congratulations!"} />
              <div className="flex justify-center py-2">
              <PrimaryButton
                buttonText="Withdraw"
                onClick={handleOnWithdraw}
                isSubmit={true}
                isLoading={props.isSubmitting} />
            </div>
          </>
          ) : (
              (campaignStatus == "Failed") ? (
                <>
                  <CampaignResult
                    title1={"This campaign hasn't reached the goal."}
                    title2={"Try again later!"} />
                    <div className="flex justify-center py-2">
                    <PrimaryButton
                      buttonText="Refund"
                      onClick={handleOnRefund}
                      isSubmit={true}
                      isLoading={props.isSubmitting} />
                  </div>
                </>
              ) : (
                <ContributeCTA
                onSubmit={handleOnSubmit}
                tokenInput={tokenInput}
                setTokenInput={setTokenInput}
                isSubmitting={isSubmitting}
              />
              )
            )
          }
        </div>
      </div>
      <Toaster />
      <SuccessModal
        isOpen={successModalOpen}
        setIsOpen={setSuccessModalOpen}
        onClose={() => {
          setSuccessModalOpen(false);
          router.push("/");
        }}
        title="Transaction successful!"
        subtitle="Your transaction has successfully went through! Thank you for contributing to the campaign!"
        buttonText="Back to Dashboard"
      />
      <SuccessModal
        isOpen={withdrawModalOpen}
        setIsOpen={setWithdrawModalOpen}
        onClose={() => {
          setWithdrawModalOpen(false);
        } }
        title="Transaction successful!"
        subtitle="Your campaign has succeeded! Congratulations!"
        buttonText="Close" 
      />
      <SuccessModal
        isOpen={refundModalOpen}
        setIsOpen={setRefundModalOpen}
        onClose={() => {
          setRefundModalOpen(false);
        }}
        title="Transaction successful!"
        subtitle="Your funds have been returned successfully!"
        buttonText="Close"
      />
      <ErrorModal
        isOpen={errorModalOpen}
        setIsOpen={setErrorModalOpen}
        onClose={() => {
          setErrorModalOpen(false);
        }}
        title="Transaction failed!"
        subtitle={errorMessage}
        buttonText="Close"
      />
    </>
  );
};

/**
 * Calls getCampaignSummary of the campaign instance to fetch campaign details before render
 * @param context
 * @returns {Promise<{contractBalance, requestCount, managerAddress, contributorCount, description, minimumContribution}>}
 */
CampaignDetails.getInitialProps = async (context) => {
  let campaignSummary = [0, '', '', '', 0, 0, 0, 0, 0, ""];
  const campaign = await getCampaignInstance(context.query.cid);
  try {
    campaignSummary = await campaign.methods.getCampaignSummary().call();
  } catch (e) {
    console.log(e.message);
  };

  return {
    campaignAddress: context.query.cid,
    contractBalance: campaignSummary[0],
    managerAddress: campaignSummary[1],
    title: campaignSummary[2],
    description: campaignSummary[3],
    campaignGoal: campaignSummary[4],
    contributorsCount: campaignSummary[5],
    raisedFunding: campaignSummary[6],
    deadline: campaignSummary[7],
    currentTimestamp: campaignSummary[8],
    campaignStatus: campaignSummary[9]
  };
};

export default CampaignDetails;
