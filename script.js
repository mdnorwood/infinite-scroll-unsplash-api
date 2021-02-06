const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray =  [];

let isFirstLoad = true

// Unsplash API
let firstLoadCount = 5;
const apiKey = 'KQcjFukSkKvFcjDC16bGnny2-V4CMNTaIjHtOMuvZ6E';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${firstLoadCount}`;

function updateAPIURLWithNewCount (loadCount) {
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${loadCount}`;
  }

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    // console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        // console.log('ready =', ready);
    }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // console.log('total images', totalImages);
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to unsplash </a>
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for phoo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        // Put <img> inside <a>, then put both inside imgContainer element</a>
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get Photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if (isFirstLoad) {
            updateAPIURLWithNewCount(30)
            isFirstLoad = false
        }
    } catch (error) {
        // Catch error here

    }

}
// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();