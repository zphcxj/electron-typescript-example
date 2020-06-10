/*
 * @FileName: 
 * @Description: 
 * @Author: zhoup
 * @Date: 2020-06-09 23:36:46
 * @LastEditors: zhoup
 * @LastEditTime: 2020-06-10 10:23:54
 */ 

import "reflect-metadata";

import {createConnection} from "typeorm";

var electron = require("electron");
var url = require("url");

electron.app.on("ready", () => {
    // var mainWindow = new electron.BrowserWindow({
    //     webPreferences:{
    //         nodeIntegration: true
    //     }
    // });
    // mainWindow.loadURL(url.format({
    //     pathname: __dirname + "/index.html",
    //     protocol: "file:",
    //     slashes: true
    // }));
    // mainWindow.toggleDevTools();
    // setTimeout(() => {
    //     console.log("You can also get posts from the second process:");
    //     createConnection().then(async connection => {
    //         const posts = await connection.getRepository("Post").find();
    //         console.log("posts:", posts);
    //     });
    // }, 5000);

    var typeorm = require("typeorm");
    typeorm.createConnection().then(() => {
        var post = {
            title: "post title",
            text: "post text"

        };
        return typeorm.getRepository("Post").save(post);

    }).then(() => {
        console.log("Saved successfully!");
        return typeorm.getRepository("Post").find();

    }).then(posts => {
        console.log("Posts: ", posts);
        
        posts.forEach(post => {
            
            console.log(post.id + ". " + post.title);
        });

    }).catch(error => {
        console.error("Error: ", error);
    });
});