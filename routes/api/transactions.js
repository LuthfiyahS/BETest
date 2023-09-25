const { Router } = require("express");
const { body, param } = require("express-validator");
const {
  internalServerError,
  methodNotAllowed,
  unAuthorized,
} = require("../../controllers/error");
const {
  Members, Books, Transactions, TransactionDetails
} = require('../../models');
const {
  borrowBooks, update
} = require("../../controllers/transactions");

const router = Router();

router
  .route("/borrow_books")
  .post(
    [
      body("member_id").notEmpty().withMessage("member_id harus diisi"),
      body("book_id").custom((value) => {
        if (!value) throw new Error("Kategori harus diisi");
        if (typeof value === "string") value = value.split(",");
        if (value.length < 1) throw new Error("Kategori harus diisi");
        if (value.length > 2)
          throw new Error(
            "Buku harus lebih kurang dari atau sama dengan 2"
          );
        // let daftarBuku =  Books.findByPk(value);
        // if(!daftarBuku)throw new Error("Buku tidak tersedia");
        // if(daftarBuku.stock == 0)throw new Error("Buku sedang di pinjam");
        return true;
      }),
      body("book_id.*")
        .notEmpty()
        .withMessage("Buku harus diisi")
        .trim()
        .isInt()
        .withMessage("Buku harus berupa angka"),
    ],
    borrowBooks
  )
  .put(
    [
      body('id').isInt().withMessage('Id harus berupa angka'),
    ],
    update
)
  .all(methodNotAllowed);

//router.post("/borrow_books",borrowBooks).all(methodNotAllowed);

module.exports = router;
