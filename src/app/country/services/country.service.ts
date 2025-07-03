import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';

import type { Country, Region } from '../interfaces/country.interface';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);
  private querycacheCapital = new Map<string, Country[]>()
  private querycacheCountry = new Map<string, Country[]>()
  private queryCacheRegion  = new Map<Region, Country[]>()

  searchByCapital( query: string ): Observable<Country[]> {

    query = query.toLowerCase();
    // console.log(this.querycacheCapital)

    if ( this.querycacheCapital.has(query) ){
      return of( this.querycacheCapital.get(query) ?? []);
    }

    // console.log(`Llegando al servidor por ${query}`);

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${ query }`)
      .pipe(
          map((response) => CountryMapper.mapRestCountryArrayToCountryArray(response)),
          tap( countries => this.querycacheCapital.set(query, countries)),
        catchError((error: any) => {
          // console.log('Error fetching ', error);

          return throwError(
            () => new Error(`No se encontro un país con la capital: ${query}`)
          );
        })
    );
  }

  searchByCountry( query: string ): Observable<Country[]> {

    query = query.toLowerCase();

    if ( this.querycacheCountry.has(query) ){
      return of( this.querycacheCountry.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${ query }`)
      .pipe(
          map((response) => CountryMapper.mapRestCountryArrayToCountryArray(response)),
          tap( countries => this.querycacheCountry.set(query, countries)),
        // delay(3000), // Simula un retraso de 3 segundos
        catchError((error: any) => {
          return throwError(
            () => new Error(`No se encontro un país con el nombre: ${query}`)
          );
        })
    );
  }

  searchCountryByAlphaCode( code: string ): Observable<Country[]> {

    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${ code }`)
      .pipe(
          map((response) => CountryMapper.mapRestCountryArrayToCountryArray(response)),
          map((countries) => countries.at(0) ? [countries[0]] : []),
          catchError((error: any) => {
            return throwError(
              () => new Error(`No se encontro un país con ese código: ${code}`)
            );
          })
      );
  }

  searchCountryByRegion( region: Region ): Observable<Country[]>{

    if ( this.queryCacheRegion.has(region) ){
      return of( this.queryCacheRegion.get(region) ?? []);
    }

    // console.log(`Llegando al servidor por ${region}`);

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${ region }`)
      .pipe(
        map((response) => CountryMapper.mapRestCountryArrayToCountryArray(response)),
        tap( countries => this.queryCacheRegion.set(region, countries)),
        catchError ((error : any) => {
          return throwError(
            () => new Error(`No se encontro una región por: ${region}`)
          );
        })
    )

  }

}
