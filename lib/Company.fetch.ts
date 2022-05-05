import { ICompanyData } from "../interfaces/CompanyData";

export default async function getCompanyData(): Promise<ICompanyData>
{
    const companyName = await fetch(`/api/info/company`).then(res => res.json());
    return companyName;
}