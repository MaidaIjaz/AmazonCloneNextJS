import Image from "next/image";
import React from "react";
import Headers from "../components/Headers";
import { selectItems, selectTotal } from "../slices/basketSlice";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/react";

function checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const { data: session } = useSession();
  console.log(items);
  return (
    <div className="bg-gray-100">
      <Headers />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* Left Section  */}
        <div className="flex-grow m-5 shadow-sm">
          {/* upper container */}
          <Image
            className="h-64  object-contain"
            src="/product.jpg"
            width={1020}
            height={250}
            objectFit="contain"
          />
          {/* lower container */}
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length == 0 ? "Your Basket is Empty" : "Shopping Basket"}
            </h1>
            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                IsPrime={item.IsPrime}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        {/* Right Section */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {/* If there are items in show basket show right side of page else not */}
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items):{" "}
                <span className="font-bold">
                  <Currency quantity={total} currency="GBP" />
                </span>
              </h2>

              <button
                // If user is signed in show yellow button else gray (also show different text if signed In)
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {!session ? "Sign in to checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default checkout;
