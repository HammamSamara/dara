module.exports = function(callback){
	setTimeout(function(){
		// async code
		callback();
		console.log("askCategories")
	}, 1000)
	
}