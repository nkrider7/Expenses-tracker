import mongoose from 'mongoose';

let Exp;

try {
  // Try to retrieve the existing model
  Exp = mongoose.model('exps');
} catch (error) {
  // If the model doesn't exist, define it
  const expenseSchema = new mongoose.Schema({
    description: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    category:{
      type: String,
      required: true
    }
  },{
      timestamps: true
  });

  // Define the model
  Exp = mongoose.model('exps', expenseSchema);
}

export { Exp };
