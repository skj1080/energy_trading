var Web3 = require('web3');
var solc = require('solc');
var net = require('net');
var fs = require('fs');

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var myContract = fs.readFileSync('/home/pi/Desktop/blockchain/contract/MyContract.txt', 'utf8');
var ContractAddress = fs.readFileSync('/home/pi/Desktop/blockchain/contract/Contract.txt', 'utf8');
var interface = fs.readFileSync('/home/pi/Desktop/blockchain/contract/interface.txt','utf8');
var CompiledContract = web3.eth.contract(JSON.parse(interface));
var Device_Contract = CompiledContract.at(ContractAddress);

var Requestcheck = Device_Contract.requestcheck();

var amount = fs.readFileSync('buyingamount.txt','utf8');

Device_Contract.requestbuy.sendTransaction(amount,{from:web3.eth.accounts[0]});

Requestcheck.watch(function(error,result){
      if(!error){
        console.log('comlpeted!');
        process.exit();
      }
      else{
          console.log(error);
      }
});


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
