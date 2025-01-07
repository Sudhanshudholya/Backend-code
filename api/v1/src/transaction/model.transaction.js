const { required } = require("joi");
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["INCOME", "EXPENSE"],
    },

    remark: {
      type: String,
    },

    isDeleted : {
        type : Boolean,
        default : false
    }
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("transaction", transactionSchema);
