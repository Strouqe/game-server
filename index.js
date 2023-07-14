"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebSocket = require("ws");
var http = require("http");
var characters = [
    {
        id: 1,
        name: "Morty",
        price: 100,
        income: 10,
        image: "https://res.cloudinary.com/demo/image/twitter/1330457336.jpg",
        fatigue: 0,
        characteristics: {
            intelect: 15,
            strength: 15,
            dexterity: 15,
        },
    },
    {
        id: 2,
        name: "Doc",
        price: 100,
        income: 10,
        image: "https://res.cloudinary.com/demo/image/twitter/1330457336.jpg",
        fatigue: 0,
        characteristics: {
            intelect: 15,
            strength: 15,
            dexterity: 15,
        },
    },
    {
        id: 3,
        name: "Owl Man",
        price: 100,
        income: 10,
        image: "https://res.cloudinary.com/demo/image/twitter/1330457336.jpg",
        fatigue: 0,
        characteristics: {
            intelect: 15,
            strength: 15,
            dexterity: 15,
        },
    },
    {
        id: 4,
        name: "Jery",
        price: 100,
        income: 10,
        image: "https://res.cloudinary.com/demo/image/twitter/1330457336.jpg",
        fatigue: 0,
        characteristics: {
            intelect: 15,
            strength: 15,
            dexterity: 15,
        },
    },
    {
        id: 5,
        name: "Mr MI6",
        price: 100,
        income: 10,
        image: "https://res.cloudinary.com/demo/image/twitter/1330457336.jpg",
        fatigue: 0,
        characteristics: {
            intelect: 15,
            strength: 15,
            dexterity: 15,
        },
    },
    {
        id: 6,
        name: "Beth",
        price: 100,
        income: 10,
        image: "https://res.cloudinary.com/demo/image/twitter/1330457336.jpg",
        fatigue: 0,
        characteristics: {
            intelect: 15,
            strength: 15,
            dexterity: 15,
        },
    },
];
var missions = [
    {
        name: "Dungeon Exploration",
        dificulty: 100,
        reward: 100,
        requirements: {
            intelect: 15,
            strength: 15,
            dexterity: 15,
        },
    },
    {
        name: "Dungeon Exploration",
        dificulty: 100,
        reward: 100,
        requirements: {
            intelect: 15,
            strength: 15,
            dexterity: 15,
        },
    },
    {
        name: "Ocean Diving",
        dificulty: 200,
        reward: 200,
        requirements: {
            intelect: 15,
            strength: 15,
            dexterity: 15,
        },
    },
    {
        name: "Ocean Diving",
        dificulty: 200,
        reward: 200,
        requirements: {
            intelect: 15,
            strength: 15,
            dexterity: 15,
        },
    },
    {
        name: "Space Adventure",
        dificulty: 300,
        reward: 300,
        requirements: {
            intelect: 15,
            strength: 15,
            dexterity: 15,
        },
    },
    {
        name: "Space Adventure",
        dificulty: 300,
        reward: 300,
        requirements: {
            intelect: 15,
            strength: 15,
            dexterity: 15,
        },
    },
];
var serverData = {
    missions: missions,
    characters: characters,
};
var PORT = 8080;
var server = http.createServer(function (req, res) {
    // console.log('Received request for ' + req);
});
var wss = new WebSocket.Server({ server: server });
wss.on("connection", function (ws) {
    ws.on("message", function (message) {
        // ws.send(JSON.stringify(`Hello, you sent -> ${message}`));
        console.log("received: %s", message);
        wss.clients.forEach(function (client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ message: "Hello, you sent -> ".concat(message) }));
            }
        });
    });
    ws.send(JSON.stringify({ serverData: serverData }));
});
// wss.on('message', (message: WebSocket.Data) => {
//   console.log('received: %s', message);
//   ws.send(`Hello, you sent -> ${message}`);
// });
server.listen(PORT, function () {
    console.log("Server started on port ".concat(PORT));
});
