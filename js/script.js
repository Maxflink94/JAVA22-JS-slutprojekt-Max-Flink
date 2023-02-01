// DOM - Element
const textSearchInput = document.querySelector('#textSearchInput');
const numberSearchInput = document.querySelector('#numberSearchInput');
const sizeSearchOption = document.querySelector('#sizeSearchOption');
const sortSearchOption = document.querySelector('#sortSearchOption');
const getImgBtn = document.querySelector('button');
const imgContainer = document.querySelector('#imgContainer');

const apiKey = '884bbb4d6caeba4db5fb638df191be3c';

// EventListener på Hämta bilder-knappen med fetch-funktion
getImgBtn.addEventListener('click', getUrl);

// Hämtar informationen från api
function getUrl(event) {
    event.preventDefault();

    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${textSearchInput.value}&sort=${sortSearchOption.value}&per_page=${numberSearchInput.value}&format=json&nojsoncallback=1`;

    // Kollar om alla fälten är ifyllda när man gör en sökning annars skickas ett error-meddelnde
    if (textSearchInput.value === "" || numberSearchInput.value === 0 || sizeSearchOption.value === "" || sortSearchOption.value == "") {
        errorMessage('Fyll i Alla Fälten');
        console.error(error);
    }
    else {
        fetch(url)
            .then(response => {
                console.log(response);
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw 'DET FUNKAR INTE';
                }
            })
            .then(data => {
                // Lyckad hämtning från API
                displayImages(data.photos.photo);
            })
            // Kollar om där är Network eller server error
            .catch(error => {
                imgContainer.innerHTML = ""
                errorMessage('Nätverks eller serverfel')
            });
    }
}

// Displayar bilderna i imgContainer-diven
function displayImages(data) {
    console.log(data);
    imgContainer.innerHTML = '';
    // Körs om data som hämtas från API är noll
    if (data.length === 0) {
        errorMessage('Sök på något mer specifikt!');
    } else {
        data.forEach(({ server, id, secret }) => {
            const img = document.createElement('img');
            const a = document.createElement('a');

            img.src = `https://live.staticflickr.com/${server}/${id}_${secret}_${sizeSearchOption.value}.jpg`;

            a.href = img.src;
            a.target = '_blank';

            imgContainer.append(a);
            a.append(img);
        });
    }
}

function errorMessage(text) {
    imgContainer.innerText = text;
}

