class Controller {
    #apiManager
    #renderer

    constructor() {
        this.#apiManager = new APIManager()
        this.#renderer = new Renderer()
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
    }

    #setHandlebarHelpers() {
        Handlebars.registerHelper('capitalized', value => {
            const lowerCasedValue = value.toLowerCase()

            return lowerCasedValue.slice(0, 1).toUpperCase() + lowerCasedValue.slice(1)
        })
    }

    #getUserDataFileType() {
        return [
            {
                description: "JSON file",
                accept: { "application/json": [".json"] },
            },
        ]
    }

    #saveUserData() {
        const options = {
            suggestedName: "UserData",
            types: this.#getUserDataFileType()
        }

        window.showSaveFilePicker(options).then(handler => {
            this.#apiManager.saveUserData(handler)
        });
    }

    #loadUserDataFromFile() {
        const options = {
            types: this.#getUserDataFileType(),
            excludeAcceptAllOption: true,
            multiple: false
        }

        window.showOpenFilePicker(options)
            .then(handler => this.#apiManager.loadUserDataFromFile(handler))
            .then(result => this.#renderer.renderView(result))
    }
}

const controller = new Controller()
controller.main()