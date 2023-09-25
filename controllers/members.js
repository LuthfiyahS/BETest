const { notFound } = require('./error');
const { Members } = require('../models');

module.exports = {
    findAll: async (req, res) => {
        const members = await Members.findAll();

        if (members.length === 0) return notFound(req, res, 'Anggota tidak ditemukan');

        res.status(200).json({
            success: true,
            message: 'Anggota ditemukan',
            data: members
        });
    }
};
