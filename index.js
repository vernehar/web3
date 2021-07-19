//var provider = 'https://mainnet.infura.io/v3/4a200a3f339c403a8c2aa708873f5a5c';
//var web3Provider = new Web3.providers.HttpProvider(provider);
//var web3 = new Web3(web3Provider);



var web3 = new Web3(Web3.givenProvider || 'https://mainnet.infura.io/v3/4a200a3f339c403a8c2aa708873f5a5c');
console.log(web3)

window.onload = function() {

    document.getElementById("button").addEventListener("click", function() {
        address = document.getElementById("inputField").value
        web3.eth.getBalance(address).then((result) => {
        document.getElementById("data").innerHTML = "Your balance is "+result;
        });
    })
}