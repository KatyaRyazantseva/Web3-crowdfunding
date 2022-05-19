import PrimaryButton from "./Buttons/PrimaryButton";

/**
 * A form with the result of a campaign
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const CampaignResult = (props) => {

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl text-center">
          <span className="block">{props.title1}</span>
          <span className="block text-violet-600">{props.title2}</span>
        </h2>
      </div>
    </div>
  );
};

export default CampaignResult;

