var Web3 = require('web3');
var solc = require('solc');
var net = require('net');
var fs = require('fs');
var net = require('net');

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

web3.shh;
var version = web3.shh.getVersion().then(function(result){
	console.log(result)
}).catch(function(error){
	console.log('error',error)
});
var keypair = fs.readFileSync('keypair.txt','utf8');
web3.shh.getPublicKey(keypair).then(function(result){
	console.log('making PubKey');
	console.log(result);
	var pubkey = result;
	fs.writeFile('pubkey.txt',pubkey,'utf8',function(error){});
});
//var pubkey = web3.shh.getPublickey(keypair);
//.then(consol.log(pubkey));
//console.log(pubkey);
//fs.writeFile('pubkey',pubkey,'utf8',function(error){});

//keypair.then(web3.shh.getPublicKey(keypair).then(console.log(keypair)));

//fs.writeFile('pubkey',pubkey,'utf8',function(error){});


//var cb = function(error){};
//var cbe = function(error){console.log(error)};
//var filter = shh.newMessageFilter({privateKeyId: keypair}, cb, cbe);


//console.log(web3.shh.getVersion());

//console.log(web3.shh.getInfo());
