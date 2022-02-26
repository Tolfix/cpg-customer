import { IOrder } from "@cpg/Interfaces/Orders.interface";
import { IRowData } from "../../interfaces/RowData";
import DynamicTable from "../Tables/DynamicTable";

export default function OrderTable<T extends Array<IOrder>>({
    orders,
    rowData,
    count,
    pages
}: {
    orders: T,
    // ! fix later !
    rowData: IRowData<unknown>[],
    count: number,
    pages: number,
})
{
    return (
        <DynamicTable count={count} pages={pages} path="/orders" data={orders} rowData={rowData} />
    )
}