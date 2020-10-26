import { Card, CardHelper } from "../domain/card";
import { RestService } from "./rest-service";

const restService: RestService = new RestService();

export class SearchService {
    async getCards(): Promise<Card[]> {
        return (await restService.getLatestBulk())
            .map(obj => CardHelper.fromJson(obj)) // Card[][]
            .reduce((x,y) => x.concat(y), []); // Card[]
    }
}