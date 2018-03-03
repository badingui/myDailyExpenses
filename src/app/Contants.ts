export class Constants
{
    public static  currencyList = [{name: "dollar", symbole: "&#36;"}, {name: "euro", symbole: "&euro;"}, {name: "mad", symbole: "DH"}];
    public static EuroSymbole = "&euro;";


    public static GetSymboleByName(currency: string)
    {
        return Constants.currencyList.filter(x => x.name == currency)[0].symbole;
    }
}