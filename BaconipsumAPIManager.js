class BaconipsumAPIManager {
    #ipsumParasQuantity = 1;
    #ipsumQuoteType = "meat-and-filler";

    async getBackonipsumData() {
        const apiCallResult = await this.#getBaconipsumAPICall()
        return this.#handleBaconipsumData(apiCallResult)
    }

    #getBaconipsumAPICall() {
        return $.get(
            `https://baconipsum.com/api/?type=${this.#ipsumQuoteType}&paras=${this.#ipsumParasQuantity
            }`
        );
    }

    #handleBaconipsumData(data) {
        return data.reduce(
            (quote, currentQuote) => quote + currentQuote,
            ""
        );
    }
}