var turn=0;
var attackerMoved=false;
var defenderMoved=false;
var canMove=true;
var myCoords=0;
var playerType;
var connection;
var peer;
function startGameLogic() {
	connection.on('open', function() {
		console.log("Opened connection with other player.");
		connection.on('data', function(data) {
			console.log("Got data");
			if(playerType=="attacker") {
				canMove=true;
			}
			else {
				attackerMoved=true;
				if(defenderMoved) {
					resolveConflict();
				}
			}
		});
	});
};

function attackSpace(coords, isAttacking) {
	myCoords=coords;
	connection.send({"coords" : coords, "isAttacking" : isAttacking});
	canMove=false;
}

function defendSpace(coords) {
	myCoords = coords;
	defenderMoved = true;
	if(attackerMoved) {
		resolveConflict();
	}
}

function resolveConflict() {
	console.log("Resolving conflict");
	connection.send({"attackSuccess" : false, "attackerCaught" : false});
	defenderMove=false;
	attackerMoved=false;
}
