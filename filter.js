var Web3 = require('web3');
var solc = require('solc');
var net = require('net');
var fs = require('fs');
var net = require('net');

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var version = web3.shh.getVersion().then(function(result){
	console.log(result)
}).catch(function(error){
	console.log('error',error)
});

var keypair = fs.readFileSync('keypair.txt','utf8');
var cb = function(err,messages){console.log(JSON.stringify(err||messages))};
var cbe = function(error){console.log(error)};
filter = web3.shh.newMessageFilter({privateKeyId:keypair}, function(err,res) {console.log(JSON.stringify(res))}).then(function(result) {
	fs.writeFileSync('filter.txt',result,'utf8',function(error){});

});
//web3.shh.newMessageFilter({privateKeyId:keypair},cb,cbe);
