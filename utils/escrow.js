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
}


async function getAccount() {
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    document.getElementById('enableEthereumButton').innerHTML = "Connected " + accounts[0].slice(0,5) + "..."
    web3.eth.net.getNetworkType().then(console.log)
    console.log(EscrowContract)
    console.log(EscrowContract.methods)
}



if (web3 != undefined){
    var EscrowContract = new web3.eth.Contract(
    [
        {
            "inputs": [],
            "name": "confirmDelivery",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address payable",
                    "name": "sellerAddress",
                    "type": "address"
                }
            ],
            "name": "newTransaction",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        },
        {
            "inputs": [],
            "name": "contractLiabilities",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getContractBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "fetchAddress",
                    "type": "address"
                }
            ],
            "name": "getTransaction",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ], '0x44eb82E4FB82fd0104324784D8E6A302F8f6C24D');

    //var Escrow = EscrowContract.at('0x44eb82E4FB82fd0104324784D8E6A302F8f6C24D')
}