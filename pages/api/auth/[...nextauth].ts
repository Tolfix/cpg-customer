import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import getConfig from 'next/config'
const { publicRuntimeConfig: config } = getConfig()

export default NextAuth({
    secret: process.env.SECRET,
    session: {
      maxAge: 60 * 60 * 24, // 1 day
    },
    providers: [
        CredentialsProvider({
            name: 'CPG Customer Login',
            credentials: {
              username: { label: "Email", type: "email", placeholder: "example@email.com" },
              password: {  label: "Password", type: "password" }
            },
            async authorize(credentials)
            {
              const res = await fetch(`${config.CPG_DOMAIN}/v2/customers/authenticate`,
              {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: { 
                    "Content-Type": "application/json",
                }
              });

              const user = await res.json();

              if(res.ok && user)
              {
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