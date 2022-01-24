import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
    secret: process.env.SECRET,
    providers: [
        CredentialsProvider({
            name: 'CPG Customer Login',
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