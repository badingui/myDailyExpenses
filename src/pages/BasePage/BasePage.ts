import { SqliteDAL } from "../../app/DAL/SqliteDAL";
import { PreferencesDAL } from "../../app/DAL/PreferencesDAL";

export class BasePage
{
    public dailyBudget: number;
    public currentCurrencySymbole: string;

    constructor()
    {

    }
}