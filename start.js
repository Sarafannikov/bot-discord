const Discord = require("discord.js");
var webshot = require('webshot');
var fs = require('fs');

const client = new Discord.Client();
client.login(BOT_KEY);

client.on("message",(message) => {
    client.user.setGame('!help для информации');
    function screen(server, words) {
        console.log('2');
        if (words[2] != undefined) {
            URL = "https://www.leagueofgraphs.com/summoner/" + server + "/" + words[1] + '+' + words[2]
        } else {
            URL = "https://www.leagueofgraphs.com/summoner/" + server + "/" + words[1]
        }
        URL = encodeURI(URL)
        var options = {
            screenSize: {
            width: 320
            , height: 480
            }
        , shotSize: {
            width: 320
            , height: 650
            }
        , userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us)'
            + ' AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g'
        , shotOffset: {
            left: 0
            , right: 0
            , top: 250
            , bottom: 0
            }
        };
        console.log(URL);
        name = new Date();
        name1 = name.getMilliseconds() + ".jpg";
        webshot(URL, name1, options, function(err) {
        });
        return name1;
    }
    
    function deleteFile(name) {
        fs.unlink(name, function(err){
            if (err) {
                console.log(err);
            } else {
                console.log("Файл удалён");
            }
        });
    }

    function sendImage(name) {
        message.channel.send("", { files: [name] });
        setTimeout(deleteFile, 2000, name);
    }
    if (message.content == "!Panuka"){
        message.reply("Просто не те условия!")
    }
    if (message.content == "!help"){
        message.reply("Бот для получения информации о текущем ранге в игре LoL. Используйте команду !ru + Nickname или !euw + Nickname");
    }
    
    if (message.content.startsWith("!ru")){
        words = message.content.split(" ");
        console.log('1');
        name = screen('ru', words);  
        setTimeout(sendImage, 11000, name);  
    }
    if (message.content.startsWith("!euw")){
        words = message.content.split(" ");
        console.log('1.5');
        name = screen('euw', words);    
        setTimeout(sendImage, 11000, name);
    }
});