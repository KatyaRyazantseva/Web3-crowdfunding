import classNames from "classnames";

/**
 * Secondary button for non-transaction related actions
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const SecondaryButton = (props) => {
  const {
    isSubmit = false,
    isLoading = false,
    buttonText,
    onClick,
    approveColor,
  } = props;

  return (
    <button
      type={isSubmit ? "submit" : "button"}
      disabled={isLoading}
      onClick={onClick}
      className={classNames(
        approveColor
          ? "text-green-700 bg-green-100 hover:bg-green-200 focus:ring-green-500"
          : "text-violet-700 bg-violet-100 hover:bg-violet-200 focus:ring-violet-500",
        isLoading && approveColor && "bg-green-200",
        isLoading && !approveColor && "bg-violet-200",
        "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
      )}
    >
      {isLoading ? (
        <div className="flex items-center justify-center ">
          <div className="w-4 h-4 border-t-2 border-r-2 rounded-full animate-spin mx-5"></div>
        </div>
      ) : (
        buttonText
      )}
    </button>
  );
};

export default SecondaryButton;
