import React, { use } from "react";
import Image from "next/image";
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import { useSession, signIn, signOut } from "next-auth/react";
// In NextJS we have a built-in router this allows user to redirect to the page it want to
import { Router, useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";

function Headers() {
  // Use useSession hook to access session state
  const { data: session } = useSession();
  //  This hook gives us Router object
  const router = useRouter();
  const items = useSelector(selectItems);
  return (
    <header>
      {/* Top header */}
      <div className="flex flex-grow items-center bg-amazon_blue p-1  py-2">
        {/* Amazon logo */}
        <div
          onClick={() => router.push("/")}
          className="mt-4 mx-4 flex items-center flex-grow sm:flex-grow-0 w-24 h-11 object-contain"
        >
          {/* Using NexJS image tag as it compress image and does not loose quality as it uses webp image format */}
          {/* Serve image in the most optimized way */}
          <Image
            // Pages are stacked up over each other
            //  Navigate to home page

            // src="/amazon_logo.png"
            src="/amazon_logo.png"
            width={100}
            height={40}
            alt="Amazon logo"
            // contain : increases or decreases the size of the image to fill the box whilst preserving its aspect-ratio.
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>

        {/* Search bar */}
        {/* Hide search bar on small screen */}
        <div className="hidden sm:flex items-center h-10 rounded-md flex-grow bg-yellow-400 hover:bg-yellow-500">
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none"
            type="text"
          />
          <MagnifyingGlassIcon className="h-12 p-4" />
        </div>

        {/* Right side icons*/}
        <div className="text-white flex items-center  text-xs space-x-6 mx-6 whitespace-nowrap">
          <div
            onClick={() => (!session ? signIn() : signOut())}
            className="link font-extrabold md:text-sm"
          >
            {/* If user logged In, show user name, else say sign in */}
            {session ? `Hello, ${session.user.name}` : "Sign In"}
            {/* <p className="font-extrabold md:text-sm">Account & Lists</p> */}
          </div>
          <div 

          // Navigate to order page
          onClick={() => router.push("/orders")}
          className="cursor-pointer link">
            <p className="font-extrabold md:text-sm">Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>
          <div

          // Navigate to checkout
            onClick={() => router.push("/checkout")}
            className="relative link flex items-center"
          >
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
              {items.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>

      {/* Bottom header */}
      <div className="flex items-center space-x-3 p-2 pl-5 bg-amazon_blue-light text-white text-sm">
        <p className="link flex items-center">
          <Bars3Icon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deals</p>
        {/* Display these items on large screen */}
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food & Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  );
}

export default Headers;
