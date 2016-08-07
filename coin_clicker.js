function Business(description, priceSchedule) {
  this.description = description;
  this.priceSchedule = priceSchedule;
  this.currentLevel = -1;
}
Business.prototype = {
  getDescription: function() {
    return this.description;
  },
  getCoinRate: function() {
    if(this.currentLevel == -1) {
      return 0;
    } else {
      return this.priceSchedule[this.currentLevel].coinRate;
    }
  },
  getPurchaseCost: function() {
    if(this.currentLevel == (this.priceSchedule.length - 1)) {
      return 0;
    }
    return this.priceSchedule[this.currentLevel + 1].cost;
  },
  purchase: function() {
    if(this.currentLevel < (this.priceSchedule.length - 1)) {
      this.currentLevel += 1;
    } else {
      console.log("attempt to purchase a level that is not available");
    }
  }
}

var businesses = [
  new Business("Lemonade Stand", [
    {
      cost: 100,
      coinRate: 10
    },
    {
      cost: 1500,
      coinRate: 30
    }
  ]),
  new Business("Pizzaria", [
    {
      cost: 500,
      coinRate: 65
    },
    {
      cost: 7000,
      coinRate: 195
    }
  ]),
  new Business("Donut Shop", [
    {
      cost: 2000,
      coinRate: 300
    },
    {
      cost: 20000,
      coinRate: 1000
    }
  ])
];
var coinCount = 1600;
var clickRate = 1;
var doubleClickRateCost = 10;

function drawCircle() {
  var canvas = document.getElementById("game-board");
  var context = canvas.getContext("2d");
  context.fillStyle = '#ffd700';
  context.beginPath();
  context.arc(95, 50, 40, 0, 2*Math.PI);
  context.fill();
}

function afterCoinCountChange() {
   $('#clickRateButton').prop('disabled', coinCount < doubleClickRateCost);
   _.each(businesses, function(business, index) {
     $('#business-' + index + '-button').prop('disabled', coinCount < business.getPurchaseCost());
   });
  // enablePurchaseButton("lemonadeButton", lemonadeCost);
  // enablePurchaseButton("pizzariaButton", pizzariaCost);
  // enablePurchaseButton("donutButton", donutCost);
  // enablePurchaseButton("arcadeButton", arcadeCost);
  // enablePurchaseButton("lemonadeUpButton", lemonadePScost);
  showStats();
}

function handleClick() {
  coinCount += clickRate;
  afterCoinCountChange();
}

function purchaseClickRate() {
  clickRate *= 2;
  coinCount = coinCount - doubleClickRateCost;
  doubleClickRateCost = Math.round(doubleClickRateCost * 2.5);
  afterCoinCountChange();
}

function addPerSecond() {
  var businessCoins = _.reduce(businesses, function(total, business) {
    return total + business.getCoinRate();
  }, 0);
  coinCount += businessCoins;
  afterCoinCountChange();
}

function showStats() {
  document.getElementById("coinsCell").innerHTML = coinCount;
  document.getElementById("clickRateCell").innerHTML = clickRate;
//  document.getElementById("perSecondCell").innerHTML = perSecondRate;
  document.getElementById("doubleClickRateCell").innerHTML = doubleClickRateCost;
  // document.getElementById("lemonadeCostCell").innerHTML = lemonadeCost;
  // document.getElementById("pizzariaCostCell").innerHTML = pizzariaCost;
  // document.getElementById("donutCostCell").innerHTML = donutCost;
  // document.getElementById("arcadeCostCell").innerHTML = arcadeCost;
  // document.getElementById("lemonadeUpCell").innerHTML = lemonadePScost;
}

function showBusinesses() {
   _.each(businesses, function(business, index) {
     var lastRow = $('#gameTable div.row:last');
     console.log(lastRow[0].className);
     lastRow.after(
       '<div class="row">' +
         '<div class="col-sm-6">' +
            '<h2>' + business.description + '</h2>' +
         '</div>' +
         '<div class="col-sm-6">' +
           '<span id="business-' + index + '-cost"></span>' +
         '</div>' +
        '</div>' +
        '<div class="row">' +
          '<div class="col-sm-12">' +
            '<button id="business-' + index + '-button" class="btn btn-default">Purchase</button>' +
          '</div>' +
       '</div>');
    $('#business-' + index + '-button').click(function() {
      coinCount -= business.getPurchaseCost();
      business.purchase();
      afterCoinCountChange();
    });
   })
}

function init() {
  drawCircle();
//  afterCoinCountChange();
  setInterval(addPerSecond, 1000);
  showBusinesses();
}
