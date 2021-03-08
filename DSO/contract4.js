var fs = require('fs');
var Web3 = require('web3');
var solc = require('solc');

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var interface = fs.readFileSync('interface.txt','utf8');
var abiContract = web3.eth.contract([ { "constant": true, "inputs": [], "name": "getOwner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "newOwner", "type": "address" } ], "name": "changeOwner", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "oldOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" } ], "name": "OwnerSet", "type": "event" } ]);
//console.log(web3.eth.accounts[0]);
var clientRe = abiContract.new({from:web3.eth.accounts[0], data:'608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167f342827c97908e5e2f71151c08502a66d44b6f758e3ac2f1de95f02eb95f0a73560405160405180910390a36102a7806100dc6000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063893d20e81461003b578063a6f9dae114610085575b600080fd5b6100436100c9565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6100c76004803603602081101561009b57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506100f2565b005b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146101b4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260138152602001807f43616c6c6572206973206e6f74206f776e65720000000000000000000000000081525060200191505060405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f342827c97908e5e2f71151c08502a66d44b6f758e3ac2f1de95f02eb95f0a73560405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505056fea265627a7a7230582082666197f628e83b662ffc222956c5caa345194fd27e5f146b4165297c44c44564736f6c63430005090032', gas: 3000000}, function(e, contract){
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
