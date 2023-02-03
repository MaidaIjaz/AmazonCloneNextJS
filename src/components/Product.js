import { useEffect, useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import Currency from "react-currency-formatter";
// Useful hook for dispatching an action
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

const MAX_RATING = 5;
const MIN_RATING = 1;
function Product({ id, title, price, description, category, image }) {
  // The default value is 0, it will be used during pre-rendering and the first render in the browser (hydration)
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [IsPrime, setIsPrime] = useState(0);

  useEffect(() => {
    setRating(
      Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );
    setIsPrime(Math.random() < 0.5);
  });

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

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <Image
        className="h-52 w-52 object-contain self-center"
        src={image}
        alt={title}
        height={200}
        width={200}
        objectFit="contain"
        loading="lazy"
      />
      {/* h4 is better for SEO */}
      <h4 className="my-3">{title}</h4>
      <div className="flex">
        {/* Filling an empty array, we don't care about initial value we just care about index */}
        {/* Filling star equal to randomized number */}
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon className="h-5 text-yellow-500" />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{description}</p>
      {/* Whenever we are dealing with currency we have to use react external package "react-currency-formatter" */}
      <div className="mb-5">
        <Currency quantity={price} currency="GBP" />
      </div>

      {IsPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img className="w-12" src="/Prime_logo.png" alt="Amazon Prime Logo" />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}
      <button
        onClick={() => {
          addItemToBasket();
        }}
        className="mt-auto button"
      >
        Add to Basket
      </button>
    </div>
  );
}

export default Product;
