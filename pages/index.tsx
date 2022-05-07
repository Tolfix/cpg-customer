import { ICustomer } from '@cpg/Interfaces/Customer.interface';
import type { NextPage } from 'next'
import
{
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { mustAuth } from '../lib/Auth';
import TokenValid from '../lib/TokenValid';
import Navigation from "../components/Navigation";
import {Box, SkeletonCircle, SkeletonText} from "@chakra-ui/react";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// @ts-ignore
const Home: NextPage = ({ profile }: ICustomer) =>
{
    return (
        <>
            <Navigation children={
                <>
                    <Box padding='6' boxShadow='lg' bg='white'>
                        <SkeletonCircle size='10' />
                        <SkeletonText mt='4' noOfLines={10} spacing='4' />
                    </Box>
                </>
            } profile={profile} />
        </>
    );
}

export async function getServerSideProps(context: any)
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

    const [profile] = [
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
            profile: profile,
        }
    }
}
export default Home;
