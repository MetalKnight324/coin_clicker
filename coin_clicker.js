var coinCount = 1600;
var clickRate = 1;
var doubleClickRateCost = 10;
var perSecondRate = 0;
var lemonadeCost = 100;
var pizzariaCost = 500;
var donutCost = 2000;
var arcadeCost = 10000;
var lemonadePS = 10;
var pizzariaPS = 65;
var donutPS = 300;
var arcadePS = 1750;
var lemonadeStands = 0;
var lemonadePScost = 1500;

function drawCircle() {
  var canvas = document.getElementById("game-board");
  var context = canvas.getContext("2d");
  context.fillStyle = '#ffd700';
  context.beginPath();
  context.arc(95, 50, 40, 0, 2*Math.PI);
  context.fill();
}

function afterCoinCountChange() {
  enablePurchaseButton("clickRateButton", doubleClickRateCost);
  enablePurchaseButton("lemonadeButton", lemonadeCost);
  enablePurchaseButton("pizzariaButton", pizzariaCost);
  enablePurchaseButton("donutButton", donutCost);
  enablePurchaseButton("arcadeButton", arcadeCost);
  enablePurchaseButton("lemonadeUpButton", lemonadePScost);
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

function purchaseLemonade() {
  perSecondRate += lemonadePS;
  coinCount = coinCount - lemonadeCost;
  lemonadeCost = Math.round(lemonadeCost * 2.5)
  afterCoinCountChange();
}

function purchasePizzaria() {
  perSecondRate += pizzariaPS;
  coinCount = coinCount - pizzariaCost;
  pizzariaCost = Math.round(pizzariaCost * 2.5)
  afterCoinCountChange();
}

function purchaseDonutShop() {
  perSecondRate += donutPS;
  coinCount = coinCount - donutCost;
  donutCost = Math.round(donutCost * 2.5);
  afterCoinCountChange();
}

function purchaseArcade() {
   perSecondRate += arcadePS;
   coinCount = coinCount - arcadeCost;
   arcadeCost = Math.round(arcadeCost * 2.5);
   afterCoinCountChange();
 }

 function upgradeLemonade() {
    lemonadePS *= 3;
    coinCount = coinCount - lemonadePScost;
    lemonadePScost = Math.round(lemonadePScost * 5);
    afterCoinCountChange();
  }


function enablePurchaseButton(buttonId, minimumCoinCount) {
  var button = document.getElementById(buttonId);
  if(coinCount >= minimumCoinCount) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
}

function addPerSecond() {
  console.log("Coins Per Second");
  coinCount = coinCount + perSecondRate;
  afterCoinCountChange();
}

function showStats() {
  document.getElementById("coinsCell").innerHTML = coinCount;
  document.getElementById("clickRateCell").innerHTML = clickRate;
  document.getElementById("perSecondCell").innerHTML = perSecondRate;
  document.getElementById("doubleClickRateCell").innerHTML = doubleClickRateCost;
  document.getElementById("lemonadeCostCell").innerHTML = lemonadeCost;
  document.getElementById("pizzariaCostCell").innerHTML = pizzariaCost;
  document.getElementById("donutCostCell").innerHTML = donutCost;
  document.getElementById("arcadeCostCell").innerHTML = arcadeCost;
  document.getElementById("lemonadeUpCell").innerHTML = lemonadePScost;
}

function init() {
  drawCircle();
  afterCoinCountChange();
  setInterval(addPerSecond, 1000);
}
