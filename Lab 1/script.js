let dataLimit = ''
let dataName = ''
let dataType = ''

const container = document.querySelector(".Search")

const description = document.createElement('h3')
description.innerHTML = 'Search your favorites animes'
container.appendChild(description)

const form = document.createElement("form")
container.appendChild(form)

const label_limit = document.createElement("label")
label_limit.for = "Limit"
label_limit.innerHTML = "Limit"
form.appendChild(label_limit)

const limit = document.createElement("input")
limit.id = "limit"
limit.type = "number"
limit.min = "0"
form.appendChild(limit)

limit.addEventListener('input', addLimit)

const label_Name = document.createElement("label")
label_Name.for = "Name"
label_Name.innerHTML = "Name"
form.appendChild(label_Name)

const Name = document.createElement("input")
Name.id = "Name"
Name.type = "text"
form.appendChild(Name)

Name.addEventListener('input', addName)

const label_type = document.createElement("label")
label_type.for = "type"
label_type.innerHTML = "Type"
form.appendChild(label_type)

const type = document.createElement("select")
type.id = "type"
form.appendChild(type)

type.addEventListener('input', addType)

const tv = document.createElement("option")
tv.innerHTML = "tv"
type.appendChild(tv)

const movie = document.createElement("option")
movie.innerHTML = "movie"
type.appendChild(movie)

const ova = document.createElement("option")
ova.innerHTML = "ova"
type.appendChild(ova)

const special = document.createElement("option")
special.innerHTML = "special"
type.appendChild(special)

const ona = document.createElement("option")
ona.innerHTML = "ona"
type.appendChild(ona)

const music = document.createElement("option")
music.innerHTML = "music"
type.appendChild(music)

const cm = document.createElement("option")
cm.innerHTML = "cm"
type.appendChild(cm)

const pv = document.createElement("option")
pv.innerHTML = "pv"
type.appendChild(pv)

const tv_special = document.createElement("option")
tv_special.innerHTML = "tv_special"
type.appendChild(tv_special)

const search = document.createElement("button")
search.innerHTML = "Search"
container.appendChild(search)
search.addEventListener("click", async () => {
  try {
    await fetchData(dataLimit, dataName, dataType)
  } catch (error) {
    console.error("Error fecthing data", error)
  }
});

const clear = document.createElement("button")
clear.id = "clear"
clear.innerText = "Clear"
clear.addEventListener("click", clearData)
container.appendChild(clear)

async function fetchData(dataLimit, dataName, dataType) {
  try {
    renderLoading()
    const response = await fetch(`https://api.jikan.moe/v4/anime?limit=${dataLimit}&q=${dataName}&type=${dataType}`)
    console.log(response)
    if(!response.ok) throw new Error("paila")
    const data = await response.json()

      const animeData = data.data.map(anime => ({
        titles: anime.titles.map(title => title.title),
        imageUrl: anime.images?.jpg?.image_url || "URL de imagen no disponible"
      }));

    console.log(animeData);
     renderData(animeData);
  } catch (error) {
    renderError()
    console.error("Error fecthing data", error)
  }}

  function renderData(data) {
    const container = document.querySelector(".Animes");
    container.innerHTML = "";
  
    data.forEach(anime => {
      const titles = anime.titles && Array.isArray(anime.titles) 
      ? anime.titles.join(", ")
      : "Titulo no disponible";

      const imageUrl = anime.imageUrl || "Url de imagen no disponible"

      const div = document.createElement("div");
  
      const img = document.createElement('img')
      img.src = imageUrl
      div.appendChild(img);

      const titleElement = document.createElement('p');
      titleElement.innerText = titles;
      div.appendChild(titleElement);
      container.appendChild(div);
    });
  }
  

  function addLimit(e){
    dataLimit = e.target.value
  }
  
  function addName(e){
    dataName = e.target.value
  }

  function addType(e){
    dataType = e.target.value
  }


  function renderLoading(){
    const container = document.querySelector(".Animes");
    container.innerHTML = ""; 
    container.innerHTML = "<P>Loading...</P>"
  }
  
  function renderError(){
    const container = document.querySelector(".Animes");
    container.innerHTML = ""; 
    container.innerHTML = "<P>Ops... try again</P>"
  }
  
  function clearData(){
    const container = document.querySelector(".Animes");
    container.innerHTML = ""; 
  }