const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

const SECRET = "key";

// LOGIN API
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "123") {
        const token = jwt.sign({ user: username }, SECRET);
        res.json({ token });
    } else {
        res.send("Invalid");
    }
});

// PROTECTED API
app.get("/dashboard", (req, res) => {
    try {
        const data = jwt.verify(req.headers.authorization, SECRET);
        res.send("Welcome " + data.user);
    } catch {
        res.send("Unauthorized");
    }
});

app.listen(5000, () => console.log("Running"));