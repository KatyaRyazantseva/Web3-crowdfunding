/**
 * Primary button that is used for main actions
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const PrimaryButton = (props) => {
  const { isSubmit = false, isLoading = false, buttonText, onClick } = props;

  return (
    <button
      type={isSubmit ? "submit" : "button"}
      disabled={isLoading}
      onClick={onClick}
      className="h-min inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 sm:text-sm"
    >
      {isLoading ? (
        <div className="flex items-center justify-center ">
          <div className="w-5 h-5 border-t-2 border-r-2 rounded-full animate-spin mx-5"></div>
        </div>
      ) : (
        buttonText
      )}
    </button>
  );
};

export default PrimaryButton;
