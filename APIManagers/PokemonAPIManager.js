class PokemonAPIManager {
    #pokemonCount = 0

    async getFavPokemonData() {
        const apiCallResult = await this.#getPokemonAPICall()

        return this.#handleFavPokemonData(apiCallResult)
    }

    async #getPokemonCount() {
        const result = await $.get("https://pokeapi.co/api/v2/pokemon?limit=1");
        const pokemonCount = result.count;

        return pokemonCount;
    }

    async #getPokemonAPICall() {
        const randomPokemonID = await this.#getRandomPokemonID();

        return $.get(`https://pokeapi.co/api/v2/pokemon/${randomPokemonID}`);
    }

    async #getRandomPokemonID() {
        if (this.#pokemonCount === 0) {
            this.#pokemonCount = await this.#getPokemonCount();
        }

        let randValue = Math.floor(Math.random() * this.#pokemonCount) + 1;

        if (randValue > 1010) {
            randValue = this.#pokemonCount - randValue + 10000
        }

        return randValue;
    }

    #handleFavPokemonData(data) {
        return {
            name: data.name,
            art: data.sprites.other["official-artwork"]["front_default"]
        }
    }
}