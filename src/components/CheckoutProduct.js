import Image from "next/image";
import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

function CheckoutProduct({
  id,
  title,
  price,
  description,
  category,
  image,
  IsPrime,
  rating,
}) {
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      IsPrime,
      rating,
    };
    // Sending product as an action to Redux store
    // Product is passed as payload
    dispatch(addToBasket(product));
  };

  const removeItemFromBasket = () => {
    // Remove item from redux store, sending product id as payload
    dispatch(removeFromBasket(id));
  };

  return (
    // Left side of check page
    <div className="grid grid-cols-5">
      {/* Display product image on left (1 col)  */}
      <Image
        className="h-52 w-52 object-contain"
        src={image}
        height={200}
        width={200}
        objectFit="contain"
      />

      {/* Display product details span 3 cols */}
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <div className="mb-5">
          <Currency quantity={price} currency="GBP" />
        </div>

        {IsPrime && (
          <div className="flex items-center space-x-2 ">
            <img
              loading="lazy"
              className="w-12"
              src="/Prime_logo.png"
              alt="Amazon Prime Logo"
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>

      {/* Display buttons span 1 col */}
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button
          //   Dispatch Add item action
          onClick={() => {
            addItemToBasket();
          }}
          className="mt-auto button"
        >
          Add to Basket
        </button>
        <button
          //   Dispatch Remove item action
          onClick={() => {
            removeItemFromBasket();
          }}
          className="mt-auto button"
        >
          Remove from Basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
