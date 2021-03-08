var Web3 = require('web3');
var solc = require('solc');
var net = require('net');
var fs = require('fs');

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var keypair;
var pubkey;

keypair = web3.shh.newKeyPair();
console.log(keypair);
fs.writeFile('keypair.txt',keypair,'utf8',function(error){});
/*
web3.shh.newKeyPair(function(result,error){
	if(!error){
		keypair = result;
		console.log(keypair);
		web3.shh.getPublicKey(keypair,function(result,error){
			if(!error){
				pubkey = result;
				console.log(pubkey);
				fs.writeFile('pubkey.txt',pubkey,'utf8',function(error){});
				var cb = function(err,messages){console.log(JSON.stringify(err||messages))};
				var cbe = function(error){console.log(error)};
				filter = web3.shh.newMessageFilter({privateKeyId:keypair}, function(err,res){
					console.log(JSON.stringify(res))
					fs.writeFileSync('filter.txt',res,'utf8',function(error){});
				});
			};
		});
	};
});
/*
var pubkey = getPublicKey(keypair);
var filter = web3.shh.filter({});

filter.watch(function(error,result){
	var message = result.payload;
	var splited = message.split(',');
	console.log(splited[0]);
	console.log(splited[1]);
	Device_Contract.inject.senTransaction(splited[0],splited[1],{from:web3.eth.accounts[0]});
});
*/
