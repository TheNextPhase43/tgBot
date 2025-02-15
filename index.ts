import { Bot, GrammyError, HttpError, Keyboard } from "grammy";
import * as dotenv from "dotenv";
import * as fs from "node:fs/promises";
dotenv.config();

const bot = new Bot(process.env.BOT_API_KEY!);

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

bot.command("start", async (ctx) => {
    await ctx.reply(`Dop dop`);
});

bot.command("menu", async (ctx) => {
    const menuKeyboard = new Keyboard().text("Ok").text("Med").text("bad");
    await ctx.reply("Skibidi?", {
        reply_markup: menuKeyboard,
    });
});

bot.hears("123", async (ctx) => {
    ctx.reply(`Тест: <span class="tg-spoiler">Скибиди</span>`, {
        parse_mode: "HTML",
    });
});

bot.on(":photo").on("::url", async (ctx) => {
    ctx.reply("photo and url");
});

bot.command("only_for_subs").filter(
    async (ctx) => {
        const subscribers = await readSubscribers("./subscribersDatabase.json");
        return subscribers.includes(ctx.chatId.toString());
    },
    async (ctx) => {
        await ctx.reply("вы подписаны");
    }
);

bot.command("skibidi", async (ctx) => {
    // вообще по идее обратные кавычки позволяют
    // писать в несколько строк, а также они
    // должны удалять пробелы, и символы
    // табуляции, однако они этого не делали,
    // поэтому прилепил к краю строки
    await fetch(`
https://
www
.googleapis
.com
/youtube
/v3
/search
?part=snippet
&channelId=${process.env.DA_FUQ_BOOM_CHANNEL_ID}
&order=date
&maxResults=1
&key=${process.env.YOUTUBE_DATA_API_V3_KEY}
`)
        .then((response) => response.json())
        .then(
            async (dataFromServer) =>
                await ctx.reply(
                    `https://www.youtube.com/watch?v=${dataFromServer.items[0].id.videoId}`
                )
        );
});

async function readSubscribers(path: string): Promise<string[]> {
    const currentSubscribersString: string = await readFile(path);

    let currentSubscribers: string[];
    if (currentSubscribersString.length) {
        currentSubscribers = JSON.parse(currentSubscribersString);
    } else {
        currentSubscribers = [];
    }

    // console.log(currentSubscribers);
    return currentSubscribers;
}

async function readFile(path: string): Promise<string> {
    return (await fs.readFile(path)).toString();
}

async function writeFile(newData: string[] | string, path: string) {
    await fs.writeFile(path, JSON.stringify(newData), {
        encoding: "utf-8",
        flag: "w",
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

bot.command("subscribe", async (ctx) => {
    const subscribers = new Set<string>(
        await readSubscribers("./subscribersDatabase.json")
    );
    // в принципе можно добавить условие,
    // но поскольку set хранит только
    // уникальные значения, можно и
    // не добавлять
    subscribers.add(ctx.chatId.toString());
    writeFile(Array.from(subscribers), "./subscribersDatabase.json");
});

bot.command("unsubscribe", async (ctx) => {
    const subscribers = new Set<string>(
        await readSubscribers("./subscribersDatabase.json")
    );
    subscribers.delete(ctx.chatId.toString());
    writeFile(Array.from(subscribers), "./subscribersDatabase.json");
});

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

bot.hears("пихаил чмо", async (ctx) => {
    ctx.react("❤");
});

// дефолтный ответ
bot.on("message", async (ctx) => {
    await ctx.reply(`Теперь у меня есть твой ID: ${ctx.chatId}.
Он останется конфиденциальным (может быть).`);
});

bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error: ${ctx.update.update_id}`);
    const e = err.error;

    if (e instanceof GrammyError) {
        console.error(`Error in request ${e.description}`);
    } else if (e instanceof HttpError) {
        console.error(`Connection error ${e}`);
    } else {
        console.error(`Unknown error ${e}`);
    }
});

bot.start();
