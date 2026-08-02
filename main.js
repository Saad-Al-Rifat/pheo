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
        section.innerHTML +=
            `
            <div class="category" id=${id}>
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

    buttons.forEach((item)=>{
        item.addEventListener("click", (e)=>{
            const div = e.target.closest(".category");
            div.classList.add("active-category")

            const siblings = [...div.parentElement.children].filter( item => item != div);
            [...siblings].forEach(item => item.classList.remove('active-category'))
        })
    })
    
}