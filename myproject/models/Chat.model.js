const {mongoose, Schema, model } = require("mongoose");

const chatSchema = new Schema(
    {
        users: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        eventId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'events' 
        },
        content: {
            type: String,
        },
        timestamp: { 
            type: Date, 
            default: Date.now 
        },
    }
)

const Chat = model("Chat", chatSchema);

module.exports = Chat;