var Web3 = require('web3');
var solc = require('solc');
var net = require('net');
var fs = require('fs');

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
//var myContract = fs.readFileSync('/home/pi/Desktop/blockchain/contract/MyContract.txt', 'utf8');
//var ContractAddress = fs.readFileSync('/home/pi/Desktop/blockchain/contract/Contract.txt', 'utf8');
//var interface = fs.readFileSync('/home/pi/Desktop/blockchain/contract/interface.txt','utf8');
//var CompiledContract = web3.eth.contract(JSON.parse(interface));
//var Device_Contract = CompiledContract.at(ContractAddress);

var pubkey = fs.readFileSync('pubkey.txt', 'utf8');
var add = web3.eth.accounts[0];
var amount = fs.readFileSync('energy_inject.txt', 'utf8');
var message = add + ',' + amount;
web3.shh.post({pubkey:pubkey, ttl: 30, powTime: 1, powTarget: 0.201, payload : web3.utils.toHex(message)})

/*console.log('okay...');
Device_Contract.register.sendTransaction({from:web3.eth.accounts[0], gas :3000000}).then(;

Result.watch(function(error, result){
	   if (!error){
		console.log('completed!');
		process.exit();
	   }
	   else{
	      console.log(error);
	   }
});*/
