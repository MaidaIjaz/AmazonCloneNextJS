import { getSession } from "next-auth/react";
import Head from "next/head";
// import { Provider } from "react-redux";
import Banner from "../components/Banner";
import Headers from "../components/Headers";
import ProductFeed from "../components/ProductFeed";


export default function Home(props) {
  return (
    // <Provider store={store}>
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
    // </Provider>
  );
}


// Tells NextJS it is no longer a static page (needs to have middle server step)
export async function getServerSideProps(context){
  const session = await getSession(context);
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );
  return {
    // pass data to actual component by returning props
    props: {
      products,
      session
    },
  };
}

// GET https://fakestoreapi.com/products