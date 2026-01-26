const Parent = require('../models/Parent');

const ParentRepository = {
    create(parentData) {
        return Parent.create(parentData);
    },

    findByEmail(email) {
        return Parent.findOne({ email });
    }
};

module.exports = ParentRepository;