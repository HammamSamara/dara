module.exports = function(callback){
	setTimeout(function(){
		// async code
		callback();
		console.log("askDestinations")
	}, 1000)
	
}