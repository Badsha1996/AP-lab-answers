const express = require("express");
const app = express();

app.use(express.json());

const watchlist = [
    { id: 0, title: "Inception", year: 2010 },
    { id: 1, title: "The Matrix", year: 1999 }
];

const PREMIUM_KEY = "gold-member-2026";

function verifyPremiumMember(req, res, next) {
    const key = req.headers["x-premium-key"];

    if (!key || key !== PREMIUM_KEY) {
        return res.status(401).json({
            error: "Unauthorized: Invalid or missing premium key"
        });
    }

    next();
}

function validateMovie(req, res, next) {
    const { title, year } = req.body;

    if (
        title === undefined ||
        typeof title !== "string" ||
        title.trim() === ""
    ) {
        return res.status(400).json({
            error: "Invalid title"
        });
    }

    if (
        year === undefined ||
        typeof year !== "number" ||
        !Number.isInteger(year) ||
        year < 1888 ||
        year > 2100
    ) {
        return res.status(400).json({
            error: "Invalid year"
        });
    }

    next();
}

app.get("/movies", (req, res) => {
    res.status(200).json(watchlist);
});

// Middleware chain
app.post(
    "/movies",
    verifyPremiumMember,
    validateMovie,
    (req, res) => {
        const movie = {
            id: watchlist.length,
            title: req.body.title.trim(),
            year: req.body.year
        };

        watchlist.push(movie);

        res.status(201).json(movie);
    }
);

if (require.main === module) {
    app.listen(3000);
}

module.exports = app;