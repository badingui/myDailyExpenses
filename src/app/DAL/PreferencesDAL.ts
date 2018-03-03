import {Injectable} from '@angular/core';
import {PreferencesManager} from '../PreferencesManager';


@Injectable()
export class PreferencesDAL
{
    public static CurrencyName = "dollar";
    public static CurrencySymbole = "&#36;";
    public static DailyBudget = 60;
    public static preferencesManager;


    constructor(preferencesManager: PreferencesManager) {

        
        PreferencesDAL.preferencesManager = preferencesManager;

        let CurrencyName = PreferencesDAL.preferencesManager.getPreference("CurrencyName");
        console.log("cc" + CurrencyName);
        if(CurrencyName)
        {
            PreferencesDAL.CurrencyName = CurrencyName;
        }

        var CurrencySymbole = PreferencesDAL.preferencesManager.getPreference("CurrencySymbole");
        if(CurrencySymbole)
        {
            PreferencesDAL.CurrencySymbole = CurrencySymbole;
        }

        var DailyBudget = PreferencesDAL.preferencesManager.getPreference("DailyBudget");
        if(DailyBudget)
        {
            PreferencesDAL.DailyBudget = parseInt(DailyBudget);
        }
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


    public  GetCurrencyName()
    {
        return PreferencesDAL.CurrencyName;
    }

    public  GetCurrencySymbole()
    {
        return PreferencesDAL.CurrencySymbole;
    }

    public  GetDailyBudget()
    {
        return PreferencesDAL.DailyBudget;
    }

}