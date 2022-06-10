const digimonMain = document.querySelector('.section-characteres')
const searchLevel = document.querySelector('#searchBar')
let favoritosHeader = document.querySelector('#favoritosNav')
let digimonFavoritos = [];

async function loadDigimons (){
    const response = await fetch('https://digimon-api.vercel.app/api/digimon');
    const data = await response.json()
    createDigimonCards(data);
    filterDigimons("All")
};
loadDigimons ();
/* cria os Digimons no main */
function createDigimonCards(data){
    digimonMain.innerHTML = '';
    data.map(digimon => {
        const {name, img, level} = digimon;
        const digimonsCards = document.createElement('figure');
        digimonsCards.classList.add('.description');
        digimonsCards.innerHTML = `
            <div class="description ${level}">
                <img class="img-description" src="${img}" width="180" alt="Imagem do Digimon ${name}">
                    <figcaption class="name-character">${name}</figcaption>
                    <span class="span-dgm ${level}">Level: ${level}</span>
                    <button type="button" class="favorite-btn" onclick='favDigimon(${JSON.stringify(digimon)})'>
                    +
                    </button>    
            </div>
        `            
        digimonMain.appendChild(digimonsCards);
    });  
};
/* busca por nome no input */
const hideDigimons = (searchDigimons, inputValue) => {
    searchDigimons
    .filter(digimons => !digimons.textContent.toLowerCase().includes(inputValue))
    .forEach(digimons => {
        digimons.classList.add('hidden');
    });
};

const showDigimons = (searchDigimons, inputValue) => {
    searchDigimons
    .filter(digimons => digimons.textContent.toLowerCase().includes(inputValue))
    .forEach(digimons => {
        digimons.classList.remove('hidden')
    });
};

searchLevel.addEventListener('input', event => {
    const inputValue = event.target.value.toLowerCase();
    const searchDigimons = Array.from(digimonMain.children);
 
    hideDigimons(searchDigimons, inputValue);
    showDigimons(searchDigimons, inputValue);
});

/* filtro de categorias por level */
function filterDigimons(value) {
    let buttons = document.querySelectorAll(".button-value");
    buttons.forEach((button) => {
        if(value.toUpperCase() == button.innerText.toUpperCase()){
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });

    let elements = document.querySelectorAll('.description');
    elements.forEach((element)=> {
        if(value == "All") {
            element.parentElement.classList.remove("hide");
        }else{
            if(element.classList.contains(value)){
                element.parentElement.classList.remove("hide");
            }else{
                element.parentElement.classList.add("hide");
            };
        };
    }); 
};
  
/*Digimons favoritados e postos no localStorage */
function favDigimon(digimon) {
    let digimonFavoritos = digimonLocalStorage();
    const addFavoritos = digimonFavoritos.filter((item) => (item.name === digimon.name))
        if(addFavoritos.length === 0){
            digimonFavoritos.push(digimon)
        }else{
            digimonFavoritos = digimonFavoritos.filter((item) => (item.name != digimon.name))
        }
        localStorage.setItem("Lista Digimon", JSON.stringify(digimonFavoritos))
};
    
function digimonLocalStorage() {
    if(localStorage.getItem("Lista Digimon") == null){
        localStorage.setItem("Lista Digimon", "[]")
    }
        const dataFavoritos = localStorage.getItem("Lista Digimon")
        return JSON.parse(dataFavoritos)
}

function reloadFav() { 
    const digimonsFavoritados = digimonLocalStorage();
    createDigimonCards(digimonsFavoritados)
}

let btnFav = document.querySelector('#btnFav')
btnFav.addEventListener("click", reloadFav)