const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/ussd', (req, res) => {
    const { sessionId, serviceCode, phoneNumber, text } = req.body;

    let response = '';

    // Split text input by * to detect current menu path
    let textArray = text.trim().split('*').filter(x => x !== '');

    // Handle '0' to go back one step
    if (textArray[textArray.length - 1] === '0') {
        textArray = textArray.slice(0, -2); // remove '0' and previous entry
    }

    const level = textArray.length;
    const language = textArray[0]; // 1 = English, 2 = Kinyarwanda
    const choice = textArray[1];

    // Menu Level 0: Language selection
    if (level === 0) {
        response = `CON Welcome to favourite food app, please choose language:
1. English
2. Kinyarwanda`;
    }

    // Menu Level 1: Food menu based on language
    else if (level === 1) {
        if (language === '1') {
            response = `CON Select the dish you like most:
1. Chips and Chicken
2. Beef and Green Plantain
3. Rice and Beans
4. Cassava Bread and Greens
0. Back`;
        } else if (language === '2') {
            response = `CON Hitamo ifunguro ukunda cyane:
1. Ifiriti n'inkoko
2. Agatogo
3. Umuceri n'ibishyimbo
4. Ubugari n'isombe
0. Gusubira inyuma`;
        } else {
            response = 'END Invalid language selection.';
        }
    }

    // Menu Level 2: Food feedback based on choice and language
    else if (level === 2) {
        if (language === '1') {
            switch (choice) {
                case '1':
                    response = 'END Your favourite food is Chips and Chicken. This is so unhealthy, do not eat it regularly.';
                    break;
                case '2':
                    response = 'END Your favourite food is Beef and Green Plantain. This is healthy, as long as you eat it less than 5 times a week.';
                    break;
                case '3':
                    response = 'END Your favourite food is Rice and Beans. This is healthy, especially if you drink water and eat greens.';
                    break;
                case '4':
                    response = 'END Your favourite food is Cassava Bread and Greens. This is healthy, but check that there is not too much oil in the greens.';
                    break;
                default:
                    response = `CON Select the dish you like most:
1. Chips and Chicken
2. Beef and Green Plantain
3. Rice and Beans
4. Cassava Bread and Greens
0. Back`;
            }
        } else if (language === '2') {
            switch (choice) {
                case '1':
                    response = "END Ifunguro ukunda cyane ni Ifiriti n'inkoko. Ntabwo ari byiza kubuzima, ntukabirye kenshi.";
                    break;
                case '2':
                    response = 'END Ifunguro ukunda cyane ni Agatogo. Ni byiza, ariko ntukabirye kenshi.';
                    break;
                case '3':
                    response = "END Ifunguro ukunda cyane ni Umuceri n'ibishyimbo. Ni byiza, unywe amazi kandi urye imboga.";
                    break;
                case '4':
                    response = "END Ifunguro ukunda cyane ni Ubugari n'isombe. Ni byiza, ariko reba ko nta mavuta menshi ari mu mboga.";
                    break;
                default:
                    response = `CON Hitamo ifunguro ukunda cyane:
1. Ifiriti n'inkoko
2. Agatogo
3. Umuceri n'ibishyimbo
4. Ubugari n'isombe
0. Gusubira inyuma`;
            }
        } else {
            response = 'END Invalid language selection.';
        }
    }

    // Any unexpected case
    else {
        response = 'END Invalid input.';
    }

    res.set('Content-Type', 'text/plain');
    res.send(response);
});

app.listen(PORT, () => {
    console.log(`✅ USSD app running on port ${PORT}`);
});
