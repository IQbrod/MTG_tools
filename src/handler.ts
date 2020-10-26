import { SearchService } from "./service/search-service";

const searchService : SearchService = new SearchService();

// Available cards
searchService.getCards().then(cards => {
    console.log(cards);
})