const pool = require('../config/database');

const DriverRepository = {
    async createDriver(driverData) {

        const sql = `
  INSERT INTO drivers (name_driver, email, password_hash)
  VALUES (?, ?, ?)
`;

        const values = [
            driverData.name_driver,
            driverData.email,
            driverData.password_hash
        ];


        values.forEach((value, index) => {
            if (value === undefined) {
                throw new Error(`Valor undefined no índice ${index} do array de valores`);
            }
        });

        try {

            const [result] = await pool.execute(sql, values);

            return result;
        } catch (error) {

            throw error;
        }
    },

    async findByEmail(email) {
        const sql = 'SELECT * FROM drivers WHERE email = ?';
        try {
            const [rows] = await pool.execute(sql, [email]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    },

    async getAll() {
        const sql = 'SELECT id, name_driver, email, vehicle_plate, regions_served FROM drivers';
        try {
            const [rows] = await pool.execute(sql);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    async getById(id) {

        const sql = 'SELECT id, name_driver, email, vehicle_plate, regions_served FROM drivers WHERE id = ?';

        try {
            const [rows] = await pool.execute(sql, [id]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = DriverRepository;