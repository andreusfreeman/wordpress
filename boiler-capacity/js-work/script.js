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
app.filter('autonom', function() {
  return function(input) {
    return input + " Гкал";
  };
});
app.filter('alternative', function() {
  return function(input) {
    return input/1000 + " тысяч м3";
  };
});
app.filter('squareHouse', function() {
  return function(input) {
    return input + " м";
  };
});
app.filter('capacityBoiler', function () {
  return function (items, squareMetr, testNew) {
    var filtered = [];
    var filteredFuel = [];
    var checkPelleta = false;
    var firstElement = 2;
    var checkInputChecked = false;
    for (var i = 0; i < items.length; i++) {
      if ( squareMetr < 140 ) {
        squareMetr = 140;
      } else if ( squareMetr >= 5000 ) {
        squareMetr = 6000;
      };
      if ( items[i].capacityMax >= squareMetr && items[i].capacityMin <= squareMetr ) {
        filtered.push(items[i]);
      }
    }
    $.each($('.search__block__type-fuel-type li'), function(index, value){
        if(value.children[1].checked) {
          checkInputChecked = true;
          $(this).attr('style', 'opacity: 1');
          var nameFuel = value.children[1].value;
          for ( var i = 0; i < filtered.length; i++ ) {
            if ( filtered[i].fuel === nameFuel ) {
              filtered[i].marker = 0;
              filteredFuel.push(filtered[i]);
              if ( nameFuel !== 'pelleta' ) {
                checkPelleta = true;
              }
            }
          }
        } else {
          $(this).attr('style', 'opacity: 0.5');
        }
      });
      if ( filteredFuel.length === 0 && checkInputChecked === false) {
        filteredFuel.push('not found');
      } else if ( checkPelleta === false ) {
        for ( var i = 0; i < filtered.length; i++ ) {
          if ( filtered[i].fuelSecond === 'pelleta' && filtered[i].fuel !== 'pelleta' ) {
            firstElement === 2 ? 2 : 1;
            filtered[i].marker = firstElement;
            filteredFuel.push(filtered[i]);
            firstElement = 1;
          }
        }
      };
      console.log(filteredFuel);
    return filteredFuel;
  };
});

app.factory('dataFactory', function(){
  return {
    valueFuel: {
  		gas: ['Газ', 7, 550, 550, 3100, 460, 'м3', 'gas'],
  		gas2: ['Газ, конденсационный котел', 7, 470, 470, 2660, 400,'м3', 'gas'],
  		wood: ['Дрова', 350, 3.18, 3.18, 18.03, 2.7, 'складометров', 'wood'],
  		pellet: ['Пеллета, Лузга', 1750, 1.080, 1.080, 6.150, 0.920, 'тонн', 'pelleta'],
  		pelletWood: ['Пеллета, Древесная', 2210, 1.020, 1.020, 5.810, 0.870, 'тонн', 'pelleta']
  	},
    fuelType: [
      ['wood', 'Дерево'],
      ['pelleta', 'Пеллета']
    ]
  }
});

app.controller('mainCtrl', function($scope, $http, dataFactory){
  $scope.valueFuel = dataFactory.valueFuel;
  $scope.nameFuelType = dataFactory.fuelType;

  $http.get('http://127.0.0.1:8080/result.js')
  .success(function(result){
    $scope.resultBoiler = result;
  });

    $scope.searchBoiler = function() {
      if ( $scope.checkboxModel.value ) {
        $('.search__block__result-boiler').show();
      } else {
        $('.search__block__result-boiler').hide();
      }
    };
    $scope.checkboxModel = {
       value : false
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
	$scope.defaultGas = $scope.valueFuel.gas[2];
	$scope.energyAutonomous = 20;
	$scope.energyAutonomousCost = 1941.24;
  $scope.tempVariable = 1;

  $scope.hidePosition = function(){
      $scope.tempVariable = 2;
  }
  $(function(){
    $( '.search__block__flat-type' ).buttonset();
    $( '.search__block__flat-type-floor' ).buttonset();
    $('#quality1rdesc, #quality2rdesc').hide();
    $('.search__block__result-boiler').hide();
    $('ul.search__block__flat-type').each(function() {
     $(this).find('li').each(function(i) {
       $(this).click(function(){
         $('#quality1rdesc, #quality2rdesc, #quality3rdesc').hide();
         if ( i === 0 ) {
           $('#quality1rdesc').fadeIn();
         } else if ( i === 1 ) {
           $('#quality2rdesc').fadeIn();
         } else if ( i === 2 ) {
           $('#quality3rdesc').fadeIn();
         }
       });
     });
   });
   $(".fuel-type").hover(function() {
        $(this).next().next("em").animate({opacity: "show"}, "slow");
      }, function() {
        $(this).next().next("em").animate({opacity: "hide"}, "fast");
      });
  });
});
