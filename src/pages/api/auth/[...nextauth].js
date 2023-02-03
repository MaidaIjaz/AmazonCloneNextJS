// Responsible for handling all auth in our application

import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { getToken } from "next-auth/jwt"
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        // use env var when you don't want to share variables
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
        
    }),
    
    // ...add more providers here
    // GithubProvider({
    //     clientId: process.env.GITHUB_ID,
    //     clientSecret: process.env.GITHUB_SECRET,
    //   }),
  ],  
  secret: process.env.NEXTAUTH_SECRET,
 
}
export default NextAuth(authOptions)