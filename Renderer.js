class Renderer {
  constructor() {
    this.#initMainElAndTemplates()

    this[`_savedUsersContainer`] = $(`.saved-users-container`)
    this[`_savedUsersTemplate`] = Handlebars.compile($(`#saved-users-template`).html())
    this[`_popUpContainer`] = $(`.pop-up-container`)
  }

  renderView(data) {
    this.#renderData("_userContainer", "_userTemplate", data.userData);
    this.#renderData("_quoteContainer", "_quoteTemplate", data);
    this.#renderData("_friendsContainer", "_friendsTemplate", data);
    this.#renderData("_meatContainer", "_meatTemplate", data);
    this.#renderData("_pokemonContainer", "_pokemonTemplate", data.favPokemon);
  }

  renderError(data) {
    alert(data.error)
  }

  #renderData(parentId, templateId, data) {
    const parentElement = this[parentId];
    parentElement.empty()

    const template = this[templateId];
    const view = template(data);

    parentElement.append(view);
  }

  #initMainElAndTemplates() {
    const mainElAndTemplates = ["user", "quote", "friends", "meat", "pokemon"]

    mainElAndTemplates.forEach(item => {
      this[`_${item}Container`] = $(`.${item}-container`)
      this[`_${item}Template`] = Handlebars.compile($(`#${item}-template`).html())
    })
  }

  showSavedUsers(usersData) {
    this["_popUpContainer"].addClass("show-pop-up")
    this.#renderData("_savedUsersContainer", "_savedUsersTemplate", usersData)
  }

  closePopUpMenu() {
    this["_savedUsersContainer"].empty()
    this["_popUpContainer"].removeClass("show-pop-up")
  }
}
