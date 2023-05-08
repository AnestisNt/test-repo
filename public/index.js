const h1 = document.querySelector('.js-header1');
const button1 = document.getElementById('change-user');

function setUserName(){
  const myName = prompt('Please enter your name');
  
  if(!myName){
    setUserName();
  }
  else{
    localStorage.setItem('name', myName);
    h1.textContent = `New slime! ${myName}`;
  }

}

const storedName = localStorage.getItem('name');

!storedName
  ? setUserName()
  : h1.textContent = `Welcome back slime! ${storedName}`;

button1.onclick = () =>{
  setUserName();
}

const myImage = document.querySelector('img');

myImage.onclick = () =>{
  const src = myImage.getAttribute('src');
  
  src === "./public/images/image1.jpg"
    ? myImage.setAttribute('src', "./public/images/image2.jpg")
    : myImage.setAttribute('src', "./public/images/image1.jpg");

};

const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const key = 'pHPYJI1z3jzclreSvfgKXAoJS1hrAueu';

const searchTerm = document.querySelector('.search');
const startDate = document.querySelector('.start-date');
const endDate = document.querySelector('.end-date');
const searchForm = document.querySelector('form');
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const section = document.querySelector('section');
const nav = document.querySelector('nav');

nav.style.display = 'none';

let pageNumber = 0;

// Event listeners to control the functionality
searchForm.addEventListener('submit', submitSearch);
nextBtn.addEventListener('click', nextPage);
previousBtn.addEventListener('click', previousPage);

function submitSearch(e) {
    pageNumber = 0;
    fetchResults(e);
}

function fetchResults(e) {
    e.preventDefault();
  
    let url = `${baseURL}?api-key=${key}&page=${pageNumber}&q=${searchTerm.value}&fq=document_type:("article")`;
  
    if (startDate.value !== '') {
      url = `${url}&begin_date=${startDate.value}`;
    };
  
    if (endDate.value !== '') {
      url = `${url}&end_date=${endDate.value}`;
    };

    fetch(url)
      .then((response) => response.json())
      .then((data) => displayResults(data))
      .catch((err) => `Error fetching data: ${err.message}`);
}

function displayResults(json) {
    while (section.firstChild) {
      section.removeChild(section.firstChild);
    }
  
    const articles = json.response.docs;
  
    nav.style.display = articles.length === 10 ? 'block' : 'none';
  
    if (articles.length === 0) {
      const para = document.createElement('p');
      para.textContent = 'No results returned.'
      section.appendChild(para);
    } else {
      for (const current of articles) {
        const article = document.createElement('article');
        const heading = document.createElement('h2');
        const link = document.createElement('a');
        const img = document.createElement('img');
        const para1 = document.createElement('p');
        const keywordPara = document.createElement('p');
        keywordPara.classList.add('keywords');
  
        console.log(current);
  
        link.href = current.web_url;
        link.textContent = current.headline.main;
        para1.textContent = current.snippet;
        keywordPara.textContent = 'Keywords: ';
        for (const keyword of current.keywords) {
          const span = document.createElement('span');
          span.textContent = `${keyword.value} `;
          keywordPara.appendChild(span);
        }
  
        if (current.multimedia.length > 0) {
          img.src = `http://www.nytimes.com/${current.multimedia[0].url}`;
          img.alt = current.headline.main;
        }
  
        article.appendChild(heading);
        heading.appendChild(link);
        article.appendChild(img);
        article.appendChild(para1);
        article.appendChild(keywordPara);
        section.appendChild(article);
      }
    }
};

function nextPage(e) {
    pageNumber++;
    fetchResults(e);
  };
  
function previousPage(e) {
    if (pageNumber > 0) {
      pageNumber--;
    } 
    else {
      return;
    }
    fetchResults(e);
};