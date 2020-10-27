import { Card } from "../domain/card";
import { SearchService } from "../service/search-service";
import { download } from "./download";

const fs = require("fs");
const searchService : SearchService = new SearchService();

const groupBy = (data, key) => {
    return data.reduce(function(res, curr) {
      (res[curr[key]] = res[curr[key]] || []).push(curr);
      return res;
    }, {});
};

let cardsPromise: Promise<Card[]> = fs.existsSync(__dirname + "/../data/cards-latest.json") ? searchService.getLocalCards() : download();

cardsPromise.then(cards => {
    let v = groupBy(cards, "set_name");
    console.log(v["Innistrad"].length);
});