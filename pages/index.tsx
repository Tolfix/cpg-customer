import { ICustomer } from '@cpg/Interfaces/Customer.interface';
import type { NextPage } from 'next'
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
import Navigation from "../components/Navigation";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// @ts-ignore
const Home: NextPage = () =>
{
    return (
        <>
            <Navigation children={
                <>
                    <p>test
                    </p>
                </>
            }/>
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
