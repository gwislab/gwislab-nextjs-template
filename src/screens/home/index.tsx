import React from "react";

import { useAppDispatch, useAppSelector } from "hooks";
import Head from "next/head";
import { decrementCount, incrementCount } from "redux";

const HomeScreen = () => {
  const count = useAppSelector((state) => state.test.count);
  // const {editor} = useSelector(state => state.grapes);

  const dispatch = useAppDispatch();
  return (
    <div>
      <Head>
        <title>{"Gwislab React Nextjs Template"}</title>
      </Head>
      <div className=" w-fit flex-col align-center m-auto mb-4">
        <h3 className="text-secondary text-xl">Gwislab React Nextjs Template</h3>
        <h1 className="text text-5xl font-bold">Gwislab count --- {count}</h1>
        <div className="flex align-center pt-4">
          <button
            className="text-white rounded-md shadow bg-primary px-4 py-2 mr-2"
            onClick={() => dispatch(incrementCount(10))}
          >
            Increment
          </button>
          <button className="rounded-md shadow bg-secondary px-4 py-2" onClick={() => dispatch(decrementCount(10))}>
            Decrement
          </button>
        </div>
      </div>
      <div id="gjs">
        <h1>Hello World Component!</h1>
      </div>
      <div id="blocksS"></div>
    </div>
  );
};

export default HomeScreen;
