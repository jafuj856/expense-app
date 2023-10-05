
import { Controller, Get,Put,Delete,Param,Body } from '@nestjs/common';
import { AppService } from './app.service';
import {data,expenseType} from 'src/data'
import { v4 as uuid } from 'uuid';






@Controller('report/:type')
export class AppController {
  @Get()
   getAllReports(@Param('type')type:string){
      
    const ExpenceType = type === 'income' ?expenseType.INCOME : expenseType.EXPENSE
    return data.report.filter((report)=> report.type === ExpenceType)
   }
   
  @Get(":id")
  getById(@Param('type')type :string,@Param('id')id :string){
     const reportType = type === 'income'? expenseType.INCOME : expenseType.EXPENSE;
      return data.report.filter((report)=>report.type===reportType).find((report)=>report.id===id)
  }
@Put('create')
createReport(@Body(){amount,source}:{amount:number;source:String},
@Param('type')type:string){
  const newReport = {
    id:uuid(),
    source,
    amount,
    created_At:new Date(),
    updated_At:new Date,
    type: type ==='income' ?expenseType.INCOME : expenseType.EXPENSE
  }
data.report.push()
 return newReport
}
@Put(':id/update')
UpdateReport(@Param('id')id:string,@Param('type')type:string,@Body()amount){

   const reportType = type === 'income' ? expenseType.INCOME :expenseType.EXPENSE
   data.report.filter((report)=>report.type === reportType).find((report)=>report.id===id).amount=amount
   return data.report.find((report)=>report.id===id)
}
@Delete(':id')
deleteReport(){
  return "Report Deleted"
}
}
