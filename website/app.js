// API information
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=07f1ecb7dd1e3e5c65c48f7a55ab6b2a&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth()+1}.${d.getDate()}.${d.getFullYear()}`;


// Event Listener with callBack
const btn =document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
  const zipCode = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value; 
  console.log(`${baseUrl}${zipCode}${apiKey}`);
  retrieveData(baseUrl, zipCode, apiKey)
  .then(function(data){
    // Add data to POST request
    postData('/addNewEntry', {date: newDate, temp: data.main.temp, content})
  })
  .then(()=>updateUI())
}
// Async GET Request
const retrieveData = async (base, zip, key)=>{ 
  const request  = await fetch(base+zip+key);
  try {
    // Transform into JSON
    const AllThedata = await request.json();
    return AllThedata;
  }
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

// Async POST Request
const postData = async ( url = '', data = {})=>{
  console.log(data);
  const resp = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },        
    body: JSON.stringify({
      date: data.date, // project specific 
      temp: data.temp, // project specific 
      content: data.content // project specific 
    })
  });
    try {
      // Transform into JSON
      const newData = await resp.json();
      return newData;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
}

// UPDATE UI
const updateUI = async () =>{
  const request = await fetch('/all');
  try {
  // Transform into JSON
  const allData = await request.json()
  console.log(allData)
  // Write updated data to DOM elements
  document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' degrees';
  document.getElementById('content').innerHTML = allData.content;
  document.getElementById("date").innerHTML =allData.date;
  }
  catch(error) {
    console.log("Error", error);
    // appropriately handle the error
  }
 }
