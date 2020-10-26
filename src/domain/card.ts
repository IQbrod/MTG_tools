export class Card {
    name: string;
    set_name: string;
    image_uri: string;
}

export class CardHelper {
    static fromJson(jsonObject: any): Card[] {
        let result: Card[] = [];
        // Multiface cards have a card_faces property containing at least two Card Face objects
        let objs: any[] = jsonObject?.card_faces || [jsonObject];
        objs.forEach(obj => {
            let card: Card = new Card();
            card.name = obj?.name;
            card.set_name = jsonObject?.set_name;
            card.image_uri = obj?.image_uris?.png;
            result.push(card);
        });
        return result;
    }
}