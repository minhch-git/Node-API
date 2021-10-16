var crypto = require("crypto-js")
// Encrypt
var data =  crypto.lib.WordArray.random(32).toString(crypto.enc.Hex)
var data2 =  crypto.lib.WordArray.random(32).toString(crypto.enc.Hex)
const hash1 = crypto.SHA256(data).toString(crypto.enc.Hex)
const hash2 = crypto.SHA256(data2).toString(crypto.enc.Hex)
 console.log({hash1}, {data2})
