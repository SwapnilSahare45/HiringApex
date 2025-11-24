import mongoose, { Schema } from "mongoose";

const sessionSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 60 * 24 * 7
    }
})

export const Session = mongoose.models.Session || mongoose.model("Session", sessionSchema);