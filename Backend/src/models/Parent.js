const mongoose = require('mongoose');

const ParentSchema = new mongoose.Schema(
    {
        name_parent: { type: String, required: true },
        cpf: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String },
        password_hash: { type: String, required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Parent', ParentSchema);