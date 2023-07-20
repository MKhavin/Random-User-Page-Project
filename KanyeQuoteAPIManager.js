class KanyeQuoteAPIManager {
    async getKanyeQuote() {
        const apiCallResult = this.#getKenyeQuoteAPICall()
        return this.#handleKanyeQuoteData(apiCallResult)
    }

    #getKenyeQuoteAPICall() {
        return $.get("https://api.kanye.rest/")
    }

    #handleKanyeQuoteData(data) {
        return data.quote
    }
}