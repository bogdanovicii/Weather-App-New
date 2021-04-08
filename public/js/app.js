const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                console.log(data.error)
                messageTwo.textContent = data.error
                messageOne.textContent = ''
            } else {
                console.log(data)
                const message = 'The forecast in ' + data.location + ' is ' + data.description + ' with ' + data.temperature + ' degrees Celsius'
                messageOne.textContent = message
            }
        })
    })
})