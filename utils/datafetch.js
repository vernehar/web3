let key
let uniswapTransactions = []
let uniswapRouterAddresses = ["0x7a250d5630b4cf539739df2c5dacb4c659f2488d", "0xf164fc0ec4e93095b804a4795bbe1e041497b92a"];

//Get API key
jQuery.when(
    jQuery.getJSON("utils/util.json")
).done( function(json) {
    key = json.key;
});

async function getTransactions(address) {
    let URL = "https://api.etherscan.io/api?module=account&action=txlist&address="+address+"&startblock=0&endblock=99999999&sort=asc&apikey="+key;
    // get transaction history of given address fron etherscan via api
    uniswapTransactions = []
    let fetchTransactions = fetch(URL)
    fetchTransactions.then(response => {
        response.json().then(data => {
        if (data.message = "OK"){
            for (i = 0; i < data.result.length; i++) {
                if (uniswapRouterAddresses.includes(data.result[i].to.toLowerCase())) {
                    uniswapTransactions.push(data.result[i])
                    }
                }
                // get timestamps of uniswap transactions from array and sort. Oldest is at index zero
                timestamps = []
            for (j = 0; j < uniswapTransactions.length; j++) {
                timestamps.push(uniswapTransactions[j].timeStamp)
            }
            timestamps = timestamps.sort()
            uniswapTransactions.sort() //all that is needed is to sort the json. timestamps array not needed
            formMessage(uniswapTransactions[0])
        }else{
            formMesssage(undefined)
        }
        })

        
    })}


async function formMessage(data) {
    if (data != undefined){
        myDate = "17-09-2020"
        myDate = myDate.split("-");
        var newDate = new Date( myDate[2], myDate[1] - 1, myDate[0]);
        timeStamp = new Date(data.timeStamp*1000)
        message = "You made your first uniswap trade on "+timeStamp.toLocaleString()    
        document.getElementById("data").innerHTML = message
    }else{
        document.getElementById("data").innerHTML = "No uniswap trades or address not valid"
    }
    

}


window.onload = function() {
    document.getElementById("button").addEventListener("click", function() {
        buttonClick()


})

    document.getElementById('enableEthereumButton').addEventListener('click', function(){
        getAccount();
});


}

function buttonClick() {
    if (document.getElementById("inputField").value.length == 42){
        getTransactions(document.getElementById("inputField").value)
    }
}

async function getAccount() {
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    getTransactions(accounts[0])
    document.getElementById('enableEthereumButton').innerHTML = "Connected " + accounts[0].slice(0,5) + "..."
}