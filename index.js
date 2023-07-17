"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = __importStar(require("ws"));
const http = __importStar(require("http"));
const charecters_1 = require("./charecters");
const missions_1 = require("./missions");
// const characters = [
//   {
//     id: 1,
//     name: "Morty",
//     price: 100,
//     income: 10,
//     image: "https://res.cloudinary.com/demo/image/twitter/1330457336.jpg",
//     fatigue: 0,
//     characteristics: {
//       intelect: 15,
//       strength: 15,
//       dexterity: 15,
//     },
//   },
//   {
//     id: 2,
//     name: "Doc",
//     price: 100,
//     income: 10,
//     image: "https://res.cloudinary.com/demo/image/twitter/1330457336.jpg",
//     fatigue: 0,
//     characteristics: {
//       intelect: 15,
//       strength: 15,
//       dexterity: 15,
//     },
//   },
//   {
//     id: 3,
//     name: "Owl Man",
//     price: 100,
//     income: 10,
//     image: "https://res.cloudinary.com/demo/image/twitter/1330457336.jpg",
//     fatigue: 0,
//     characteristics: {
//       intelect: 15,
//       strength: 15,
//       dexterity: 15,
//     },
//   },
//   {
//     id: 4,
//     name: "Jery",
//     price: 100,
//     income: 10,
//     image: "https://res.cloudinary.com/demo/image/twitter/1330457336.jpg",
//     fatigue: 0,
//     characteristics: {
//       intelect: 15,
//       strength: 15,
//       dexterity: 15,
//     },
//   },
//   {
//     id: 5,
//     name: "Mr MI6",
//     price: 100,
//     income: 10,
//     image: "https://res.cloudinary.com/demo/image/twitter/1330457336.jpg",
//     fatigue: 0,
//     characteristics: {
//       intelect: 15,
//       strength: 15,
//       dexterity: 15,
//     },
//   },
//   {
//     id: 6,
//     name: "Beth",
//     price: 100,
//     income: 10,
//     image: "https://res.cloudinary.com/demo/image/twitter/1330457336.jpg",
//     fatigue: 0,
//     characteristics: {
//       intelect: 15,
//       strength: 15,
//       dexterity: 15,
//     },
//   },
// ];
let characters = (0, charecters_1.createCharacters)();
// const missions = [
//   {
//     name: "Dungeon Exploration",
//     dificulty: 100,
//     reward: 100,
//     requirements: {
//       intelect: 15,
//       strength: 15,
//       dexterity: 15,
//     },
//   },
//   {
//     name: "Dungeon Exploration",
//     dificulty: 100,
//     reward: 100,
//     requirements: {
//       intelect: 15,
//       strength: 15,
//       dexterity: 15,
//     },
//   },
//   {
//     name: "Ocean Diving",
//     dificulty: 200,
//     reward: 200,
//     requirements: {
//       intelect: 15,
//       strength: 15,
//       dexterity: 15,
//     },
//   },
//   {
//     name: "Ocean Diving",
//     dificulty: 200,
//     reward: 200,
//     requirements: {
//       intelect: 15,
//       strength: 15,
//       dexterity: 15,
//     },
//   },
//   {
//     name: "Space Adventure",
//     dificulty: 300,
//     reward: 300,
//     requirements: {
//       intelect: 15,
//       strength: 15,
//       dexterity: 15,
//     },
//   },
//   {
//     name: "Space Adventure",
//     dificulty: 300,
//     reward: 300,
//     requirements: {
//       intelect: 15,
//       strength: 15,
//       dexterity: 15,
//     },
//   },
// ];
let missions = (0, missions_1.createMissions)();
let serverData = {
    missions,
    characters,
};
const PORT = 8080;
const server = http.createServer((req, res) => {
    // console.log('Received request for ' + req);
});
const wss = new WebSocket.Server({ server });
wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        // ws.send(JSON.stringify(`Hello, you sent -> ${message}`));
        console.log("received: %s", message);
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ message: `Hello, you sent -> ${message}` }));
            }
        });
    });
    ws.send(JSON.stringify({ serverData }));
    setInterval(() => {
        characters = (0, charecters_1.createCharacters)();
        serverData = {
            missions,
            characters,
        };
        ws.send(JSON.stringify({ serverData }));
    }, 10000);
});
// wss.on('message', (message: WebSocket.Data) => {
//   console.log('received: %s', message);
//   ws.send(`Hello, you sent -> ${message}`);
// });
function generateData() {
    let serverData = {
        missions: (0, missions_1.createMissions)(),
        charecters: (0, charecters_1.createCharacters)(),
    };
    // console.log(serverData)
    return { serverData };
}
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
