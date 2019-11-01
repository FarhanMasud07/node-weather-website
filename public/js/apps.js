console.log('Called From JavaScript')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const messageOne = document.querySelector('#msg-1')
    const messageTwo = document.querySelector('#msg-2')

    //if(messageOne1)
    const Location = search.value
    // if (Location.length == 0){
    //    return  console.log('You must Submit a location')
    // }
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ' '

    fetch('http://localhost:3000/weather?address=' + Location).then((response) => {
        response.json().then((data) => {

            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageTwo.textContent = data.forecast
                messageOne.textContent = data.location
            }

        })
    })

    console.log(Location)
})