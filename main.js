class Controller {
    #apiManager
    #renderer

    constructor() {
        this.#apiManager = new APIManager()
        this.#renderer = new Renderer()
    }

    main() {
        this.#loadUserData()

        $("#generate-user-button").click(this.#loadUserData.bind(this))
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
}

const controller = new Controller()
controller.main()