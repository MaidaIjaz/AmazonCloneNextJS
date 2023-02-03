import Head from "next/head";
import Banner from "../components/Banner";
import Headers from "../components/Headers";

export default function Home() {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon Clone</title>
      </Head>
      {/* Header */}
      <Headers />
      {/* Set maximum zoom out */}
      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner />
      </main>
    </div>
  );
}
