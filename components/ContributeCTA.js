import TokenInput from "./TokenInput";
import PrimaryButton from "./Buttons/PrimaryButton";

/**
 * A form with a header to contribute to a campaign
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ContributeCTA = (props) => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl text-center">
          <span className="block">Interested in the project?</span>
          <span className="block text-violet-600">Contribute.</span>
        </h2>
        <div className="mt-8">
          <section className="p-2 xs:p-5 flex justify-center items-center">
            <form
              className="mb-4 flex justify-center items-end flex-wrap"
              onSubmit={props.onSubmit}
            >
              <TokenInput
                tokenInput={props.tokenInput}
                setTokenInput={props.setTokenInput}
                inputLabel="Set amount to contribute"
                currency="MATIC"
              />
              <div className="mt-4">
                <PrimaryButton
                  buttonText="Contribute"
                  isSubmit={true}
                  isLoading={props.isSubmitting}
                />
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContributeCTA;
