const mongoose = require('mongoose');

const faqSchema = mongoose.Schema({
    question: {type: String, required: true},
    answer: {type: String, required: true},
    translations: {
        type: Map,
        of: new mongoose.Schema({
          question: String,
          answer: String
        }),
        required: true
    }
});

module.exports = mongoose.model("FAQ", faqSchema);