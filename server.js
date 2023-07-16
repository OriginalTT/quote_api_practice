const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
})

app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);
    res.send({ quote: randomQuote });
})

app.get('/api/quotes', (req, res, next) => {
    const name = req.query.person;
    if (name) {
        const quoteList = quotes.filter((quote) => quote.person === name);
        res.send({ quotes: quoteList });
    } else {
        res.send({ quotes: quotes });
    }
})

app.post('/api/quotes', (req, res, next) => {
    const { quote, person } = req.query;
    if (quote && person) {
        const newQuote = {
            quote: quote,
            person: person,
        };
        quotes.push(newQuote);
        res.send({
            quote: newQuote,
        });
    } else {
        res.status(400).send('Invalid entry');
    }
})