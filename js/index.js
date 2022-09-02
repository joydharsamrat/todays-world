// categories section //

const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
        .catch(error => console.log(error))
}

const displayCategories = categories => {
    const catagoriesContainer = document.getElementById('catagories-container');
    categories.forEach(category => {

        const catagoriesParagraph = document.createElement('p');
        catagoriesParagraph.innerHTML = `
        <a href="#" class="text-decoration-none text-black fw-semibold" onclick="loadNews(${category.category_id})">${category.category_name}</a>
        `;
        catagoriesContainer.appendChild(catagoriesParagraph);
    });
}

loadCategories()