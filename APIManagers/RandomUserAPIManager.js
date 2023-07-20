class RandomUserAPIManager {
    #randomUserCount = 8;

    async getRandomUsersData() {
        const apiCallResult = await this.#getRandomUserAPICall()

        const userData = this.#handleUserData(apiCallResult.results)
        const friendsData = this.#handleUsersFriendsData(apiCallResult.results)

        return { ...userData, friendsData }
    }

    #getRandomUserAPICall() {
        return $.get(`https://randomuser.me/api/?results=${this.#randomUserCount}`);
    }

    #handleUserData(data) {
        const currentUserData = data[0];

        const id = currentUserData.id.value.replaceAll(" ", "-")
        const userData = {
            img: currentUserData.picture.large,
            firstName: currentUserData.name.first,
            lastName: currentUserData.name.last,
            city: currentUserData.location.city,
            state: currentUserData.location.state,
        }

        return { userData, id }
    }

    #handleUsersFriendsData(data) {
        return data
            .splice(1)
            .map((item) => item.name.first + " " + item.name.last);
    }
}