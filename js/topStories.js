// Grab references to all the DOM elements you'll need to manipulate
const searchTerm = document.querySelector('.search');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');
const section = document.querySelector('section');

// The URL for the Article Search API at nytimes.com
const baseURL = `https://api.nytimes.com/svc/topstories/v2/{section}.json`;
// STEP 1: Get your own API key and paste it below…
const key = 'qGAQF2EKsCfQsyBgrRSr9AkzVRbmNJuc';
let url;

// STEP 2: Add a submit event listener for the search form, referencing the fetchResults function as the callback

searchForm.addEventListener('submit', fetchResults);

// Functions
function fetchResults(event) {
    // Use preventDefault() to stop the form submitting

    event.preventDefault();

    // STEP 3: Assemble the full URL, according to the API documentation at the New York Times

    url ='https://api.nytimes.com/svc/topstories/v2/world.json?api-key=qGAQF2EKsCfQsyBgrRSr9AkzVRbmNJuc';

    // url = `${baseURL}?q=${searchTerm}&api-key=${key}`;

    // STEP 4: Use fetch() to pass the URL that we built as a request to the API service, then pass the JSON to the displayResults() function
    fetch(url).then(function (results) {
        return results.json();
    })//result as an json
        .then(function (json) {
            displayResults(json);
        });

};

function displayResults(json) {
    // STEP 5: Log to the console the results from the API
    console.log(json);

    // Clear out the old results…
    while (section.firstChild) {
        section.removeChild(section.firstChild);
    };
    // STEP 6: Create the variable articles to capture the articles from the JSON object
    let articles = json.results;
    console.log(articles);

    if (articles.length === 0) {
        const para1 = document.createElement('p');
        para1.textContent = 'Not found..!';
        section.appendChild(para1);
    } else {
        for (let i = 0; i < articles.length; i++) {
            const article = document.createElement('article');
            const heading = document.createElement('h2');
            const link = document.createElement('a');
            const img = document.createElement('img');
            const para2 = document.createElement('p');
            const para3 = document.createElement('p');

            const current = articles[i];
            console.log(current);
            // STEP 7: Look at the console output from the API…
            link.href = current.short_url;
            link.textContent = "Click here to read an article";
            para2.textContent = current.title;
            para3.textContent = current.byline;

            if(current.multimedia.length > 0) {
                img.src = current.multimedia[0].url;
                img.alt = "Can't load image";
            };

            // STEP 8: Put each article together as an ARTICLE element and append it as a child of the SECTION element in the HTML
            article.appendChild(heading);
            heading.appendChild(link);
            article.appendChild(img);
            article.appendChild(para2);
            article.appendChild(para3);
            section.append(article);

        };
    };
};

// This example adapted from "Third-party APIs" at https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Third_party_APIs
