const axios = require('axios');

export class RestService {
    private async getLatestBulkUrl(): Promise<string> {
        return (await axios.get("https://api.scryfall.com" + "/bulk-data/default_cards")).data?.download_uri;
    }

    async getLatestBulk(): Promise<any> {
        return (await axios.get(await this.getLatestBulkUrl())).data;
    }
}