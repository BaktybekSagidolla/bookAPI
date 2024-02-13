const mongoose = require("mongoose")
const connect = mongoose.connect("mongodb+srv://sagi:sagi1234@cluster0.yiy0oqq.mongodb.net/?retryWrites=true&w=majority")



connect.then(()=>{
    console.log("Db is Ok")
})
.catch(()=>{
    console.log("Db is not ok")
})
const AuthorSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    searchDate: { type: Date, default: Date.now }
});

const Author = mongoose.model('Author', AuthorSchema);
// RequestHistory model for tracking search history
const RequestHistorySchema = new mongoose.Schema({
    searchQuery: String,
    timestamp: { type: Date, default: Date.now }
});
const RequestHistory = mongoose.model('RequestHistory', RequestHistorySchema);

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    deletionDate:{
        type: String,
        default: null,
    },
    updateDate:{
        type: String,
        default: null,
    },
    creationDate:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        default: false,
        required: true
    }
})


const collection = new mongoose.model("users",LoginSchema);



module.exports = {
    Author,
    RequestHistory,
    LoginSchema,
    collection
};
