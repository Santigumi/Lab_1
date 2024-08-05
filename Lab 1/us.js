
const button = document.querySelector('.Show')

button.addEventListener('click', fetchData)

async function fetchData() {
  try {
    renderLoading()
    const response = await fetch("https://datausa.io/api/data?drilldowns=Nation&measures=Population")
    const data = await response.json()
    if(!response.ok) throw new Error("paila")
    renderData(data)
  } catch (error) {
    renderError()
  }}

  function renderData(data) {
    const container = document.querySelector(".Population");
    container.innerHTML = "";
    container.innerHTML = `The population of the United States is ${data.data[0].Population} people`
  }

  function renderLoading(){
    const container = document.querySelector(".Population");
    container.innerHTML = ""; 
    container.innerHTML = "<P>Loading...</P>"
  }
  
  function renderError(){
    const container = document.querySelector(".Population");
    container.innerHTML = ""; 
    container.innerHTML = "<P>Ops... try again</P>"
  }