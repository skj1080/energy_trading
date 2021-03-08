var Web3 = require('web3');
var solc = require('solc');
var fs = require('fs');

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8080"));
var myContract = fs.readFileSync('MyContract.txt', 'utf8');
var ContractAddress = fs.readFileSync('Contract.txt', 'utf8');
var acc = web3.eth.accounts;
//var compareC = solc.compile(myContract,1);
var interface = fs.readFileSync('interface.txt','utf8');
//var CompiledContract = web3.eth.contract(JSON.parse(compareC.contracts.token.interface));
var CompiledContract = web3.eth.contract(JSON.parse(interface));
var Device_Contract = CompiledContract.at(ContractAddress);
var event = Device_Contract.allEvents();
var Result = Device_Contract.Result();
var Energyshow = Device_Contract.energyshow();
var Energycheck = Device_Contract.energycheck();
var Start = Device_Contract.start();
var Gen = Device_Contract.gen();
var Requestcheck = Device_Contract.requestcheck();

console.log('event watching...');
// watch for changes
event.watch(function(error, result){
    if (!error){
       console.log(result.event);
   }
   else{
      console.log(error);
   }
});
Energycheck.watch(function(error, result){
    if (!error){
      console.log('owner:',result.args.owner);
	    console.log('amount:',result.args.amount);
	    console.log('state:', result.args.state);
      console.log('bidtime',result.args.bidtime);
    }
    else{
      console.log(error);
    }
});

Requestcheck.watch(function(error, result){
  if (!error){
    console.log('Sender:',_add);
    console.log('Amount:',amount);
  }
})

Energyshow.watch(function(error, result){
    if (!error){
      console.log('from:',result.args.from);
    	console.log('to:',result.args.to);
    	console.log('amount:', result.args.amount);
    	console.log('price:',result.args.price);


    }
    else{
	console.log(error);
    }
});

Start.watch(function(error,result){
      if(!error){

        console.log('Start time:',result.args.stime);
        console.log('End time :',result.args.etime);

      }
      else{
          console.log(error);
      }
});
