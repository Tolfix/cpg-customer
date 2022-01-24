import { ICustomer } from '@cpg/Interfaces/Customer.interface';
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const Home: NextPage = () => {
  const session = useSession();
  // @ts-ignore
  let token = session.data?.user.email
  const [customer, setCustomer] = useState<ICustomer | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_CPG_DOMAIN}/v2/customers/my/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(res => res.json()).then(data => {
      setCustomer(data);
    });
  }, []);

  if(!customer)
    return (
      <>
        Loading...
      </>
    )

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
          {/* Links to various of paths, invoices, orders  */}
          <div className="flex flex-col items-center">
            <h1 className='text-xl text-blue-700'>Check out yours</h1>
            <div className='flex flex-wrap'>
              <div className="text-center m-5">
                <a className="text-green-700 text-xl font-bold">
                  Orders
                </a>
              </div>
              <div className="text-center m-5">
                <a className="text-green-700 text-xl font-bold">
                  Invoices
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home
