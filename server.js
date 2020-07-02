"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const { text } = require("express");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  .get("/cat-message", (req, res) => {
    const message = { author: "cat", text: "meow" };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/monkey-message", (req, res) => {
    const messageArray = [
      "Hey Hey we're the monkees",
      "Now that's what I call monkey business!",
      "BANANA EMOJI",
      "Orange you glad I didn't say orangutan?",
    ];
    const randomIndex = Math.floor(Math.random() * 4);
    const message = { author: "monkey", text: messageArray[randomIndex] };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/parrot-message", (req, res) => {
    console.log(req);
    console.log(req.query);
    const message = { author: "parrot", text: req.query.repeatmessage };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/bot-message", (req, res) => {
    const getBotMessage = (text) => {
      const commonGreetings = ["hi", "hello", "howdy", "greetings"];
      const commonGoodbyes = ["bye", "see ya", "later", "ciao"];
      const jokesArray = [
        `\nQ. What's the difference between a dog and a businessman?\n\nA. The businessman usually wears a three-piece suit, you know, with a jacket and a shirt and a tie,\nand the dog.... just pants.`,
        `\nQ. What's the difference between a stylish person on a unicycle and a poorly dressed person on a bicycle? \n\nA. A tire (attire :P)`,
        "\nA perfectionist walked into a bar... \napparently, the bar wasn’t set high enough.",
        "\nI own the world's worst thesaurus. \nNot only is it awful, it's awful.",
        "\nQ. What's the difference between a good joke and a bad joke timing.",
        `\nQ. Why don't kleptomaniacs have a sense of humor?\n\nThey take everything... literally.`,
      ];
      let botMsg = text;
      commonGreetings.forEach((greeting) => {
        console.log(text.toLowerCase().includes(greeting));
        if (text.toLowerCase().includes(greeting)) {
          botMsg = "Hello!";
        }
      });
      commonGoodbyes.forEach((goodbye) => {
        // console.log(text.toLowerCase().includes(goodbye));
        if (text.toLowerCase().includes(goodbye)) {
          botMsg = "Goodbye!";
        }
      });
      if (text.toLowerCase().includes("something funny")) {
        botMsg = "Do you want to hear a joke?\nReply Y or N";
      }
      if (text === "Y") {
        const randomIndex = Math.floor(Math.random() * 6);
        botMsg =
          `${jokesArray[randomIndex]}` +
          "\n\nDo you want to hear another?\nReply Y or N";
      }
      if (text === "N") {
        botMsg = "Goodbye!";
      }

      return botMsg;
    };

    const botMsgresponse = "Bzzt " + getBotMessage(req.query.botmessage);

    const message = {
      author: "bot",
      text: botMsgresponse,
    };

    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })
  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this serves up the homepage
  .get("/", (req, res) => {
    res.status(200).json({
      status: 200,
      message: "This is the homepage... it's empty :(",
    });
  })

  // this is our catch all endpoint. If a user navigates to any endpoint that is not
  // defined above, they get to see our 404 page.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not the page you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
