var fs = require('fs');
var Web3 = require('web3');
var solc = require('solc');

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var CONTRACT_FILE = 'MyContract.txt';
var content =fs.readFileSync(CONTRACT_FILE).toString();
var input = {
  language: 'Solidity',
  sources: {
    [CONTRACT_FILE]: {
      content: content
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};


var compiled = solc.compile(JSON.stringify(input));
var output = JSON.parse(compiled);
var abi = output.contracts[CONTRACT_FILE]['token'].abi;
var abi_st = JSON.stringify(abi);
fs.writeFileSync('interface.txt',abi_st,function(error){});
var bytecode = output.contracts[CONTRACT_FILE]['token'].evm.bytecode.object;
var abiContract = web3.eth.contract(abi);
//console.log(web3.eth.accounts[0]);
var clientRe = abiContract.new({from:web3.eth.accounts[0], data:'0x'+bytecode, gas: 3000000}, function(e, contract){
   function checkAllBalances() {
       var totalBal = 0;
       for (var acctNum in web3.eth.accounts) {
           var acct = web3.eth.accounts[acctNum];
           var acctBal = web3.fromWei(web3.eth.getBalance(acct), "ether");
           totalBal += parseFloat(acctBal);
           console.log("  eth.accounts[" + acctNum + "]: \t" + acct + " \tbalance: " + acctBal + " ether");
       }
       console.log("  Total balance: " + totalBal + " ether");
   }

checkAllBalances();

   if(!e) {

     if(!contract.address) {
        console.log("Smart Contract transaction send!! (Hash Number)");
        console.log(" : " + contract.transactionHash);
        console.log("Waiting to be mined...");
     }
     else{
        console.log();
        console.log("Contract mined!");
        console.log("Contract Address: " + contract.address);
        fs.writeFile('Contract.txt',contract.address,'utf8',function(error){});
     }

   }
   else{
      console.log(e);
   }
});
