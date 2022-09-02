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
const loadNews = categoryId => {
    fetch(`https://openapi.programming-hero.com/api/news/category/${'0' + categoryId}`)
        .then(res => res.json())
        .then(data => displayNews(data.data))
        .catch(error => console.log(error))
}

const displayNews = newses => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    const itemsCount = document.getElementById('items-count');
    itemsCount.innerText = newses.length + ' Items Found';
    if (newses.length === 0) {
        newsContainer.innerText = 'Sorry !! No Items Found';
    }
    else {
        newses.forEach(news => {
            const newsDiv = document.createElement('div');
            newsDiv.classList.add('card');
            newsDiv.classList.add('mb-3');
            newsDiv.innerHTML = `
                    <div class="row g-0">
                        <div class="col-md-3">
                            <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-9">
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                                    additional content. This content is a little bit longer.
                                </p>
                                <div class="d-flex justify-content-around align-items-center">
                                    <div>
                                        <img src="" alt="">
                                        <p>x</p>
                                        <p>y</p>
                                    </div>
                                    <div>
                                        <p>x</p>
                                    </div>
                                    <div>
                                        <p>x</p>
                                    </div>
                                    <div>
                                        <p>x</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
            newsContainer.appendChild(newsDiv);
        })
    }
}
loadCategories()