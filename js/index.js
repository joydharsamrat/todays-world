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
                            <div class="card-body d-flex flex-column gap-5">
                                <div>
                                    <h5 class="card-title">${news.title}</h5>
                                    <p class="card-text">${news.details.slice(0, 200)}... </p>
                                </div>
                                <div class="d-flex justify-content-between align-items-center mt-5">
                                    <div  class="d-flex w-25 justify-content-around align-items-center">
                                        <div class="d-flex justify-content-start"><img class="author-img" src="${news.author.img}" alt=""></div>
                                        <div class="d-flex  justify-content-end">
                                            <p>${news.author.name}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p> 👁‍🗨 ${news.total_view ? news.total_view : 'No Data Found'}</p>
                                    </div>
                                    <div class="d-none d-xl-block">
                                        <p>★★★★☆ ${news.rating.number}</p>
                                    </div>
                                    <div>
                                    <a onclick="loadDetails('${news._id}')" class="text-decoration-none fs-2" href="" data-bs-toggle="modal" data-bs-target="#newsDetails">➙</a>
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

const loadDetails = id => {
    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
        .then(res => res.json())
        .then(data => displayDetails(data.data[0]))
        .catch(error => console.log(error))
}

const displayDetails = news => {
    const imgContainer = document.getElementById('details-img');
    imgContainer.src = `${news.image_url}`
}

loadCategories()
loadNews(08)