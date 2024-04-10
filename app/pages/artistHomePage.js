let myChart=null;
const totalItemSold = document.querySelector('#totalItemSold')
const totalIncome = document.querySelector('#totalIncome')
const logoButton = document.querySelector('#logoButton')
const modalAuction = document.querySelector('#modalAuction')
const rowAuction = document.querySelector('#rowAuction')
const rowAuctionNon = document.querySelector('#rowAuction1')
const collapse = document.querySelector('.collapse')
const Modal = document.querySelector('.modal')

function initArtistHomePage() {
    toLandingPage()
    const hiddenMenu = document.querySelectorAll('.nav-link')
    const navbarCollapse = document.querySelector('.navbar-collapse')
    const toAuctionPage = document.querySelector('#toAuctionPage')
    
    if(localStorage.getItem(LS_CURENTARTIST_KEY)){
        currentLoggedArtist = JSON.parse(localStorage.getItem(LS_CURENTARTIST_KEY))
    }
    
    if(localStorage.getItem(LS_AUCTION_ITEM_KEY)) {
        auctionItem = JSON.parse(localStorage.getItem(LS_AUCTION_ITEM_KEY))
        console.log(auctionItem)
    }
    if(auctionItem){
        rowAuction.style.display = 'block'
        rowAuctionNon.style.display = 'none'
        toAuctionPage.setAttribute('href', '#auctionPage')
    } else {
        rowAuction.style.display = 'none'
        rowAuctionNon.style.display = 'block'
        toAuctionPage.removeAttribute('href')
    }
    
    hiddenMenu.forEach(link => {
        link.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show')
        })
    })

    const itemSoldByArtisit = items.filter(item =>item.artist === currentLoggedArtist && Boolean(item.priceSold))
    const totalArtist= items.filter(item =>item.artist === currentLoggedArtist)
    calculateAllSoldItems(totalArtist)
    /* Chart */
    const ctx = document.getElementById('myChart');
    const data = {
        labels: ['11/12/2022','12/12/2022','13/12/2022','14/12/2022','15/12/2022','17/12/2022','18/12/2022'],
        datasets: [{
          label: 'Amount',
          data: [631, 171, 244, 124, 543, 356, 325],
          borderWidth: 1,
          backgroundColor: '#A26A5E',
        }]
    }
    if(myChart!=null){
        myChart.destroy()
    }
    myChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        indexAxis: 'y',
      }
    });  

    createAndUpdateChart(myChart, itemSoldByArtisit)
}

function createAndUpdateChart(myNewChart, filterItem) {
    const allButton = document.querySelectorAll('.daysAgo')
    allButton.forEach(button => {
        button.addEventListener('click', function(event) {
            const labels = generateDate(event.target.id);
        
            myNewChart.data.labels = labels;
           
            const newDate = labels.map(label => {
                let sum = 0;
                filterItem.forEach(item => {
                    if(formateDate(item.dateSold) === label){
                        sum+= item.priceSold;
                    }
                })
                return sum;
            })
            myNewChart.data.datasets[0].data = newDate;
            myNewChart.update(); 
        })
    })
}

function generateDate(days) {
    let newArray= []
    
    for(let i=0; i < days; i++){
        const takeDay = new Date().getDate() 
        const today = new Date().setDate(takeDay - i)
        const formatted = formateDate(today)
        newArray.push(formatted)
    }
    return newArray
}

function formateDate(dateToFormat) {
 return new Date(dateToFormat).toLocaleDateString('en-GB')
}

function calculateAllSoldItems(listOfArtist) {
    let sumOfSoldItems= 0;
    let sumTotalItems = 0;
    let sumOfAmount = 0;

    listOfArtist.forEach(item =>  {
        if(item.dateSold){
            sumOfSoldItems ++;
            sumOfAmount += item.priceSold
        }
        sumTotalItems ++;
    })  
    totalItemSold.innerHTML = `
    <p>${sumOfSoldItems} / ${sumTotalItems}</p>
    `
    totalIncome.innerHTML = `
    <p>$${sumOfAmount}</p>
    `
}

function toLandingPage() {
    logoButton.addEventListener('click', function() {
        if(location.hash ==='#visitorHomePage' || location.hash ==='#visitorListingPage'
        ||  location.hash ==='#visitorFilters' || location.hash ==='#artistHomePage' 
        || location.hash ==='#artistItemsPage'  || location.hash ==='#addNewItemPage'  
        || location.hash ==='#artistCameraPage') {

            location.hash ='#landingPage'
        
        } else if (location.hash ==='#auctionPage'){
            modalAuction.show()
        }
    })
} 
