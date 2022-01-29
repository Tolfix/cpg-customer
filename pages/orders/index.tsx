import { IOrder } from "@cpg/Interfaces/Orders.interface"
import { getSession, useSession } from "next-auth/react";
import OrderTable from "../../components/Orders/Order.table";
import { IRowData } from "../../interfaces/RowData";

export default (
    {
        orders
    }: {
        orders: IOrder[]
    }
) =>
{

    const rowDataOrder: IRowData<IOrder>[] = [
        {
            id: "id",
            name: "Id",
            sortable: true,
            queryFormat: () =>
            {
                return "id";
            },
            printedPreview: (order: IOrder) =>
            {
                return `${order.id}`
            }
        },
        {
            id: "date",
            name: "Date",
            sortable: true,
            queryFormat: () =>
            {
                return "dates.created_at";
            },
            printedPreview: (order: IOrder) =>
            {
                let date = (order.dates.createdAt).toString()
                if(!date)
                    date = "N/A"
                return `${date}`
            }
        },
        {
            id: "status",
            name: "Status",
            sortable: true,
            queryFormat: () =>
            {
                return "status";
            },
            printedPreview: (order: IOrder) =>
            {
                return `${order.order_status}`
            }
        },
        {
            id: "cancel",
            name: "Cancel",
            sortable: false,
            extra: true,
            queryFormat: () =>
            {
                return "cancel";
            },
            printedPreview: (order: IOrder) =>
            {
                return (
                    <>
                    
                        <button id={`cancel-button-${order.id}`} className="text-indigo-600 hover:text-indigo-900">
                            Cancel
                        </button>

                    </>
                )
            }
        }
    ]

    return (
        <>
            <div className="flex flex-wrap justify-center">
                <OrderTable orders={orders} rowData={rowDataOrder} />
            </div>
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