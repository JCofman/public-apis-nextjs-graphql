import { RESTDataSource } from "apollo-datasource-rest";

export type Root = {
  entries: Entry[];
  count: number;
};

export interface Entry {
  API: string;
  Description: string;
  Auth: string;
  HTTPS: boolean;
  Cors: string;
  Link: string;
  Category: string;
  title: string;
}

export class ServiceAPI extends RESTDataSource {
  constructor() {
    // Always call super()
    super();
    // Sets the base URL for the REST API
    this.baseURL = "https://api.publicapis.org/";
  }

  async getServices() {
    // Send a GET request to the specified endpoint
    const data = await this.get<Root>(`entries`);

    return data.entries.map((entry) => {
      return {
        link: entry.Link,
        auth: entry.Auth,
        category: entry.Category,
        cors: entry.Cors,
        description: entry.Description,
        https: entry.HTTPS,
        title: entry.API,
      };
    });
  }
  async getService(params: URLSearchParams) {
    // Send a GET request to the specified endpoint
    const data = await this.get<Root>(`entries`, params);
    if (data.count === 1) {
      const entry = data.entries[0];
      return {
        link: entry.Link,
        auth: entry.Auth,
        category: entry.Category,
        cors: entry.Cors,
        description: entry.Description,
        https: entry.HTTPS,
        title: entry.API,
      };
    }
  }
}
