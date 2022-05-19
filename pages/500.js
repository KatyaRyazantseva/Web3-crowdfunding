import { useRouter } from "next/router";

const Page500 = () => {
  const router = useRouter();
  return (
    <>
      <div className="bg-white min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="max-w-max mx-auto">
          <main className="sm:flex">
            <p className="text-4xl font-extrabold text-violet-600 sm:text-5xl">
              500
            </p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                  Oooops, something went wrong...
                </h1>
                <p className="mt-3 text-base text-gray-500">
                  Make sure your wallet is connected and the correct network is selected
                </p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <button
                  onClick={() => router.push("/")}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                >
                  Go back home
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Page500;
