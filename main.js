class Controller {
    #apiManager
    #renderer
    #backUpManager

    constructor() {
        this.#apiManager = new APIManager()
        this.#renderer = new Renderer()
        this.#backUpManager = new BackUpManager()
    }

    main() {
        this.#loadUserData()

        this.#setEventListeners()

        this.#setHandlebarHelpers()
    }

    #loadUserData() {
        this.#apiManager.getUserData(result => {
            if ("error" in result) {
                this.#renderer.renderError(result)
                return
            }

            this.#renderer.renderView(result)
        })
    }

    #setEventListeners() {
        $("#generate-user-button").click(this.#loadUserData.bind(this))
        $("#save-user-data-button").click(this.#saveUserData.bind(this))
        $("#load-user-data-button").click(this.#loadUserDataFromFile.bind(this))
        $("#pop-up-close-button").click(this.#closePopUpMenu.bind(this))
        $(".saved-users-container").on("click", ".saved-users-item", this.#savedUserClicked.bind(this))
        $("#show-saved-user-button").click(this.#showSavedUsersData.bind(this))
    }

    #setHandlebarHelpers() {
        Handlebars.registerHelper('capitalized', value => {
            const lowerCasedValue = value.toLowerCase()

            return lowerCasedValue.slice(0, 1).toUpperCase() + lowerCasedValue.slice(1)
        })
    }

    #saveUserData() {
        this.#backUpManager.saveUserData(this.#apiManager.data)
            .then(result => {
                alert("User saved successfully.")
                this.#renderer.setSaveButtonEnabled(true)
            })
    }

    #loadUserDataFromFile() {
        this.#backUpManager.loadUserDataFromFile().then(result => {
            alert("Users data successfully loaded.")
        })
    }

    #closePopUpMenu() {
        this.#renderer.closePopUpMenu()
    }

    #savedUserClicked(event) {
        const userDataId = $(event.currentTarget).attr("user-id")
        const userData = this.#backUpManager.getUserBackUpDataById(userDataId)

        // this.#apiManager.data = userData

        this.#renderer.closePopUpMenu()
        this.#renderer.renderView(userData)
    }

    #showSavedUsersData() {
        const usersData = this.#backUpManager.getUsersInfoBackUpData()
        this.#renderer.showSavedUsers({ users: usersData })
    }
}

const controller = new Controller()
controller.main()