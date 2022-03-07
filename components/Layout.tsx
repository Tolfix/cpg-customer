import { NextComponentType } from "next"
import { useSession } from "next-auth/react"
import Navigation from "./Navigation";

export const Layout: NextComponentType = ({ children }) =>
{
    const { status, data } = useSession();

    return (
        <>
            <div>
                {(data && status === "authenticated") ? <Navigation /> : null}
                {children}
            </div>
        </>
    )
}