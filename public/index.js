const h1 = document.querySelector('h1');
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
  : h1.textContent =`Welcome back slime! ${storedName}`;


button1.onclick = () =>{
  setUserName();
}


const myImage = document.querySelector('img');

myImage.onclick = () =>{
  const src = myImage.getAttribute('src');
  
  src === "../public/images/image1.jpg"
    ? myImage.setAttribute('src', "../public/images/image2.jpg")
    : myImage.setAttribute('src', "../public/images/image1.jpg");

};
