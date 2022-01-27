import { IOrder } from "@cpg/Interfaces/Orders.interface"
import { getSession } from "next-auth/react";

export default (
    {
        orders
    }: {
        orders: IOrder
    }
) =>
{
    return (
        <>
        
        </>
    )
}

export async function getServerSideProps(context: any)
{
    const session = await getSession(context);
    // @ts-ignore
    const token = session?.user.email

    const orders = await fetch(`${process.env.NEXT_PUBLIC_CPG_DOMAIN}/v2/customers/my/orders`,
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }).then(res => res.json());

    return {
        props: {
            orders
        }
    }
}