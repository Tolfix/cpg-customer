import {IInvoice} from '@cpg/Interfaces/Invoice.interface';
import { useSession } from 'next-auth/react';
import React, {useState} from 'react';
import InvoiceModal, { popupCenter } from './Invoice.modal';

const useSortableData = (items: IInvoice[], config = null) =>
{
    const [sortConfig, setSortConfig] = React.useState<{
        key: string;
        direction: 'ascending' | 'descending';
    } | null>(config);

    const sortedItems = React.useMemo(() =>
    {
        const sortableItems = [...items];
        if (sortConfig !== null)
        {
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
        )
        {
            direction = 'descending';
        }
        // @ts-ignore
        setSortConfig({key, direction});
    };

    return {items: sortedItems, requestSort, sortConfig};
};

const InvoiceData = ({invoice}: { invoice: IInvoice }) =>
{
    const [showModal, setShowModal] = useState(false);
    const session = useSession();

    return (
        <>

            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {invoice.id}
                </td>
                <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                    {invoice.dates?.invoice_date.toString().replaceAll("-", "") || "?"}{invoice.id}
                </td>
                <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                    {invoice.dates?.due_date.toString().replaceAll("-", " ") || "?"}
                </td>
                <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                    { (invoice.amount + ((invoice.amount / 100) * invoice.tax_rate)).toString()}
                </td>
                <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                    {invoice.paid ? "Yes" : "No"}
                </td>
                <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                    <button onClick={() => setShowModal(true)} className='text-indigo-600 hover:text-indigo-900'>
                        View
                    </button>
                </td>
                <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                    <button onClick={() => {
                        popupCenter({
                            url: `${process.env.NEXT_PUBLIC_CPG_DOMAIN}/v2/customers/my/invoices/${invoice.id}/preview?access_token=${session?.data?.user?.email}`,
                            title: "Invoice Preview",
                            w: 600,
                            h: 900
                        })
                    }} className='text-indigo-600 hover:text-indigo-900'>
                        Preview
                    </button>
                </td>
            </tr>

            <InvoiceModal show={showModal} setShow={setShowModal} invoice={invoice}/>
        </>
    )
}

const InvoiceTable = ({
                          invoice
                      }: {
    invoice: IInvoice[]
}) =>
{
    const {items, requestSort, sortConfig} = useSortableData(invoice);
    const isSelected = (name: string) =>
    {
        if (!sortConfig)
            return;
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    const search = async (event: { preventDefault: () => void; target: any; }) =>
    {
        event.preventDefault();
        const form = event.target;
        const option = form.searchOption.value;
        const search = form.search.value;

        if(option === "ocr")
        {
            // parse the search, and get the invoice id and date
            // YYMMDDID
            // Get id by removing the first 8 characters
            const id = search.substring(8);
            const date = search.substring(0, 4) + "-" + search.substring(4, 6) + "-" + search.substring(6, 8);
            return window.location.href = `/invoices?dates.invocie_date=${date}&id=${id}`;
        }

        return window.location.href = `/invoices?${option}=${search}`;
    }

    return (
        <div className="flex flex-col">
            {/* Search for different */}
            <div className='mt-5'>
                <form onSubmit={search} action="">
                    {/* Select for different categories */}
                    <select className='rounded' name="searchOption" id="">
                        <option value="id">
                            Id
                        </option>
                        <option value="ocr">
                            OCR
                        </option>
                    </select>
                    {/* Input for what to search */}
                    <input className='rounded bg-gray-300' type="text" name='search' />
                    {/* Button to search */}
                    <button type='submit' className='bg-purple-300 hover:bg-purple-400 rounded px-2'>Search</button>
                </form>
            </div>
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-md sm:rounded-lg">
                        <table className="min-w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th scope="col"
                                    className={`py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 
                                    ${isSelected('id') === "ascending" ? `bg-gray-200` : ``}`}>
                                    <button
                                        type="button"
                                        onClick={() => requestSort('id')}
                                    >
                                        Id
                                    </button>
                                </th>
                                <th scope="col"
                                    className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                    <button
                                        type="button"
                                    >
                                        OCR
                                    </button>
                                </th>
                                <th scope="col"
                                    className={`py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 
                                    ${isSelected('dates.due_date') === "ascending" ? `bg-gray-200` : ``}`}>
                                    <button
                                        type="button"
                                        onClick={() => requestSort('dates.due_date')}
                                    >
                                        Due Date
                                    </button>
                                </th>
                                <th scope="col"
                                    className={`py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 
                                     ${isSelected('amount') === "ascending" ? `bg-gray-200` : ``}`}>
                                    <button
                                        type="button"
                                        onClick={() => requestSort('amount')}
                                    >
                                        Total
                                    </button>
                                </th>
                                <th scope="col"
                                    className={`py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 
                                    ${isSelected('paid') === "ascending" ? `bg-gray-200` : ``}`}>
                                    <button
                                        type="button"
                                        onClick={() => requestSort('paid')}
                                    >
                                        Paid
                                    </button>
                                </th>

                                <th scope="col" className={`relative py-3 px-6`}>
                                    <span className="sr-only">More</span>
                                </th>
                                <th scope="col" className={`relative py-3 px-6`}>
                                    <span className="sr-only">Preview</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody className=''>
                                {items.map((invoice) => (
                                    <InvoiceData key={invoice.id} invoice={invoice}/>
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
        <InvoiceTable
            invoice={invoice}
        />
    );
}