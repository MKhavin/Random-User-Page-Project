class PokemonAPIManager {
  #pokemonCount;
  #giphyAPIManager;
  #pokemonColor;

  constructor() {
    this.#pokemonColor = new Map([
      ["normal", "none"],
      ["fighting", "red"],
      ["flying", "rgb(0,255,255)"],
      ["poison", "purple"],
      ["ground", "brown"],
      ["rock", "grey"],
      ["bug", "rgb(153,255,255)"],
      ["ghost", "yellow"],
      ["steel", "yellow"],
      ["fire", "yellow"],
      ["water", "yellow"],
      ["grass", "yellow"],
      ["electric", "yellow"],
      ["psychic", "yellow"],
      ["ice", "yellow"],
      ["dragon", "yellow"],
      ["dark", "yellow"],
      ["fairy", "yellow"],
      ["unknown", "blue"],
      ["shadow", "red"],
    ]);

    this.#pokemonCount = 0;
    this.#giphyAPIManager = new GiphyAPIManager();
  }

  async getFavPokemonData() {
    const apiCallResult = await this.#getPokemonAPICall();
    const pokemonData = this.#handlePokemonData(apiCallResult);
    const pokemonGifData = await this.#giphyAPIManager.getGifByText(
      pokemonData.name
    );

    return { ...pokemonData, gif: pokemonGifData };
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
      randValue = this.#pokemonCount - randValue + 10000;
    }

    return randValue;
  }

  #handlePokemonData(data) {
    return {
      name: data.name,
      art: data.sprites.other["official-artwork"]["front_default"],
      color: this.#pokemonColor.get(data.types[0].type.name),
    };
  }
}
