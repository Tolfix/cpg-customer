import { IOrder } from "@cpg/Interfaces/Orders.interface";
import { IRowData } from "../../interfaces/RowData";
import DynamicTable from "../Tables/DynamicTable";

export default function OrderTable<T extends Array<IOrder>>({
    orders,
    rowData
}: {
    orders: T,
    // ! fix later !
    rowData: IRowData<any>[],
})
{
    return (
        <DynamicTable path="/orders" data={orders} rowData={rowData} />
    )
}