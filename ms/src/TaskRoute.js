export default class TaskRoute {
    constructor(mongoClient) {
        this.mongoClient = mongoClient
    }

    doSomething() {
        return this.mongoClient()
    }
}