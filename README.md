# Implement Stripe Checkout in NextJS App for Payment of Products in Basket

## What is Stripe?

Stripe Checkout is a pre-built, customizable payment form that allows users to securely enter their payment information and make a purchase on your website. It can be easily integrated into a Next.js e-commerce website by using the Stripe Checkout API.
## General work flow

Using the code in this repository users would be able to pay for the products in basket using credit card. When we have items in our basket and click checkout, we pass items from basket to stripe, stripe then return checkout session and then user is redirected to that session. Once it goes through Stripe session, it either fails or succeeds. And then come back to our website.


## Detailed Instructions

To integrate Stripe Checkout into a Next.js e-commerce website, you will need to do the following steps:

* Sign up for a Stripe account, obtain your API keys and add them in .env file.
* Install the Stripe JavaScript library in your Next.js project by running the command npm install stripe.
* Create an event handler in your Next.js application for handling the checkout process. 
* Use the Stripe library to create a new Stripe Checkout session, which will generate a unique checkout URL. 
* Redirect the user to the checkout URL when they click the "Checkout" button on your e-commerce website.
* Handle the successful completion of the checkout process by displaying a success message to the user.


## Installation Steps

Run following commands in your terminal:

1. ```npm install```
2. ```npm run dev```


![Stripe Page](stripe.png?raw=true "Stripe Page")
