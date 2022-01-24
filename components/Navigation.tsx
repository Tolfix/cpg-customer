import Link from "next/link";
import { useRouter } from 'next/router'

const routes = [
    {
        path: '/',
        name: 'Home',
        exact: true,
    },
    {
        path: '/invoices',
        name: 'Invoices',
        exact: true,
    },
    {
        path: '/orders',
        name: 'Orders',
        exact: true,
    },
    {
        path: '/transactions',
        name: 'Transactions',
        exact: true,
    },
    {
        path: '/profile',
        name: 'Profile',
        exact: true,
    },
];

export default () =>
{
    const router = useRouter();
    return (
        <>
        
            {/* Navbar */}
            <div>
                <div className="flex items-center justify-between flex-wrap bg-green-600 p-6">
                    <div className="flex items-center flex-shrink-0 text-white mr-6">
                        {routes.map((route, index) =>
                        {
                            return (
                                <div className="m-3">
                                    <Link href={route.path} key={index}>
                                        <a className={`
                                            text-white text-lg font-semibold 
                                            hover:text-gray-600
                                            ${router.pathname === route.path ? `text-gray-600` : `text-white`}
                                        `}>
                                            {route.name}
                                        </a>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        
        </>
    )
}