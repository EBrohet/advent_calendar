const description = document.querySelector(".description");
const cases = document.getElementById('cases');

description.innerText = "Voici un calendrier de l'avent sur le thème des animaux. Vous retrouverez sous chaque case des photos d'animaux domestiques ou sauvages."

for (let i = 0; i < 24; i++) {
    let element = document.createElement('div');
    // console.log(element);
    element.classList.add('case');
    element.innerText = i + 1;
    cases.appendChild(element);
}

async function afficherAnimaux() {
    const reponse = await fetch('./data/animaux.json');
    const animaux = await reponse.json();
    console.log(animaux);

    let elements = document.querySelectorAll(".case");
    console.log(elements);

    const array = [];

    elements.forEach(element => {
        element.addEventListener("click", (event) => {
            event.preventDefault();
            if (!event.target.dataset.clicked) {
                event.target.dataset.clicked = "true";
                let randomId = getRandomId(1, animaux.length + 1);
                while (array.includes(randomId)) {
                    randomId = getRandomId(1, animaux.length + 1);
                }
                array.push(randomId);
                console.log(array);

                for (let i = 0; i < animaux.length; i++) {
                    if (('ani' + randomId) === animaux[i].id) {
                        element.innerText = "";
                        element.innerHTML = `<img src="${animaux[i].picture}" alt="${animaux[i].name}" width="100%" height="210px">`;
                    }
                }
            }
        })
    });
};

afficherAnimaux();


// const numbers = [...document.querySelectorAll(".case")];
// console.log(numbers);


function getRandomId(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}