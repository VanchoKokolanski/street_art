
const vectorAuction = document.querySelector('#vectorAuction')
function initVisitorHomePage() {
    toCheckAuction()
    toLandingPage()
    const buttonForMore = document.querySelector('.visitorButton')
    buttonForMore.addEventListener('click', function() {
        window.location = '#visitorListingPage'
    })
    
    clickOnImage();
}

function clickOnImage() {
    const allImg = document.querySelectorAll('.img')
    
    allImg.forEach(image => {
        image.addEventListener('click', () => {
            window.location = '#visitorListingPage'
        })
    })
}

function toCheckAuction() {
    if(localStorage.getItem(LS_AUCTION_ITEM_KEY)) {
        auctionItem = JSON.parse(localStorage.getItem(LS_AUCTION_ITEM_KEY))
    }
    if(auctionItem){
        vectorAuction.setAttribute('href', '#auctionPage')
    } else {
        vectorAuction.removeAttribute('href')
    }
}