var Web3 = require('web3');
var solc = require('solc');
var net = require('net');
var fs = require('fs');

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var myContract = fs.readFileSync('/home/pi/Desktop/blockchain/contract/MyContract.txt', 'utf8');
var ContractAddress = fs.readFileSync('/home/pi/Desktop/blockchain/contract/Contract.txt', 'utf8');
//var compareC = solc.compile(myContract,1);
var interface = fs.readFileSync('/home/pi/Desktop/blockchain/contract/interface.txt','utf8');
var CompiledContract = web3.eth.contract(JSON.parse(interface));
//var CompiledContract = web3.eth.contract(JSON.parse(compareC.contracts.token.interface));
var Device_Contract = CompiledContract.at(ContractAddress);

var Start = Device_Contract.start();

console.log('okay...');
Device_Contract.roundstart.sendTransaction({from:web3.eth.accounts[0], gas : 3000000});
Start.watch(function(error,result){
      if(!error){
        console.log('Start Rouund');
        process.exit();
      }
      else{
          console.log(error);
      }
});
