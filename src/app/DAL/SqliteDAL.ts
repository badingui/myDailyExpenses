import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage'
import { ExpenseModel } from '../Model/ExpenseModel';
import { PreferencesDAL } from './PreferencesDAL';
import { MonthlyExpenseModel } from '../Model/MonthlyExpenseModel';


@Injectable()
export class SqliteDAL
{
    isReady : boolean = false;
    constructor(public storage: Storage) {

        storage.ready().then(() => {
            this.isReady = true;
        });

    }

    
    public SaveExpense(expense: ExpenseModel)
    {
        
        if(this.isReady)
        {
            var lstExpenses : ExpenseModel[] = [];
        
            this.storage.get("listeExpenses").then((val) => {
                if(val)
                {
                    lstExpenses = val;      
                }
       
                lstExpenses.unshift(expense);
                this.storage.set('listeExpenses', lstExpenses);
            });
 
            return true;
        }

        return false;
    }

    public async GetExpenses()
    {

        var lstExpenses : Promise<Array<ExpenseModel>>;
        
        if(true)
        {
            lstExpenses = await this.storage.get("listeExpenses");
        }
    
        return lstExpenses;
    }

    public async GetCurrentMonthExpenses()
    {
        var lstExpenses : Promise<Array<MonthlyExpenseModel>>;

        lstExpenses = await this.storage.get("listeMonthlyExpenses");

        return lstExpenses;
    }

    public UpdateMonthlyExpenses(currentDayExpenses: number, debt: number, saves: number)
    {
        if(this.isReady)
        {

            var lstMonthlyExpenses : MonthlyExpenseModel[] = [];
            var currentMonthExpenses : MonthlyExpenseModel = new MonthlyExpenseModel((new Date()).getMonth(), 0, 0, 0);
            var currentMonthExpensesIndex = -1;

            this.storage.get("listeMonthlyExpenses").then((val) => {
                if(val)
                {
                    lstMonthlyExpenses = val;      
                }


       
                lstMonthlyExpenses.forEach((element, index) => {
                    if(element.MonthId == (new Date()).getMonth())
                    {
                        currentMonthExpenses = element;
                        currentMonthExpensesIndex = index;
                        return;
                    }
                });

                
                currentMonthExpenses.ExpenseAmount += currentDayExpenses;
                currentMonthExpenses.debt += 25;//debt - saves;
                currentMonthExpenses.saves += 32;//saves;


                if(currentMonthExpensesIndex > 0)
                {
                    lstMonthlyExpenses[currentMonthExpensesIndex] = currentMonthExpenses;
                }
                
                this.storage.set('listeMonthlyExpenses', lstMonthlyExpenses);
            });
 
            return true;
        }

        return false;
    }

    public SaveDailyExpenses(dailyBudget: number)
    {
        console.log("save daily expenses DAL");
        this.GetExpenses().then(r => {

                
          
                    let liste : ExpenseModel[];

                    liste = r;
    
                    
                    var currentDayExpenses = 0;
                    var currentDayLoan =0;
                    var currentDaySave = 0;
    
                    liste.forEach((e) => currentDayExpenses =  Number(currentDayExpenses) + Number(e.ExpenseAmount));
    
                    if(currentDayExpenses > dailyBudget)
                    {
                        currentDayLoan = currentDayExpenses - dailyBudget;
                    }
                    else
                    {
                        currentDaySave = dailyBudget - currentDayExpenses;
                    }
                    
                    console.log("currentDayLoan: " + currentDayLoan + " ; currentDaySave: " + currentDaySave);
                    this.UpdateMonthlyExpenses(currentDayExpenses, currentDayLoan, currentDaySave);
              
                

        })
    }
}