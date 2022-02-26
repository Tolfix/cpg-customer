import { NextComponentType } from "next"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import ForgottonPassword from "./ForgottonPassword";
import Login from "./Login"
import Navigation from "./Navigation";

export const Layout: NextComponentType = ({ children }) =>
{
    const { status, data } = useSession();

    const router = useRouter();

    console.log(router.pathname, status);

    if(router.pathname === "/forgotton-password" && status === "unauthenticated")
        return <ForgottonPassword />

    if(status === "loading")
        return (
            <>
                {/* Tailwind center middle */}
                <div className="flex justify-center items-center h-screen">
                    <div className="w-full max-w-xs">
                        <div className="text-center">
                            <div className="text-gray-700 text-xl font-bold">
                                Loading..
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )

    if(!data)
        return <Login />;

    return (
        <>
            <div>
                <Navigation />
                {children}
            </div>
        </>
    )
}