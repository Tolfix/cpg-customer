import { IInvoice } from "@cpg/Interfaces/Invoice.interface";
import { getSession } from "next-auth/react";
import InvoicesTable from "../../components/Invoices/Invoices.table";

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
            <>
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

    const invoices = await fetch(`${process.env.NEXT_PUBLIC_CPG_DOMAIN}/v2/customers/my/invoices`, {
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