export const data: Data = {
    report:[]
}

interface Data {
     report:{
        id:string;
        source:string;
        amount:number;
        created_At:Date;
        updated_At:Date;
        type:string;

     }[]
}

export enum expenseType{
    INCOME = "income",
    EXPENSE = "expence"
}

data.report.push({
    id:"uid",
    source:"salary",
    amount:7500,
    created_At:new Date(),
    updated_At:new Date(),
    type:expenseType.INCOME
},
{
    id:"uid454",
    source:"youtube",
    amount:1500,
    created_At:new Date(),
    updated_At:new Date(),
    type:expenseType.EXPENSE
})