var algoliasearch = require('algoliasearch');
var client = algoliasearch('UM9GX4AKRT', '0c71a74d6b76468a32410982c5c96766');
var index = client.initIndex('packages');

module.exports = {
    find: function(user) {
    	console.log(user);
        var facetFilters = user.endorsement.map(function(endorsement) {
            return 'endorsement:' + endorsement;
        });
        return index.search(user.destination, {
            "getRankingInfo": 1,
            "facets": "*",
            "attributesToRetrieve": "*",
            "highlightPreTag": "<em>",
            "highlightPostTag": "</em>",
            "hitsPerPage": 10,
            "facetFilters": facetFilters,
            "maxValuesPerFacet": 100
        })

    }
}
