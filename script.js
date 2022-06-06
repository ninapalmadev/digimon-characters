const digimonMain = document.querySelector('.section-characteres')
const searchLevel = document.querySelector('#searchBar')

async function loadDigimons (){
    const response = await fetch('https://digimon-api.vercel.app/api/digimon');
    const data = await response.json()
    createDigimonCards(data);
    createDigimonSelect(data)
};

loadDigimons ();

function createDigimonCards(data){
    console.log(data);
    digimonMain.innerHTML = '';
    data.map(digimon => {
        const {name, img, level} = digimon;
        const digimonsCards = document.createElement('figure');
        digimonsCards.classList.add('description');
        digimonsCards.innerHTML = `
        <img class="img-description" src="${img}" width="180" alt="Imagem do Digimon ${name}">
            <figcaption class="name-character">${name}</figcaption>
            <span class="span-dgm ${level}">Level: ${level}</span>
        `            
    digimonMain.appendChild(digimonsCards);
    });  
};

function createDigimonSelect(digimonSelect) {
    document.getElementById("select-level").innerHTML = 'hey'
}

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

