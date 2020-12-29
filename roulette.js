let startStake = 10;
let startMoney = 5000;
let target = 10000



let randomCounts = [];
let randomBlack = [];
let total = 2;
let blackWins = 0;
let redWins = 0;
let maxWinsRed = 0;
let maxWinsBlack = 0;
let money = startMoney;
let stake = startStake;
let maxstake = 10;
let gameOverMinus = 0;
let gameOverPlus = 0;
let turns = 0;
let blackArray = [];
let maxBlackArray = [];
let redArray = [];
let maxRedArray = [];
let graphX = [325]
let graphY = [198.2]
let averageTurns = []
let x,y, average;
let totalaccount = -startMoney;
let averageBlackArray =[]
let averageRedArray =[]
let endpointsX =[]
let endpointsY =[]
let history =[]
let textHeight = 350

function setup() {
  createCanvas(innerWidth, innerHeight);
  for (let i = 0; i < total; i++) {
    randomCounts[i] = 0;
  }
  
  // //Startgeld
  // input2 = createInput();
  // input2.position(85, 205);
  // input2.size(50, 16);
  // input2.value(money);
  // button2 = createButton('Start €');
  // button2.position(input2.x + input2.width, 205);
  // button2.mousePressed(herZien);
  
  // //Doel
  // input3 = createInput();
  // input3.position(85, 225);
  // input3.size(50, 16);
  // input3.value(target);
  // button3 = createButton('Doel €');
  // button3.position(input3.x + input3.width, 225);
  // button3.mousePressed(herZien);
}


// function herZien() {
//   var Startgeld = input2.value();
//   console.log("Startgeld",Startgeld);
//   var Doel = input3.value();
//   console.log("Doel",Doel);
//   if(startMoney){
//     startMoney = Number(Startgeld)
//   }
//   totalaccount = 0 - startMoney
//   money = startMoney
//   if(doel){
//     target = Number(doel)
//   }
  
//   input3.value(target);
//   input2.value(startMoney);
// setup()
// }

function draw() {
  noStroke();
  background(10,100,10,100);
  frameRate(8)
  turns++
  let index = floor(random(total));
  randomCounts[index]++;

  console.log(randomCounts);

  if (index == 0) {
    // Black wins
    blackWins++
    blackArray.push(1)
    history.push(0)
    averageBlackArray.push(blackArray.length);
    redArray.length = 0;

    // inzet eraf
    money = money - stake;
    stake = stake * 2;

    //langste streak bijhouden
    if (maxWinsBlack < blackWins) {
      maxWinsBlack = blackWins;
    }
    // maxstreak visualisatie data updaten?
    if (maxBlackArray.length < blackArray.length) {
      maxBlackArray.length = blackArray.length
    }
    //Wat is de hoogst geregistreerde inzet
    if (maxstake < stake) {
      maxstake = stake;
    }

    fill(0)
    ellipse(270, textHeight+30,20,20)
    // ellipse(200, textHeight-70,20,20)

  } else {
    //ELSE --> RedWins    
    redWins++
    blackArray.length = 0;
    redArray.push(1);
    history.push(1);
    averageRedArray.push(redArray.length);
    //inzet erbij
    money = money + stake;
    stake = startStake;
    //langste streak bijhouden
    if (maxWinsRed < redWins) {
      maxWinsRed = redWins;
    }
    // maxstreak visualisatie data updaten?
    if (maxRedArray.length < redArray.length) {
      maxRedArray.length = redArray.length
    }
    fill(255,0,0)
    ellipse(270, textHeight+30,20,20)
    // ellipse(200, textHeight-70,20,20)
  }

  //Set gameOver
  if (money < 0 || stake > money) {
    endpointsX.push(x)
    endpointsY.push(y)
    totalaccount = totalaccount + money
    totalaccount = totalaccount - startMoney
    gameOverMinus++
    averageTurns.push(turns) 
    turns = 0;
    stake = startStake;
    money = startMoney;
    redWins = 0;
    blackWins = 0;
  }
  if (money > target) {
    totalaccount = totalaccount + money
    totalaccount = totalaccount - startMoney
    gameOverPlus++
    averageTurns.push(turns) 
    turns = 0;
    stake = startStake;
    money = startMoney;
    redWins = 0;
    blackWins = 0;
  }

  //reeksRood visualiseren  
  fill(255, 0, 0);
  for (let j = 0; j < redArray.length; j++) {
    rect(75 + (15 * j), textHeight + 55, 10, 10)
  }
  textSize(16)
  //maxArrays Rood visualiseren
  text("Record reeks Rood= "+ maxRedArray.length,300,textHeight + 70)
  for (let j = 0; j < maxRedArray.length; j++) {
    rect(75 + (15 * j), textHeight + 65, 10, 10)
  }

  //reeksZwart visualiseren  
  fill(0);
  for (let j = 0; j < blackArray.length; j++) {
    rect(600 + (15 * j), textHeight + 55, 10, 10)
  }
  //maxArrays zwart visualiseren
  text("Record reeks Zwart= "+ maxBlackArray.length,825,textHeight + 70)
  for (let j = 0; j < maxBlackArray.length; j++) {
    rect(600 + (15 * j), textHeight + 65, 10, 10)
  }
  fill(255);

  history.reverse()
 for (let i = 1; i < 20; i++) {
  switch(history[i]) {
    case 0:
      fill(0)
      ellipse(290 + (15 *i), textHeight +30 , 10, 10 ) 
      // code block
      break;
    case 1:
      fill(255,0,0)
      ellipse(290 + (15 *i), textHeight +30 , 10, 10 ) 
      // code block
      break;
    default:
      // code block
  }


 }

  
  //GRAFIEK VAN GELD
  let oldTurns = 0;
  if(turns > 250){
    oldTurns= turns-250
  }
  average = getAvg(averageTurns)
  if(average) {
    average
  } else {
    average = 850;
  }
  x = map(turns, oldTurns, average, 325, width-100,true)
  graphX.push(x)
  
  y = map(money, 0, target, 300, 100,true)
  graphY.push(y);

  push()
  stroke(255)
  line(325,300, width-100,300)
  line(325,300, 325,100)

  strokeWeight(1);
  fill(127,50)
  line(325,200, width-100,200)

  rotate( radians(90));
  textSize(24)
  noStroke()
  fill(255)
  text("Saldo speelgeld", 100, -290)

  stroke(0)
  pop()
  // lijn trekken 
  for (let j = 1; j < graphX.length; j++) {
    stroke(255)
    strokeWeight(2)
    if(graphX[j] !== 325){
      line(graphX[j-1], graphY[j-1],graphX[j], graphY[j])   
    }
    //laatste coordinaten markeren
    for(let i = 0; i < endpointsY.length; i++){
      fill(255,0,0)    
      ellipse(endpointsX[i], endpointsY[i], 10, 10);
      fill(255,0,0)    
    }
  }
  
  
  //walker kleur
  noStroke()
  if(money < startMoney) {
    fill(255,0,0)    
    ellipse(x, y, 10, 10);
  } else if(money === startMoney) {
    fill(255)
    ellipse(x, y, 10, 10);
  } else if(money > startMoney){
    fill(0,255,0,125);
    ellipse(x, y, 10, 10);
  }
  

  //Status geld
  fill(220)
  noStroke()
  textSize(24)
  text("Balans €" + totalaccount, 75, 100)
  text("Inzet €" + stake, 75, 150) 
  textSize(18)
  
  //grafiektekst
  text("Turn #" + turns + " = ", 75, textHeight+40)
  text("X-as # beurten", 600, textHeight - 20)
  
  //sessiecijfers
  // text("Turn #" + turns + " = ", 75, textHeight-60)
  text("Speelgeld €" +money, 75, textHeight -20 )
  textSize(12)
  text("Gemiddeld # beurten: " + Math.round(average), 600, textHeight)
  text("Doel €" +target, 135, textHeight)
  
  text("Laatste 19", 300, textHeight)

    
  textSize(24)
  //sessiecijfers rood
  text("Rood streak # " + redArray.length, 75, textHeight+100);
  text("Rood Totaal #" + redWins, 75, textHeight +140)
  text("Game Over-: " + gameOverMinus, 75, textHeight+180);
  
  //sessiecijfers zwart
  text("Zwart Streak # " + blackArray.length, 600, textHeight+100);
  text("Zwart Totaal #" + blackWins, 600, textHeight+140)
  text("Game Over+: " + gameOverPlus, 600, textHeight+180);
  
  //overkoepelende cijfers
  text("Totaal uitkomst rood #" + randomCounts[0], 75, textHeight+ 260);

  text("Totaal uitkomst zwart #" + randomCounts[1], 600,  textHeight+ 260);
  text("Totaal beurten #" + (Number(randomCounts[0]) + Number(randomCounts[1])), 600,  textHeight+ 300);
  text("Maximale inzet €" + maxstake, 75,  textHeight+ 300);

  text("Gemiddelde reeks zwart #" +  getAvg(averageBlackArray), 75,  textHeight+ 340);
  text("Gemiddelde reeks rood #" +  getAvg(averageRedArray), 600,  textHeight+ 340);

  //titels
  // fill(0)
  textSize(28)
  text("Alle Sessies samen", 75, textHeight + 230)
  text("Speel tot een winst van "+ target+ ", tot de 0 of totdat de inzet zo hoog is dat je startbudget niet dekt", 75, textHeight-300)
  
  //underlines
  stroke(255)
  line(75,585, width -75, textHeight+235);
  line(75,textHeight-295, width -75, textHeight-295);
}


function getAvg(grades) {
  const total = grades.reduce((acc, c) => acc + c, 0);
  return Math.round(total / grades.length);
}
