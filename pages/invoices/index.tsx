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
    // removed this line, 
    // due to if it is empty or null it will load forever, and user will never know what is happening. 
    // if(!invoices)
    //     return (
    //         <Loading/>
    //     )

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
    const token = session?.user.email

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