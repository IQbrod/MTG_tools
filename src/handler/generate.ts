import { Card } from "../domain/card";
import { SearchService } from "../service/search-service";

const constants = require("../constants");
const fs = require("fs");
const searchService: SearchService = new SearchService();

const groupBy = (data, key) => {
    return data.reduce(function (res, curr) {
        (res[curr[key]] = res[curr[key]] || []).push(curr);
        return res;
    }, {});
};

let cardsPromise: Promise<Card[]> = fs.existsSync(constants.local_cards_file) ? searchService.getLocalCards() : searchService.download();

cardsPromise.then(cards => {
    let sets = groupBy(cards, "set_name");
    for (const [set, _] of Object.entries(sets)) {
        let folderName: string = constants.output_folder + set.replace(/\W/g, '').toLowerCase();
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
        }
        //console.log(cards[0].image_uri);
    }
    //return searchService.downloadPicture(sets["Innistrad"][0].image_uri, "temp.png");
});