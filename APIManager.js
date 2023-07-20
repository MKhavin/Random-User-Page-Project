class APIManager {
  #ipsumParasQuantity = 1;
  #ipsumQuoteType = "meat-and-filler";
  #randomUserCount = 8;

  constructor() {
    this.data = {};
    this.pokemonAPIManager = new PokemonAPIManager()
  }

  getUserData(callback) {
    this.data = {}

    Promise.all([
      this.#getRandomUserAPICall(),
      this.#getKenyeQuoteAPICall(),
      this.pokemonAPIManager.getFavPokemonData(),
      this.#getBaconipsum(),
    ])
      .then((result) => {
        const favQuoteData = result[1];
        const aboutMeData = result[3];
        const favPokemonData = result[2];
        const usersData = result[0].results;

        this.#handleFavQuoteData(favQuoteData);
        this.#handleAboutMeData(aboutMeData);
        // this.#handleFavPokemonData(favPokemonData);
        this.data.favPokemon = favPokemonData
        this.#handleUserData(usersData);
        this.#handleUsersFriendsData(usersData);

        callback(this.data);
      })
      .catch(error => {
        this.data.error = `
        Error occured in process of loading user data. 
        Check your internet connection and try again later.
        `
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

  #handleUserData(data) {
    const userData = data[0];

    this.data.id = userData.id.value.replaceAll(" ", "-")
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
}
