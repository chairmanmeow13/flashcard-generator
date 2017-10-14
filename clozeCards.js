//ClozeCard constructor - full text, partial, cloze

var ClozeCard = function (text, cloze, partial){
  this.text = text;
  this.cloze = cloze;
  this.partial = partial;

		this.makeClozeCard = function (){
		return inquirer.prompt([
		      //ask for close card info
		      {
		        type: "input",
		        name: "text",
		        message: "Please enter the full text statement."
		      },
		      {
		          type: "input",
		          name: "cloze",
		          message: "Please state which words of the sentence you would like omitted for studying."
		      },
		      {
		          type: "input",
		          name: "partial",
		          message: "Now type the partial text omitting the cloze you stated in the previous question."
		      },
		    ]).then(function(clozeInfo) {
		      //add to constructor
		      newCloze = new ClozeCard(clozeInfo.text, clozeInfo.cloze, clozeInfo.partial);
		        console.log(newCloze);

		      fs.appendFile("flashcards.txt", JSON.stringify(newCloze)+ '\r\n' , function(err) {
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

module.exports = ClozeCard;
