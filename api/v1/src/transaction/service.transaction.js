const transactionModel = require("./model.transaction");
const transactionService = {};

transactionService.create = async (amount, type, remark, userId) => {
  const createTransaction = await transactionModel.create({
    amount,
    type,
    remark,
  });
  return createTransaction;
};

// Get all transactions with pagination
transactionService.getAll = async (page, limit) => {
  // Convert page and limit to numbers
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const perPage = parseInt(limit);

  // Fetch paginated transactions
  const transactions = await transactionModel
    .find({ isDeleted: false }) // Only fetch non-deleted records
    .sort({ createdAt: -1 }) // Sort by newest first
    .skip(skip)
    .limit(perPage);

  // Get total count for metadata
  const totalTransactions = await transactionModel.countDocuments({
    isDeleted: false,
  });

  // Return paginated data with metadata
  return {
    total: totalTransactions,
    page: parseInt(page),
    limit: perPage,
    data: transactions,
  };
};

transactionService.getSingle = async (id) => {
  const singleTransaction = await transactionModel.findById(id, {
    isDeleted: false,
  });
  return singleTransaction;
};

transactionService.update = async (id, amount, type, remark) => {
  const updateTransaction = await transactionModel.findByIdAndUpdate(id, {amount, type, remark}, {new: true});
  return updateTransaction;
};

transactionService.delete = async (id) => {
  const deleteTransaction = await transactionModel.findByIdAndUpdate(id, { isDeleted: true }, {new:true});
  return deleteTransaction;
};

module.exports = transactionService;
