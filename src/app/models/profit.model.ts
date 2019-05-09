export interface Profit {
    ClientId: string;
    FirstName: string;
    Surname: string;
    InvestmentAmount: string;
    InvestmentName: string;
    InvestmentId: string;
    ProfitAmount: string;
    CreateDate: string;
    ProfitId: string;
    PMonth: string;
    PYear: string;
}

export interface Dataset {
    label: string;
    data: number[];
    fill: boolean;
    borderColor: string;
}

export interface ProfitGraph {
    labels: string[];
    datasets: Dataset[];
}