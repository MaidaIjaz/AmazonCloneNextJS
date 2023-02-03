import {buffer} from 'micro';
import { doc, setDoc, serverTimestamp, getFirestore } from 'firebase/firestore'
import * as admin from 'firebase-admin';
import { firestore } from 'firebase/app'
import serviceAccount from "../../../permissions";

// Secure connection to FIREBASE from the backend
// allow access to firebase backend
// admin has access to everything but we have to give permission to backend db (firebase.config is d/f (it's for frontend))
// var serviceAccount = require("../../../permissions.json");

// avoid double initialization (Initialize app if its not already initialized)
const app = !admin.apps.length ? admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
}) : admin.app();



// Establish connection to Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Get stripe endpoint secret 
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;


// async function
const fullfilOrder = async (session) => {
    console.log ("Fulfilling order", session)
    return app.firestore()
    // collection of users
    .collection('users')
    .doc(session.metadata.email)
    // go in collection of order for that user
    .collection("orders")
    // stripe session id
    // push some info 
    .doc(session.id).set({
        // Used subcurrency before
        amount: session.amount_total/100,
        amount_shipping: session.total_details.amount_shipping,
        images: JSON.parse(session.metadata.images),
        // Use server timestamp as it will be in sync in every location
        timestamp: admin.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        console.log(`SUCCESS: Order ${session.id} has been added to DB`)
    });
}



export default async (req, res) => {
    if (req.method === 'POST'){
        // use certificate to verify its genuine event
        // consume stream so that we request as a buffer
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        // built signature
        const sig = req.headers["stripe-signature"];
        let event;
        // verify event posted came from stripe
        try{
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
        } catch (err){
            console.log('ERROR', err.message)
            return res.status(400).send(`Webhook error: ${err.message}`)
        }
        // Handle the checkout.session.completed event
        if (event.type === 'checkout.session.completed'){
            console.log('Session completed success')
            const session = event.data.object;
            // Fullfil order (Push order into database)
            return fullfilOrder(session)
            .then(()=> res.status(200))
            .catch(err => res.status(400).send(`Webhook Error: ${err.message}`))

        }

    }
};

// Disable body parser
// Externally resolved by Stripe
export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }

}


