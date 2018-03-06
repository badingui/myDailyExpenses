import {Injectable} from '@angular/core';
import { AppPreferences } from '@ionic-native/app-preferences';


@Injectable()
export class PreferencesManager
{
    dictionary : string = "mydailyexpenses_preferences";

    constructor(private appPreferences: AppPreferences) { }

    public savePreference(key: string, value: string)
    {
        console.log("save preferences");
        this.appPreferences.store(this.dictionary, key, value);
    }

    public async getPreference(key: string)
    {
        var result : Promise<string>;

        result = await this.appPreferences.fetch(this.dictionary, key);//.then((res) => {  return res; });

        return result;
    }
}