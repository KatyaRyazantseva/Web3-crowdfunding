import React from "react";
import Header from "./Header";

/**
 * Layout component that contains a page for every route
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const MainLayout = (props) => {
  return (
    <div>
      <Header />
      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <div className=" bg-white rounded-lg shadow sm:px-5 sm:py-6">
            {props.children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
