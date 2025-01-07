const { message } = require("../register/validation.register");
const transactionService = require("./service.transaction");
const transactionController = {};

transactionController.create = async (req, res) => {
  try {
    const { amount, type, remark } = req.body;
    const createTransaction = await transactionService.create(
      amount,
      type,
      remark
    );

    if (createTransaction) {
      return res.send({
        status: true,
        message: "Transaction created successfully",
        data: createTransaction,
      });
    }
  } catch (error) {
    console.log(error);
    return res.send({
      status: false,
      message: "Something went wrong to create transaction",
      error,
    });
  }
};

transactionController.getAll = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const getAllTransaction = await transactionService.getAll(page, limit);
    if (getAllTransaction) {
      return res.send({
        status: true,
        message: "all transaction fetched successfully",
        data: getAllTransaction,
      });
    }
  } catch (error) {
    console.log(error);
    return res.send({
      status: false,
      message: "something went wrong to get all transaction",
      error,
    });
  }
};

transactionController.getSingle = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const getSingleTransaction = await transactionService.getSingle(id);
      if (getSingleTransaction) {
        return res.send({
          status: true,
          message: "single transaction fetched successfully",
          data: getSingleTransaction,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.send({
      status: false,
      message: "something went wrong to get all transaction",
      error,
    });
  }
};

transactionController.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, type, remark } = req.body;

    if (id && amount && type && remark) {
      const updateTransaction = await transactionService.update(id, 
        amount,
        type,
        remark,
      );
      if (updateTransaction) {
        return res.send({
          status: true,
          message: "transaction updated successfully",
          data: updateTransaction,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.send({
      status: false,
      message: "Something went wrong to update transaction",
      error,
    });
  }
};

transactionController.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTransaction = await transactionService.delete(id);
    if (deleteTransaction) {
      return res.send({
        status: true,
        message: "transaction deleted successfully",
        data: deleteTransaction,
      });
    }
  } catch (error) {
    console.log(error);
    return res.send({
      status: false,
      message: "Something went wrong to delete transaction",
      error,
    });
  }
};

module.exports = transactionController;
