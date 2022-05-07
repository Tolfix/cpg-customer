import {ICustomer} from "@cpg/Interfaces/Customer.interface";
import {GetServerSideProps} from "next";
import {mustAuth} from "../lib/Auth";
import TokenValid from "../lib/TokenValid";
import {useState} from "react";
import Head from "next/head";
import Navigation from "../components/Navigation";
import {InputLeftAddon} from "@chakra-ui/input";
import {
    Avatar,
    Box,
    Button,
    chakra,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    GridItem,
    Heading,
    Icon,
    Input,
    InputGroup,
    SimpleGrid,
    Stack,
    Text,
    Textarea,
    useColorModeValue
} from "@chakra-ui/react";
import {FaUser} from "react-icons/fa";

export const currencyCodes = ["AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BOV", "BRL", "BSD", "BTN", "BWP", "BYR", "BZD", "CAD", "CDF", "CHE", "CHF", "CHW", "CLF", "CLP", "CNY", "COP", "COU", "CRC", "CUC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "GBP", "GEL", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "INR", "IQD", "IRR", "ISK", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KMF", "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LTL", "LVL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRO", "MUR", "MVR", "MWK", "MXN", "MXV", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLL", "SOS", "SRD", "SSP", "STD", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "USD", "USN", "USS", "UYI", "UYU", "UZS", "VEF", "VND", "VUV", "WST", "XAF", "XAG", "XAU", "XBA", "XBB", "XBC", "XBD", "XCD", "XDR", "XFU", "XOF", "XPD", "XPF", "XPT", "XTS", "XXX", "YER", "ZAR", "ZMW"];

export default async ({
                          profile,
                          token,
                          cpg_domain
                      }:
                          {
                              profile: ICustomer,
                              token: string,
                              cpg_domain: string
                          }) => {

    const fetchProfilePicture = async (num: any) => {
        const picture = await fetch(
            `${cpg_domain}/v2/images/${num}`
        ).then(e => e.json());
        return `data:${picture.mime};base64,${picture.data}`;
    }


    const [ProfilePic, setProfilePic] = useState<string>("");


    if (profile.profile_picture)
        fetch(`${cpg_domain}/v2/images/${profile.profile_picture}`).then(e => e.json()).then(data => {
            setProfilePic(data.data);
        });


    const changeProfilePicture = () => {
        const data = new FormData();
        console.log(ProfilePic);
        data.append("image", ProfilePic);
        fetch(`${cpg_domain}/v2/customers/my/profile_picture`, {
            method: "POST",
            headers:
                {
                    "Authorization": `Bearer ${token}`
                },
            body: data
        }).then(e => e.json()).then(e => {
            setProfilePic(e.data);
        });
    };

    const [FirstName, setFirstName] = useState<string>(profile.personal.first_name);
    const [LastName, setLastName] = useState<string>(profile.personal.last_name);
    const [Email, setEmail] = useState<string>(profile.personal.email);
    const [Phone, setPhone] = useState<string>(profile.personal.phone);


    const saveAll = async () => {
        console.log(FirstName, LastName, Email, Phone);
        if (ProfilePic !== profile.profile_picture && ProfilePic !== "") {
            console.log("Changing profile picture");
            changeProfilePicture();
        }
        if (FirstName !== profile.personal.first_name && FirstName !== "") {
            console.log("Changing first name");
            console.log(profile);
            console.log("Setting " + FirstName);
            const data = {
                "personal.first_name": FirstName
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
        if (LastName !== profile.personal.last_name && LastName !== "") {
            console.log("Changing last name");
            console.log(profile);
            console.log("Setting " + LastName);
            const data = {
                "personal.last_name": LastName
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
        if (Email !== profile.personal.email && Email !== "") {
            console.log("Changing email");
            console.log(profile);
            console.log("Setting " + Email);
            const data = {
                "personal.email": Email
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
        if (Phone !== profile.personal.phone && Phone !== "") {
            console.log("Changing phone");
            console.log(profile);
            console.log("Setting " + Phone);
            const data = {
                "personal.phone": Phone
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
        const datad = await fetch(`${process.env.CPG_DOMAIN}/v2/customers/my/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.json());

    }

    const getPhoto = () => {
        fetchProfilePicture(profile.profile_picture).then(res => {
            console.log(res);
        } ).catch(err => {
            console.log(err);
        });
    }

    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>
            <>
            </>
            <Navigation profile={profile} children={
                <>
                    <Box bg={useColorModeValue("gray.50", "inherit")} p={10}>
                        <Box>
                            <SimpleGrid
                                display={{base: "initial", md: "grid"}}
                                columns={{md: 3}}
                                spacing={{md: 6}}
                            >
                                <GridItem colSpan={{md: 1}}>
                                    <Box px={[4, 0]}>
                                        <Heading fontSize="lg" fontWeight="md" lineHeight="6">
                                            Profile
                                        </Heading>
                                        <Text
                                            mt={1}
                                            fontSize="sm"
                                            color={useColorModeValue("gray.600", "gray.400")}
                                        >
                                            This information will be used to identify you on the platform.
                                        </Text>
                                    </Box>
                                </GridItem>
                                <GridItem mt={[5, null, 0]} colSpan={{md: 2}}>
                                    <chakra.form
                                        shadow="base"
                                        rounded={[null, "md"]}
                                        overflow={{sm: "hidden"}}
                                    >
                                        <Stack
                                            px={4}
                                            py={5}
                                            bg={useColorModeValue("white", "gray.700")}
                                            spacing={6}
                                            p={{sm: 6}}
                                        >
                                            <SimpleGrid columns={3} spacing={6}>
                                                <FormControl as={GridItem} colSpan={[3, 2]}>
                                                    <FormLabel
                                                        fontSize="sm"
                                                        fontWeight="md"
                                                        color={useColorModeValue("gray.700", "gray.50")}
                                                    >
                                                        First Name
                                                    </FormLabel>
                                                    <InputGroup size="sm">
                                                        <Input
                                                            type="text"
                                                            placeholder="John"
                                                            focusBorderColor="brand.400"
                                                            rounded="md"
                                                            onChange={(e) => setFirstName(e.target.value)}
                                                        />
                                                    </InputGroup>
                                                </FormControl>

                                                <FormControl as={GridItem} colSpan={[3, 2]}>
                                                    <FormLabel
                                                        fontSize="sm"
                                                        fontWeight="md"
                                                        color={useColorModeValue("gray.700", "gray.50")}
                                                    >
                                                        Family Name
                                                    </FormLabel>
                                                    <InputGroup size="sm">
                                                        <Input
                                                            type="text"
                                                            placeholder="Doe"
                                                            focusBorderColor="brand.400"
                                                            rounded="md"
                                                            onChange={(e) => setLastName(e.target.value)}
                                                        />
                                                    </InputGroup>
                                                </FormControl>
                                            </SimpleGrid>

                                            <div>
                                                <FormControl id="email" mt={1}>
                                                    <FormLabel
                                                        fontSize="sm"
                                                        fontWeight="md"
                                                        color={useColorModeValue("gray.700", "gray.50")}
                                                    >
                                                        E-mail
                                                    </FormLabel>
                                                    <Input
                                                        type="email"
                                                        placeholder="example@eg.com"
                                                        focusBorderColor="brand.400"
                                                        rounded="md"
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </FormControl>
                                            </div>

                                            <FormControl>
                                                <FormLabel
                                                    fontSize="sm"
                                                    fontWeight="md"
                                                    color={useColorModeValue("gray.700", "gray.50")}
                                                >
                                                    Photo
                                                </FormLabel>
                                                <Flex alignItems="center" mt={1}>

                                                    <Avatar
                                                        boxSize={12}

                                                    />

                                                    <Input id={"MyFile"} type="file" hidden={true} onChange={
                                                        (e) => { // @ts-ignore
                                                            getPhoto()
                                                        }
                                                    }/>
                                                    <Button
                                                        type="button"
                                                        ml={5}
                                                        variant="outline"
                                                        size="sm"
                                                        fontWeight="medium"
                                                        _focus={{shadow: "none"}}
                                                        onClick={() => { // @ts-ignore
                                                            document.getElementById("MyFile").click()
                                                        }}
                                                    >
                                                        Change
                                                    </Button>
                                                </Flex>
                                                <FormHelperText>
                                                    Upload a photo to your profile. Max size: 5GB.
                                                </FormHelperText>
                                            </FormControl>

                                        </Stack>
                                        <Box
                                            px={{base: 4, sm: 6}}
                                            py={3}
                                            bg={"gray.100"}
                                            textAlign="right"
                                        >
                                            <Button
                                                variant={'outline'}
                                                colorScheme="purple"
                                                _focus={{shadow: ""}}
                                                fontWeight="md"
                                                onClick={saveAll}
                                            >
                                                Save
                                            </Button>
                                        </Box>
                                    </chakra.form>
                                </GridItem>
                            </SimpleGrid>
                        </Box>
                        <Box visibility={{base: "hidden", sm: "visible"}} aria-hidden="true">
                            <Box py={5}>
                                <Box
                                    borderTop="solid 1px"
                                    borderTopColor={useColorModeValue("gray.200", "whiteAlpha.200")}
                                ></Box>
                            </Box>
                        </Box>

                        {/*Need to change this to billing info.*/}
                        <Box bg={useColorModeValue("gray.50", "inherit")} p={10}>
                            <Box>
                                <SimpleGrid
                                    display={{base: "initial", md: "grid"}}
                                    columns={{md: 3}}
                                    spacing={{md: 6}}
                                >
                                    <GridItem colSpan={{md: 1}}>
                                        <Box px={[4, 0]}>
                                            <Heading fontSize="lg" fontWeight="md" lineHeight="6">
                                                Profile
                                            </Heading>
                                            <Text
                                                mt={1}
                                                fontSize="sm"
                                                color={useColorModeValue("gray.600", "gray.400")}
                                            >
                                                This information will be displayed publicly so be careful what
                                                you share.
                                            </Text>
                                        </Box>
                                    </GridItem>
                                    <GridItem mt={[5, null, 0]} colSpan={{md: 2}}>
                                        <chakra.form
                                            method="POST"
                                            shadow="base"
                                            rounded={[null, "md"]}
                                            overflow={{sm: "hidden"}}
                                        >
                                            <Stack
                                                px={4}
                                                py={5}
                                                bg={useColorModeValue("white", "gray.700")}
                                                spacing={6}
                                                p={{sm: 6}}
                                            >
                                                <SimpleGrid columns={3} spacing={6}>
                                                    <FormControl as={GridItem} colSpan={[3, 2]}>
                                                        <FormLabel
                                                            fontSize="sm"
                                                            fontWeight="md"
                                                            color={useColorModeValue("gray.700", "gray.50")}
                                                        >
                                                            Website
                                                        </FormLabel>
                                                        <InputGroup size="sm">
                                                            <InputLeftAddon
                                                                bg={useColorModeValue("gray.50", "gray.800")}
                                                                color={useColorModeValue("gray.500", "gay.50")}
                                                                rounded="md"
                                                            >
                                                                https://
                                                            </InputLeftAddon>
                                                            <Input
                                                                type="tel"
                                                                placeholder="www.example.com"
                                                                focusBorderColor="brand.400"
                                                                rounded="md"
                                                            />
                                                        </InputGroup>
                                                    </FormControl>
                                                </SimpleGrid>

                                                <div>
                                                    <FormControl id="email" mt={1}>
                                                        <FormLabel
                                                            fontSize="sm"
                                                            fontWeight="md"
                                                            color={useColorModeValue("gray.700", "gray.50")}
                                                        >
                                                            About
                                                        </FormLabel>
                                                        <Textarea
                                                            placeholder="you@example.com"
                                                            mt={1}
                                                            rows={3}
                                                            shadow="sm"
                                                            focusBorderColor="brand.400"
                                                            fontSize={{sm: "sm"}}
                                                        />
                                                        <FormHelperText>
                                                            Brief description for your profile. URLs are hyperlinked.
                                                        </FormHelperText>
                                                    </FormControl>
                                                </div>

                                                <FormControl>
                                                    <FormLabel
                                                        fontSize="sm"
                                                        fontWeight="md"
                                                        color={useColorModeValue("gray.700", "gray.50")}
                                                    >
                                                        Photo
                                                    </FormLabel>
                                                    <Flex alignItems="center" mt={1}>
                                                        <Avatar
                                                            boxSize={12}
                                                            bg={useColorModeValue("gray.100", "gray.800")}
                                                            src={usrImg ?? ""}
                                                        />
                                                        <Button
                                                            type="button"
                                                            ml={5}
                                                            variant="outline"
                                                            size="sm"
                                                            fontWeight="medium"
                                                            _focus={{shadow: "none"}}
                                                        >
                                                            Change
                                                        </Button>
                                                    </Flex>
                                                    <FormHelperText>
                                                        Upload a photo to your profile. Max size: 5GB.
                                                    </FormHelperText>
                                                </FormControl>

                                            </Stack>
                                            <Box
                                                px={{base: 4, sm: 6}}
                                                py={3}
                                                bg={"gray.100"}
                                                textAlign="right"
                                            >
                                                <Button
                                                    type="submit"
                                                    variant={'outline'}
                                                    colorScheme="purple"
                                                    _focus={{shadow: ""}}
                                                    fontWeight="md"
                                                >
                                                    Save
                                                </Button>
                                            </Box>
                                        </chakra.form>
                                    </GridItem>
                                </SimpleGrid>
                            </Box>
                            <Box visibility={{base: "hidden", sm: "visible"}} aria-hidden="true">
                                <Box py={5}>
                                    <Box
                                        borderTop="solid 1px"
                                        borderTopColor={useColorModeValue("gray.200", "whiteAlpha.200")}
                                    ></Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </>
            }/>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => 
{
    const session = await mustAuth(true, context);
    if (!session)
        return {
            props: {}
        };

    // @ts-ignore
    const token = session?.user.email as string
    if (!(await TokenValid(token, context)))
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
            token: token,
            cpg_domain: process.env.CPG_DOMAIN
        }
    };
}