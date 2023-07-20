class GiphyAPIManager {
    #apiKey = "hJfmcsWXwTCTaDDPSMCLu5JV5lglbNPN"
    #resultLimit = 1

    async getGifByText(text) {
        const apiCallResult = await this.#getGiphyAPICall(text)
        return this.#handleAPIResult(apiCallResult)
    }

    async #getGiphyAPICall(text) {
        return $.get(`https://api.giphy.com/v1/gifs/search?api_key=${this.#apiKey}&q=${text}&limit=${this.#resultLimit}`)
    }

    #handleAPIResult(result) {
        const data = result.data[0]
        const gifURL = data["embed_url"]

        return gifURL
    }
}