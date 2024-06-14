const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/gemini-ai', async (req, res) => {
    const ask = req.query.ask;

    if (!ask) {
        return res.json({
            error: "Please provide a question"
        });
    }

    const query = (req.query.query || "ask").toLowerCase();
    const data = {
        "title": "Gemini AI - PinoyGPT",
        "description": (
            "Gemini AI is an AI-powered chat assistant developed by Google. "
            + "It can answer questions, complete tasks like summarizing articles or translating text, and engage in conversation. "
            + "Users should verify the information due to potential inaccuracies."
        ),
        "capabilities": [
            "Answering questions using Google Search",
            "Completing tasks (e.g., summarizing articles, translating text)",
            "Engaging in conversation"
        ],
        "limitations": [
            "Potential inaccuracies",
            "Lack of real-world interaction"
        ],
        "url": "https://www.pinoygpt.com/gemini-ai/"
    };

    let response;
    if (query === "ask") {
        response = data;
    } else if (data[query]) {
        response = { [query]: data[query] };
    } else {
        response = { "error": "Invalid query parameter" };
    }

    res.json(response);
});

const PORT = process.env.PORT || 8257;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
