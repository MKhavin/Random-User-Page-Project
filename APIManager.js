class APIManager {
  #ipsumParasQuantity = 1;
  #ipsumQuoteType = "meat-and-filler";
  #randomUserCoun = 8;
  #pokemonCount;

  constructor() {
    this.data = {};
    // this.#pokemonCount = this.#getPokemonCount();
  }

  getUserData(callback) {
    const result = Promise.all([
      this.#getRandomUserAPICall(),
      this.#getKenyeQuoteAPICall(),
      this.#getPokemonAPICall(),
      this.#getBaconipsum(),
    ]).then((result) => {
      const favQuoteData = result[1];
      const aboutMeData = result[3];
      const favPokemonData = result[2];
      const usersData = result[0].results;

      this.#handleFavQuoteData(favQuoteData);
      this.#handleAboutMeData(aboutMeData);
      this.#handleFavPokemonData(favPokemonData);
      this.#handleUserData(usersData);
      this.#handleUsersFriendsData(usersData);

      callback(this.data);
    });
  }

  #handleFavQuoteData(data) {
    this.data.favQuote = data.quote;
  }

  #handleAboutMeData(data) {
    this.data.aboutMe = data.reduce(
      (quote, currentQuote) => quote + currentQuote,
      ""
    );
  }

  #handleFavPokemonData(data) {
    this.data.favPokemon = {
      name: data.name,
      art: data.sprites.other["official-artwork"]["front_default"],
    };
  }

  #handleUserData(data) {
    const userData = data[0];

    this.data.userData = {
      img: userData.picture.large,
      firstName: userData.name.first,
      lastName: userData.name.last,
      city: userData.location.city,
      state: userData.location.state,
    };
  }

  #handleUsersFriendsData(data) {
    this.data.usersFriends = data
      .splice(1)
      .map((item) => item.name.first + " " + item.name.last);
  }

  #getRandomUserAPICall() {
    return $.get(`https://randomuser.me/api/?results=${this.#randomUserCoun}`);
  }

  #getKenyeQuoteAPICall() {
    return $.get("https://api.kanye.rest/");
  }

  #getBaconipsum() {
    return $.get(
      `https://baconipsum.com/api/?type=${this.#ipsumQuoteType}&paras=${
        this.#ipsumParasQuantity
      }`
    );
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
    const pokemonCount = await this.#getPokemonCount();
    const randValue = Math.floor(Math.random() * pokemonCount) + 1;

    return randValue;
  }
}
