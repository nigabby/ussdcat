const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/ussd', (req, res) => {
    const { sessionId, serviceCode, phoneNumber, text } = req.body;

    let response = '';

    // Split input and handle back command '0'
    let textArray = text.split('*');
    let lastText = textArray[textArray.length - 1];

    // Handle back command '0'
    if (lastText === '0') {
        textArray.pop(); // remove '0'
        textArray.pop(); // go back one level
        lastText = textArray[textArray.length - 1] || '';
    }

    const updatedText = textArray.join('*');

    if (updatedText === '') {
        response = `CON Welcome to favourite food app, please choose language.
1. English
2. Kinyarwanda`;
    }

    else if (updatedText === '1') {
        response = `CON Select the dish you like most:
1. Chips and Chicken
2. Beef and Green Plantain
3. Rice and Beans
4. Cassava Bread and Greens
0. Back`;
    }

    else if (updatedText === '2') {
        response = `CON Hitamo ifunguro ukunda cyane:
1. Ifiriti n'inkoko
2. Agatogo
3. Umuceri n'ibishyimbo
4. Ubugari n'isombe
0. Gusubira inyuma`;
    }

    else if (updatedText.startsWith('1*')) {
        const choice = textArray[1];
        if (choice === '1') {
            response = 'END Your favourite food is Chips and Chicken. This is so unhealthy, do not eat it regularly.';
        } else if (choice === '2') {
            response = 'END Your favourite food is Beef and Green Plantain. This is healthy, as long as you eat it less than 5 times a week.';
        } else if (choice === '3') {
            response = 'END Your favourite food is Rice and Beans. This is healthy, especially if you drink water and eat greens.';
        } else if (choice === '4') {
            response = 'END Your favourite food is Cassava Bread and Greens. This is healthy, but check that there is not too much oil in the greens.';
        } else if (choice === '0') {
            response = `CON Select the dish you like most:
1. Chips and Chicken
2. Beef and Green Plantain
3. Rice and Beans
4. Cassava Bread and Greens
0. Back`;
        } else {
            response = 'END Invalid dish selection.';
        }
    }

    else if (updatedText.startsWith('2*')) {
        const choice = textArray[1];
        if (choice === '1') {
            response = "END Ifunguro ukunda cyane ni Ifiriti n'inkoko. Ntabwo ari byiza kubuzima, ntukabirye kenshi.";
        } else if (choice === '2') {
            response = 'END Ifunguro ukunda cyane ni Agatogo. Ni byiza, ariko ntukabirye kenshi.';
        } else if (choice === '3') {
            response = "END Ifunguro ukunda cyane ni Umuceri n'ibishyimbo. Ni byiza, unywe amazi kandi urye imboga.";
        } else if (choice === '4') {
            response = "END Ifunguro ukunda cyane ni Ubugari n'isombe. Ni byiza, ariko reba ko nta mavuta menshi ari mu mboga.";
        } else if (choice === '0') {
            response = `CON Hitamo ifunguro ukunda cyane:
1. Ifiriti n'inkoko
2. Agatogo
3. Umuceri n'ibishyimbo
4. Ubugari n'isombe
0. Gusubira inyuma`;
        } else {
            response = 'END Hitamo ifunguro rikwiriye.';
        }
    }

    else {
        response = 'END Invalid input.';
    }

    res.set('Content-Type', 'text/plain');
    res.send(response);n
});

app.listen(PORT, () => {
    console.log(`✅ USSD app running on port ${PORT}`);
});
