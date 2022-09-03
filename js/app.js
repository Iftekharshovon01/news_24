const loadCatagory = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const datalist = await res.json();
    
    
    const {data} = datalist;
    const {news_category} = data;
    displayCatagory(news_category);
}

const displayCatagory = catagorys => {
    
    const news_catagory = document.getElementById('catagory_news')

    catagorys.forEach(news => {
        const catUl = document.createElement('li');
        catUl.classList.add('nav-item');
        catUl.innerHTML= `<a class="nav-link" onclick="loadnews('${news.category_id}');" aria-current="page" href="#">${news.category_name}</a>`
        news_catagory.appendChild(catUl);
    });

}



const loadnews = async(id) =>{
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const datalist = await res.json();
    const {data} = datalist;
    displayNews(data);
}

const displayNews = catagorys => {
 const items =  catagorys.length;



    const news_category = document.getElementById('news_card');
    news_category.textContent ="";
    catagorys.forEach(news => {

const {thumbnail_url, title, details, author,total_view, rating,image_url,_id} = news;
        
        const catUl = document.createElement('div');
        catUl.classList.add('card');
        catUl.innerHTML= `
        <div class="row g-0">
          <div class="col-md-3">
            <img class="w-100 px-2 py-2" style src="${thumbnail_url}" alt="...">
          </div>
          <div class="col-md-9">
            <div class="card-body px-5">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${details.length > 300 ? details.slice(0,300) + '...' : details}</p>
  
              <ul class="navbar-nav d-flex flex-row justify-content-between mt-5">
              <li class="nav-item">                            
                <a class="navbar-brand" href="#">
                  <img src="${author.img}" alt="" width="30" height="24" class="d-inline-block align-text-top">
                  ${author.name}
                </a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="#"><i class="fa-regular fa-eye"></i>${total_view}</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="#"><i class="fa-regular fa-star-half-stroke"></i><i class="fa-regular fa-star"></i>${rating.number}</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" onclick="showDetailNews('${_id}')" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></a>
              </li>
          </ul>
            </div>
          </div>
        </div>`

        
        news_category.appendChild(catUl);
    });

}


// const displayitems = items =>{
//     console.log(items);

//     // const news_list= document.getElementById('item_list');
//     // news_list.textContent = '';

//     // items.forEach(item =>{

//     //     const news_item = document.createElement('p');

//     //     console.log(item);
//     //     news_item.innerHTML=`
//     //     <p>${item.length} item found for catagory</p>
//     //     `
//     //     news_list.appendChild(news_item);
//     // })

// }



const showDetailNews = async(id) =>{
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displaydetailsNews(data.data[0]);

    
}


const displaydetailsNews = detail =>{
  const detaildata =  document.getElementById('modal-body');

  const detailnews = document.createElement('div');
  detailnews.classList.add('card');
  detailnews.innerHTML= `
  <img src="${detail.image_url}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${detail.title}</h5>
    <p class="card-text">${detail.details}</p>
    <a href="#" class="btn btn-primary">${detail.author.name}</a>
  </div>
`
console.log(detailnews);
detaildata.appendChild(detailnews);
} 

loadnews();


loadCatagory();