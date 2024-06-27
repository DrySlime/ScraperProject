const express = require("express");
const path = require("path");
const app = express();
const weblinkScraper = require('./js/weblinkScraper');

app.use(express.json());

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
});

// Serve the results page
app.get('/results', (req, res) => {
    res.sendFile(path.join(__dirname + "/results.html"));
});

// Handle the data from the client to perform web scraping
app.post("/info", async (req, res) => {
    const { parcel } = req.body;

    if (!parcel) {
        return res.status(400).send({ status: "fail: empty parcel body" });
    }

    try {
        const results = await weblinkScraper(parcel);

        // Store the results in a session or a temporary store
        // For simplicity, we'll pass the results as a query parameter (not recommended for large data)
        res.redirect(`/results?data=${encodeURIComponent(JSON.stringify(results))}`);
    } catch (error) {
        console.error('Error during web scraping:', error);
        res.status(500).send({ status: "fail", error: error.message });
    }
});
