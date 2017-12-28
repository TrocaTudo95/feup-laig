MyGameBoard.prototype.getPrologRequest = function(requestString, onSuccess, onError, port)
{
  var requestPort = port || 8081;
  var request = new XMLHttpRequest();
  var game = this;
  request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, true);

  request.onload = onSuccess.bind(this) || function(data){console.log("Request successful. Reply: " + data.target.response); return data.target.response;};
  request.onerror = onError || function(){console.log("Error waiting for response");};

  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.send();
};

MyGameBoard.prototype.init_board = function(){
  this.getPrologRequest('init_board', this.getBoard);
};

MyGameBoard.prototype.possible_moves = function(){
  let tempNum= this.selectedPiece -100;
  let request='possible_moves('+this.selectedPiece.id+ ')';
  this.getPrologRequest(request, this.getPossibleMoves);
}

MyGameBoard.prototype.init_players =function(){
this.getPrologRequest('init_players', this.getPlayers);
};
MyGameBoard.prototype.calculate_score = function(){
  let request = 'calculate_score('+this.encodeBoard()+','+this.player1Encode+','+
  this.player2Encode+')';

  this.getPrologRequest(request, this.getScore);
};

MyGameBoard.prototype.make_play =function(){
let request= 'make_move(p'+this.selectedPiece.id+','+this.positionToMove+','+this.encodeBoard()+','+this.player1Encode+','+
this.player2Encode+')';
this.getPrologRequest(request, this.parseMove);
}

MyGameBoard.prototype.getBoard = function(data){
  let temp = data.target.response;
			  temp = temp.slice(3,temp.length -2);
			  this.prologBoard= temp.split("),p(");

};

MyGameBoard.prototype.getPossibleMoves = function(data){
let temp = data.target.response;
temp =temp.slice(1,temp.length -1);
this.possibleMoves= temp.split(",");
};


MyGameBoard.prototype.encodeBoard =function() {
  let ola='[';
  for(let i=0;i <this.prologBoard.length; i++){
  ola+='p('+ this.prologBoard[i]+'),';
  }
  ola= ola.slice(0,ola.length-1);
  ola+=']';
  return ola;
};



MyGameBoard.prototype.getScore = function(data){
  let temp = data.target.response;
        let temparray= temp.split("-");
        this.score1=parseInt(temparray[0]);
        this.score2=parseInt(temparray[1]);

};


MyGameBoard.prototype.getPlayers= function(data){
  let temp = data.target.response;
        let temparray= temp.split("-");
        this.player1Encode=temparray[0];
        this.player2Encode=temparray[1];
        temparray[0]=temparray[0].slice(1,temparray[0].length-1);
        temparray[1]=temparray[1].slice(1,temparray[1].length-1);
        this.player1 = temparray[0].split(",");
        this.player2 = temparray[1].split(",");
};
