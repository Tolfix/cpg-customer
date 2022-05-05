import type { NextApiRequest, NextApiResponse } from 'next'
import { ICompanyData } from '../../../interfaces/CompanyData';

export default async (req: NextApiRequest, res: NextApiResponse) =>
{
    if (req.method === 'GET')
    {
        const QUERY_STRING_PARAMETERS = <ICompanyData>{
            COMPANY_NAME: process.env.COMPANY_NAME || 'CPG',
            COMPANY_LOGO: process.env.COMPANY_LOGO || '',
        };

        return res.json(QUERY_STRING_PARAMETERS);
    }

}