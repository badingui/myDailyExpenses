import {Injectable, Inject} from '@angular/core';
import { AppPreferences } from '@ionic-native/app-preferences';


@Injectable()
export class PreferencesManager
{
    dictionary : string = "mydailyexpenses_preferences";

    constructor(private appPreferences: AppPreferences) { }

    public savePreference(key: string, value: string)
    {
        this.appPreferences.store(this.dictionary, key, value);
    }

    public getPreference(key: string)
    {
        var result : string;

        this.appPreferences.fetch(key).then((res) => { console.log(res); if(res) result = res; });

        return result;
    }
}