import type { Country } from "../interfaces/country.interface";
import type { RESTCountry } from "../interfaces/rest-countries.interfaces";

export class CountryMapper {

  // static RestCountry => Country
  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    return {
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      name: restCountry.translations['spa'].common ?? 'No Name In Spanish', // restCountry.translations['spa'].common ?? restCountry.name.common
      flagSvg: restCountry.flags.svg,
      capital: restCountry.capital.join(','),
      population: restCountry.population,
      region: restCountry.region,
      subregion: restCountry.subregion
    };
  }

  // static RestCountry[] => Country[]
  static mapRestCountryArrayToCountryArray(restCountries: RESTCountry[]): Country[] {

    return restCountries.map(this.mapRestCountryToCountry);

  }

}
