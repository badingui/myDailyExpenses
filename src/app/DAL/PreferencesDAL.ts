import {Injectable} from '@angular/core';
import {PreferencesManager} from '../PreferencesManager';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SqliteDAL } from './SqliteDAL';


@Injectable()
export class PreferencesDAL
{
    public static CurrencyName : string;
    public static CurrencySymbole : string;
    public static DailyBudget : number;
    public static myTime : Date;
    public static preferencesManager;


    constructor(preferencesManager: PreferencesManager, public localNotifications: LocalNotifications, public storage: SqliteDAL) {
        
        PreferencesDAL.preferencesManager = preferencesManager;
    }

    public  SetCurrencyName(value: string)
    {
        PreferencesDAL.preferencesManager.savePreference("CurrencyName", value);
    }

    public  SetCurrencySymbole(value: string)
    {
        PreferencesDAL.preferencesManager.savePreference("CurrencySymbole", value);
    }

    public  SetDailyBudget(value: number)
    {
        PreferencesDAL.preferencesManager.savePreference("DailyBudget", value + "");
    }

    public  setCurrentMonthDebt(value: number)
    {
        PreferencesDAL.preferencesManager.savePreference("CurrentMonthDebt", value + "");
    }

    public  setCurrentMonthSaves(value: number)
    {
        PreferencesDAL.preferencesManager.savePreference("CurrentMonthSaves", value + "");
    }

    public  setTime(value: string)
    {
        PreferencesDAL.preferencesManager.savePreference("myTime", value);

        var date = new Date(Date.parse(value));
        var dateSchedule = new Date();

        dateSchedule.setDate(dateSchedule.getDate() + 1);
        dateSchedule.setHours(date.getHours());
        dateSchedule.setMinutes(date.getMinutes());
        dateSchedule.setSeconds(0);

        this.localNotifications.cancelAll().then(r => 
        {
            console.log("all cancel " + dateSchedule);

            this.storage.GetExpenses().then(r => 
                {
                    if(r)
                    {
                      var currentExpenses = 0;
                      r.forEach((e) => currentExpenses =  Number(currentExpenses) + Number(e.ExpenseAmount));
                    
                      this.localNotifications.schedule({
                        text: 'Your Expenses for the last day :' + currentExpenses ,
                        led: 'FF0000',
                        firstAt: new Date(dateSchedule.getTime()),
                        every: 'minute',
                        sound: null
                    });
                    }
          
                });


                var scope = this;

                this.GetDailyBudget().then(r => {

                    console.log("save daily: get daily budget");

            this.localNotifications.on("trigger", function(e){
                console.log("save daily");
                
                    scope.SaveDailyExpenses(r);
                })
                
            })
        })


      this.localNotifications.on("schedule", function()
    {
            console.log("scheduled !!");
    })
    }


    public SaveDailyExpenses(r: number)
    {
        this.storage.SaveDailyExpenses(r);
    }

    public async GetCurrencyName()
    {
        let CurrencyName = await PreferencesDAL.preferencesManager.getPreference("CurrencyName");
       
        if(CurrencyName)
        {
            PreferencesDAL.CurrencyName = CurrencyName;
        }
        else
        {
            return "dollar";
        }
        
        return PreferencesDAL.CurrencyName;
    }

    public async GetCurrencySymbole()
    {
        var CurrencySymbole = await PreferencesDAL.preferencesManager.getPreference("CurrencySymbole");
        
        if(CurrencySymbole)
        {
            PreferencesDAL.CurrencySymbole = CurrencySymbole;
        }
        else
        {
            return "&#36;";
        }
        return PreferencesDAL.CurrencySymbole;
    }

    public  async GetDailyBudget()
    {
        var DailyBudget = await PreferencesDAL.preferencesManager.getPreference("DailyBudget");

        if(DailyBudget)
        {
            PreferencesDAL.DailyBudget = parseInt(DailyBudget);
        }
        else
        {
            return 60;
        }

        return PreferencesDAL.DailyBudget;
    }

    public  async GetCurrentMonthDebt()
    {
        var CurrentMonthDebt = await PreferencesDAL.preferencesManager.getPreference("CurrentMonthDebt");

        if(CurrentMonthDebt)
        {
           return parseInt(CurrentMonthDebt);
        }
        else
        {
            return 0;
        }
    }

    public  async GetCurrentMonthSaves()
    {
        var CurrentMonthSaves = await PreferencesDAL.preferencesManager.getPreference("CurrentMonthSaves");

        if(CurrentMonthSaves)
        {
           return parseInt(CurrentMonthSaves);
        }
        else
        {
            return 0;
        }
    }

    public  async getTime()
    {
        var myTime = await PreferencesDAL.preferencesManager.getPreference("myTime");

        if(myTime)
        {
            PreferencesDAL.myTime = myTime;
        }
        else
        {
            var dateNow = new Date();
            return new Date(dateNow.getFullYear(),dateNow.getMonth(),dateNow.getDay(),0,0,0,0);
        }

        return PreferencesDAL.myTime;
    }
}