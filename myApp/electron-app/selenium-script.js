const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function scrapeWikipedia(personName) {
    let options = new chrome.Options();
    options.addArguments('--start-maximized');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--disable-gpu');
    
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
        
    try {
        await driver.get('https://en.wikipedia.org');
        await driver.findElement(By.name('search')).sendKeys(personName, Key.RETURN);
        await driver.wait(until.titleContains(personName), 5000);

        let result = {};

         
        let infoString = await driver.findElement(By.xpath("//table[contains(@class,'infobox')]//th[contains(text(),'Born')]/following-sibling::td")).getText();

        console.log(infoString);

        const infoLines = infoString.split('\n');

        // Extract the full name
        const fullName = infoLines[0].trim();
        result.fullName = fullName;

          // Extract the age and birth date
        const ageBirthDateLine = infoLines[1].trim();
        const ageAndBirthDateMatch = ageBirthDateLine.match(/(\w+ \d+, \d+) \(age (\d+)\)/);
        if (ageAndBirthDateMatch) {
            result.birthDate = ageAndBirthDateMatch[1];
            result.age = parseInt(ageAndBirthDateMatch[2]);
        }

          // Extract the birth place
        const birthPlace = infoLines[2].trim();
        result.birthPlace = birthPlace;
        

        let citizenShipElement = await driver.findElement(By.xpath(
            '/html[1]/body[1]/div[2]/div[1]/div[3]/main[1]/div[3]/div[3]/div[1]/table[1]/tbody[1]/tr[4]/td[1]/div[1]/ul[1]/li[1]'
        ))
        let citizenShip = await citizenShipElement.getText();
        result.citizenShip = citizenShip + "";

        return result;
    } finally {
        await driver.quit();
    }
}

if (require.main === module) {
    const [,, name, familyName] = process.argv;
    if (!name || !familyName) {
        console.error('Please provide both first name and last name as arguments.');
        process.exit(1);
    }
    const personName = `${name} ${familyName}`;
    scrapeWikipedia(personName).then(result => console.log(result)).catch(err => console.error(err));
}

module.exports = scrapeWikipedia;


