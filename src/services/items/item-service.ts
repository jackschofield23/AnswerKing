import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

@autoinject
export class ItemService {
  constructor(private http: HttpClient) {}

  public async getItems(): Promise<IItem[]> {
    const response = await this.http.get('/item');

    // since the response we expect is a list,
    // we return an empty list for when the response
    // is not successful.
    return response.ok ? response.json() : [];
  }
}
