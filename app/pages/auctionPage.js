const LS_MINUTES_KEY = 'AuctionTimeMinutes'; 
const LS_SECONDS_KEY = 'AuctionTimeSeconds'; 
const LS_AUCTION_ITEM_KEY = 'AuctionItem'

const inputAuction = document.querySelector('#inputAuction')
const buttonAuction= document.querySelector('#buttonAuction') 

let current_minutes;
let seconds; 
let auctionItem;
let interval;

function initAuctionPage(){
    
    if(localStorage?.getItem(LS_AUCTION_ITEM_KEY) && localStorage.getItem(LS_CURENTARTIST_KEY)) {
        auctionItem = JSON.parse(localStorage.getItem(LS_AUCTION_ITEM_KEY))
        currentLoggedArtist = JSON.parse(localStorage.getItem(LS_CURENTARTIST_KEY)) 
        const auctionImageLS = document.querySelector('#auctionItem')
        const titleAuctionLS = document.querySelector('.titleAuction')
        const auctionPriceLS = document.querySelector('.auctionPrice')
        const artistAuctionLS = document.querySelector('.artistAuction')
        auctionItem.isAuctioning = false;
        artistAuctionLS.textContent = `Artist: ${currentLoggedArtist} `
        titleAuctionLS.textContent = `Title: ${auctionItem.title}`
        auctionImageLS.innerHTML = `<img src="${auctionItem.image}" alt="${auctionItem.title}">`
        auctionPriceLS.textContent = `Price: ${auctionItem.price / 2} $`
    }  
    
    const biddingsUl = document.querySelector('#biddings')
    buttonAuction.addEventListener('click', function(){
        
        const bidAmount = inputAuction.value
        biddingsUl.innerHTML += ` <li class='liAmout'>${bidAmount}$</li>`
        console.log(bidAmount)
        if(bidAmount) { 
            fetch('https://blooming-sierra-28258.herokuapp.com/bid', {
                method: 'POST',
                body: JSON.stringify({amount: bidAmount}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).then(data => {
                if(!data.isBidding) {
                    alert('you won')
                } 
                biddingsUl.innerHTML += ` <li class='liAmoutApi'>${data.bidAmount}$</li>`
                inputAuction.value = +data.bidAmount + 50
            })
        }
    })
    buttonAuction.removeAttribute('disabled')   
    countDown(2)
    openModal ()
    
}
  
function countDown(minutes) {
    let mins = minutes
    let counter = document.getElementById("timer");
    
    if(localStorage.getItem(LS_MINUTES_KEY) && localStorage.getItem(LS_SECONDS_KEY)) {
       current_minutes = JSON.parse(localStorage.getItem(LS_MINUTES_KEY))
       seconds  = JSON.parse(localStorage.getItem(LS_SECONDS_KEY))
    } else {
        current_minutes = mins-1
        seconds = 60;  
    }
    interval = setInterval(() => {
        seconds--;
        counter.innerHTML = 
       current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        if(seconds <= 0) {
            if(current_minutes <= 0) {
                counter.innerHTML = "Finished"
                buttonAuction.setAttribute('disabled', 'true')
                inputAuction.value = ''
                clearInterval(interval);
            } else {
                current_minutes--;
                seconds = 60;
            }
        }
        localStorage.setItem(LS_MINUTES_KEY, JSON.stringify(current_minutes))
        localStorage.setItem(LS_SECONDS_KEY, JSON.stringify(seconds))
    }, 1000)   
}  


function openModal () {
    const allModalBtn = document.querySelectorAll('.modalBtn')
    allModalBtn.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if(e.target.id === 'leaveAuction') {
                location.hash = '#artistHomePage'
                localStorage.removeItem(LS_AUCTION_ITEM_KEY)
                rowAuction.style.display = 'none'
            } else if (e.target.id === 'addAuction') {
                if(seconds <= 0 && current_minutes <= 0){
                    alert('YOU WON')
                    auctionItem.priceSold = inputAuction.value
                    auctionItem.dateSold = new Date().toLocaleDateString()
                    auctionItem.isAuctioning = false
                    location.hash = '#artistItemsPage'
                }
            } 
        })
    })
    window.addEventListener('hashchange', function(){
        localStorage.removeItem(LS_MINUTES_KEY)
        localStorage.removeItem(LS_SECONDS_KEY) 
        localStorage.removeItem(LS_AUCTION_ITEM_KEY)
        clearInterval(interval) 
    }) 
}