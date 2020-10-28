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
    for (const [set, cards] of Object.entries(sets)) {
        // Debug purpose
        if (set == "Innistrad") {
        let folderName: string = constants.output_folder + set.replace(/\W/g, '').toLowerCase();
            if (!fs.existsSync(folderName)) {
                fs.mkdirSync(folderName);
            }
            (cards as Card[]).forEach(card => {
                let iter: number = 0;
                let fileName: string = "/" + card.name.replace(/\W/g, '').toLowerCase();
                /** Some cards are edited twice in a same set (eg: Lands),
                 * We increment "iter" to get files like forest.png / forest_2.png / forest_3.png */
                while (fs.existsSync(folderName + fileName + (iter ? "_" + iter+1 : "") + ".png")) {
                    iter++;
                }
                searchService.downloadPicture(card.image_uri, folderName + fileName + (iter ? "_" + (iter+1) : "") + ".png");
            });
        }
    }
});