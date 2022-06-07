const digimonMain = document.querySelector('.section-characteres')
const searchLevel = document.querySelector('#searchBar')

async function loadDigimons (){
    const response = await fetch('https://digimon-api.vercel.app/api/digimon');
    const data = await response.json()
    createDigimonCards(data);
    filterDigimons("All")
};

loadDigimons ();

function createDigimonCards(data){
    digimonMain.innerHTML = '';
    data.map(digimon => {
       // console.log(data);
        const {name, img, level} = digimon;
        const digimonsCards = document.createElement('figure');
        digimonsCards.classList.add('.description');
        digimonsCards.innerHTML = `
            <div class="description ${level}">
                <img class="img-description" src="${img}" width="180" alt="Imagem do Digimon ${name}">
                    <figcaption class="name-character">${name}</figcaption>
                    <span class="span-dgm ${level}">Level: ${level}</span>
            </div>
        `            
    digimonMain.appendChild(digimonsCards);
    });  
};

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
            }
        };
    }); 
};

