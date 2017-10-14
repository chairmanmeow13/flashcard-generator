var inquirer = require("inquirer");
var fs = require("fs");
var cloze = require("./ClozeCard");

//BasicCard constructor - front and back


//initial prompt

function startPrompt(){
inquirer.prompt([{

        type: "list",
        name: "type",
        message: "What would you like to do?",
        choices: ["Create Basic Card", "Create Cloze Card", "Study!"]

}]).then(function(user) {
    if (user.type === "Create Basic Card") {
        BasicCard.makeBasicCard();
    }
    else if (user.type === "Create Cloze Card"){
        ClozeCard.makeClozeCard();
    }
    else{
        studyCards();
    }
});
}
startPrompt();

//basic card
var BasicCard = function (front, back){
  this.front = front;
  this.back = back;

    this.makeBasicCard = function (){
      return inquirer.prompt([
            {
                type: "input",
                name: "front",
                message: "What is the question to put on the front of the card?"
            },
            {
                type: "input",
                name: "back",
                message: "What is the answer to place on the back of the card?"
            }
          ]).then(function(basicInfo) {

              //add the information as instance to constructor

            newBasic = new BasicCard(basicInfo.front, basicInfo.back);
                console.log(newBasic);

                //append the data to the txt file for retrieving later

              fs.appendFile("flashcards.txt", JSON.stringify(newBasic)+ '\r\n', function(err) {
                if (err) {
                  console.log(err);
                  }
              });
              inquirer.prompt([
                {
                  type:"confirm",
                  name:"confirm",
                  message:"Do you want to write another card?",
                  default: true
                }
              ]).then(function(userConfirm){
                if(userConfirm.confirm === true){
                  makeBasicCard();
                }else{
                  startPrompt();
                }
              });
            });
    }
};

//Study cards

function studyCards (){
  fs.readFile("flashcards.txt", "utf8",function (err, data){
    if (err){
      throw err;
    }
    console.log(data);
  });
}

module.exports = 