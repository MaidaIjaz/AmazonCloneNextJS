module.exports={
    // Whenever we use special image tag we have to let Nextjs know from where we are going to full the images
    images: {
        domains: ['fakestoreapi.com'],
    },

    // Correctly expose the public key to next.js
    // Using environment var from .env to feed into the nextjs config

    env:{
       stripe_public_key: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    }
}


