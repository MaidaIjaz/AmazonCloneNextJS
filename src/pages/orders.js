import React from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import Headers from "../components/Headers";
import moment from "moment";
import Order from "../components/Order";
import db from "../../firebase";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  orderBy,
} from "firebase/firestore";

// pass orders as props, we are doing ssr (fetch data beforehand) to prefetch orders
function Orders({ orders }) {
  const { data: session } = useSession();

  return (
    <div>
      <Headers />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>
        {session ? (
          <h2>{orders.length} Orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}
        <div className="mt--5 space-y-4">
          {
            // Destructure items and pass props to order component
            orders?.map(
              ({ id, amount, amountShipping, items, timestamp, images }) => (
                <Order
                  key={id}
                  id={id}
                  amount={amount}
                  amountShipping={amountShipping}
                  items={items}
                  timestamp={timestamp}
                  images={images}
                />
              )
            )
          }
        </div>
      </main>
    </div>
  );
}

export default Orders;

//  Anything inside getServerSideProps is Node.js
export async function getServerSideProps(context) {
  // Establish connection to Stripe
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  // Get the users logged in credentials..
  const session = await getSession(context);
  if (!session) {
    return {
      props: {},
    };
  }

  const docRef = query(
    collection(db, "users", session.user.email, "orders"),
    orderBy("timestamp", "desc")
  );
  const docSnap = await getDocs(docRef);

  const orders = await Promise.all(
    docSnap.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      // translate timestamp to string else data will be lost
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      // async code that returns some info and then I am accessing data that is mapped to items
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );
  return {
    props: {
      orders,
      session,
    },
  };
}
