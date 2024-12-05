import { v4 as uuidv4 } from 'uuid'
import fs from 'fs/promises';
import path from 'path';


// TODO: Define a City class with name and id properties
class City {
  id: string;
  name: string;

  constructor(name: string) {
    this.id = uuidv4(); 
    this.name = name;
  }
}
// TODO: Complete the HistoryService class
class HistoryService {
  deleteCity(_id: string) {
    throw new Error('Method not implemented.');
  }
  getSearchHistory() {
    throw new Error('Method not implemented.');
  }
  saveCity(_cityName: any) {
    throw new Error('Method not implemented.');
  }
  // TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
  private async read(): Promise<City[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data) as City[];
    } catch (error) {
      if (error instanceof Error) {
        // If the file doesn't exist, return an empty array
        return [];
      }
      throw new Error(`Error reading file: ${error}`);
    }
  }
  private filePath: string;
  constructor() {
    // Define the path to the search history JSON file
    this.filePath = path.resolve('searchHistory.json');
  }

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
  private async write(cities: City[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2), 'utf-8');
  } 
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
  async getCities(): Promise<City[]> {
    return await this.read();
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
  async addCity(cityName: string): Promise<City> {
    const cities = await this.read();
    const city = new City(cityName);
    if (cities.some((existingCity) => existingCity.name.toLowerCase() === cityName.toLowerCase())) {
      throw new Error(`City "${cityName}" already exists in the history.`);
    }

    cities.push(city);
    await this.write(cities);
    return city;
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
  async removeCity(id: string): Promise<void> {
    const cities = await this.read();
    const filteredCities = cities.filter((city) => city.id !== id);

    if (cities.length === filteredCities.length) {
      throw new Error(`City with ID "${id}" not found.`);
    }

    await this.write(filteredCities);
  }
}

export default new HistoryService();
