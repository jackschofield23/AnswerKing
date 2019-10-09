import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

@autoinject
export class CategoriesService {
  constructor(private http: HttpClient) {}

  public async getCategories(): Promise<ICategory[]> {
    const response = await this.http.get('https://answer-king-java-jack.herokuapp.com/category');

    return response.ok ? response.json() : [];
  }
}
