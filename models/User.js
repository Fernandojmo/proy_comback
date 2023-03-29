const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    // id: {
    //     type: Number,
    //     required: true,
    //     trim: true,
    // },
    firstname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLenght: 2,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLenght: 2,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/g],

    },
    password: {
        type: String,
        required: true,
        match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    birthday: {
        type: Date,
        required: true,
        trim: true,
    },
})

const User = mongoose.model('user', userSchema);
module.exports = User;
