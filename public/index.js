const h1 = document.querySelector('h1');
const button1 = document.getElementById('button1');

button1.addEventListener('click', () =>{
  h1.textContent = 'sup dawg';
});

const myImage = document.querySelector('img');

myImage.onclick = () =>{
  const src = myImage.getAttribute('src');
  src === "../public/images/image1.jpg"
  ? myImage.setAttribute('src', "../public/images/image2.jpg")
  : myImage.setAttribute('src', "../public/images/image1.jpg");
};