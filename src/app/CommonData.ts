import { PreferencesDAL } from "./DAL/PreferencesDAL";
import { SqliteDAL } from "./DAL/SqliteDAL";

export class CommonData
{
    public static DailyBudget : Promise<number>;
    public static CurrencySymbole: Promise<string>;


    public static InitCommonData(storage: SqliteDAL, preferences: PreferencesDAL)
    {
        console.log("[MyLogger]: INIT COMMON DATA");

        CommonData.CurrencySymbole = preferences.GetCurrencySymbole();
        CommonData.DailyBudget = preferences.GetDailyBudget();
    }
}