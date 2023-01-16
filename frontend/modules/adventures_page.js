
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
const city = search.split("=")
return city[1]

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
let location = `${config.adventure}?city=${city}`
try {
  let adventures = await fetch(location).then(response=>response.json())
  return adventures
}catch(err){
  return null
}

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

    const row = document.getElementById("data")
    adventures.forEach(data=>{
      const column = document.createElement("div")
      column.classList.add("col-lg-3","col-6","mb-3")
      column.innerHTML = `<a id = "${data.id}"href = "detail/?adventure=${data.id}" > 
      <div class="category-banner"><p>${data.category}</p></div>
      <div class="activity-card">
      <img src="${data.image}" alt="">
     <div class = "content-body ">
     <div class ="first-row"><h3> ${data.name} </h3> <p> ₹${data.costPerHead} </p> </div>
     <div class = "second-row"> <h3> Duration </h3> <p>  ${data.duration} Hours </div>
     </div> 
    </div> </a>`

    row.appendChild(column)
    })

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  low = Number(low)
  high = Number(high)
  if (high =="+" || high=="99"){
    high = 24
    low = 1
  }
list = list.filter((item)=>{
  if (item.duration >= low && item.duration <=high){
    return true
  }
})
  return list

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

  list = list.filter((item)=>{
    for (let category of categoryList){
      if (category == item.category){
        return true
      }
    }
  })
  return list

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
 if (filters.category.length > 0){
  list = filterByCategory(list,filters.category)
}
 if (filters.duration.length > 0){
  let minMax = filters.duration.split("-")
  list = filterByDuration(list,minMax[0],minMax[1])
}

  // Place holder for functionality to work in the Stubs
return list
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters',JSON.stringify(filters))

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
 
return JSON.parse(localStorage.getItem("filters"))

  // Place holder for functionality to work in the Stubs

}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
let categoryList = document.getElementById("category-list")
  for (let category of filters.category){
      let categoryName = document.createElement("p")
      categoryName.className = "category-filter"
      categoryName.textContent = category
      categoryList.append(categoryName)
  }
  
}


export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
