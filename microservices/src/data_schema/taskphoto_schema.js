import mongoose from 'mongoose'

const taskphoto_schema = new mongoose.Schema({
    id: mongoose.Schema.ObjectId,
    task: { type: String, required: true },
    time: { type: Date, default: Date.now().valueOf() },
    status: { type: Boolean, default: true },
    photos: [{ photo: { type: String }, filetype: { type: String } }]
})

export default taskphoto_schema