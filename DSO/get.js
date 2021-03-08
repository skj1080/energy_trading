var Web3 = require('web3');
var solc = require('solc');
var net = require('net');
var fs = require('fs');

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var myContract = fs.readFileSync('MyContract.txt', 'utf8');
var ContractAddress = fs.readFileSync('Contract.txt', 'utf8');
var interface = fs.readFileSync('interface.txt','utf8');
var CompiledContract = web3.eth.contract(JSON.parse(interface));
web3.eth.contract(JSON.parse(compareC.contracts.token.interface));
var Device_Contract = CompiledContract.at(ContractAddress);
var keypair = fs.readFileSync('keypair.txt','utf8');
var filter = web3.shh.newMessageFilter({privateKeyId:keypair});


filter.watch(function(error,result){
	var message = result.payload;
	var splited = message.split(',');
	console.log(splited[0]);
	console.log(splited[1]);
	Device_Contract.inject.senTransaction(splited[0],splited[1],{from:web3.eth.accounts[0]});
});
