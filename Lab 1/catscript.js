const text = document.querySelector('.fact')
const button = document.querySelector('.know')

button.addEventListener('click', fetchData)

async function fetchData() {
  try {
    renderLoading()
    const response = await fetch("https://catfact.ninja/fact")
    const data = await response.json()
    if(!response.ok) throw new Error("paila")
    renderData(data)
  } catch (error) {
    renderError()
  }}

  function renderData(data) {
    const container = document.querySelector(".fact");
    container.innerHTML = "";
  
    const p = document.createElement("p");
    p.className = "item";
    p.innerHTML = `${data.fact}`;
    container.appendChild(p);
  }

  function renderLoading(){
    const container = document.querySelector(".fact");
    container.innerHTML = ""; 
    container.innerHTML = "<P>Loading...</P>"
  }
  
  function renderError(){
    const container = document.querySelector(".fact");
    container.innerHTML = ""; 
    container.innerHTML = "<P>Ops... try again</P>"
  }