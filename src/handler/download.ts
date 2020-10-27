import { Card } from "../domain/card";
import { SearchService } from "../service/search-service";

const fs = require("fs");
const searchService : SearchService = new SearchService();

export function download(): Promise<Card[]> {
    return searchService.getRemoteCards().then(cards => {
        fs.writeFileSync(__dirname + "/../data/cards-latest.json", JSON.stringify(cards));
        return cards;
    });
}

download();