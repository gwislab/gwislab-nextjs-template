import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>{"Gwislab React Nextjs Template"}</title>
      </Head>
      <div className=" w-fit flex-col align-center m-auto mb-4">
        <h3 className="text-secondary text-xl">
          Gwislab React Nextjs Template
        </h3>
        <h1 className="text text-5xl font-bold">Gwislab</h1>
      </div>
    </div>
  );
}
