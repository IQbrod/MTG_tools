import { SearchService } from "./service/search-service";

const searchService : SearchService = new SearchService();

const groupBy = (data, key) => {
    return data.reduce(function(res, curr) {
      (res[curr[key]] = res[curr[key]] || []).push(curr);
      return res;
    }, {});
};

searchService.getCards().then(cards => {
    let v = groupBy(cards, "set_name");
    console.log(v["Innistrad"].length);
});