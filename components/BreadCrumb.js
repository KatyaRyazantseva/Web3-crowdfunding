import { HomeIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { capitalizeString } from "../utils/capitalize";

/**
 * Breadcrumb component to simplify user navigation
 * @returns {JSX.Element}
 * @constructor
 */
const BreadCrumb = () => {
  const router = useRouter();
  const [pages, setPages] = useState([]);

  const segments = router.asPath.split("/");
  segments.shift();

  useEffect(() => {
    let pages = [];
    let routeSegments = [];

    segments.forEach((segment, index) => {
      let currentBreadCrumbSegment;
      routeSegments.push(segment);

      if (segment.includes("0x")) {
        currentBreadCrumbSegment = {
          name: `${capitalizeString(segments[index - 1].slice(0, -1))} Details`,
          route: `/${[...routeSegments].join("/")}`,
          current: index === segments.length - 1,
        };
      } else {
        currentBreadCrumbSegment = {
          name: capitalizeString(segment),
          route:
            routeSegments.length === 1 && segment === "campaigns"
              ? "/"
              : `/${routeSegments.join("/")}`,
          current: index === segments.length - 1,
        };
      }

      pages.push(currentBreadCrumbSegment);
    }, []);

    setPages(pages);
  }, [router]);

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <button
              onClick={() => router.push("/")}
              className="text-white hover:text-violet-200"
            >
              <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </button>
          </div>
        </li>
        {pages.length &&
          pages.map((page, index) => (
            <li key={page.name}>
              <div className="flex items-center">
                {segments[0].length > 1 && (
                  <svg
                    className="flex-shrink-0 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>
                )}
                <button
                  className="ml-4 text-sm font-medium text-white hover:text-violet-200"
                  aria-current={page.current ? "page" : undefined}
                  onClick={() => router.push(page.route)}
                >
                  {page.name}
                </button>
              </div>
            </li>
          ))}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
