# Build Order Page

In the order page, users can see the data of all the successful orders. We will use `getServerSideProps()` function of NextJS to prefetch order items from firebase store and Stripe session details. We then return these items as props. When you request order page directly, `getServerSideProps` runs at request time, and this page will be pre-rendered with the returned props. Please check this [link](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props) to read more about getServerSideProps. We then pass these props to the Order component where we display the details of each order.



## Installation Steps

Run following commands in your terminal:

1. ```npm install```
2. ```npm run dev```

For webhooks we need to use a local emulator for listening to events (need stripe cli). Run this command:
stripe listen --forward-to http://localhost:3000/api/webhook


![Orders Page](order.png?raw=true "Orders Page")



