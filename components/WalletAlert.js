import { ExclamationIcon } from "@heroicons/react/solid";

/**
 * Simple alert component to show important information to the user
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const WalletAlert = (props) => {
  const { title, subtitle } = props;
  return (
    <div className="rounded-md bg-yellow-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationIcon
            className="h-5 w-5 text-yellow-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">{title}</h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletAlert;
