# Amazon Clone

In this project, I used NextJS, Tailwind CSS, and JavaScript to build the frontend of application. Redux is used for managing the state of application and Firebase to store backend data. For payments I have used Stripe API and Webhooks. Also, I used **Axios** for API calls. Here is the final link of my [deployment](https://amazon-clone-next-js-ashy.vercel.app/).


* Used the powerful tools provided by **NextJS** to implement Server-Side Rendering(**SSR**) for better website performance (**99 performance score on Google PageSpeed Insights**).
* Build a responsive frontend of Amazon using **TailwindCSS**.
* Used [next-auth](https://next-auth.js.org/) to Log In and Log Out the user from the application.
* Implemented Add and Remove product from basket functionality and calculated the total price of products in the basket using **Redux**. 
* Integrated [Stripe API](https://stripe.com/docs/treasury/examples/sample-app) in NextJS App for Payment of Products in Basket.
* Used **Webhooks** to receive real-time updates about payment completion and push order data to Firestore.
* Build a **Cloud Firestore database** to have an order history page with all your orders details.
* Used **Vercel** for the final deployment of application.

Using SSR and Image components of NextJS provides us with the best performance. Google PageSpeed Insights give the following results:

| ![Performance Score](perfScore.png?raw=true "Performance Score") |
|-|


# Installation Steps

Clone this repository and Run following commands in your terminal:

1. ```npm install```
2. ```npm run dev```

For webhooks you need to use a local emulator for listening to events, so install Stripe CLI and run the following command:

```stripe listen --forward-to http://localhost:3000/api/webhook```



## Header Component

First, I started by building the Header of Amazon page. There are two headers. I used `@heroicons/react` for basic icons and to style the page I used Tailwind CSS tricks. Also, I used NextJS image tag to serve the amazon logo as it serves the image in the most optimised way. 


## Banner Component

Next, I created the banner (show 3 banners with animation) component. I used
[react-responsive-carousel](https://www.npmjs.com/package/react-responsive-carousel) which is a lightweight and fully customizable carousel component for React apps. 

## Product and ProductFeed Component

I fetched product data from the [fake store api](https://fakestoreapi.com/products
). I implemented Server Side Rendering using `getServerSideProps()` which will pre-render the product page by getting data from fakestoreapi and then I am passing data to the actual component as props.

## Authentication (Sign-In User Using Google Credentials)

I used [next-auth](https://next-auth.js.org/) to setup  authentication in a few easy steps.
To add NextAuth.js to a project create a file called `[...nextauth].js` in `pages/api/auth`. This contains the dynamic route handler for NextAuth.js which will also contain all of your global NextAuth.js configurations. All requests to /api/auth/* (signIn, callback, signOut, etc.) will automatically be handled by NextAuth.js.


## Build Checkout Page Using Redux

Then I built a checkout page where I showed all the products in the basket on the left side of the page and total price on the right side of the page. I also implemented Add and Remove product from basket functionality and calculated the total price of products in the basket using Redux. 


## Implement Stripe Checkout in NextJS App for Payment of Products in Basket

Stripe Checkout is a pre-built, customizable payment form that allows users to securely enter their payment information and make a purchase on your website. It can be easily integrated into a Next.js e-commerce website by using the Stripe Checkout API. After integrating the Stripe API in our code, users would be able to pay for the products in basket using their credit card. When users have items in our basket and click checkout, we pass items from basket to stripe, stripe then return checkout session and then user is redirected to that session. Once it goes through Stripe session, it either fails or succeeds. And then come back to our website.


### Detailed Instructions

To integrate Stripe Checkout into a Next.js e-commerce website, you will need to do the following steps:

* Sign up for a Stripe account, obtain your API keys and add them in .env file.
* Install the Stripe JavaScript library in your Next.js project by running the command `npm install stripe`.
* Create an event handler in your Next.js application for handling the checkout process.
* Create a new endpoint on your Next.js server that will use the Stripe library to create a new Stripe Checkout session, and generate a unique checkout URL (`pages/api/checkout_sessions`). 
* Redirect the user to the checkout URL when they click the "Checkout" button on your e-commerce website.
* Handle the successful completion of the checkout process by displaying a success message to the user.

## Implement Webhooks, Push Successful Orders Data to Firestore and Build Success Page

[Webhooks](https://stripe.com/docs/webhooks) in Stripe allow you to receive real-time updates about events that happen in your Stripe account. When certain events occur, such as a successful payment or a charge being refunded, Stripe will send an HTTP request to the webhook endpoint that you have configured. This request will contain information about the event, such as the type of event, the data associated with the event, and a timestamp of when the event occurred. You can use webhooks to add data of orders for which payment has been completed through stripe.


### Detailed Instructions

* Create a new endpoint on your Next.js server that will handle the webhook from Stripe. This endpoint should be able to receive and parse the JSON payload sent by Stripe.
* Verify that the webhook is authentic by checking the signature provided in the headers of the incoming request.
* Check the event type in the payload to see if it's a "checkout.session.completed" event.
* If it is a "checkout.session.completed" event, extract the relevant data from the payload, such as the customer's email and the amount of the transaction.
* Anything inside api is on backend and running node.js not regular javascript. If you use regular firebase dependency inside api you will get into error (that why we are using firebase-admin). Use the Firebase Admin to push this data to your Firebase store.
* Once data is pushed, you can use Firestore to retrieve the data.
* We also built a success page to show the Thank you message.

## Build Order Page

In the order page, users can see the data of all the successful orders. We will use `getServerSideProps()` function of NextJS to prefetch order items from firebase store and Stripe session details. We then return these items as props. When you request order page directly, `getServerSideProps` runs at request time, and this page will be pre-rendered with the returned props. Please check this [link](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props) to read more about getServerSideProps. We then pass these props to the Order component where we display the details of each order.
