var mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1/blog')
mongoose.Promise=Promise
var ObjectId=mongoose.Schema.Types.ObjectId
var UserSchema=new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    avatar:String
},{collection:'user'})//如果没有给集合名称，则集合名称=模型名
exports.User=mongoose.model('User',UserSchema)//这是模型名

var ArticleSchema=new mongoose.Schema({
    title:String,
    content:String,
    createAt:Date,
    user:{type:ObjectId,ref:'User'}//这个User是引用的模块
},{collection:'article'})
exports.Article = mongoose.model('Article',ArticleSchema);

var CommentSchema=new mongoose.Schema({
    user:{type:ObjectId,ref:'User'},
    content:String,
    createAt:Date,
    article:{type:ObjectId,ref:'Article'}
},{collection:'comment'})
exports.Comment=mongoose.model('Comment',CommentSchema)