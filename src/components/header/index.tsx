import React, { useState } from "react";

import { SwipeableDrawer } from "@mui/material";
import { Button, Text } from "components";
import { APP_ENV, APP_LANG, appRoutes } from "configs";
import { useAppDispatch, useAppSelector } from "hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { BiSolidUserCircle } from "react-icons/bi";
import { Tooltip as ReactTooltip } from "react-tooltip";
import {
  toggleMenu,
  changeLanguage,
  startLoading,
  finishLoading,
  IAppState
} from "redux";

const Header = () => {
  const { systemLanguage } = useAppSelector((state: IAppState) => state.language);
  const { showMenu, connectedUser } = useAppSelector((state: IAppState) => state.system);

  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const router = useRouter();

  const header = [
    {
      name: t("home"),
      link: appRoutes.home
    },
    {
      name: t("about"),
      link: appRoutes.about
    }
  ];

  const handleLogout = async () => {
    dispatch(startLoading());

    try {
      dispatch(finishLoading(false));
      router.push(appRoutes.login);
    } catch (error) {
      console.log(error);
      dispatch(finishLoading(true));
    }
  };

  const goToDashboard = () => {
    router.push(appRoutes.dashboard);
  };

  console.log({ showMenu });
  return (
    <div className="bg-white z-50 sticky top-0 py-4">
      <nav className=" w-[90%] tablet:w-[70%] m-auto">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <Link href={"/"} className="cursor-pointer">
            <div className="flex justify-center items-center">
              <img src={"/logo.jpeg"} width={50} className="cursor-pointer mr-2" />
              <Text text={APP_ENV.APP_NAME} variant="xLarge" />
            </div>
          </Link>
          <div className="md:hidden">
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm text-white-500 rounded-lg "
              aria-controls="navbar-default"
              aria-expanded="false"
              onClick={() => setOpen((prev) => !prev)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>

            <SwipeableDrawer
              anchor={"top"}
              open={open}
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              onClick={() => {
                if (showMenu) {
                  dispatch(toggleMenu());
                }
              }}
            >
              <div className="p-11 flex flex-col justify-center items-center">
                <div className="flex flex-col">
                  <img
                    src={"/logo.jpeg"}
                    width={149}
                    height={44}
                    className="cursor-pointer"
                  />
                  <Text text={APP_ENV.APP_NAME} />
                </div>

                <div className="pb-10">
                  <ul id="ast-hf-menu-1" className="mt-6" aria-expanded="false">
                    {header.map((item) => (
                      <li
                        key={item.link}
                        onClick={() => setOpen(false)}
                        className={`hover:text-primary ${
                          router.pathname === item.link ? "text-primary" : ""
                        }`}
                      >
                        <Link
                          href={item.link}
                          className="text-center block py-2 pl-3 pr-4 text-white-700 text-md screen1020:text-lg rounded md:border-0 md:hover:text-tertiary md:p-0 "
                          rel="noreferrer"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                    <li className="flex justify-center items-center">
                      <p
                        onClick={() => dispatch(toggleMenu())}
                        id="dropdownDefaultButton"
                        data-dropdown-toggle="dropdown"
                        className="font-medium rounded-lg text-sm px-4 py-1 text-center inline-flex hover:text-primary items-center cursor-pointer"
                      >
                        {systemLanguage.toUpperCase()}
                        <svg
                          className="w-4 h-4 ml-2"
                          aria-hidden="true"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </p>
                      <div
                        id="dropdown"
                        className={`z-10 ${showMenu ? "block" : "hidden"}
                         ${"bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute"}`}
                      >
                        <ul
                          className="py-2 text-sm"
                          aria-labelledby="dropdownDefaultButton"
                        >
                          <li
                            onClick={() => dispatch(changeLanguage("en"))}
                            className={`text-center  px-4 py-2 ${
                              systemLanguage == APP_LANG.EN ? "text-primary" : ""
                            } cursor-pointer`}
                          >
                            {t("en")}
                          </li>
                          <li
                            onClick={() => dispatch(changeLanguage("fr"))}
                            className={`text-center  px-4 py-2 ${
                              systemLanguage == APP_LANG.FR ? "text-primary" : ""
                            } cursor-pointer`}
                          >
                            {t("fr")}
                          </li>
                        </ul>
                      </div>
                    </li>
                    {!connectedUser?.uid ? (
                      <li className="flex justify-center items-center">
                        <Button
                          text={t("login")}
                          borderColor="primary"
                          onClick={() => router.push(appRoutes.login)}
                        />
                      </li>
                    ) : (
                      <>
                        <li
                          className="flex justify-center items-center cursor-pointer"
                          data-tooltip-id="tooltip-1"
                          onClick={goToDashboard}
                        >
                          <div>
                            <BiSolidUserCircle className="text-6xl text-primary" />
                            <div>
                              <Text
                                text={connectedUser?.username}
                                color="primary"
                                className="!mb-0"
                              />
                              <Text
                                text={connectedUser?.role}
                                color="primary"
                                variant="small"
                                className="!mb-0 border-primary border-[1px] rounded-lg text-center"
                              />
                            </div>
                            <Text
                              text={t("logout")}
                              color="primary"
                              onClick={handleLogout}
                              className="!mb-0 rounded-lg text-center pt-3 cursor-pointer hover:text-secondary"
                            />
                          </div>
                        </li>
                        <ReactTooltip
                          id={"tooltip-1"}
                          place="bottom"
                          content={"View Dashboard"}
                        />
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </SwipeableDrawer>
          </div>
          <div
            className="hidden w-full md:flex md:w-[50%] justify-between items-center"
            id="navbar-default"
          >
            <ul className="flex flex-col p-4 mt-4 border items-center border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
              {header.map((item, ind) => (
                <li key={ind}>
                  <Link href={item.link}>
                    <Text
                      text={item.name}
                      className={"hover:text-primary"}
                      bold
                      color={router.pathname === item.link ? "primary" : undefined}
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex justify-center items-center">
              {!connectedUser?.uid ? (
                <Button
                  text={t("login")}
                  borderColor="primary"
                  onClick={() => router.push(appRoutes.login)}
                />
              ) : (
                <>
                  <div
                    className="flex items-center cursor-pointer"
                    data-tooltip-id="tooltip-1"
                    onClick={goToDashboard}
                  >
                    <BiSolidUserCircle className="text-6xl mr-2.5 text-primary" />
                    <div>
                      <Text
                        text={connectedUser?.username}
                        color="primary"
                        className="!mb-0"
                      />
                      <Text
                        text={connectedUser?.role}
                        color="primary"
                        variant="small"
                        className="!mb-0 border-primary border-[1px] rounded-lg text-center"
                      />
                    </div>
                    <div className="ml-3">
                      <Text
                        text={t("logout")}
                        color="primary"
                        className="!mb-0 rounded-lg text-center px-2 cursor-pointer hover:text-secondary"
                        onClick={handleLogout}
                      />
                    </div>
                  </div>
                  <ReactTooltip
                    id={"tooltip-1"}
                    place="bottom"
                    content={"View Dashboard"}
                  />
                </>
              )}
              <p
                onClick={() => dispatch(toggleMenu())}
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex hover:text-primary items-center cursor-pointer"
              >
                {systemLanguage.toUpperCase()}
                <svg
                  className="w-4 h-4 ml-2"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </p>
              <div
                id="dropdown"
                className={`z-10 ${
                  showMenu ? "block" : "hidden"
                } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute`}
              >
                <ul className="py-2 text-sm" aria-labelledby="dropdownDefaultButton">
                  <li
                    onClick={() => dispatch(changeLanguage("en"))}
                    className={`block px-4 py-2 ${
                      systemLanguage == APP_LANG.EN ? "text-primary" : ""
                    } cursor-pointer`}
                  >
                    {t("en")}
                  </li>
                  <li
                    onClick={() => dispatch(changeLanguage("fr"))}
                    className={`block px-4 py-2 ${
                      systemLanguage == APP_LANG.FR ? "text-primary" : ""
                    } cursor-pointer`}
                  >
                    {t("fr")}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
