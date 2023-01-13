
let divColCapture = document.querySelector('.divColCapture')
let divColInEdit = document.querySelector('.divColInEdit')


function initAddNewItem() {
    const form = document.getElementById('addNewEditItem')
    const takePicture = document.getElementById('takePicture')
    const cancel =  document.getElementById('cancel')
    const FromCamera = document.querySelector('#imgUrl')
    
    if(localStorage.getItem(LS_CURENTARTIST_KEY)){
        currentLoggedArtist = JSON.parse(localStorage.getItem(LS_CURENTARTIST_KEY))
    }
    toLandingPage()

    cancel.addEventListener('click', function(){
        location.hash = '#artistItemsPage'
    })

    takePicture.addEventListener('click', function() {
        location.hash = '#artistCameraPage'
        divColInEdit.style.display = 'block'
        
    }) 
    FromCamera.addEventListener('click', function(e){
        location.hash = "#artistCameraPage"
        imgUrlfromCamera.src = ''
    }) 
   
  form.addEventListener('submit', onSubmitHandler)
  localStorage.setItem(LS_ALL_ITEMS_KEY, JSON.stringify(items));
} 

function onSubmitHandler(e) {
    e.preventDefault()
    const title = document.getElementById('titleInputArtist')
    const description = document.getElementById('descriptionTextArea')
    const type = document.getElementById('typeAtrist')
    const price = document.getElementById('priceArtist')
    const image = document.getElementById('imageUrlFromInput')
    const isPublishedItem = document.getElementById('inputCheckbox')
    const addNewItem = document.getElementById('addNewItem')
    
    if(editingItem) {
        let editingObject = items.find(item => item.id === editingItem.id)
        
        editingObject.title = title.value;
        editingObject.description = description.value;
        editingObject.type = type.value;
        editingObject.image = image.value ? image.value : imgUrlfromCamera.src 
        editingObject.price =+price.value;
        editingObject.artist = currentLoggedArtist;
        isPublishedItem.checked ? editingObject.isPublished = true : editingObject.isPublished = false
        
        localStorage.setItem(LS_ARTISTITEM_KEY,JSON.stringify(items))
    
        isPublishedItem.addEventListener('click', function(e){
            if(e.target.checked) {
                editingObject.isPublished = true
            } else {
                editingObject.isPublished = false
            } 
        })
        
        editingItem = undefined;
        addNewItem.textContent = 'add'  
        location.hash = '#artistItemsPage' 
        
        title.value = ''
        description.value = ''
        type.value = ''
        image.value = ''
        price.value = ''
        
    }  else {
        addNewItem.textContent = 'Add new item' 
        isPublishedItem.addEventListener('click', function(e){
            if(e.target.checked) {
                console.log('dasda')
               newObjectFromAddMode.isPublished = true;
            } else {
                newObjectFromAddMode.isPublished  = false;
            } 
        })
        
        const newObjectFromAddMode = {
            id: new Date().valueOf(),
            title: title.value,
            description: description.value,
            type: type.value,
            price: price.value,
            artist: currentLoggedArtist,
            dateCreated: new Date().toLocaleDateString(),
            isAuctioning: false, 
            isPublished: isPublishedItem.checked,
            image: image.value ? image.value : imgUrlfromCamera.src 
        }
        filterCardArtist.push(newObjectFromAddMode)
        items.unshift(newObjectFromAddMode)
        localStorage.setItem(LS_ARTISTITEM_KEY,JSON.stringify(items))
        localStorage.setItem(LS_ALL_ITEMS_KEY,JSON.stringify(items))
        title.value = ''
        description.value = ''
        type.value = ''
        image.value = ''
        price.value = ''
        
    }  
    divColInEdit.style.display = 'block'
    divColCapture.style.display = 'none'
    imgUrlfromCamera.src = ''
    location.hash = '#artistItemsPage'

}

function resetInputs() {
    titleInputArtist.value = ''
    descriptionTextArea.value = ''
    typeAtrist.value = ''
    imageUrlFromInput.value = ''
    priceArtist.value = ''
}

function updateObject(itemToClick,img) {
    itemToClick.title = titleInputArtist.value;
    itemToClick.description = descriptionTextArea.value;
    itemToClick.type = typeAtrist.value;
    itemToClick.image = img;
    itemToClick.price = priceArtist.value;
    itemToClick.artist = currentLoggedArtist;
    itemToClick.dateCreated = new Date().toLocaleDateString();
    itemToClick.isPublished = false; 
}

function toCheckInput(isPublished, item) {
    isPublished.addEventListener('click', function(e){
        if(e.target.checked) {
            item.isPublished = true
        } else {
            item.isPublished = false
        } 
    })
}
