const mongoose = require('mongoose');

const groundSchema = new mongoose.Schema({
  name: { type: String, required: true },
  teamname: { type: String, required: true },
  description: { type: String, required: true },
  experience: { type: String, required: true },
  image: { type: String, required: true},
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

groundSchema.methods.belongsTo = function itemsBelongTo(user) {
  return this.createdBy.id === user.id;
};


const listSchema = new mongoose.Schema({
  title: { type: String, required: true},
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true},
  items: [groundSchema]
}, {
  timestamps: true
});

listSchema.methods.belongsTo = function itemsBelongTo(user) {
  return this.createdBy.id === user.id;
};

module.exports = mongoose.model('List', listSchema);
