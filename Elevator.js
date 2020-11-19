const ExitMode = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    FOREST:   Symbol("Forest"),
    COTTAGE:  Symbol("Cottage"),
    
   
});
const aChoice=["left","right","center"];
let dCounter=0;
module.exports = class Game{
    constructor(){
        this.sPrompt="";
        this.dDone=false;
        this.stateCur = ExitMode.WELCOMING;
     
    }
    prompt(){
        return this.sPrompt;
    }
/* 
This is the chatbot illustrating the scary story that starts when a player plays a game to select the direction. If the player is pointing towards the same direction as the computer the chatbot will lead the player to proceed scary scenarios. For Example when the player selects the right direction and computer has the right direction then the player has to play through the penalty round. Else if the directions are different the player wins over the computer and declared saved or ask to pick the direction again. */
	
    takeATurn(sInput)
    {       
        const nComputer=Math.floor(Math.random()*aChoice.length);
        this.sComputer=aChoice[nComputer];
        let aResponse= [];
        switch(this.stateCur)
            {
                case ExitMode.WELCOMING:
                        if(sInput.toLowerCase()==this.sComputer){
                        aResponse.push("You Lose ! Now you have to finish the penalty");
                        aResponse.push("You have entered the dark and misty forest, you have two options to exit through BUS or WALK. Choose your option.");
                        this.stateCur=ExitMode.FOREST;}
                 
                     else{             
                         aResponse.push("Pick the direction of your choice left, right, or center");
                         }
                   
                     break;
                case ExitMode.FOREST:
                if((sInput.toLowerCase().match("bus"))){
                    aResponse.push("A headless Driver is driving and suddenly stops at the cottage. There is two way to escape, 1: Make a CALL to friend and 2: Ring a door BELL and ask for help");
                    this.stateCur=ExitMode.COTTAGE;
                    } 
                    else
                    {    aResponse.push("Game over ! you will be Scared to death "); 
                         this.bDone=true;
                    }
                    break;
                case ExitMode.COTTAGE:
                    if((sInput.toLowerCase().match("CALL"))){
                        aResponse.push("You are saved by a Friend");
                     } else { aResponse.push("Game over ! you will be Scared to death by the butler");
                            this.bDone=true;
                        }
            
            }
          return aResponse;
   }

   isDone(){
       return this.dDone;
   }
}