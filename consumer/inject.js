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
var message = {
	pubKey: pubkey,
	poWTime:1,
	powTarget : 0.201,
	payload: web3.fromAscii(add+','+amount),
	ttl: 100
};
web3.shh.post(message);
