var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var jsondata = require("./profile.json");
Var = require("./blogs.json");
let blogs = require('../assets/blogs');
let counter = require('../assets/counter');
let profile = require('../assets/profile')

module.exports = {
add:(body,user)=>{
return new Promise((resolve,reject)=>{
try{
if(profile[user] && profile[user].accessLevel == 'admin'){
fs.readFile(blogs, function readFileCallback(err, data) {

if (err) {
reject('error');
} else {
let sourceData = JSON.parse(data);

let size = Object.keys(sourceData).length;

sourceData[size] = {"data": body.title,
"users": [user],
"active": true};

let blogjson = JSON.stringify(sourceData);
let counterJson = JSON.stringify({"blog": size+1});

fs.writeFile('../assets/blogs.json', blogjson );
fs.writeFile('../assets/counter.json', counterJson);
resolve();

}
});
}else{
    reject("not a valid user")

}
}catch(e)
{
    reject(e)
}})
