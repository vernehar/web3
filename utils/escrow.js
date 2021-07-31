var web3 = new Web3(Web3.givenProvider || 'https://mainnet.infura.io/v3/4a200a3f339c403a8c2aa708873f5a5c');


window.onload = function() {

    document.getElementById('enableEthereumButton').addEventListener('click', function(){
        getAccount();
});

    document.getElementById('transact').addEventListener('click', function(){
        console.log("click")
        seller = document.getElementById('seller').value;
        amount = document.getElementById('value').value;

        EscrowContract.methods.newTransaction(seller).send({from: accounts[0], value: web3.utils.toWei(amount, "ether")})
        console.log(web3.utils.toWei(amount, "ether"))
});

    document.getElementById('confirmTransaction').addEventListener('click', function(){
        EscrowContract.methods.confirmDelivery().send({from: accounts[0]})
});

    document.getElementById('checkTransaction').addEventListener('click', function(){
        let addressInput = document.getElementById("checkTransactionForThisAddress").value
        console.log(addressInput)
        if (addressInput.length == 0){
            addressInput = accounts[0]
        }

        getTransaction(addressInput)


    })
    document.getElementById('claimProfits').addEventListener('click',function(){
        claimProfits()
});

}


async function getAccount() {
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    document.getElementById('enableEthereumButton').innerHTML = "Connected " + accounts[0].slice(0,5) + "..."
    web3.eth.net.getNetworkType().then(response => {
        console.log(response)
        if(response == "kovan"){
            document.getElementById('networkInfo').innerHTML = "Connected to kovan";
        }else{
            document.getElementById('networkInfo').innerHTML = "Connect to kovan!";
        }


    })
    console.log(EscrowContract)
    console.log(EscrowContract.methods)
}

async function getTransaction(addressInput) {
    const confirmResult =  await EscrowContract.methods.getTransaction(addressInput).call({from: accounts[0]})
    if (web3.utils.fromWei(confirmResult[0], "ether") != 0) {
        message = "Account has a pending transaction, value " + web3.utils.fromWei(confirmResult[0], "ether") + " to "+ confirmResult[1]
    }else{
        message = "No pending transactions!"
    }
    document.getElementById("accountTransactions").innerHTML = message
}


async function getContractOwner() {
    return await EscrowContract.methods.owner().call({from: accounts[0]})
}

async function claimProfits() {
    await getContractOwner().then(response => {
        if (response.toLowerCase() == accounts[0]) {
            EscrowContract.methods.withdrawProfits().send({from: accounts[0]})
            document.getElementById("ProfitWithdrawal").innerHTML = ""
        }else {
            document.getElementById("ProfitWithdrawal").innerHTML = "Only contract owner can withdraw profits"
        }
    })

}

if (web3 != undefined){
    var EscrowContract = new web3.eth.Contract(
        [
            {
               "inputs":[
                  
               ],
               "stateMutability":"nonpayable",
               "type":"constructor"
            },
            {
               "anonymous":false,
               "inputs":[
                  {
                     "indexed":true,
                     "internalType":"address",
                     "name":"previousOwner",
                     "type":"address"
                  },
                  {
                     "indexed":true,
                     "internalType":"address",
                     "name":"newOwner",
                     "type":"address"
                  }
               ],
               "name":"OwnershipTransferred",
               "type":"event"
            },
            {
               "inputs":[
                  
               ],
               "name":"aToken",
               "outputs":[
                  {
                     "internalType":"contract IERC20",
                     "name":"",
                     "type":"address"
                  }
               ],
               "stateMutability":"view",
               "type":"function"
            },
            {
               "inputs":[
                  
               ],
               "name":"confirmDelivery",
               "outputs":[
                  
               ],
               "stateMutability":"nonpayable",
               "type":"function"
            },
            {
               "inputs":[
                  
               ],
               "name":"contractLiabilities",
               "outputs":[
                  {
                     "internalType":"uint256",
                     "name":"",
                     "type":"uint256"
                  }
               ],
               "stateMutability":"view",
               "type":"function"
            },
            {
               "inputs":[
                  
               ],
               "name":"getAtokenBalance",
               "outputs":[
                  {
                     "internalType":"uint256",
                     "name":"",
                     "type":"uint256"
                  }
               ],
               "stateMutability":"view",
               "type":"function"
            },
            {
               "inputs":[
                  
               ],
               "name":"getContractBalance",
               "outputs":[
                  {
                     "internalType":"uint256",
                     "name":"",
                     "type":"uint256"
                  }
               ],
               "stateMutability":"view",
               "type":"function"
            },
            {
               "inputs":[
                  {
                     "internalType":"address",
                     "name":"fetchAddress",
                     "type":"address"
                  }
               ],
               "name":"getTransaction",
               "outputs":[
                  {
                     "internalType":"uint256",
                     "name":"",
                     "type":"uint256"
                  },
                  {
                     "internalType":"address",
                     "name":"",
                     "type":"address"
                  }
               ],
               "stateMutability":"view",
               "type":"function"
            },
            {
               "inputs":[
                  {
                     "internalType":"address payable",
                     "name":"sellerAddress",
                     "type":"address"
                  }
               ],
               "name":"newTransaction",
               "outputs":[
                  
               ],
               "stateMutability":"payable",
               "type":"function"
            },
            {
               "inputs":[
                  
               ],
               "name":"owner",
               "outputs":[
                  {
                     "internalType":"address",
                     "name":"",
                     "type":"address"
                  }
               ],
               "stateMutability":"view",
               "type":"function"
            },
            {
               "inputs":[
                  
               ],
               "name":"profitAmount",
               "outputs":[
                  {
                     "internalType":"uint256",
                     "name":"",
                     "type":"uint256"
                  }
               ],
               "stateMutability":"view",
               "type":"function"
            },
            {
               "inputs":[
                  
               ],
               "name":"renounceOwnership",
               "outputs":[
                  
               ],
               "stateMutability":"nonpayable",
               "type":"function"
            },
            {
               "inputs":[
                  {
                     "internalType":"address",
                     "name":"newOwner",
                     "type":"address"
                  }
               ],
               "name":"transferOwnership",
               "outputs":[
                  
               ],
               "stateMutability":"nonpayable",
               "type":"function"
            },
            {
               "inputs":[
                  
               ],
               "name":"withdrawProfits",
               "outputs":[
                  
               ],
               "stateMutability":"nonpayable",
               "type":"function"
            },
            {
               "stateMutability":"payable",
               "type":"receive"
            }
         ]
    , '0x2bA890585D54F1D749348890d27592F1DD5acf50');


}


