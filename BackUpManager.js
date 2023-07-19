class BackUpManager {
    #backUpData
    #fileType = [
        {
            description: "JSON file",
            accept: { "application/json": [".json"] },
        },
    ]

    constructor() {
        this.#backUpData = []
    }

    async saveUserData(userData) {
        this.#backUpData.push(userData)

        const fileHandler = await this.#showSaveFilePicker()

        const fileStream = await fileHandler.createWritable();
        await fileStream.write(new Blob([JSON.stringify(this.#backUpData, null, 4)], { type: "text/plain" }));
        await fileStream.close();
    }

    async loadUserDataFromFile() {
        const fileHandler = await this.#showOpenFilePicker()

        const file = await fileHandler[0].getFile()
        const fileData = await file.text()

        this.#backUpData = JSON.parse(fileData)

        return this.#backUpData
    }

    getUserBackUpDataById(userDataId) {
        return this.#backUpData.find(item => item.id === userDataId)
    }

    getUsersInfoBackUpData() {
        const usersData = this.#backUpData.map(item => ({
            id: item.id,
            ...item.userData
        }))

        return usersData
    }

    #showSaveFilePicker() {
        const options = {
            suggestedName: "UserData",
            types: this.#fileType
        }

        return window.showSaveFilePicker(options)
    }

    #showOpenFilePicker() {
        const options = {
            types: this.#fileType,
            excludeAcceptAllOption: true,
            multiple: false
        }

        return window.showOpenFilePicker(options)
    }
}