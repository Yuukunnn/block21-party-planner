
// https://fsa-crud-2aa9294fe819.herokuapp.com/api/2402-ftb-mt-web-pt/events


// Get the most updated parties from API and render
const getApiParties = () => {
    axios.get('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2402-ftb-mt-web-pt/events')
        .then((response) => {
            if (response.data.data.length > 0) {
               renderParties(response.data.data);
            }
        })
        .catch((error) => console.log('Error: ', error));
};

//Render all parties in API:
const renderParties = (partiesArr) => {


    const partyContainer = document.getElementById('parties_container');
    partyContainer.innerHTML = '';

    partiesArr.forEach((party) => {
        const partyUl = document.createElement('ul');

        const name = document.createElement('li');
        name.textContent = party.name;
        const date = document.createElement('li');
        date.textContent = party.date;
        const description = document.createElement('li');
        description.textContent = party.description;
        const location = document.createElement('li');
        location.textContent = party.location;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener('click',(e) => deleteButtonFunction(e, party.id));

        partyUl.appendChild(name);
        partyUl.appendChild(date);
        partyUl.appendChild(description);
        partyUl.appendChild(location);
        partyUl.appendChild(deleteButton);

   
        partyContainer.appendChild(partyUl);

    })
};

getApiParties();

//"Submit button" functionality:
const submitButton = document.getElementById('submitButton');
submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const name = document.getElementById('name');
    const nameValue = name.value;
    const date = document.getElementById('date');
    const dateValue = date.value;
    const location = document.getElementById('location');
    const locationValue = location.value;
    const description = document.getElementById('description');
    const descriptionValue = description.value;
    const formattedDate = new Date(dateValue); 
    
    const partyObj = {
        name: nameValue,
        date: formattedDate,
        location: locationValue,
        description: descriptionValue
    }; 
    console.log('partyObj: ', partyObj);


//API POST request to add a new party info
    axios.post('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2402-ftb-mt-web-pt/events', 
    JSON.stringify(partyObj), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(() => {
            getApiParties();
            document.getElementById('add_new_parties_form').reset();
    })
        .catch((error) => console.log('Error: ', error));
});


//"Delete button" functionality:

    const deleteButtonFunction = (e, partyID) => {
        console.log(partyID);
        e.preventDefault();

        axios.delete(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2402-ftb-mt-web-pt/events/${partyID}`,
        {headers:{
            'Content-Type': 'application/json'
        }})
        .then(() => {
            getApiParties();
        })
        .catch((error) => console.log('Error: ', error))
    };    
