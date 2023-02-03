// Secret key is  never exposed to the frontend
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { selectTotal } from "../../slices/basketSlice";
import { useSelector } from "react-redux";

// const total = useSelector(selectTotal);

export default async function handler(req, res) {

// export default async  (req, res) => {
  const { items, email } = req.body;

  // Implicit return
  const transformedItems = items.map((item) => ({
    // Take every item and transform into something that Stripe accepts
    // flat array of items so quantity will always be 1
   
    quantity: 1,
   
    price_data: {   
      currency: "gbp",
      // Stripe take every currency in subcurrency
      // for pound it will take penny
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image],
        description: item.description,
      },
    },
   
  }));

  if (req.method === 'POST') {
  try {
  // Create Checkout Sessions from body params.
  const session = await stripe.checkout.sessions.create({
    payment_method_types: [ "card" ],
    // Take shipping address and specify allowed countries
    shipping_address_collection: {
      allowed_countries: ["GB", "ES", "HU", "US", "CA"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {amount: 5, currency: 'gbp'},
          display_name: 'Fast shipping',
          delivery_estimate: {
            minimum: {unit: 'business_day', value: 1},
            maximum: {unit: 'business_day', value: 3},
          },
        },
      },
    ],

    // line_items: transformedItems,
   
    line_items:  transformedItems,
    mode: "payment",
    // Redirect user to website in case pf success and failure
    // success_url: `${process.env.HOST}/success`,
    // cancel_url: `${process.env.HOST}/checkout`,
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    // push info from stripe to correct place in firebase
    metadata: {
      email,
      // Make array of one massive string
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });
  console.log("session created", session.id);
  // stripe give id back
  res.status(200).json({ id: session.id });
  //  res.redirect(303, session.url);
  } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      
    } }
    else {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
    
  }
};
