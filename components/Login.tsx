import { signIn } from "next-auth/react";
import React, { useState } from "react";
import {Box, Button, FormControl, FormLabel, Heading, HStack, Input, InputGroup, Text, VStack} from '@chakra-ui/react';
import {InputRightElement} from "@chakra-ui/input";
export default () =>
{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [Error, setError] = useState(false);

    const login = async (e: { preventDefault: () => void; target: any; }) =>
    {
        e.preventDefault();
        signIn('credentials',
            {
                username: email,
                password: password,
                redirect: false,
                callbackUrl: `${window.location.origin}/`
            }
        ).then((msg: any) => 
        {

            console.log(msg);
            if(msg.status === 401)
            {
                setError(true);
            }

            if(msg.status === 200)
            {
                setError(false);
                window.location.href = `${window.location.origin}/`;
            }
        })
    }

    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    const handleUsername = (e: { target: any; }) =>
    {
        setEmail(e.target.value);
        setError(false);
    }
    const handlePassword = (e: { target: any; }) =>
    {
        setPassword(e.target.value);
        setError(false);
    }

    return (
        <>
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
                        <Heading>CPG Login</Heading>
                        <Text>Enter your e-mail and password to login.</Text>
                        <Text hidden={!Error} color={'red'}>An error has occurred. Please try again.</Text>
                    </VStack>
                </VStack>
                <form>
                <FormControl mb={4} onSubmit={login}>
                    <FormLabel>E-mail</FormLabel>
                    <Input
                        rounded={"md"}
                        variant={'outline'}
                        onChange={handleUsername}
                        onSubmit={login}
                        placeholder={"Enter e-mail"}
                        isInvalid={Error}
                    />
                </FormControl>
                <FormControl mb={4}>
                    <FormLabel>Password</FormLabel>
                    <InputGroup size="md">
                        <Input
                            pr="4.5rem"
                            rounded={'md'}
                            variant={'outline'}
                            onChange={handlePassword}
                            onSubmit={login}
                            type={show ? "text" : "password"}
                            placeholder="Enter password"
                            isInvalid={Error}

                        />
                        <InputRightElement width="4.5rem">
                            <Button size="sm" onClick={handleClick}>
                                {show ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                </form>
                <HStack w={'full'} justify={'space-between'} mb={4}>
                    <Button variant={'link'} colorScheme={'purple'}>Forgot Password?</Button>

                </HStack>
                <Button rounded={'md'} variant={"outline"} colorScheme={'purple'} w={['full']} onClick={login}>
                    Login
                </Button>
            </Box>
        </>
    )
};