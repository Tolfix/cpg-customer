import { ITransactions } from "@cpg/Interfaces/Transactions.interface"
import DynamicTable from "../../components/Tables/DynamicTable";
import { IRowData } from "../../interfaces/RowData";
import { mustAuth } from "../../lib/Auth";
import TokenValid from "../../lib/TokenValid";

export default ({
    transactions,
    count,
    pages,
}: {
    transactions: ITransactions[],
    count: number,
    pages: number,
}) =>
{
    const rowData: IRowData<ITransactions>[] = [
        {
            id: "id",
            name: "Id",
            sortable: true,
            queryFormat: () =>
            {
                return "id";
            },
            printedPreview: (transactions: ITransactions) =>
            {
                return `${transactions.id}`;
            }
        },
        {
            id: "date",
            name: "Paid at",
            sortable: true,
            queryFormat: () =>
            {
                return "date";
            },
            printedPreview: (transactions: ITransactions) =>
            {
                return `${transactions.date}`;
            }
        },
        {
            id: "payment_method",
            name: "Method",
            sortable: true,
            queryFormat: () =>
            {
                return "payment_method";
            },
            printedPreview: (transactions: ITransactions) =>
            {
                return `${transactions.payment_method}`;
            }
        },
        {
            id: "amount",
            name: "Amount",
            sortable: true,
            queryFormat: () =>
            {
                return "amount";
            },
            printedPreview: (transactions: ITransactions) =>
            {
                return `${transactions.amount}`;
            }
        },
        {
            id: "fees",
            name: "Fees",
            sortable: true,
            queryFormat: () =>
            {
                return "fees";
            },
            printedPreview: (transactions: ITransactions) =>
            {
                return `${transactions.fees}`;
            }
        },
        {
            id: "invoice_uid",
            name: "Invoice",
            sortable: false,
            extra: true,
            queryFormat: () =>
            {
                return "invoice_uid";
            },
            printedPreview: (transactions: ITransactions) =>
            {
                return <>
                        <td className="text-sm font-medium text-right whitespace-nowrap">
                            <a href={`/invoices?id=${transactions.invoice_uid}`} className='text-indigo-600 hover:text-indigo-900'>
                                Go to invoice
                            </a>
                        </td>
                </>;
            }
        },
    ]

    return (
        <>
            <div className="flex flex-wrap justify-center">
                {/* @ts-ignore */}
                <DynamicTable count={count} pages={pages} rowData={rowData} data={transactions} />
            </div>
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
    const token = session?.user.email as string
    if(!(await TokenValid(token, context)))
        return {
            props: {}
        };
    let query = ``;

    if(context.query)
        query = `?sort=-id&${Object.keys(context.query).map(key => `${key}=${context.query[key]}`).join("&")}`;

    let count, pages;
    const transactions = await fetch(`${process.env.CPG_DOMAIN}/v2/customers/my/transactions${query}`,
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }).then(res =>
    {
        count = res.headers.get("X-Total");
        pages = res.headers.get("X-Total-Pages");
        return res.json();
    });

    return {
        props: {
            transactions,
            count,
            pages,
        }
    }
}