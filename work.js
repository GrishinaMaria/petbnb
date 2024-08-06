const jwt = require("jsonwebtoken");

const verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const upgradeCb = (req, socket, head) => {
    cookieParser()(req, {}, () => {
        const token = req.cookies["jwt"];

        if (!token) {
            socket.destroy();
            return;
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                socket.destroy();
                return;
            }

            req.user = user;
            wss.handleUpgrade(req, socket, head, (ws) => {
                wss.emit("connection", ws, req);
            });
        });
    });
};
