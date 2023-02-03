import Head from "next/head";
import Banner from "../components/Banner";
import Headers from "../components/Headers";
import ProductFeed from "../components/ProductFeed";

export default function Home(props) {
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
        {/* Product feed */}
        <ProductFeed products ={props.products}  />
      </main>
    </div>
  );
}


// Tells NextJS it is no longer a static page (needs to have middle server step)
export async function getServerSideProps(context){
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );
  return {
    // pass data to actual component by returning props
    props: {
      products,
    },
  };
}

// GET https://fakestoreapi.com/products