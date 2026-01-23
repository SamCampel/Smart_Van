const ParentRepository = require('../repositories/ParentRepository');
const parentSchema = require('../models/ParentValidation');
const bcrypt = require('bcryptjs');

const ParentsService = {
    async registerParent(parentData) {
        try {

            //validate data
            const { error, value } = parentSchema.validate(parentData);
            if (error) {
                throw new Error(error.details[0].message);
            }
        

            const existingParent = await ParentRepository.findByEmail(parentData.email);
            if (existingParent) {
                throw new Error('Já existe um responsável cadastrado com este email.');
            }

            //add hash
            const saltRounds = 12;
            parentData.password_hash = await bcrypt.hash(parentData.password, saltRounds); 

            //save parent
            delete parentData.password;
            const result = await ParentRepository.create(parentData);

            return {
                id: result.insertId,
                name_parent: parentData.name_parent,
                email: parentData.email,
                cpf: parentData.cpf,
                phone: parentData.phone,

            };
        } catch (error) {
            throw error;
        }
    }
};

module.exports = ParentsService;