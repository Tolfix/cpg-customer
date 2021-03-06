import { signIn } from "next-auth/react";
import { useState } from "react";

export default () =>
{

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const login = async (e: { preventDefault: () => void; target: any; }) =>
    {
        e.preventDefault();
        const form = e.target;
        signIn('credentials',
            {
                username: form.username.value,
                password: form.password.value,
                redirect: false,
                callbackUrl: `${window.location.origin}/`
            }
        ).then((msg: any) => 
        {
            console.log(msg);
            if(msg.status === 401)
            {
                setError('Invalid username or password');
            }

            if(msg.status === 200)
            {
                setError('');
                window.location.href = `${window.location.origin}/`;
            }
        })
    }

    return (
        <>
            <div>
                <div className="flex flex-col justify-center items-center h-screen w-screen">
                    <div className="max-w-xs">
                        {error && <div className="text-red-500 text-center font-bold">{error}</div>}
                        <div className="text-center">
                            <div className="text-gray-700 text-xl font-bold">
                                <form onSubmit={login}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                            Email
                                        </label>
                                        <input onChange={(e) => setEmail(e.target.value)} name='username' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" value={email} />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                            Password
                                        </label>
                                        <input name='password' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" />
                                    </div>

                                    {/* Submit button */}
                                    <div className="flex items-center justify-between">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                            Login
                                        </button>
                                        <a href="/forgotton-password" className="text-sm font-mono text-blue-300 hover:text-blue-400">
                                            Forgotten password?
                                        </a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};