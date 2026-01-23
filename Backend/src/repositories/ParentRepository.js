const pool = require('../config/database');

const ParentRepository = {
    async create(parentData) {
        const sql = `
            INSERT INTO parents (name_parent, email, cpf, phone, password_hash)
            VALUES (?, ?, ?, ?, ?)
        `;
        
        const values = [
            parentData.name_parent,
            parentData.email,
            parentData.cpf,
            parentData.phone,
            parentData.password_hash
        ];

        try {
            const [result] = await pool.execute(sql, values);
            return result;
        } catch (error) {
            throw error;
        }
    },

    async findByEmail(email) {
        const sql = 'SELECT * FROM parents WHERE email = ?';
        try {
            const [rows] = await pool.execute(sql, [email]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = ParentRepository;