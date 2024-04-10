const visitorListingItemsContainer = document.querySelector('#visitorListingItems')
let publishedItem;
let itemsToRenderFilter;
let index = true;



function initVisitorListingPage() {
  toCheckAuction()
  toLandingPage()

  if (localStorage.getItem(LS_ALL_ITEMS_KEY)) {
    items = JSON.parse(localStorage.getItem(LS_ALL_ITEMS_KEY));
  } 

  const filterButton = document.getElementById('absoluteButton')
  publishedItem = items.filter(item => item.isPublished)
  itemsToRenderFilter = publishedItem
  if(index === true){
    itemsToRenderFilter.forEach(({artist, image, title, description, price,id}) => {
     createCard(visitorListingItemsContainer,artist, image, title, description, price,id)
    })   
  }
  
  filterButton.addEventListener('click', function() {
    visitorListingItemsContainer.innerHTML= ''
    location.hash = '#visitorFilters'
  })  
 
}

function createCard(where,artist, image, title, description, price,id) {
  const card = document.createElement('div')
  const imageCard = document.createElement('img')
  const cardBody = document.createElement('div')
  const cardBodyRow = document.createElement('div')
  const cardBodyColF = document.createElement('div')
  const cardBodyColS = document.createElement('div')
  const cardBodyH2 = document.createElement('h2')
  const buttonPrice = document.createElement('a')
  const h5Title = document.createElement('h5')
  const descriptionCard = document.createElement('p')
  
  cardBodyColS.appendChild(buttonPrice)
  cardBodyColF.appendChild(cardBodyH2)
  cardBodyRow.append(cardBodyColF,cardBodyColS)
  cardBody.appendChild(cardBodyRow)
  card.append(imageCard,cardBody,h5Title,descriptionCard)
  where.append(card)

  card.classList.add('card', 'setBackgroundColor', 'mb-2')

  imageCard.setAttribute('src', `${image}`)
  imageCard.setAttribute('alt', `${title}`)
  imageCard.classList.add('card-img-top')

  cardBody.classList.add('card-body')
  cardBodyRow.classList.add('row', 'mb-5')

  cardBodyColF.classList.add('col-6')
  cardBodyH2.textContent =`${artist}`

  cardBodyColS.classList.add('col-6','text-right')

  buttonPrice.setAttribute('href', '#')
  buttonPrice.classList.add('btn')
  buttonPrice.textContent = `$${price}`
  if(id % 2 === 0 ){
    buttonPrice.style.background= '#A26A5E'
    buttonPrice.style.color = '#FCEBD5'
    card.style.background='#FCEBD5'
    h5Title.style.color = '#A26A5E'
    descriptionCard.style.color = '#A26A5E'
    cardBodyH2.style.color = '#A26A5E'
    
  } else {
    buttonPrice.style.background= '#FCEBD5'
    buttonPrice.style.color = '#A26A5E'
    card.style.background='#A26A5E'
    h5Title.style.color = '#FCEBD5'
    descriptionCard.style.color = '#FCEBD5'
    cardBodyH2.style.color = '#FCEBD5'
  }

  h5Title.classList.add('card-title','px-3')
  h5Title.textContent = `${title}`

  descriptionCard.classList.add('card-text', 'px-3','mb-3')
  descriptionCard.textContent = `${description}`

}

 













