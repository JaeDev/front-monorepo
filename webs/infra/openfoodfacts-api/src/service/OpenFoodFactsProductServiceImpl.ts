import { Environment } from "@my-webs/core-domain";
import { OpenFoodFactsApiResponse, OpenFoodFactsProductService } from "@my-webs/core-interfaces";

export class OpenFoodFactsProductServiceImpl implements OpenFoodFactsProductService {
  private readonly domain: string;

  constructor(env: Environment) {
    switch (env) {
      case 'development':
        this.domain = 'https://world.openfoodfacts.org';
        break;
      case 'production':
        this.domain = 'https://world.openfoodfacts.org';
        break;
      default:
        throw new Error(`Unknown environment: ${env}`);
    }
  }
  
  async getProductDetail(barcode: string): Promise<OpenFoodFactsApiResponse> {
    const response = await fetch(`${this.domain}/api/v2/product/${barcode}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  async fetchProductList(keyword: string, page: number): Promise<any> {
    const response = await fetch(`${this.domain}/cgi/search.pl?search_terms=${keyword}&page=${page}&json=1`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }
  
}