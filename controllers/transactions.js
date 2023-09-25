const { validationResult } = require("express-validator");
const { badRequest, forbidden, notFound } = require("./error");
const {
  Members,
  Books,
  Transactions,
  TransactionDetails,
} = require("../models");

module.exports = {
  borrowBooks: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return badRequest(errors.array(), req, res);
    let buku = [];
    for (let index = 0; index < req.body.book_id.length; index++) {
      let daftarBuku = await Books.findByPk(req.body.book_id[index]);
      if (daftarBuku && daftarBuku.stock == 0) {
        buku.push(0);
        return notFound(
          req,
          res,
          "Buku " + daftarBuku.title + " tidak tersedia"
        );
      } else {
        buku.push(req.body.book_id[index]);
      }
    }

    var datetime = new Date();
    await Transactions.create({
      member_id: req.body.member_id,
      borrow_date: datetime,
      status: "Belum Kembalikan",
    });
    var transaction = Transactions.findOne({
      order: [["id", "DESC"]],
    });
    let transactionDetails = {};
    for (let index = 0; index < req.body.book_id.length; index++) {
      transactionDetails = await TransactionDetails.create({
        transaction_id: transaction.id,
        book_id: req.body.book_id[index],
      });
      //update stok buku
      const updatedData = {};
      let book_borrow = Books.findByPk(req.body.book_id[index]);
      updatedData.stock = book_borrow.stock - 1;
      await Books.update(updatedData, {
        where: { id: req.body.book_id[index] },
      });
    }

    res.status(201).json({
      success: true,
      message: "Peminjaman buku berhasil dibuat",
      data: {
        id: transaction.id,
        member_id: transaction.member_id,
        ...transactionDetails,
      },
    });
  },
  update: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return badRequest(errors.array(), req, res);

    const transaction = await Transactions.findByPk(req.body.id, {
      include: [{ model: TransactionDetails, include: [{ model: Books }] }],
    });
    const updatedDataKembalikan = {};
    if (!transaction) return notFound(req, res, "Transaksi tidak ditemukan");

    updatedDataKembalikan.status = "Sudah Dikembalikan";
    if (req.body.status) updatedDataKembalikan.status = req.body.status;

    await Transactions.update(updatedDataKembalikan, {
      where: { id: req.body.id },
    });
    let book_borrows =  await TransactionDetails.findAll({
      where: { transaction_id: req.body.id },
    });

    //console.log(book_borrows.length);
    for (let index = 0; index < book_borrows.length; index++) {
      //update stok buku

        let update_borrows =  await Books.findByPk(book_borrows[index].book_id);
        
        await Books.update( { stock: update_borrows.stock + 1 }, {
            where: { id: update_borrows.id},
        });
    }

    res.status(200).json({
      success: true,
      message: "Transaksi berhasil diperbarui",
      data: { id: req.body.id, ...updatedDataKembalikan },
    });
  },
};
