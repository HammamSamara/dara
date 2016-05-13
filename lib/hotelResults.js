var algoliasearch = require('algoliasearch');
var client = algoliasearch('4N06GMWXRP', '34103016e66cfc0d6ffee7a4487ce8a1');
var index = client.initIndex('suggestions');

module.exports = {
    find: function(user) {

    	console.log(user);

      var facetFilters = ['type:Property'];

        return index.search(user.destination, {
            "getRankingInfo": 1,
            "facets": "*",
            "attributesToRetrieve": "*",
            "highlightPreTag": "<em>",
            "highlightPostTag": "</em>",
            "hitsPerPage": 10,
            "facetFilters": facetFilters,
            "maxValuesPerFacet": 100,
            "query":user.destination
        })

    }
}
