
const asArtistBtn = document.getElementById('asArtist')
const asVisitorBtn = document.querySelector('#asVisitor')
const chooseArtistSelect = document.querySelector('#chooseArtist')
let currentLoggedArtist;
 

function initLandingPage() {
    localStorage.removeItem(LS_CURENTARTIST_KEY)
    populateArtistsAsync()

    asArtistBtn.addEventListener('click', handleAsArtist)
    asVisitorBtn.addEventListener('click', handleAsVisitor)

   chooseArtistSelect.addEventListener('change', handleChooseArtistChange)
}



function handleAsArtist() {
    currentLoggedArtist = chooseArtistSelect.value
    window.location = '#artistHomePage'
    localStorage.setItem(LS_CURENTARTIST_KEY,JSON.stringify(currentLoggedArtist))
}

function handleAsVisitor() {
    window.location = '#visitorHomePage'
}


function handleChooseArtistChange(event) {
    const value = event.target.value
    if (value) {
        asArtistBtn.removeAttribute('disabled')
    } else {
        asArtistBtn.setAttribute('disabled', 'true');
    }
} 

async function populateArtistsAsync() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        const users = await res.json()

        const artistsNames = users.map(user => user.name)

        chooseArtistSelect.innerHTML = '<option value="">Choose Artist</option>';
        artistsNames.forEach(artist => {
            chooseArtistSelect.innerHTML += `<option value="${artist}">${artist}</option>`
        });

    } catch (error) {
        console.error(error)
    }
}

