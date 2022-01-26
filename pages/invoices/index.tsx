import { IInvoice } from "@cpg/Interfaces/Invoice.interface";
import { getSession } from "next-auth/react";
import InvoicesTable from "../../components/Invoices/Invoices.table";
import Loading from "../../components/Loading";

export default (
    {
        invoices
    }: {
        invoices: IInvoice[]
    }
) =>
{
    if(!invoices)
        return (
            <Loading/>
        )

    return (
        <>
            <div className="flex flex-wrap justify-center">
                <InvoicesTable invoice={invoices} />
            </div>

        </>
    )
}

// @ts-ignore
export async function getServerSideProps(context)
{
    const session = await getSession(context);
    // @ts-ignore
    let token = session?.user.email

    const invoices = await fetch(`${process.env.NEXT_PUBLIC_CPG_DOMAIN}/v2/customers/my/invoices`,
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }).then(res => res.json());

    return {
        props: {
            invoices
        }
    }
}