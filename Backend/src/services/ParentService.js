const ParentRepository = require('../repositories/ParentRepository');
const parentSchema = require('../models/ParentValidation');
const bcrypt = require('bcryptjs');

const ParentService = {
    async registerParent(parentData) {
        const { error, value } = parentSchema.validate(parentData);
        if (error) {
            throw new Error(error.details[0].message);
        }

        const existingParent = await ParentRepository.findByEmail(value.email);
        if (existingParent) {
            throw new Error('Já existe um responsável cadastrado com este email.');
        }

        const saltRounds = 12;
        const passwordHash = await bcrypt.hash(value.password, saltRounds);

        delete value.password;

        const parent = await ParentRepository.create({
            ...value,
            password_hash: passwordHash
        });

        return {
            id: parent._id,
            name_parent: parent.name_parent,
            email: parent.email,
            cpf: parent.cpf,
            phone: parent.phone
        };
    }
};

module.exports = ParentService;