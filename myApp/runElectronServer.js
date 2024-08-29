const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;

app.get('/open-electron-app', (req, res) => {
    // Path to your Electron project's main file
    const electronAppPath = 'electron-app';
   
    exec(`cd ${electronAppPath} && npm start`, (err, stdout, stderr) => {
        if (err) {
            console.error(`Error opening Electron app: ${err}`);
            return res.status(500).send('Error opening Electron app');
        }
        console.log(`Electron app opened: ${stdout}`);
        res.send('Electron app opened successfully');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
