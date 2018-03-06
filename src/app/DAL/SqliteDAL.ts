import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage'
import { ExpenseModel } from '../Model/ExpenseModel';


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
        
        console.log("liste:gg " + this.isReady);

        if(this.isReady)
        {
            lstExpenses = await this.storage.get("listeExpenses");
            console.log("liste:gg " + lstExpenses);
        }
    
        console.log("liste: " + lstExpenses);

        //d
        return lstExpenses;
    }
}