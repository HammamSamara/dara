module.exports = function(callback){
	setTimeout(function(){
		// async code
		callback();
		console.log("askDates")
	}, 1000)
	
}