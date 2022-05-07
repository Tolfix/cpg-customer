import React, {useEffect, useState} from "react";
import {Box, Button, FormControl, FormLabel, Heading, HStack, Input, InputGroup, Text, VStack} from "@chakra-ui/react";
import {InputRightElement} from "@chakra-ui/input";
import {ICompanyData} from "../interfaces/CompanyData";
import getCompanyData from "../lib/Company.fetch";

export default () =>
{

    const [message, setMessage] = useState("");

    const [email, setEmail] = useState("");
    const [isErrored, setIsErrored] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const [company, setCompany] = useState<ICompanyData>({
        COMPANY_LOGO: '',
        COMPANY_NAME: '',
        CPG_DOMAIN: '',
    });

    useEffect(() =>
    {
        getCompanyData().then(company => setCompany(company));
    }, [getCompanyData, company, setCompany]);


    const handleUsername = (e: { target: any; }) =>
    {
        setEmail(e.target.value);
        setIsErrored(false);
    }

    const forgottenPassword = async () =>
    {
        const res = await fetch(`/api/resetpassword`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
            })
        });

        if (res.status == 200)
            setIsConfirmed(true);
            return setMessage("An email has been sent, please check your inbox");

        setIsErrored(true);
        return setMessage("That email address is not registered. Please try again.");
    }

    return (
        <>

            {/*/!* Email input, then butto to send request to new password with tailwind *!/*/}
            {/*<div className="flex flex-col justify-center items-center h-screen w-screen">*/}
            {/*    <div className="max-w-xs">*/}
            {/*        <div className="text-xl font-bold px-4 pt-6 pb-8 mb-4">*/}
            {/*            <div>*/}
            {/*                <span className="text-sm font-mono">{message}</span>*/}
            {/*            </div>*/}
            {/*            <form onSubmit={forgottenPassword}>*/}
            {/*                <div className="mb-4">*/}
            {/*                    <label className="text-sm font-bold mb-2" htmlFor="email">*/}
            {/*                        Email*/}
            {/*                    </label>*/}
            {/*                    <input name='email' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email" required />*/}
            {/*                </div>*/}
            {/*                <div className="mb-4">*/}
            {/*                    <button className="bg-transparent hover:bg-blue-500 font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded">*/}
            {/*                        Send*/}
            {/*                    </button>*/}
            {/*                </div>*/}
            {/*            </form>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <Box
                w={['full', 'md']}
                p={[8, 10]}
                mt={[20, '10vh']}
                mx='auto'
                border={['none', '1px']}
                borderColor={['', 'gray.300']}
                borderRadius={10}
            >
                <VStack spacing={4} align='flex-start' w='full'>
                    <VStack spacing={1} align={['flex-start', 'center']} w='full' mb={4}>
                        {/* TODO: Make dynamic heading */}
                        <Heading>{company.COMPANY_NAME}</Heading>
                        <Text>Enter your e-mail to request a reset link.</Text>
                        <Text hidden={!isErrored} color={'red'}>{message}</Text>
                        <Text hidden={!isConfirmed} color={'green'}>{message}</Text>
                    </VStack>
                </VStack>
                    <FormControl mb={4}>
                        <FormLabel>E-mail</FormLabel>
                        <Input
                            rounded={"md"}
                            variant={'outline'}
                            onChange={handleUsername}
                            placeholder={"Enter e-mail"}
                            isInvalid={isErrored}
                        />
                    </FormControl>
                <HStack w={'full'} justify={'space-between'} mb={4}>
                    <Button onClick={() =>
                    {
                        window.location.href = `${window.location.origin}/login`;
                    }} variant={'link'} colorScheme={'purple'}>Return to login!</Button>
                </HStack>
                <Button rounded={'md'} variant={"outline"} colorScheme={'purple'} w={['full']} onClick={forgottenPassword}>
                    Send Password Reset Link
                </Button>
            </Box>



        </>
    )
} 