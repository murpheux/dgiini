import mongoose from 'mongoose'

const task_schema = new mongoose.Schema({
    id: mongoose.Schema.ObjectId,
    title: { type: String, required: true, match: /[a-z]/ },
    description: { type: String, default: null, match: /[a-z]/ },
    category: { type: String, default: null },
    estimated_hours: { type: Number, min: 0, index: true },
    client: {
        id: { type: String },
        name: { type: String }
    },
    location: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zipcode: { type: String },
        country: { type: String }
    },
    time: { type: Date, default: Date.now().valueOf() }
})

export default task_schema