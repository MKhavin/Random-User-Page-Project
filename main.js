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
    }

    #setHandlebarHelpers() {
        Handlebars.registerHelper('capitalized', value => {
            const lowerCasedValue = value.toLowerCase()

            return lowerCasedValue.slice(0, 1).toUpperCase() + lowerCasedValue.slice(1)
        })
    }
}

const controller = new Controller()
controller.main()