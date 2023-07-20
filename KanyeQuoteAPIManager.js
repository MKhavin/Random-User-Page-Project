class KanyeQuoteAPIManager {
    async getKanyeQuoteData() {
        const apiCallResult = await this.#getKenyeQuoteAPICall()
        return this.#handleKanyeQuoteData(apiCallResult)
    }

    #getKenyeQuoteAPICall() {
        return $.get("https://api.kanye.rest/")
    }

    #handleKanyeQuoteData(data) {
        return data.quote
    }
}