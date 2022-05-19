import React, { useState } from "react";
import TokenInput from "../../components/TokenInput";
import DeadlineInput from "../../components/DeadlineInput";
import getFactoryInstance from "../../web3/utils/factory";
import { Toaster, toast } from "react-hot-toast";
import SuccessModal from "../../components/Modals/SuccessModal";
import ErrorModal from "../../components/Modals/ErrorModal";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import { useRouter } from "next/router";
import SecondaryButton from "../../components/Buttons/SecondaryButton";
import { web3 } from "../../utils/web3";
import { shortErrorMessage, dateToTimestamp } from "../../utils/utils.js";

/**
 * Page to create new campaigns
 * @returns {JSX.Element}
 * @constructor
 */
const CampaignNew = () => {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  const [deadlineInput, setDeadlineInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  /**
   * Handle function to create a new campaign using the factory contract
   * @param e Event object
   * @returns {Promise<void>}
   */
  
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const deadline = dateToTimestamp(deadlineInput);
    if (deadline === 0) {
      toast.error("Enter valid deadline!");
      return;
    }

    setIsSubmitting(true);

    const loadingToast = toast.loading(
      "Your transaction is pending, please wait..."
    );

    try {
      const accounts = await web3.eth.getAccounts();
      await getFactoryInstance()
        .methods.createCampaign(
          web3.utils.toWei(tokenInput, "ether"),
          accounts[0],
          title,
          description,
          deadline
        )
        .send({ from: accounts[0] });
      setSuccessModalOpen(true);
    } catch (e) {
      setErrorMessage(shortErrorMessage(e.message));
      setErrorModalOpen(true);
    }
    toast.dismiss(loadingToast);
    setIsSubmitting(false);
  };

  return (
    <>
    <Toaster />
      <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-1xl font-extrabold tracking-tight text-gray-700 sm:text-2xl">
          Create a campaign
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Create a new crowdfunding campaign
        </p>
      </div>
      <section className="p-8 sm:p-5 sm:w-8/12 m-auto">
        <form className="space-y-3" onSubmit={handleOnSubmit}>
        <div className="sm:col-span-6">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="title"
                name="title"
                className="shadow-sm focus:ring-violet-500 focus:border-violet-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                required
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Describe your campaign in a few words.
            </p>
          </div>
          <div className="sm:col-span-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                name="description"
                rows={3}
                className="shadow-sm focus:ring-violet-500 focus:border-violet-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                required
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Describe your campaign in a few words
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <div>
              <TokenInput
                tokenInput={tokenInput}
                setTokenInput={setTokenInput}
                inputLabel="Goal"
                currency="MATIC"
              />
              <p className="mt-2 text-sm text-gray-500">
              Set the final goal of your campaign
              </p>
            </div>
            <DeadlineInput
              deadlineInput={deadlineInput}
              setDeadlineInput={setDeadlineInput}
              inputLabel="Deadline"
            />
          </div>
          <div className="flex justify-between pt-3">
            <PrimaryButton
              buttonText="Create campaign"
              isSubmit={true}
              isLoading={isSubmitting}
            />
            <SecondaryButton
              buttonText="Back"
              onClick={() => window.history.back()}
            />
          </div>
        </form>
        <SuccessModal
          isOpen={successModalOpen}
          setIsOpen={setSuccessModalOpen}
          onClose={() => {
            setSuccessModalOpen(false);
            router.push("/");
          }}
          title="Transaction successful!"
          subtitle="Your transaction has successfully went through! Good work
                      on creating a campaign!"
          buttonText="Back to Dashboard"
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
      </section>
    </>
  );
};

export default CampaignNew;
