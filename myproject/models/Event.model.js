const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
    {
        //user who created this event
        user: {},
        //required = true
        name: {
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
        //not required
        pictures: {
            type: String,
            required: false
        },
        likes: {
            type: Number,
            required: false
        },
        price: {
            type: Number,
            required: false
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


const { Schema, model } = require("mongoose");