import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            reuired: true,
        }, 
        publishYear: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export const book = mongoose.model('Books', bookSchema);