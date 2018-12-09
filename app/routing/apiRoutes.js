var friends = require("../data/friends");

module.exports = function(app){

    app.get("/api/friends" , function(req , res){
        res.json(friends);
    });

    app.post("/api/friends" , function(req, res) {
         //grabs the new entry scores to compare with friends in friends array
        var newEntryScores = req.body.scores;
        var scoresArray = [];
        var bestMatch = 0;
    
        //runs through all current friends 
        for(var i=0; i<friends.length; i++){
          var scoresDiff = 0;
          //run through scores to compare friends
          for(var j=0; j<newEntryScores.length; j++){
            scoresDiff += (Math.abs(parseInt(friends[i].scores[j]) - parseInt(newEntryScores[j])));
          }
    
          //push results into scoresArray
          scoresArray.push(scoresDiff);
        }
    
        //after all friends are compared, find best match
        for(var i=0; i<scoresArray.length; i++){
          if(scoresArray[i] <= scoresArray[bestMatch]){
            bestMatch = i;
          }
        }
    
        //return bestMatch data
        var bff = friends[bestMatch];
        res.json(bff);
    
        //pushes new submission into the friends array
        friends.push(req.body);
    });

};