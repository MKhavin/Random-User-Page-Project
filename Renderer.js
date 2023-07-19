class Renderer {
  renderView(data) {
    this.#renderData(".user-container", "#user-info-template", data.userData);
    this.#renderData(".quote-container", "#quote-template", data);
    this.#renderData(".friends-container", "#users-friends-template", data);
    this.#renderData(".meat-container", "#meat-template", data);
    this.#renderData(".pokemon-container", "#pokemon-template", data.favPokemon);
  }

  renderError(data) {
    alert(data.error)
  }

  #renderData(parentId, templateId, data) {
    const parentElement = $(parentId);
    parentElement.empty()

    const template = Handlebars.compile($(templateId).html());
    const view = template(data);

    parentElement.append(view);
  }

  showSavedUsers(usersData) {
    $(".pop-up-container").addClass("show-pop-up")

    this.#renderData(".saved-users-container", "#saved-user-info-template", usersData)
  }

  closePopUpMenu() {
    $(".saved-users-container").empty()
    $(".pop-up-container").removeClass("show-pop-up")
  }
}
