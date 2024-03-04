import axios from 'axios';
import { Country } from '../types/country.type';

// fetch all countries
export const fetchCountries = async ():Promise<Country[]> => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
     // Sort the countries alphabetically
     const sortedCountries = response.data.sort((a: Country, b: Country) => a.name.common.localeCompare(b.name.common));
     return sortedCountries;
  } catch (error) {
    console.error('Failed to fetch countries:', error);
    return [];
  }
};


// fetch details of a country
export const fetchCountryDetail =  async (name: string) => {
  try {
    const encodedName = encodeURIComponent(name);
    const response = await axios.get(`https://restcountries.com/v3.1/name/${encodedName}?fullText=true`);
    if (response.data && response.data.length > 0) {
      const countryData = response.data[0];
      const country: Country = {
        flags: countryData.flags,
        name: countryData.name,
        population: countryData.population,
        demonyms: countryData.demonyms
      };
      return country;
    }
    return undefined;
  } catch (error) {
    console.error(`Failed to fetch country details for ${name}:`, error);
    throw error; 
  }
};