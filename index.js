const { Telegraf } = require('telegraf');
const fs = require('fs');
const ytdl = require('ytdl-core');
const https = require('https')
const express = require('express')
const { message } = require('telegraf/filters');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))





const bot = new Telegraf("6022090642:AAGqYjx1BBwP8ABjiuqUuLdzD0KHGdaVwKA");



bot.start((ctx) => ctx.reply("hello welcome to youtube downloader paste a youtube link"))









bot.hears("hi", (ctx) => {

ctx.reply("paste a youtube link")
  

})




bot.on("text", async (ctx) => {
  try
  {
    
    const ytdl1 = await ytdl.getInfo(ctx.message.text)
    

const arr =ytdl1.formats.filter((ele)=>ele.hasAudio===true).map((ele)=>{
        return {
          text:ele.qualityLabel ,
          url:ele.url
        }
  
}).filter(ele=>ele.text !== null)


    
  ctx.reply("the direct links of your video in all format 🍕", {
        reply_markup: {
            inline_keyboard: [
                /* Inline buttons. 2 side-by-side */
             arr
                
            ]
        }
    });
  }
    catch(err)
  {
    ctx.reply("invalid url")
  }
  })

  // console.log(ctx.message.text)


  
// bot.hears('hi', (ctx) => ctx.reply('Hey there'));

bot.launch()
app.post("/", async (req, res) => {


  const { link } = req.body


  const ytdl1 = await ytdl.getInfo(link)

  res.send(ytdl1.formats);


})



app.listen(3000, () => console.log("connected"))




