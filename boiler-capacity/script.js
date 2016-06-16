$(function(){
  var valueFuel = {
    gas: ['Газ', 7, 550, 3100],
    gas2: ['Газ, конденсационный котел', 7, 470, 2660],
    wood: ['Дрова', 350, 3.18, 18.03],
    pellet: ['Пеллета, Лузга', 1.75, 1080, 6150],
    pelletWood: ['Пеллета, Древесная', 2.21, 1020, 5810]
  };
  var costsSeasone = [];
  var defaultGas = valueFuel.gas[2];
  var defaultCostGas = valueFuel.gas[1] * 1000;
  for (var i in valueFuel) {
    $('.search__block__result__costs').append('<tr><td>'+ valueFuel[i][0] +'</td><td><input type="number" value="'+ valueFuel[i][1] +'"></td><td class="calculation-value">'+ valueFuel[i][2] +'</td><td class="calculation-cost">'+ valueFuel[i][1]*valueFuel[i][2] +'</td></tr>');
    $('.search__block__type-fuel-type').append('<li><label>' + valueFuel[i][0] + '</label><input type="checkbox" checked></li>');
    var costsForSeasone = Math.floor((valueFuel[i][2]*1000)/defaultGas);
    var costForSeasone = valueFuel[i][1] * costsForSeasone;
    var economyForSeasonePersent = 100 - (Math.floor(costForSeasone*100/defaultCostGas));
    var economyForSeasoneValue = Math.floor(defaultCostGas - costForSeasone);
    $('.search__block__result__alternative-energy').append('<tr><td>'+ valueFuel[i][0] +'</td><td><input type="number" value="'+ valueFuel[i][1] +'"></td><td class="calculation-value">'+ costsForSeasone +'</td><td class="calculation-cost">'+ costForSeasone +'</td><td>'+ economyForSeasonePersent + " % : " + economyForSeasoneValue +'</td></tr>');

    costsSeasone.push(valueFuel[i][2]);
  }
  $('.search__block__area-button button').on('click', function() {
    $.each($('.search__block__type-fuel-type li'), function(index, value){
      if(value.children[1].checked) {
        document.querySelector('.search__block__result__costs').getElementsByTagName('tr')[index].style.display = 'block';
      } else {
        document.querySelector('.search__block__result__costs').getElementsByTagName('tr')[index].style.display = 'none';
      };
    });
  });
  $('.search__block__area-body [type=range]').on('change', function() {
    $('.search__block__area-body [type=number]:last').val($(this)[0].value);
    $.each($('.search__block__result__costs tr'), function(index, value){
      if(index>0) {
        document.querySelector('.search__block__result__costs').getElementsByTagName('tr')[index].getElementsByTagName('td')[2].innerHTML = (costsSeasone[index-1] * document.querySelector('.search__block__area-body [type=range]').value/25);
      }
    });
  });


  $('.search__block__type-fuel-type [type=checkbox]').on('click', function() {
    $.each($('.search__block__type-fuel-type li'), function(index, value){
      if(value.children[1].checked) {
        document.querySelector('.search__block__result__costs-home').getElementsByTagName('tr')[index+1].style.display = 'block';
        document.querySelector('.search__block__result__alternative-energy').getElementsByTagName('tr')[index+1].style.display = 'block';
      } else {
        document.querySelector('.search__block__result__costs-home').getElementsByTagName('tr')[index+1].style.display = 'none';
        document.querySelector('.search__block__result__alternative-energy').getElementsByTagName('tr')[index+1].style.display = 'none';
      };
    });
  });

  $('.search__block__result__costs tr').on('change', function(){
    $(this.children[3]).text(this.children[1].children[0].value*this.children[2].innerHTML);
  });
  $('.search__block__result__alternative-energy tr').on('change', function(){
    if(this.children[0].innerHTML === valueFuel.gas[0]) {
      $(this.children[3]).text(this.children[1].children[0].value*this.children[2].innerHTML);
      $(this.children[4]).text('-');

      $.each($('.search__block__result__alternative-energy tr'), function(index, value){
        if (index>1) {
          var gasCostSeasone = $('.search__block__result__alternative-energy tr')[1].children[3].innerHTML;
          var costSeasone = this.children[1].children[0].value*this.children[2].innerHTML;
          var economyForSeasonePersent = 100 - (Math.floor(costSeasone*100/gasCostSeasone));
          var economyForSeasoneValue = Math.floor(gasCostSeasone - costSeasone);

          $(this.children[3]).text(this.children[1].children[0].value*this.children[2].innerHTML);
          $(this.children[4]).text(economyForSeasonePersent + " % : " + economyForSeasoneValue);
        }
      });
    } else {
      var gasCostSeasone = $('.search__block__result__alternative-energy tr')[1].children[3].innerHTML;
      var costSeasone = this.children[1].children[0].value*this.children[2].innerHTML;
      var economyForSeasonePersent = Math.floor(costSeasone*100/gasCostSeasone);
      var economyForSeasoneValue = Math.floor(gasCostSeasone - costSeasone);

      $(this.children[3]).text(this.children[1].children[0].value*this.children[2].innerHTML);
      $(this.children[4]).text(economyForSeasonePersent + " % : " + economyForSeasoneValue);
    }
  });
});
