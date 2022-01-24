import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
    secret: process.env.SECRET,
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'CPG Customer Login',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
              username: { label: "Email", type: "email", placeholder: "example@email.com" },
              password: {  label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              const res = await fetch(`${process.env.CPG_DOMAIN}/v2/customers/authenticate`, {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: { 
                    "Content-Type": "application/json",
                }
              });

              const user = await res.json();

              if (res.ok && user) {
                return {
                  email: user.token
                }
              }

              return null
            }
        })
    ],
    pages: {
      error: "/"
    }
});