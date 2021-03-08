var Web3 = require('web3');
var solc = require('solc');
var net = require('net');
var fs = require('fs');

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var myContract = fs.readFileSync('MyContract.txt', 'utf8');
var ContractAddress = fs.readFileSync('Contract.txt', 'utf8');
//var compareC = solc.compile(myContract,1);
var interface = fs.readFileSync('interface.txt','utf8');
var CompiledContract = web3.eth.contract(JSON.parse(interface));
//var CompiledContract = web3.eth.contract(JSON.parse(compareC.contracts.token.interface));
var Device_Contract = CompiledContract.at(ContractAddress);

var Gen = Device_Contract.gen();
var Result = Device_Contract.Result();

var pro1 ="";
var con1 ="";
var pro2 ="";
var con2 ="";
var pro3 ="";
var con3 ="";
var pro4 ="";
var con4 ="";
console.log('okay...');
//console.log('Get data');
Device_Contract.EnergyToken.sendTransaction({from:web3.eth.accounts[0]}, gas : 30000000);

Gen.watch(function(error, result){
	   if (!error){
		console.log('completed!');
		Device_Contract.transfer.sendTransaction(pro1 ,100000000000,{from:web3.eth.accounts[0]});
		Device_Contract.transfer.sendTransaction(con1 ,100000000000,{from:web3.eth.accounts[0]});
		Device_Contract.transfer.sendTransaction(por2 ,100000000000,{from:web3.eth.accounts[0]});
		Device_Contract.transfer.sendTransaction(con2 ,100000000000,{from:web3.eth.accounts[0]});
		Device_Contract.transfer.sendTransaction(pro3 ,100000000000,{from:web3.eth.accounts[0]});
		Device_Contract.transfer.sendTransaction(con3 ,100000000000,{from:web3.eth.accounts[0]});
		Device_Contract.transfer.sendTransaction(pro4 ,100000000000,{from:web3.eth.accounts[0]});
		Device_Contract.transfer.sendTransaction(con4 ,100000000000,{from:web3.eth.accounts[0]});
		process.exit();
	   }
	   else{
	      console.log(error);
	   }
});


//Device_Contract.transfer.sendTransaction(to,1000000000,{from:web3.eth.accounts[0]});
//Device_Contract.EnergyToken.sendTransaction({from:web3.eth.accounts[0]});
//Device_Contract.refresh.sendTransaction({price,from:web3.eth.accounts[0]});
//Device_Contract.Energybuy.sendTransaction({amount,from:web3.eth.accounts[1]});
//Device_Contract.Energysell.sendTransaction({amount,from:web3.eth.accounts[2]});
//Device_Contract.trade.sendTransaction({from:web3.eth.accounts[0]});
