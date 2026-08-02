(async () => {
    // get category data
    const res = await fetch("https://openapi.programming-hero.com/api/peddy/categories");
    const { categories } = await res.json();
    renderCategories(categories);
})();

// fetch and render all pet categories
const renderCategories = (categories) => {
    const section = document.querySelector("#petCategory");

    categories.forEach(item => {
        const { id, category, category_icon: pet_img } = item;
        console.log(id, category, pet_img)
        section.innerHTML +=
            `
            <div class="category" id=${id}>
                <img width="40px" src=${pet_img} alt="pet-img">
                <p>${category}</p>
            </div>
            `;
    });
}