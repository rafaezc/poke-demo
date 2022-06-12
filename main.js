angular.module('pokeApp', []) // CRIAR O README E MEDIA QUERIES RESPONSIVIDADE
  .controller('PokeAppController', function($scope, $http) {
    var pokeSearch = this;
    pokeSearch.namesAndImages = [];
    var pageArray = []; 
 
    $scope.getData = function(pageNum) {

        $scope.page = 0; 

        if (pageNum === 0 || pageNum === 1120) {
            $scope.page = parseInt(pageNum);
            pageArray.push(parseInt(pageNum));
        } else {
            $scope.page = (pageArray[pageArray.length - 1] + parseInt(pageNum));
            pageArray.push(parseInt($scope.page));
        }

        if (pageArray.length > 2) {
            pageArray.shift();
        }

		$scope.loading = true;

		$http.get('https://pokeapi.co/api/v2/pokemon/?offset=' + $scope.page + '&limit=20')
		.then(function(response) { 
            $scope.aux = response.data;
            $scope.total = response.data.count;
            $scope.shown =  response.data.results.length;
			$scope.details = response.data.results;

            $scope.loading = false;
            
            pokeSearch.namesAndImages = [];

            $scope.details.forEach(function (x) {
                x.name = x.name.charAt(0).toUpperCase() + x.name.slice(1);
                x.url = x.url.split('/')[6];
                pokeSearch.namesAndImages.push({name: x.name, url: x.url});
            });
             
		});
	}	

    pokeSearch.callUser = function() {
        var user = 'Rafael Estevan Zubiolo Cavalaro';
        user = 'Olá, ' + user.split(' ')[0] + ' ' + user.split(' ')[user.split(' ').length - 1]; 
        return user;
    };

    pokeSearch.pagenumbersHandler = function() {
        var pokePage = 0;  
        pokePage = parseInt((pageArray[pageArray.length - 1] + 20)/20) + ' de 57 páginas';
        return pokePage;
    };

    pokeSearch.numbersHandler = function() {
        var pokeShown = '';
        pokeShown  = 'Exibindo ' + $scope.shown  + ' de ' + $scope.total; 
        return pokeShown;
    };

    $scope.getData(0);
});