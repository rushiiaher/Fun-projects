// Variables
const generalBtn = document.getElementById("genral");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sport");
const entertainmentBtn = document.getElementById("entertainment");
const technologyBtn = document.getElementById("technology");
const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

// Array
var newsDataArr = [];

// APIs 
const API_KEY = "7169117ff81b499f8ee94eac4152fea4";
const HEADLINES_NEWS = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`;
const GENERAL_NEWS = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
const BUSINESS_NEWS = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${API_KEY}`;
const SPORTS_NEWS = `https://newsapi.org/v2/everything?q=Sport&from=2024-09-19&sortBy=publishedAt&apiKey=${API_KEY}`;
const ENTERTAINMENT_NEWS = `https://newsapi.org/v2/everything?q=Entertainment&from=2024-09-19&sortBy=publishedAt&apiKey=${API_KEY}`;
const TECHNOLOGY_NEWS = `https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=${API_KEY}`;

// Onload headlines
window.onload = function() {
    newsType.innerHTML = "<h4>Headlines</h4>";
    fetchHeadlines();
};

// Event Listeners
generalBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>General News</h4>";
    fetchGeneralNews();
});

businessBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Business</h4>";
    fetchBusinessNews();
});

sportsBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Sports</h4>";
    fetchSportsNews();
});

entertainmentBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Entertainment</h4>";
    fetchEntertainmentNews();
});

technologyBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Technology</h4>";
    fetchTechnologyNews();
});

searchBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Search: " + newsQuery.value + "</h4>";
    fetchQueryNews();
});

// Fetch functions
const fetchHeadlines = async () => {
    const response = await fetch(HEADLINES_NEWS);
    newsDataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }
    displayNews();
};

const fetchGeneralNews = async () => {
    const response = await fetch(GENERAL_NEWS);
    newsDataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }
    displayNews();
};

const fetchBusinessNews = async () => {
    const response = await fetch(BUSINESS_NEWS);
    newsDataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }
    displayNews();
};

const fetchSportsNews = async () => {
    const response = await fetch(SPORTS_NEWS);
    newsDataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }
    displayNews();
};

const fetchEntertainmentNews = async () => {
    const response = await fetch(ENTERTAINMENT_NEWS);
    newsDataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }
    displayNews();
};

const fetchTechnologyNews = async () => {
    const response = await fetch(TECHNOLOGY_NEWS);
    newsDataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }
    displayNews();
};

// Fetch query-based news
const fetchQueryNews = async () => {
    if (newsQuery.value.trim() === "") {
        return;
    }

    const searchUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(newsQuery.value)}&from=2024-09-19&sortBy=publishedAt&apiKey=${API_KEY}`;

    try {
        const response = await fetch(searchUrl);
        newsDataArr = [];

        if (response.status >= 200 && response.status < 300) {
            const myJson = await response.json();
            newsDataArr = myJson.articles;
        } else {
            console.log(response.status, response.statusText);
            newsdetails.innerHTML = "<h5>No data found.</h5>";
            return;
        }

        displayNews();

    } catch (error) {
        console.log("Error fetching the news:", error);
        newsdetails.innerHTML = "<h5>Failed to fetch news data.</h5>";
    }
};

// Function to display news
function displayNews() {
    newsdetails.innerHTML = "";

    newsDataArr.forEach(news => {
        const date = news.publishedAt.split("T")[0];

        const col = document.createElement('div');
        col.className = "col-sm-12 col-md-4 col-lg-3 p-2 card";

        const card = document.createElement('div');
        card.className = "p-2";

        const image = document.createElement('img');
        image.setAttribute("height", "matchparent");
        image.setAttribute("width", "100%");
        image.src = news.urlToImage;

        const cardBody = document.createElement('div');

        const newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        const dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date;

        const description = document.createElement('p');
        description.className = "text-muted";
        description.innerHTML = news.description;

        const link = document.createElement('a');
        link.className = "btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML = "Read more";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(description);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsdetails.appendChild(col);
    });
}
