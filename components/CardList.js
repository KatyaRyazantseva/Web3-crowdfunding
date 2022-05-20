import React from "react";
import SecondaryButton from "./Buttons/SecondaryButton";
import { useRouter } from "next/router";

/**
 * Cards in a grid layout to show campaign-related information
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function CardList(props) {
  const { items, showButton = false, showProgress = false, showStat = false } = props;
  const router = useRouter();
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-5"
    >
      {items.map((item) => (
        <li
          key={item.address}
          className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200 break-words border-2 border-white hover:border-violet-500"
        >
          <div className="px-4 py-5 sm:p-6">
            <div className="overflow-hidden">
              <dt className="mt-1 text-1xl font-semibold text-gray-900">
                {item.props.title}
              </dt>
              <dd className="text-sm font-medium text-gray-500 mt-1">
                {item.props.subtitle}
              </dd> 
              {item.props.description && (
                <dd className="text-sm font-light text-gray-500">
                  {item.props.description}
                </dd>
              )}
            </div>
            {showProgress && (<div className="w-full bg-gray-200 rounded-full mt-5">
              <div className="bg-violet-600 text-xs font-medium text-gray-100 text-center p-0.5 leading-none rounded-l-full rounded-r-full" style={{ width: item.props.campaignProgess + '%' }}> 
              </div>
            </div>
            )}
            {showStat && (
              <>
              <div className="text-sm font-medium text-gray-500 mt-5">
                Status: {item.props.campaignStatus}
              </div>
              <dd className="text-sm font-medium text-gray-500">
                Deadline: {item.props.deadline}
              </dd>
              <dd className="text-sm font-medium text-gray-500">
                Goal: {item.props.campaignGoal}
              </dd>
              <dd className="text-sm font-medium text-gray-500">
                Raised: {item.props.raisedFunding}
              </dd>
              </>
            )}
            {showButton && (
              <div className="mt-5">
                <SecondaryButton
                  buttonText="View Campaign"
                  onClick={() => {
                    router.push(`/campaigns/${item.address}`);
                  }}
                />
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
