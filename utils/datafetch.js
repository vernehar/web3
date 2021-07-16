let key
let address
let uniswapTransactions = []
let uniswapRouterAddresses = ["0x7a250d5630b4cf539739df2c5dacb4c659f2488d", "0xf164fc0ec4e93095b804a4795bbe1e041497b92a"];

//Get API key
jQuery.when(
    jQuery.getJSON("utils/util.json")
).done( function(json) {
    key = json.key;
});

function getTransactions(){
    let URL = "https://api.etherscan.io/api?module=account&action=txlist&address="+address+"&startblock=0&endblock=99999999&sort=asc&apikey="+key;
    // get transaction history of given address fron etherscan via api
    let fetchTransactions = fetch(URL)
    fetchTransactions.then(response => {
        response.json().then(data => {
        // wait for response and then get uniswap transactions from the data
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
        console.log(uniswapTransactions[0])
        return uniswapTransactions[0] //Return index zero from sorted JSON
        })
    })
}

function formMessage(json) {
    var myDate = "17-09-2020";
    myDate = myDate.split("-");
    var newDate = new Date( myDate[2], myDate[1] - 1, myDate[0]);

    if (json.timeStamp < newDate.getTime()) {
        message = "You made your first uniswap trade on "+Date(json.timeStamp)
    }else{
        message = "You made your first uniswap trade on "+Date(json.timeStamp)
    }

    return message
}

window.onload = function() {
    document.getElementById("button").addEventListener("click", function() {
        address = document.getElementById("inputField").value
        messagejson = getTransactions()
        console.log(messagejson)
        if (messagejson){
            document.getElementById("data").innerHTML = formMessage(messagejson)
        }
    })}

