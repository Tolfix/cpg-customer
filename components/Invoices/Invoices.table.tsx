import { IInvoice } from '@cpg/Interfaces/Invoice.interface';
import React, { useState } from 'react';
import InvoiceModal from './Invoice.modal';

const useSortableData = (items: IInvoice[], config = null) =>
{
    const [sortConfig, setSortConfig] = React.useState<{
        key: string;
        direction: 'ascending' | 'descending';
    } | null>(config);

    const sortedItems = React.useMemo(() =>
    {
        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) =>
            {
                // @ts-ignore
                if (a[sortConfig.key] < b[sortConfig.key])
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                // @ts-ignore
                if (a[sortConfig.key] > b[sortConfig.key])
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    // @ts-ignore
    const requestSort = (key) =>
    {
        let direction = 'ascending';
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        // @ts-ignore
        setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
};

const InvoiceData = ({ invoice }: { invoice: IInvoice }) =>
{
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <tr key={invoice.id} className={`
                text-gray-700
                ${!invoice.paid ? invoice.notified ? `bg-yellow-200` : `bg-red-200` : `bg-green-200`}
                transition duration-300 ease-in-out
                hover:font-bold
                hover:scale-105
                hover:bg-blue-200
            `}>
                <td className='px-6 py-4 whitespace-nowrap'>
                    #{invoice.id}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                    {(invoice.dates.invoice_date as string).replaceAll("-", "")+invoice.id}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                    {invoice.amount}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                    {invoice.tax_rate}%
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                    {invoice.dates.due_date}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                    {invoice.dates.invoice_date}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                    {invoice.notified ? "Yes" : "No"}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                    {invoice.paid ? "Yes" : "No"}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                    <button onClick={() => setShowModal(true)} className='text-indigo-600 hover:text-indigo-900'>
                        View
                    </button>
                </td>
            </tr>
            <InvoiceModal show={showModal} setShow={setShowModal} invoice={invoice} />
        </>
    )
}

const InvocieTable = ({
    invoice
}: {
    invoice: IInvoice[]
}) =>
{
    const { items, requestSort, sortConfig } = useSortableData(invoice);
    const isSelected = (name: string) =>
    {
        if(!sortConfig)
            return;
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };
    return (
        <div className="flex flex-col mt-5">
            <caption className='text-left text-4xl'>Invoices</caption>
            <div className="-my-2 sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle min-w-full sm:px-6 lg:px-8">
                    <div className="shadow border-b border-gray-200 sm:rounded-lg">
                        <table className='table-auto'>
                            <thead className='bg-gray-50'>
                                <tr>
                                    <th className={`
                                        px-6 py-3 text-left
                                        ${isSelected('id') === "ascending" ? `bg-gray-200` : ``}
                                    `}>
                                        <button
                                            type="button"
                                            onClick={() => requestSort('id')}
                                        >
                                            Id
                                        </button>
                                    </th>
                                    <th className='px-6 py-3 text-left'>
                                        <button
                                            type="button"
                                        >
                                            OCR
                                        </button>
                                    </th>
                                    <th className={`
                                        px-6 py-3 text-left
                                        ${isSelected('amount') === "ascending" ? `bg-gray-200` : ``}
                                    `}>
                                        <button
                                            type="button"
                                            onClick={() => requestSort('amount')}
                                        >
                                            Amount
                                        </button>
                                    </th>
                                    <th className={`
                                        px-6 py-3 text-left
                                        ${isSelected('tax_rate') === "ascending" ? `bg-gray-200` : ``}
                                    `}>
                                        <button
                                            type="button"
                                            onClick={() => requestSort('tax_rate')}
                                        >
                                            Tax Rate
                                        </button>
                                    </th>
                                    <th className={`
                                        px-6 py-3 text-left
                                        ${isSelected('dates.due_date') === "ascending" ? `bg-gray-200` : ``}
                                    `}>
                                        <button
                                            type="button"
                                            onClick={() => requestSort('dates.due_date')}
                                        >
                                            Due Date
                                        </button>
                                    </th>
                                    <th className={`
                                        px-6 py-3 text-left
                                        ${isSelected('dates.invoice_date') === "ascending" ? `bg-gray-200` : ``}
                                    `}>
                                        <button
                                            type="button"
                                            onClick={() => requestSort('dates.invoice_date')}
                                        >
                                            Invoice Date
                                        </button>
                                    </th>
                                    <th className={`
                                        px-6 py-3 text-left
                                        ${isSelected('notified') === "ascending" ? `bg-gray-200` : ``}
                                    `}>
                                        <button
                                            type="button"
                                            onClick={() => requestSort('notified')}
                                        >
                                            Notified
                                        </button>
                                    </th>
                                    <th className={`
                                        px-6 py-3 text-left
                                        ${isSelected('paid') === "ascending" ? `bg-gray-200` : ``}
                                        `}>
                                        <button
                                            type="button"
                                            
                                            onClick={() => requestSort('paid')}
                                        >
                                            Paid
                                        </button>
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">View</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className=''>
                                {items.map((invoice) => (
                                    <InvoiceData key={invoice.id} invoice={invoice} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ({
    invoice
}: {
    invoice: IInvoice[]
}) =>
{
  return (
      <InvocieTable
        invoice={invoice}
      />
  );
}