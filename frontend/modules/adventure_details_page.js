import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let id = search.split("=")


  // Place holder for functionality to work in the Stubs
  return id[1];
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  let location = `${config.detail}?adventure=${adventureId}`
  try{
let adDetail = await fetch(location).then(response=>response.json())
console.log(adDetail)
return adDetail
}catch(err){
  return null
}

  // Place holder for functionality to work in the Stubs

}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let name = document.getElementById('adventure-name')
  let subTitle = document.getElementById('adventure-subtitle')
  let content = document.getElementById('adventure-content')
  let gallery = document.getElementById("photo-gallery")

  name.textContent = adventure.name
  subTitle.textContent = adventure.subtitle
  content.textContent = adventure.content

  adventure.images.forEach(image=>{
    const imageDiv = document.createElement("div")
    imageDiv.className = "carousel-item"
    imageDiv.innerHTML = `<img src="${image}" class="activity-card-image">`
    gallery.appendChild(imageDiv)
  })
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let gallery = document.getElementById("photo-gallery")
 gallery.innerHTML = ""
 let carousel = document.createElement("div")
 gallery.append(carousel)
 carousel.classList.add("carousel")
 carousel.classList.add("slide")
 carousel.setAttribute("data-bs-ride","carousel")

 let cInner = document.createElement("div")
 cInner.className = "carousel-inner"
 carousel.append(cInner)

 images.forEach(image=>{
  const imageDiv = document.createElement("div")
  imageDiv.className = "carousel-item"
  imageDiv.innerHTML = `<img src="${image}" class="activity-card-image">`
  cInner.appendChild(imageDiv)
})

let cItems= document.getElementsByClassName("carousel-item")
for (let cItem in cItems){
  if (cItem==0){
    cItems[cItem].classList.add("active")
  }
}

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
if (adventure.available){
document.getElementById("reservation-panel-available").style.display = "block"
document.getElementById("reservation-panel-sold-out").style.display = "none"
document.getElementById("reservation-person-cost").textContent = adventure.costPerHead
}else{
  document.getElementById("reservation-panel-available").style.display = "none"
  document.getElementById("reservation-panel-sold-out").style.display = "block" 
}
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
document.getElementById("reservation-cost").textContent = adventure.costPerHead * persons
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
// const form = document.getElementById("myForm")
// let sbmt = document.getElementsByClassName("reserve-button")[0]

// sbmt.addEventListener("click",(event)=>{
//   event.preventDefault()
//   const location = config.backendEndpoint + "/reservations/new"
// try{
//   fetch(location,{
//     method:"POST",
//     body: JSON.stringify({
//       name: form.name.value,
//       date: form.date.value,
//       person: form.person.value,
//       adventure:adventure.id
//     }),
//     headers: new Headers({"Content-type": "application/json; charset=UTF-8"})
//    }).then(res=>{
//     if(res.ok){
//       alert("Success!")
      
//     }else{
//       alert("Failed!")
//     }
   
//    })
// }catch(err){
// console.log(err)
// }
// })

const form = document.getElementById("myForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    let url = config.backendEndpoint + "/reservations/new";

    let formElements = form.elements;

    let bodyString = JSON.stringify({
      name: formElements["name"].value,
      date: formElements["date"].value,
      person: formElements["person"].value,
      adventure: adventure.id,
    });

    try {
      let res = await fetch(url, {
        method: "POST",
        body: bodyString,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        alert("Success!");
        window.location.reload();
      } else {
        let data = await res.json();
        alert(`Failed - ${data.message}`);
      }
    } catch (err) {
      console.log(err);
      alert("Failed - fetch call resulted in error");
    }
  });

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
if (adventure.reserved){
document.getElementById("reserved-banner").style.display = "block"
}else{
  document.getElementById("reserved-banner").style.display = "none"
}
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
