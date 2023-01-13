
window.addEventListener('hashchange', handleRouting)
window.addEventListener('load', handleRouting)


function handleRouting() {
    if(location.hash === '') {
        location.hash = "#landingPage";
    } 

    let hash = location.hash

    // Hide all pages
    const allPages = document.querySelectorAll('.page')

    allPages.forEach(page => page.style.display = 'none')

    // Show current page
    const currentPage = document.querySelector(hash)
    currentPage.style.display = 'block'

    const navBar = document.querySelector('.navbar')
    const imageLogo = document.querySelector('.logo')    
    const imageMenu = document.querySelector('.menu')
    const imageVector = document.querySelector('.vector')
    let nameOfArtist = document.querySelector('.nameOfArtist')
    
    switch (hash) {
        case '#landingPage':
            initLandingPage()
            imageLogo.style.display = 'none' 
            imageMenu.style.display = 'none'
            imageVector.style.display = 'none'
            navBar.classList.add('justify-content-center')
            navBar.classList.remove('justify-content-between')
            nameOfArtist.innerText = 'Street artist'
            break;
        case '#visitorListingPage':
            initVisitorListingPage()
            imageLogo.style.display = 'block' 
            imageMenu.style.display = 'none'
            imageVector.style.display = 'block'
            navBar.classList.add('justify-content-between')
            navBar.classList.remove('justify-content-center')
            nameOfArtist.innerText = 'Street artist'
            break;
        case '#visitorHomePage':
            initVisitorHomePage()
            imageLogo.style.display = 'block' 
            imageMenu.style.display = 'none'
            imageVector.style.display = 'block'
            navBar.classList.add('justify-content-between')
            navBar.classList.remove('justify-content-center')
            nameOfArtist.innerText = 'Street artist'
            break;
        case '#visitorFilters':
            initVisitorFilters() 
            imageLogo.style.display = 'block' 
            imageMenu.style.display = 'none'
            imageVector.style.display = 'block'
            navBar.classList.add('justify-content-between')
            navBar.classList.remove('justify-content-center')
            nameOfArtist.innerText = 'Street artist'
            break;
        case '#artistHomePage':
            initArtistHomePage()
            imageLogo.style.display = 'block' 
            imageMenu.style.display = 'block'
            imageVector.style.display = 'none'
            navBar.classList.add('justify-content-between')
            navBar.classList.remove('justify-content-center')
            nameOfArtist.innerText = currentLoggedArtist;
            break;
        case '#artistItemsPage':
            initArtistItemsPage() 
            imageLogo.style.display = 'block' 
            imageMenu.style.display = 'block'
            imageVector.style.display = 'none'
            navBar.classList.add('justify-content-between')
            navBar.classList.remove('justify-content-center')
            nameOfArtist.innerText = currentLoggedArtist;
            break;
        case '#addNewItemPage':
            initAddNewItem()
            imageLogo.style.display = 'block' 
            imageMenu.style.display = 'block'
            imageVector.style.display = 'none'
            navBar.classList.add('justify-content-between')
            navBar.classList.remove('justify-content-center')
            nameOfArtist.innerText = currentLoggedArtist;
            break;
        case '#artistCameraPage':
            initCameraPage()
            imageLogo.style.display = 'block' 
            imageMenu.style.display = 'block'
            imageVector.style.display = 'none'
            navBar.classList.add('justify-content-between')
            navBar.classList.remove('justify-content-center')
            nameOfArtist.innerText = currentLoggedArtist;
            break;
        case '#auctionPage':
            initAuctionPage()
            imageLogo.style.display = 'block' 
            imageMenu.style.display = 'none'
            imageVector.style.display = 'block'
            navBar.classList.add('justify-content-between')
            navBar.classList.remove('justify-content-center')
            nameOfArtist.innerText = currentLoggedArtist;
            break;
        default:
            break;
    }
}