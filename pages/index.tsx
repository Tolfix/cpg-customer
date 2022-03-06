import { ICustomer } from '@cpg/Interfaces/Customer.interface';
import type {NextPage} from 'next'
import { Bar, } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { IInvoice } from '@cpg/Interfaces/Invoice.interface';
import { IOrder } from '@cpg/Interfaces/Orders.interface';
import { ITransactions } from '@cpg/Interfaces/Transactions.interface';
import { mustAuth } from '../lib/Auth';
import TokenValid from '../lib/TokenValid';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// @ts-ignore
const Home: NextPage = ({
    invoices,
    orders,
    transactions,
    customer,
}: {
    invoices: IInvoice[],
    orders: IOrder[],
    transactions: ITransactions[],
    customer: ICustomer,
}) =>
{
    return (
        <>

            {/* Customer portal, with tailwind */}
            <div className="flex flex-col justify-center items-center mt-32 w-screen">
                <div className="max-w-xs">
                    <div className="text-center">
                        <div className="text-gray-700 text-xl font-bold">
                            Welcome {customer.personal.first_name} {customer.personal.last_name}
                        </div>
                    </div>
                </div>
                <div>
                    <Bar 
                    data={{
                        labels: [""],
                        datasets: [
                            {
                                label: "Invoices",
                                data: [invoices.length],
                                backgroundColor: [
                                    '#FF6384',
                                ],
                                hoverBackgroundColor: [
                                    '#FF6384',
                                ],
                            },
                            {
                                label: "Orders",
                                data: [orders.length],
                                backgroundColor: [
                                    '#A855F7',
                                ],
                                hoverBackgroundColor: [
                                    '#A855F7',
                                ],
                            },
                            {
                                label: "Transactions",
                                data: [transactions.length],
                                backgroundColor: [
                                    '#36A2EB',
                                ],
                                hoverBackgroundColor: [
                                    '#36A2EB',
                                ],
                            }
                        ],
                        
                    }} />
                </div>
            </div>
        </>
    );
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

    const [invoices, orders, transactions, customer] = [
        await fetch(`${process.env.CPG_DOMAIN}/v2/customers/my/invoices?limit=100`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.json()),
        await fetch(`${process.env.CPG_DOMAIN}/v2/customers/my/orders?limit=100`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.json()),
        await fetch(`${process.env.CPG_DOMAIN}/v2/customers/my/transactions?limit=100`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.json()),
        await fetch(`${process.env.CPG_DOMAIN}/v2/customers/my/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.json()),
    ];

    return {
        props: {
            invoices: invoices,
            orders: orders,
            transactions: transactions,
            customer: customer
        }
    }
}
export default Home;

