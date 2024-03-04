/**
 * 
 * Defines the structure for representing country data.
 * The interface details about a country, including its
 * common name, population, flag, and demonyms: f for female, m for male. 
 * 
 * **/

export interface Country {
    name: { common: string }
    population: number;
    flags?: { svg: string };
    demonyms?: { eng?: { f?: string; m?: string; } };
  }
  