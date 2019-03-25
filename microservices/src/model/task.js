import uuid from 'uuid/v4';

export default class Task {

    constructor(id, title) {
        if (id === undefined)
            this.id = uuid()
        else
            this.id = id

        this.title = title
    }

}