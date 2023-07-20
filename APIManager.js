class APIManager {
  constructor() {
    this.data = {};

    this.pokemonAPIManager = new PokemonAPIManager()
    this.kanyeQuoteAPIManager = new KanyeQuoteAPIManager()
    this.baconipsumAPIManager = new BaconipsumAPIManager()
    this.randomUserAPIManager = new RandomUserAPIManager()
  }

  getUserData(callback) {
    this.data = {}

    Promise.all([
      this.randomUserAPIManager.getRandomUsersData(),
      this.kanyeQuoteAPIManager.getKanyeQuoteData(),
      this.pokemonAPIManager.getFavPokemonData(),
      this.baconipsumAPIManager.getBackonipsumData(),
    ])
      .then((result) => {
        const favQuoteData = result[1];
        const aboutMeData = result[3];
        const favPokemonData = result[2];
        const usersData = result[0];

        this.data = {
          favQuote: favQuoteData,
          aboutMe: aboutMeData,
          favPokemon: favPokemonData,
          userData: usersData.userData,
          usersFriends: usersData.friendsData,
          id: usersData.id
        }

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
}
