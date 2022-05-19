import Image from "next/image";
import maticLogo from "/resources/icons/matic-logo.svg";

/**
 * A customized number input component for sending tokens to send a transaction
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TokenInput = (props) => {
  const { tokenInput, setTokenInput, inputLabel, currency } = props;
  return (
    <div>
      <label
        htmlFor="amount"
        className="block text-sm font-medium text-gray-700">
        {inputLabel}
      </label>
      <div className="w-full max-w-xs mt-1 relative rounded-md shadow-sm flex items-end">
        <div className="w-full mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-2 pt-1 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">
              <Image
                src={maticLogo}
                alt="matic-logo"
                height={15}
                width={15}
                className="m-auto"
              />
            </span>
          </div>
          <input
            type="number"
            name="price"
            id="price"
            className="w-full focus:ring-violet-500 focus:border-violet-500 block pl-7 sm:text-sm border-gray-300 rounded-l-md"
            placeholder="Enter amount"
            aria-describedby="price-currency"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            required
          />
        </div>
        <div className="inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="inline-flex items-center px-3 py-2 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
            {currency}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TokenInput;
