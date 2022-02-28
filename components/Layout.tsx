import { NextComponentType } from "next"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import ForgottonPassword from "./ForgottonPassword";
import Loading from "./Loading";
import Login from "./Login"
import Navigation from "./Navigation";

export const Layout: NextComponentType = ({ children }) =>
{
    const { status, data } = useSession();
    const router = useRouter();

    // if(!router.isFallback)
    //     return <Loading />

    if(router.pathname === "/forgotton-password" && status === "unauthenticated")
        return <ForgottonPassword />

    if(status === "loading")
        return <Loading />

    if(!data)
        return <Login />;

    return router.isFallback ? <Loading /> : (
        <>
            <div>
                <Navigation />
                {children}
            </div>
        </>
    )
}