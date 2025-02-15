"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var grammy_1 = require("grammy");
var dotenv = require("dotenv");
var fs = require("node:fs/promises");
dotenv.config();
var bot = new grammy_1.Bot(process.env.BOT_API_KEY);
bot.api.setMyCommands([
    {
        command: "subscribe",
        description: "subscribe to newest skibidi toilet videos",
    },
    {
        command: "unsubscribe",
        description: "unsubscribe",
    },
    {
        command: "only_for_subs",
        description: "only_for_subs",
    },
    {
        command: "menu",
        description: "open_menu",
    },
]);
bot.command("start", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ctx.reply("Dop dop")];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
bot.command("menu", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var menuKeyboard;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                menuKeyboard = new grammy_1.Keyboard().text("Ok").text("Med").text("bad");
                return [4 /*yield*/, ctx.reply("Skibidi?", {
                        reply_markup: menuKeyboard,
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
bot.hears("123", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.reply("\u0422\u0435\u0441\u0442: <span class=\"tg-spoiler\">\u0421\u043A\u0438\u0431\u0438\u0434\u0438</span>", {
            parse_mode: "HTML",
        });
        return [2 /*return*/];
    });
}); });
bot.on(":photo").on("::url", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.reply("photo and url");
        return [2 /*return*/];
    });
}); });
bot.command("only_for_subs").filter(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var subscribers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, readSubscribers("./subscribersDatabase.json")];
            case 1:
                subscribers = _a.sent();
                return [2 /*return*/, subscribers.includes(ctx.chatId.toString())];
        }
    });
}); }, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ctx.reply("вы подписаны")];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
bot.command("skibidi", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            // вообще по идее обратные кавычки позволяют
            // писать в несколько строк, а также они
            // должны удалять пробелы, и символы
            // табуляции, однако они этого не делали,
            // поэтому прилепил к краю строки
            return [4 /*yield*/, fetch("\nhttps://\nwww\n.googleapis\n.com\n/youtube\n/v3\n/search\n?part=snippet\n&channelId=".concat(process.env.DA_FUQ_BOOM_CHANNEL_ID, "\n&order=date\n&maxResults=1\n&key=").concat(process.env.YOUTUBE_DATA_API_V3_KEY, "\n"))
                    .then(function (response) { return response.json(); })
                    .then(function (dataFromServer) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, ctx.reply("https://www.youtube.com/watch?v=".concat(dataFromServer.items[0].id.videoId))];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); })];
            case 1:
                // вообще по идее обратные кавычки позволяют
                // писать в несколько строк, а также они
                // должны удалять пробелы, и символы
                // табуляции, однако они этого не делали,
                // поэтому прилепил к краю строки
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
function readSubscribers(path) {
    return __awaiter(this, void 0, void 0, function () {
        var currentSubscribersString, currentSubscribers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readFile(path)];
                case 1:
                    currentSubscribersString = _a.sent();
                    if (currentSubscribersString.length) {
                        currentSubscribers = JSON.parse(currentSubscribersString);
                    }
                    else {
                        currentSubscribers = [];
                    }
                    // console.log(currentSubscribers);
                    return [2 /*return*/, currentSubscribers];
            }
        });
    });
}
function readFile(path) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs.readFile(path)];
                case 1: return [2 /*return*/, (_a.sent()).toString()];
            }
        });
    });
}
function writeFile(newData, path) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs.writeFile(path, JSON.stringify(newData), {
                        encoding: "utf-8",
                        flag: "w",
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// может быть вот это вот всё имеет смысл для оптимизации,
// чтобы при каждом запросе к боту не читать заново файл, но
// с другой стороны может быть это и бессмысленно
// async function onLoadSubscribersRead() {
//     // const currentlySavedSubscribers: string[] = await readSubscribers();
//     // subscribers = new Set<string>(currentlySavedSubscribers);
//     subscribers = new Set<string>(await readSubscribers());
// }
// let subscribers: Set<string>;
// onLoadSubscribersRead();
// const subscribers = new Set<number>([...currentlrySavedSubscribers]);
bot.command("subscribe", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var subscribers, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = Set.bind;
                return [4 /*yield*/, readSubscribers("./subscribersDatabase.json")];
            case 1:
                subscribers = new (_a.apply(Set, [void 0, _b.sent()]))();
                // в принципе можно добавить условие,
                // но поскольку set хранит только
                // уникальные значения, можно и
                // не добавлять
                subscribers.add(ctx.chatId.toString());
                writeFile(Array.from(subscribers), "./subscribersDatabase.json");
                return [2 /*return*/];
        }
    });
}); });
bot.command("unsubscribe", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var subscribers, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = Set.bind;
                return [4 /*yield*/, readSubscribers("./subscribersDatabase.json")];
            case 1:
                subscribers = new (_a.apply(Set, [void 0, _b.sent()]))();
                subscribers.delete(ctx.chatId.toString());
                writeFile(Array.from(subscribers), "./subscribersDatabase.json");
                return [2 /*return*/];
        }
    });
}); });
// оставлю на момент, когда пихаил начнёт диалог с ботом,
// чтобы засрать ему всё
// setInterval(() => {
//     bot.api.sendMessage(5646269039, "Я скибиди, а ты нет")
// }, 1000);
// тут будет проверка нет ли нового видео про скибиди туалеты
// let latestVideoId: string;
// (async function () {
//     latestVideoId = await readFile("./latestVideoId.txt");
// })();
// setInterval(async () => {
//     // отключил пока
//     await fetch(`
// https://
// www
// .googleapis
// .com
// /youtube
// /v3
// /search
// ?part=snippet
// &channelId=${process.env.DA_FUQ_BOOM_CHANNEL_ID}
// &order=date
// &maxResults=1
// &key=${process.env.YOUTUBE_DATA_API_V3_KEY}
// `)
//         .then((response) => response.json())
//         .then(async (dataFromServer) => {
//             console.log(dataFromServer.items[0].id.videoId.toString());
//             // отключено из за квоты, включить как восстановится ------------------------------------
//             let latestVideoId = await readFile("./latestVideoId.txt");
//             if (
//                 dataFromServer.items[0].id.videoId.toString() !== latestVideoId
//             ) {
//                 latestVideoId = dataFromServer.items[0].id.videoId.toString();
//                 await writeFile(
//                     latestVideoId.toString(),
//                     "./latestVideoId.txt"
//                 );
//                 const subscribers = await readSubscribers(
//                     "./subscribersDatabase.json"
//                 );
//                 subscribers.forEach((el: string) => {
//                     bot.api.sendMessage(
//                         el,
//                         `Новое видео про скибиди туалеты, срочно смотреть! https://www.youtube.com/watch?v=${latestVideoId}`
//                     );
//                 });
//             }
//         });
// }, 60000);
bot.hears("пихаил чмо", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.react("❤");
        return [2 /*return*/];
    });
}); });
// дефолтный ответ
bot.on("message", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ctx.reply("\u0422\u0435\u043F\u0435\u0440\u044C \u0443 \u043C\u0435\u043D\u044F \u0435\u0441\u0442\u044C \u0442\u0432\u043E\u0439 ID: ".concat(ctx.chatId, ".\n\u041E\u043D \u043E\u0441\u0442\u0430\u043D\u0435\u0442\u0441\u044F \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u043C (\u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C)."))];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
bot.catch(function (err) {
    var ctx = err.ctx;
    console.error("Error: ".concat(ctx.update.update_id));
    var e = err.error;
    if (e instanceof grammy_1.GrammyError) {
        console.error("Error in request ".concat(e.description));
    }
    else if (e instanceof grammy_1.HttpError) {
        console.error("Connection error ".concat(e));
    }
    else {
        console.error("Unknown error ".concat(e));
    }
});
bot.start();
