# Implement Webhooks, Push Successful Orders Data to Firestore and Build Success Page

## General work flow

Webhooks in Stripe allow you to receive real-time updates about events that happen in your Stripe account. When certain events occur, such as a successful payment or a charge being refunded, Stripe will send an HTTP request to the webhook endpoint that you have configured. This request will contain information about the event, such as the type of event, the data associated with the event, and a timestamp of when the event occurred. You can use webhooks to add data of orders for which payment has been completed through stripe.

Webhook Link: https://stripe.com/docs/webhooks

## Detailed Instructions

* Create a new endpoint on your Next.js server that will handle the webhook from Stripe. This endpoint should be able to receive and parse the JSON payload sent by Stripe.

* Verify that the webhook is authentic by checking the signature provided in the headers of the incoming request.

* Check the event type in the payload to see if it's a "checkout.session.completed" event.

* If it is a "checkout.session.completed" event, extract the relevant data from the payload, such as the customer's email and the amount of the transaction.

* Anything inside api is on backend and running node.js not regular javascript. If you use regular firebase dependency inside api you will get into error (that why we are using firebase-admin). Use the Firebase Admin to push this data to your Firebase store.

* Once data is pushed, you can use Firestore to retrieve the data.

* We also built a success page to show the Thank you message.


## Installation Steps

Run following commands in your terminal:

1. ```npm install```
2. ```npm run dev```

For webhooks we need to use a local emulator for listening to events (need stripe cli). Run this command:
stripe listen --forward-to http://localhost:3000/api/webhook


![Success Page](success.png?raw=true "Success Page")



