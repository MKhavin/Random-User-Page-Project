class APIManager {
  #ipsumParasQuantity = 1;
  #ipsumQuoteType = "meat-and-filler";
  #randomUserCount = 8;
  #pokemonCount = 0;

  constructor() {
    this.data = {};
  }

  getUserData(callback) {
    this.data = {}

    Promise.all([
      this.#getRandomUserAPICall(),
      this.#getKenyeQuoteAPICall(),
      this.#getPokemonAPICall(),
      this.#getBaconipsum(),
    ])
      .then((result) => {
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
      })
      .catch(error => {
        this.data.error = error.responseText
        callback(this.data)
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
    return $.get(`https://randomuser.me/api/?results=${this.#randomUserCount}`);
  }

  #getKenyeQuoteAPICall() {
    return $.get("https://api.kanye.rest/");
  }

  #getBaconipsum() {
    return $.get(
      `https://baconipsum.com/api/?type=${this.#ipsumQuoteType}&paras=${this.#ipsumParasQuantity
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
    if (this.#pokemonCount === 0) {
      this.#pokemonCount = await this.#getPokemonCount();
    }

    let randValue = Math.floor(Math.random() * this.#pokemonCount) + 1;

    if (randValue > 1010) {
      randValue = this.#pokemonCount - randValue + 10000
    }

    return randValue;
  }

  async saveUserData(fileHandle) {
    const fileStream = await fileHandle.createWritable();
    await fileStream.write(new Blob([JSON.stringify(this.data, null, 4)], { type: "text/plain" }));
    await fileStream.close();
  }

  async loadUserDataFromFile(fileHandle) {
    const file = await fileHandle[0].getFile()
    const fileData = await file.text()

    this.data = JSON.parse(fileData)

    return this.data
  }
}
