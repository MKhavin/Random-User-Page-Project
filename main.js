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
        console.log(this)
        this.#apiManager.getUserData(result => {
            this.#renderer.renderView(result)
        })
    }
}

const controller = new Controller()
controller.main()