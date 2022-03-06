import { ICustomer } from "@cpg/Interfaces/Customer.interface";
import { GetServerSideProps } from "next";
import { mustAuth } from "../lib/Auth";
import TokenValid from "../lib/TokenValid";
import getConfig from 'next/config'
import { useState } from "react";
const { publicRuntimeConfig: config } = getConfig()

export default ({
    profile,
    token
}:
{
    profile: ICustomer,
    token: string
}) =>
{
    const cpg_domain = config.CPG_DOMAIN;
    const [profilePicture, setProfilePicture] = useState<string>("");

    const saveProfile = (target: string) =>
    {
        return async (e: { preventDefault: () => void; target: any; }) =>
        {
            e.preventDefault();
            const form = e.target;
            console.log(form[target].value);
            const data = {
                [target]: form[target].value
            }
            fetch(`${cpg_domain}/v2/customers/my/profile`,
            {
                method: 'PUT',
                headers:
                {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
        }
    }

    if(profile.profile_picture)
        fetch(`${cpg_domain}/v2/images/${profile.profile_picture}`).then(e => e.json()).then(data =>
        {
            setProfilePicture(data.data);
        });
    // Check if profile picture, and if true set it to the profile picture
    return (
        <>
            {/* Customer interface, possible to edit each field and save each one */}
            {/* Each as a form input which goes to POST /v2/customers/my/profile */}
            {/* Also using tailwind css to make life easier */}
            <div>
                <div className="flex flex-wrap justify-center items-center mt-2">
                    <div className="">
                        <div className="text-center">
                            <div className="text-gray-700 text-xl font-bold grid">

                                {/* Profile picture */}
                                {/* Portfolio of user */}
                                <div className="flex flex-col bg-white rounded p-5">
                                    {profile.profile_picture ? <>
                                        <div className="text-center justify-center items-center">
                                            <img src={`data:image/png;base64,${profilePicture}`} alt="Profile Picture" className="rounded-full w-52" />
                                        </div>
                                    </> : null}
                                    <hr />
                                    <div className="text-left mt-2 grid grid-cols-2">
                                        {/* Information about customer */}
                                        {/* Eeach infromation should be editable */}
                                        <div className="m-5">
                                            <h2 className="text-indigo-300 font-mono">Personal Information</h2>
                                            <div className="">
                                                <form onSubmit={saveProfile("personal.first_name")}>
                                                    <label htmlFor="">First name</label>
                                                    <div className="flex flex-wrap">
                                                        <input name="personal.first_name" type="text" defaultValue={`${profile.personal.first_name}`} />
                                                        <button
                                                            type="submit" 
                                                            className="bg-indigo-300 hover:bg-indigo-400 cursor-pointer rounded px-1">
                                                            Save
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="mt-2">
                                                <form onSubmit={saveProfile("personal.last_name")}>
                                                    <label htmlFor="">Last name</label>
                                                    <div>
                                                        <input name="personal.last_name" type="text" defaultValue={`${profile.personal.last_name}`} />
                                                        <button 
                                                            type="submit" 
                                                            className="bg-indigo-300 hover:bg-indigo-400 cursor-pointer rounded px-1">
                                                            Save
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="mt-2">
                                                <form onSubmit={saveProfile("personal.email")}>
                                                    <label htmlFor="">Email</label>
                                                    <div>
                                                        <input name="personal.email" type="text" defaultValue={`${profile.personal.email}`} />
                                                        <button 
                                                            type="submit" 
                                                            className="bg-indigo-300 hover:bg-indigo-400 cursor-pointer rounded px-1">
                                                            Save
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="mt-2">
                                                <form onSubmit={saveProfile("personal.email")}>
                                                    <label htmlFor="">Phone</label>
                                                    <div>
                                                        <input name="personal.phone" type="text" defaultValue={`${profile.personal.phone}`} />
                                                        <button 
                                                            type="submit" 
                                                            className="bg-indigo-300 hover:bg-indigo-400 cursor-pointer rounded px-1">
                                                            Save
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="m-5">
                                            <h2 className="text-indigo-300 font-mono">Billing Information</h2>
                                            <div className="">
                                                <form onSubmit={saveProfile("billing.company")}>
                                                    <label htmlFor="">Company</label>
                                                    <div>
                                                        <input name="billing.company" type="text" defaultValue={`${profile.billing.company ?? ""}`} />
                                                        <button 
                                                            type="submit" 
                                                            className="bg-indigo-300 hover:bg-indigo-400 cursor-pointer rounded px-1">
                                                            Save
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="mt-2">
                                                <form onSubmit={saveProfile("billing.company_vat")}>
                                                    <label htmlFor="">VAT</label>
                                                    <div>
                                                        <input name="billing.company" type="text" defaultValue={`${profile.billing.company_vat ?? ""}`} />
                                                        <button 
                                                            type="submit" 
                                                            className="bg-indigo-300 hover:bg-indigo-400 cursor-pointer rounded px-1">
                                                            Save
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="mt-2">
                                                <form onSubmit={saveProfile("billing.counry")}>
                                                    <label htmlFor="">Country</label>
                                                    <div>
                                                        <input name="billing.company" type="text" defaultValue={`${profile.billing.country}`} />
                                                        <button 
                                                            type="submit" 
                                                            className="bg-indigo-300 hover:bg-indigo-400 cursor-pointer rounded px-1">
                                                            Save
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="mt-2">
                                                <form onSubmit={saveProfile("billing.postcode")}>
                                                    <label htmlFor="">Postcode</label>
                                                    <div>
                                                        <input name="billing.postcode" type="text" defaultValue={`${profile.billing.postcode}`} />
                                                        <button 
                                                            type="submit" 
                                                            className="bg-indigo-300 hover:bg-indigo-400 cursor-pointer rounded px-1">
                                                            Save
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="mt-2">
                                                <form onSubmit={saveProfile("billing.state")}>
                                                    <label htmlFor="">State</label>
                                                    <div>
                                                        <input name="billing.state" type="text" defaultValue={`${profile.billing.state}`} />
                                                        <button 
                                                            type="submit" 
                                                            className="bg-indigo-300 hover:bg-indigo-400 cursor-pointer rounded px-1">
                                                            Save
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="mt-2">
                                                <form onSubmit={saveProfile("billing.street01")}>
                                                    <label htmlFor="">Street</label>
                                                    <div>
                                                        <input name="billing.state" type="text" defaultValue={`${profile.billing.street01}`} />
                                                        <button 
                                                            type="submit" 
                                                            className="bg-indigo-300 hover:bg-indigo-400 cursor-pointer rounded px-1">
                                                            Save
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) =>
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

    const profile = await fetch(`${process.env.CPG_DOMAIN}/v2/customers/my/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
            }
    }).then(res => res.json());

    return {
        props: {
            profile,
            token: token
        }
    };
}