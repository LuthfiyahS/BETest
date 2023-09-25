const { notFound } = require('./error');
const { Books } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    findAll: async (req, res) => {
        const books = await Books.findAll();

        if (books.length === 0) return notFound(req, res, 'Buku tidak tersedia');

        res.status(200).json({
            success: true,
            message: 'Buku tersedia',
            data: books
        });
    },
    findExistingBooks: async (req, res) => {
        const books = await Books.findAll({
            where: {
                stock: {
                    [Op.not]: null,
                    [Op.not]: 0,
                  },
            }
        });

        if (books.length === 0) return notFound(req, res, 'Buku tidak tersedia');

        res.status(200).json({
            success: true,
            message: 'Buku tersedia',
            data: books
        });
    }
};
