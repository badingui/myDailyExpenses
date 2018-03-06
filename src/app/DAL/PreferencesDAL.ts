import {Injectable} from '@angular/core';
import {PreferencesManager} from '../PreferencesManager';


@Injectable()
export class PreferencesDAL
{
    public static CurrencyName : string;
    public static CurrencySymbole : string;
    public static DailyBudget : number;
    public static myTime : Date;
    public static preferencesManager;


    constructor(preferencesManager: PreferencesManager) {
        
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

    public  setTime(value: string)
    {
        PreferencesDAL.preferencesManager.savePreference("myTime", value);
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

    public  async getTime()
    {
        var myTime = await PreferencesDAL.preferencesManager.getPreference("myTime");
        if(myTime)
        {
            PreferencesDAL.myTime = myTime;
        }
        else
        {
            return new Date(0,0,0,0,0,0,0);
        }

        return PreferencesDAL.myTime;
    }
}