import Image from "next/image";
import { increaseDate } from "../utils/utils.js";

/**
 * A customized deadline input component
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const DeadlineInput = (props) => {
  const { inputLabel, deadlineInput, setDeadlineInput } = props;
  const currentDate = new Date();
  const minDeadline = increaseDate(new Date(), 1);
  const maxDeadline = increaseDate(new Date(), 60); // maximum days
  
  return (
    <div>
      <label
        htmlFor="deadline"
        className="block text-sm font-medium text-gray-700"
      >
        {inputLabel}
      </label>
      <div className="w-full max-w-xs mt-1 relative rounded-md flex items-end">
        <div className="w-full mt-1 relative rounded-md flex flex-row items-start">
          <div className=" relative form-floating w-full xl:w-96">
            <input 
              type="date"
              name="deadline"
              id="deadline"
              min={minDeadline}
              max={maxDeadline}
              className="form-control block w-full bg-clip-padding  focus:ring-violet-500 focus:border-violet-500  sm:text-sm border-gray-300 rounded-md"
              placeholder="Select a date" 
              aria-describedby="deadline"
              value={deadlineInput}
              onChange={(e) => setDeadlineInput(e.target.value)}
              required 
            />
          </div>
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-500">
        Choose the date your campaign expires on
      </p>
    </div>
  );
};

export default DeadlineInput;
