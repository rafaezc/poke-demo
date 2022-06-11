angular.module('pokeApp', [])
  .controller('PokeAppController', function($scope, $http) {
    var pokeSearch = this;
    pokeSearch.namesAndImages = [];
 
    $scope.getData = function() {
		$scope.loading = true;
		$http.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20")
		.then(function(response) { 
            $scope.aux = response.data;
            $scope.total = response.data.count - 228;
            $scope.shown =  response.data.results.length;
			$scope.details = response.data.results;

            $scope.loading = false;

            $scope.details.forEach(function (x) {
                x.name = x.name.charAt(0).toUpperCase() + x.name.slice(1);
                x.url = x.url.split('/')[6];
                pokeSearch.namesAndImages.push({name: x.name, url: x.url});
            });
             
            // console.log(pokeSearch.namesAndImages);
		});
	}	

    pokeSearch.callUser = function() {
        var user = 'Rafael Estevan Zubiolo Cavalaro';
        user = 'Olá, ' + user.split(' ')[0] + ' ' + user.split(' ')[user.split(' ').length - 1]; 
        return user;
    };

    // pokeSearch.numbersHandler = function() {
    //     var pokePhtos = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
    //     pokePhtos =  pokePhtos + $scope.shown  + 
    //     return pokeShown;
    // };

    pokeSearch.numbersHandler = function() {
        var pokeShown = '';
        pokeShown  = 'Exibindo ' + $scope.shown  + ' de ' + $scope.total; 
        return pokeShown;
    };

    $scope.getData();
});