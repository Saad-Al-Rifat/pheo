(async () => {
    // get category data
    const res = await fetch("https://openapi.programming-hero.com/api/peddy/categories");
    const { categories } = await res.json();
    renderCategories(categories);

    // get all available pets data
    const res2 = await fetch("https://openapi.programming-hero.com/api/peddy/pets")
    const { pets } = await res2.json()
    renderPet(pets)
})();

// fetch and render all pet categories
const renderCategories = (categories) => {
    const section = document.querySelector("#petCategory");

    categories.forEach(item => {
        const { id, category, category_icon: pet_img } = item;
        section.innerHTML +=
            `
            <div class="basic-btn-style category" id=${id}>
                <img width="40px" src=${pet_img} alt="pet-img">
                <p>${category}</p>
            </div>
            `;
    });

    const buttons = document.querySelectorAll(".category")
    activeBtn(buttons)
}
// each buttons functions
const activeBtn = (buttons) => {



    buttons.forEach((item) => {
        item.addEventListener("click", (e) => {
            const div = e.target.closest(".category");
            div.classList.add("active-category")
            div.classList.remove(".basic-btn-style")

            const siblings = [...div.parentElement.children].filter(item => item != div);
            [...siblings].forEach(item => item.classList.remove('active-category'))

            // fetch pet by category function trigger
            fetchByCategory(div.children[1].innerText.toLowerCase())
        })
    })

}

const renderPet = (pets) => {
    const petContainer = document.querySelector(".pet-container")
    petContainer.innerHTML = ``;
    if (pets.length) {
        pets.forEach((pet) => {
            const { breed, pet_name, price, gender, date_of_birth, image: img } = pet
            petContainer.innerHTML +=
                `
        <div class="pet">
            <div class="pet-content">
            <img src="${img}" alt="${pet_name}" class="pet-img">

            <h3 class="pet-name">${pet_name}</h3>

            <p><strong>Breed:</strong> ${breed}</p>
            <p><strong>Birth:</strong> ${date_of_birth}</p>
            <p><strong>Gender:</strong> ${gender}</p>
            <p><strong>Price:</strong> $${price}</p>
        </div>

        <div class="pet-buttons">
            <button onclick="likedImage('${img}')"><i class="fa-solid fa-thumbs-up"></i></button>
            <button>Adopt</button>
            <button>Details</button>
        </div>
        </div>
        `;
        })
    }else{
        petContainer.innerHTML = `<img style="width: 100%; height: auto; object-fit: cover;" src="images/error.webp">`;
    }
}

const likedImage = (img) => {
    const likedImgContainer = document.querySelector(".liked-img-section")
    likedImgContainer.innerHTML += `<img src=${img}>`;
    console.log(likedImgContainer)
}

// render pets by category
const fetchByCategory = async (category) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    const res2 = await res.json();
    const pets = res2.data
    renderPet(pets)
}