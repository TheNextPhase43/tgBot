import { Bot, GrammyError, HttpError } from "grammy";
import * as dotenv from "dotenv";
dotenv.config();

const bot = new Bot(process.env.BOT_API_KEY!);

bot.command("start", async (ctx) => {
    await ctx.reply(`Dop dop`);
});

bot.hears("skibidi", async (ctx) => {
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
            async (json) =>
                await ctx.reply(
                    `https://www.youtube.com/watch?v=${json.items[0].id.videoId}`
                )
        );
});

bot.hears("пихаил чмо", async (ctx) => {ctx.react("❤")});



// оставлю на момент, когда пихаил начнёт диалог с ботом,
// чтобы засрать ему всё
// setInterval(() => {
//     bot.api.sendMessage(5646269039, "Я скибиди, а ты нет")
// }, 1000);














// дефолтный ответ
bot.on("message", async (ctx) => {
    await ctx.reply(`skibidi ${ctx.chatId}`);
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
