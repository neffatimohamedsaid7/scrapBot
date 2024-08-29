const { ipcRenderer } = require('electron')

document.getElementById('personForm').addEventListener('submit', (e) => {
    e.preventDefault()
    
    const formData = {
        name: document.getElementById('name').value,
        familyName: document.getElementById('familyName').value
    }
    console.log (formData)
    ipcRenderer.send('run-selenium', formData)
})

ipcRenderer.on('selenium-result', (event, result) => {
    document.getElementById('result').innerHTML = `
        <h2>Wikipedia Scrape Result:</h2>
        <pre>${JSON.stringify(result, null, 2)}</pre>
    `
})