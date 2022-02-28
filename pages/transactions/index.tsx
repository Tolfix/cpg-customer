import { ITransactions } from "@cpg/Interfaces/Transactions.interface"
import { getSession } from "next-auth/react";
import getConfig from 'next/config'
import { mustAuth } from "../../lib/Auth";
const { publicRuntimeConfig: config } = getConfig()

export default ({
    transactions
}: {
    transactions: ITransactions[]
}) =>
{
    return (
        <>
        
        </>
    )
}

export async function getServerSideProps(context: any)
{
    const session = await mustAuth(true, context);
    if(!session)
        return {
            props: {}
        };
    // @ts-ignore
    const token = session?.user.email

    const transactions = await fetch(`${process.env.CPG_DOMAIN}/v2/customers/my/transactions`,
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }).then(res => res.json());

    return {
        props: {
            transactions
        }
    }
}