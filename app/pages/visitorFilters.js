
function initVisitorFilters() {
  const formVisitorFilter= document.querySelector('#visitorFiltersId')
  toLandingPage()
  visitorListingItemsContainer.innerHTML = ''
  formVisitorFilter.addEventListener('submit', onSubmitHandlerVisitorFitler)
  byArtists(artist)
  closeButton.addEventListener('click', function(){
    location.hash = '#visitorListingPage' 
})
}  

const title = document.getElementById('titleInput')
const artist = document.getElementById('byArtistSelect')
const minPrice = document.getElementById('minPrice')
const maxPrice = document.getElementById('maxPrice')
const type =  document.getElementById('byTypeSelect')
const closeButton = document.getElementById('closeButton') 

function onSubmitHandlerVisitorFitler(e) {
  e.preventDefault()
  itemsToRenderFilter = publishedItem.filter(item =>
    (title ? item.title.toLowerCase().includes(title.value.toLowerCase()) : true)  && 
    (artist ? item.artist.toLowerCase() === artist.value.toLowerCase(): true)  && 
    (minPrice ? item.price >= minPrice.value: true)  && 
    (maxPrice ? item.price <= maxPrice.value: true) && 
    (type ? item.type.toLowerCase() === type.value.toLowerCase() : true) 
  )  
  toCheckAuction()
  toLandingPage()
  visitorListingItemsContainer.innerHTML = '' 
 
  itemsToRenderFilter.forEach(({artist, image, title, description, price}) => {
    createCard(visitorListingItemsContainer,artist, image, title, description, price)
  }) 
  index = false;
  location.hash = '#visitorListingPage' 
}

async function byArtists(selectArtist) {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await res.json()

    const artistsNames = users.map(user => user.name)
    selectArtist.innerHTML = '<option value="">Choose Artist</option>';
    artistsNames.forEach(artist => {
        selectArtist.innerHTML += `<option value="${artist}">${artist}</option>`
    });

  } catch (error) {
    console.error(error)
  }
} 
  
