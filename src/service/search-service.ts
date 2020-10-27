import { Card, CardHelper } from "../domain/card";
import { RestService } from "./rest-service";

const constants = require("../constants");
const fs = require("fs");
const restService: RestService = new RestService();

export class SearchService {
    async getRemoteCards(): Promise<Card[]> {
        return (await restService.getLatestBulk())
            .map(obj => CardHelper.fromJson(obj)) // Card[][]
            .reduce((x,y) => x.concat(y), []); // Card[]
    }

    async getLocalCards(): Promise<Card[]> {
        return JSON.parse(fs.readFileSync(constants.local_cards_file, {encoding:'utf8'}));
    }

    async download(): Promise<Card[]> {
        return this.getRemoteCards().then(cards => {
            fs.writeFileSync(constants.local_cards_file, JSON.stringify(cards), {encoding:'utf8'});
            return cards;
        });
    }
}