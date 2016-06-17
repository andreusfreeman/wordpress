var app = angular.module('app', []);

app.filter('percent', function() {
  return function(input) {
    return input + " %";
  };
});
app.filter('currencyUAH', function() {
  return function(input) {
    return input + " грн";
  };
});

app.controller('mainCtrl', function($scope){
	$scope.valueFuel = {
		gas: ['Газ', 7, 550, 550, 3100, 460],
		gas2: ['Газ, конденсационный котел', 7, 470, 470, 2660, 400],
		wood: ['Дрова', 350, 3.18, 3.18, 18.03, 2.7],
		pellet: ['Пеллета, Лузга', 1.75, 1080, 1080, 6150, 920],
		pelletWood: ['Пеллета, Древесная', 2.21, 1020, 1020, 5810, 870]
	};

  var defaultCosts = [];
  for (var i in $scope.valueFuel) {
    defaultCosts.push([$scope.valueFuel[i][2], $scope.valueFuel[i][5]]);
  }

  $scope.factorSaveEnergy = {
    oneFloor: [
      1,
      1.363,
      2.345
    ],
    twoFloor: [
      1,
      1.3695,
      2.4347
    ],
  };
  $scope.flatFloorBlock = {
    name: 'oneFloor'
  };
  $scope.flatBlock = {
    name: 'modern'
  };
  var a = 0;
  $scope.updateWarmed = function() {
    if ( $scope.flatBlock.name === 'not-warmed' ) {
      var b = 2;
    } else if ($scope.flatBlock.name === 'warmed') {
      var b = 1;
    } else if ($scope.flatBlock.name === 'modern') {
      var b = 0;
    }

    if ($scope.flatFloorBlock.name === 'oneFloor') {
      var factor = $scope.factorSaveEnergy.oneFloor;
      for (var i in $scope.valueFuel) {
        $scope.valueFuel[i][2] = defaultCosts[a][0] * factor[b];
        a++;
      }
    } else {
      var factor = $scope.factorSaveEnergy.twoFloor;
      for (var i in $scope.valueFuel) {
        $scope.valueFuel[i][2] = defaultCosts[a][1] * factor[b];
        a++;
      }
    }
    a = 0;
  }
	$scope.squareMetr = $scope.squareMetrTest = 25;
	$scope.squareMetrAlt = 1000;
  $scope.nameGas = $scope.valueFuel.gas[0];
  $scope.costGas = $scope.valueFuel.gas[1];
	$scope.defaultGas = $scope.valueFuel.gas[2];
	$scope.energyAutonomous = 20;
	$scope.energyAutonomousCost = 1941.24;
  
  $(function(){
    $('.search__block__type-fuel-type [type=checkbox]').on('click', function() {
      console.log('test');
      $.each($('.search__block__type-fuel-type li'), function(index, value){
        console.log(value);
        if(value.children[1].checked) {
          document.querySelector('.search__block__result__costs-home').getElementsByTagName('tr')[index+1].style.display = 'block';
          document.querySelector('.search__block__result__autonomous-heat').getElementsByTagName('tr')[index+2].style.display = 'block';
        } else {
          document.querySelector('.search__block__result__costs-home').getElementsByTagName('tr')[index+1].style.display = 'none';
          document.querySelector('.search__block__result__autonomous-heat').getElementsByTagName('tr')[index+2].style.display = 'none';
        };
      });
    });
  });
});
