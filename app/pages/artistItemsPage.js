const LS_ALL_ITEMS_KEY = 'AllItems'
const LS_ARTISTITEM_KEY = "ArtistItem";
const LS_CURENTARTIST_KEY = "CurrentLoggedArtist";
const LS_FILTERITEM_KEY = "filterCardArtist";

const artistItemPage = document.querySelector("#artistItems");
const toAddNewItem = document.getElementById("toAddNewItem");

let filterCardArtist;
let cardFooterButton4;

function initArtistItemsPage() {
  if (localStorage.getItem(LS_ARTISTITEM_KEY) && localStorage.getItem(LS_CURENTARTIST_KEY)) {
    items = JSON.parse(localStorage.getItem(LS_ARTISTITEM_KEY));
    currentLoggedArtist = JSON.parse(localStorage.getItem(LS_CURENTARTIST_KEY));

    if (localStorage.getItem(LS_FILTERITEM_KEY)) {
      filterCardArtist = JSON.parse(localStorage.getItem(LS_FILTERITEM_KEY));
      filterCardArtist = items.filter(
        (item) => item.artist === currentLoggedArtist
      );
    } 
    artistItemPage.innerHTML = "";
    filterCardArtist.forEach(({image,title,description,price,dateCreated,isPublished,type,id},index) => {
      createCardArtist({image,title,description,price,dateCreated,isPublished,type,id},index)}
    );
  }

  filterCardArtist = items.filter(
    (item) => item.artist === currentLoggedArtist
  );
  artistItemPage.innerHTML = "";

  filterCardArtist.forEach(({image,title,description,price,dateCreated,isPublished,type,id,},index) => {
    createCardArtist({image,title,description,price,dateCreated,isPublished,type,id,},index)}
  );

  toLandingPage();
  localStorage.setItem(LS_ARTISTITEM_KEY, JSON.stringify(items));
  localStorage.setItem(LS_ALL_ITEMS_KEY, JSON.stringify(items));
}

let editingItem;

function createCardArtist(item, index) {
  const {image,title,description,price,dateCreated,isPublished,type,id,} = item;

  const card = document.createElement("div");
  const imageCard = document.createElement("img");
  /* card-body */
  const cardBody = document.createElement("div");
  const cardRow = document.createElement("div");
  const colFirst = document.createElement("div");
  const colFirstheader = document.createElement("h2");
  const colFirstSpan = document.createElement("span");
  const colSecond = document.createElement("div");
  const colSecondLink = document.createElement("a");
  const p = document.createElement("p");
  /* card-footer */
  const cardFooter = document.createElement("div");
  const cardFooterRow = document.createElement("div");
  const cardFooterCol = document.createElement("div");
  const cardFooterButton1 = document.createElement("button");
  const cardFooterButton2 = document.createElement("button");
  const cardFooterButton3 = document.createElement("button");
  const cardFooterButton4 = document.createElement("button");

  let newObj = filterCardArtist[index];
  /* append */
  cardBody.append(cardRow, p);
  cardBody.classList.add("card-body", "backgroundChart");
  p.classList.add("card-text", 'textColorArtistItems');
  p.textContent = `${description}`;

  cardRow.append(colFirst, colSecond);
  cardRow.classList.add("row", "mb-5");

  colFirst.append(colFirstheader, colFirstSpan);
  colFirst.classList.add("col-6");
  colFirstheader.textContent = `${title}`;
  colFirstheader.classList.add("textColorArtistItems");
  colFirstSpan.textContent = `${dateCreated}`;
  colFirstSpan.classList.add("textColorDate");


  colSecond.appendChild(colSecondLink);
  colSecond.classList.add("col-6", "text-right");
  colSecondLink.classList.add("bnt", "priceButtonAndAuctionButton" , 'p-2');
  colSecondLink.setAttribute("href", "#");
  colSecondLink.textContent = `$${price}`;

  cardFooter.appendChild(cardFooterRow);
  cardFooter.classList.add("card-footer", 'backgroundArtistItems');

  cardFooterRow.appendChild(cardFooterCol);
  cardFooterRow.classList.add("row");

  cardFooterCol.append(
    cardFooterButton1,
    cardFooterButton2,
    cardFooterButton3,
    cardFooterButton4
  );
  cardFooterCol.classList.add("col", "d-flex", "justify-content-between", );

  cardFooterButton1.classList.add("bnt", "sendToAuction" );
  cardFooterButton1.textContent = "Send to Auction";
  newObj.isAuctioning = false;

  cardFooterButton1.addEventListener("click", function () {
    auctionItem = newObj;
    const auctionImage = document.querySelector("#auctionItem");
    const titleAuction = document.querySelector(".titleAuction");
    const auctionPrice = document.querySelector(".auctionPrice");
    const artistAuction = document.querySelector(".artistAuction");
    auctionItem.isAuctioning = true;
    artistAuction.textContent = `Artist: ${currentLoggedArtist} `;
    titleAuction.textContent = `Title: ${auctionItem.title}`;
    auctionImage.innerHTML = `<img src="${auctionItem.image}" alt="${auctionItem.title}">`;

    auctionPrice.textContent = `Price: ${auctionItem.price / 2} $`;

    location.hash = "#auctionPage";
    localStorage.setItem(LS_AUCTION_ITEM_KEY, JSON.stringify(auctionItem));
    localStorage.setItem(LS_ALL_ITEMS_KEY, JSON.stringify(items));
  });


  cardFooterButton2.classList.add("btn" );
  cardFooterButton2.textContent = `${isPublished}`;
  if (isPublished === true) {
    cardFooterButton2.textContent = "isPublished";
    cardFooterButton2.classList.add("PublishedButton");
  } else {
    cardFooterButton2.textContent = "unPublished";
    cardFooterButton2.classList.add("unPublishedButton");
  }
  cardFooterButton2.addEventListener("click", function () {
    if (newObj.isPublished === true) {
      cardFooterButton2.textContent = "unPublished";
      cardFooterButton2.classList.add("unPublishedButton")
      cardFooterButton2.classList.remove("PublishedButton")
      newObj.isPublished = false;
      localStorage.setItem(LS_FILTERITEM_KEY, JSON.stringify(filterCardArtist));
      localStorage.setItem(LS_ARTISTITEM_KEY, JSON.stringify(items));
      localStorage.setItem(LS_ALL_ITEMS_KEY, JSON.stringify(items));
    } else if (newObj.isPublished === false) {
      cardFooterButton2.textContent = "isPublished";
      cardFooterButton2.classList.add("PublishedButton")
      cardFooterButton2.classList.remove("unPublishedButton")
      newObj.isPublished = true;
      localStorage.setItem(LS_FILTERITEM_KEY, JSON.stringify(filterCardArtist));
      localStorage.setItem(LS_ARTISTITEM_KEY, JSON.stringify(items));
      localStorage.setItem(LS_ALL_ITEMS_KEY, JSON.stringify(items));
    }
  });

  cardFooterButton3.classList.add("bnt", "removeButton" );
  cardFooterButton3.textContent = "Remove";
  cardFooterButton3.addEventListener("click", function (event) {
    if (confirm("Do you want to remove card?") == true) {
      const currentCard =
        event.target.parentElement.parentElement.parentElement.parentElement;
      const id =
        event.target.parentElement.parentElement.parentElement.parentElement.id;
      currentCard.remove();
      let newItem = items.filter((item) => item.id !== +id);
      filterCardArtist = newItem.filter((item) => item.id !== +id);

      localStorage.setItem(LS_FILTERITEM_KEY, JSON.stringify(filterCardArtist));
      localStorage.setItem(LS_ARTISTITEM_KEY, JSON.stringify(filterCardArtist));
      localStorage.setItem(LS_ALL_ITEMS_KEY, JSON.stringify(newItem));
    } else {
      localStorage.setItem(LS_ALL_ITEMS_KEY, JSON.stringify(newItem));
      currentCard.show();
    }
  });

  cardFooterButton4.classList.add("bnt", "editButton");
  cardFooterButton4.setAttribute("data-toggle", "modal");
  cardFooterButton4.setAttribute("data-target", "#modalEdit");
  cardFooterButton4.type = "button";

  cardFooterButton4.textContent = "Edit";

  cardFooterButton4.addEventListener("click", function () {
    editingItem = item;
    const formTitle = document.getElementById("titleInputArtist");
    const formDescription = document.getElementById("descriptionTextArea");
    const formType = document.getElementById("typeAtrist");
    const formPrice = document.getElementById("priceArtist");
    const formImage = document.getElementById("imageUrlFromInput");
    const addNewItem = document.getElementById("addNewItem");
    const checkBox = document.getElementById('inputCheckbox')

    addNewItem.textContent = "Edit";
    
    formTitle.value = title;
    formDescription.value = description;
    formType.value = type;
    formPrice.value = price;
    formImage.value = image;

    if (item.isPublished) {
      checkBox.checked = true;
    }else {
      checkBox.checked = false;
    }
    console.log(checkBox.checked )
    console.log(item.isPublished)
   
    
    localStorage.setItem(LS_ALL_ITEMS_KEY, JSON.stringify(items));
    location.hash = "#addNewItemPage";
  });

  imageCard.setAttribute("src", `${image}`, "alt", `${title}`);
  imageCard.setAttribute('width', '100%',)
  imageCard.setAttribute(  'height', '200px' )

  card.append(imageCard, cardBody, cardFooter);
  card.classList.add("card", "mb-3");
  card.setAttribute("id", `${id}`);

  artistItemPage.appendChild(card);

}
