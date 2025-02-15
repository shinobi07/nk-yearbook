// Libraries
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import {
  globalStateContext,
  dispatchStateContext,
} from "../pages/_app";

//Components
import DropdownMenu from "./DropdownMenu";

// Styling
import navStyles from "@styles/components/Navigation.module.scss";

let links = require("@libs/links_temp.json");

const useGlobalState = () => [
  useContext(globalStateContext),
  useContext(dispatchStateContext),
];

const Navigation = ({}) => {
  const [state, dispatch] = useGlobalState();

  return (
    <>
      <nav className={navStyles.nav}>
        <Link href="/">
          <a className={navStyles.logo}>
            <Image
              alt="NK Image"
              src="/images/logo.png"
              width={91}
              height={64}
            />
          </a>
        </Link>
        <ul className={navStyles.lists}>
          {Object.keys(links).map((key, index) => (
            <li
              className={navStyles.listItems}
              key={index}
              onMouseEnter={() => {
                let navArray = state.nav;
                var i,
                  n = navArray.length;
                for (i = 0; i < n; ++i) {
                  navArray[i] = 0;
                }
                navArray[index] = 1;
                dispatch({ nav: navArray });
              }}
              onClick={() => {
                let navArray = state.nav;
                navArray[index] = 0;
                dispatch({ nav: navArray });
              }}
            >
              <Link href={links[key]["main"]["link"]}>
                <a className={navStyles.links}>
                  {links[key]["main"]["title"]}
                </a>
              </Link>
              {state.nav[index] ? (
                <DropdownMenu
                  key={index}
                  index={index}
                  listOfLinks={links[key]["links"]}
                  className={links[key]["links"].length > 0}
                ></DropdownMenu>
              ) : null}
            </li>
          ))}
        </ul>
      </nav>
      <div className={navStyles.divider}></div>
    </>
  );
};

export default Navigation;
