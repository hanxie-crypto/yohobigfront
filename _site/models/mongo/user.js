var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;
var utility   = require('utility');
var UserSchema = new Schema({
  name: { type: String},
  loginname: { type: String},
  pass: { type: String }
});
UserSchema.plugin(BaseModel);
UserSchema.index({loginname: 1}, {unique: true});
mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');