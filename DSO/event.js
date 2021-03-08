var Web3 = require('web3');
var solc = require('solc');
var fs = require('fs');

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var ContractAddress = fs.readFileSync('Contract.txt', 'utf8');
var interface = fs.readFileSync('interface.txt','utf8');
var CompiledContract = web3.eth.contract(JSON.parse(interface),ContractAddress);
var acc = web3.eth.accounts;
var Device_Contract = CompiledContract.at(ContractAddress);
var event = Device_Contract.allEvents();
var Result = Device_Contract.Result();
var Energyshow = Device_Contract.energyshow();
var Energycheck = Device_Contract.energycheck();
var Start = Device_Contract.start();
var Gen = Device_Contract.gen();
var Requestchek = Device_Contract.requestcheck();

console.log('event watching...');

// watch for changes
Result.watch(function(error,result){
    if (!error){
      console.log('from:',result.args.from);
      console.log('to:',result.args.to);
	    console.log('value:', result.args.value);
      console.log('balance of sender:',result.args.bos);
      console.log('balance of receiver:',result.args.bor);
    }
    else{
      console.log(error);
    }
});

Energycheck.watch(function(error,result){
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

Energyshow.watch(function(error,result){
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

Requestchek.watch(function(error,result){
  if(!error){
    console.log('Sender:',result.args._add);
    console.log('amount:',result.args.amount);
  }
})

Start.watch(function(error,result){
    if (!error){

        console.log('Start time:',result.args.stime);
        console.log('End time :',result.args.etime);

      }
      else{
          console.log(error);
      }
});
