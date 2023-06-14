const {mongoose, Schema, model } = require("mongoose");


const eventSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        place: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        //not required
        pictures: {
            type: String,
            required: false,
        },
        likes: {
            type: Number,
            required: false
        },
        price: {
            type: Number,
            required: false
        },
        description: {
            type: String,
            required: false
        },
        type: {
            type: String,
            required: true,
            enum:[ "Concert","Theater","Outside","Other", "Party", "Sport", "Dinner", "Bar", "Talking"]
        },
        users: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
        username: {
            type: String,
        },
        //maxParticipant
        //condition
    },
    {
        timestamps: true
    }
)
const Event = model("Event", eventSchema);

module.exports = Event;