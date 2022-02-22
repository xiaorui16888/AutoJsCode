
auto();
//请求截图
if(!requestScreenCapture()){
    toast("请求截图失败");
    exit();
}


// (^| )log\(
  // log(
firstGridLeftTopCorner={x:77,y:647}
//挨着第一个格子
rightGrid={x:330,y:647}
downGrid={x:77,y:921}
leftRightDistance=rightGrid.x-firstGridLeftTopCorner.x
upDownDistance=downGrid.y-firstGridLeftTopCorner.y
lightScreen();
NumberColors={
  8:"#BEC9FF",
  16:"#7DD7FF",
  32:"#A6FFE3",
  64:"#A9FF9D",
  128:"#FFE682",
  256:"#FFA942",
  512:"#D583FF",
  1024:"#FEFC38"
}



//AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI
//      下面是AI的功能区
// AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI

function AI(grid) {
  this.grid = grid;
}

// static evaluation function
AI.prototype.eval2 = function() {
  let result
  let maxNum=this.grid.maxValue()
  var k=this.grid.middleMenAmount()
  var middleMenAmountPercentage=1-k/16
  let fair=maxNum/middleMenAmountPercentage
  result=maxNum+middleMenAmountPercentage*fair*2

  return result
};



AI.prototype.eval = function() {
  var emptyCells = this.grid.availableCells().length;

  // 单调性(Monotonicity) 2-4-8-16-32
  // 平滑性(Smoothness) 2-2-2-2-2-2-2-2
  var smoothWeight = 0.1,
      mono2Weight  = 2,
      emptyWeight  = 2.7,
      maxWeight    = 1.0;

      // var smoothWeight = 0.1,
      // mono2Weight  = 1.0,
      // emptyWeight  = 2.7,
      // maxWeight    = 1.0;

  //自己添加的权重参数
  var oppositeSidesWeight=0.1;
  var coherentWeight=0.1
  var middleMenAmountWeight=5
  var secondMaxWeight    = 3.0;
  var thirdMaxWeight    = 2.0;


  //倍倍果实
  let k=2;
  var weight64Weight=64*k/1024,
      weight128Weight=128*k/1024*10,
      weight256Weight=256*k/1024*10,
      weight512Weight=512*k/1024*10,
      weight1024Weight=1024*k/1024*10;






  var result
  result=this.grid.smoothness() * smoothWeight
       //+ this.grid.monotonicity() * monoWeight
       //- this.grid.islands() * islandWeight
       + this.grid.monotonicity2() * mono2Weight
       + Math.log(emptyCells) * emptyWeight
       + this.grid.maxValue() * maxWeight
       + this.grid.secondMaxValue() * secondMaxWeight
       + this.grid.thirdMaxValue() * thirdMaxWeight

 //log("result元始天尊=",result)


  // "异侧减分"
  if(this.grid.isSecondAndThirdOppositeSideOfTheLargeNumber()){
    resultIsSecondAndThirdOppositeSideOfTheLargeNumber=0
  }else{
    //"同侧加分"
    if(result>=0){
      resultIsSecondAndThirdOppositeSideOfTheLargeNumber=result*oppositeSidesWeight
    }else{
      resultIsSecondAndThirdOppositeSideOfTheLargeNumber=-result*oppositeSidesWeight
    }
  }

  // "前三名在同一列或者同一行加分"
  if(this.grid.coherent()){
    if(result>=0){
      resultCoherent=result*coherentWeight
    }else{
      resultCoherent=-result*coherentWeight
    }
  }else{
    resultCoherent=0
  }

  var k2=this.grid.middleMenAmount()
  var middleMenAmountPercentage=1-k2/16
  resultMiddleMenAmount=result*middleMenAmountPercentage
  if(result>=0){
    resultMiddleMenAmount=result*middleMenAmountWeight
  }else{
    resultMiddleMenAmount=-result*middleMenAmountWeight
  }




  if(this.grid.numSameAndRowSame(64)){
    resultNumSameAndRowSame64=result*weight64Weight
  }else{
    resultNumSameAndRowSame64=0
  }
  if(this.grid.numSameAndRowSame(128)){
    resultNumSameAndRowSame128=result*weight128Weight
  }else{
    resultNumSameAndRowSame128=0
  }
  if(this.grid.numSameAndRowSame(256)){
    resultNumSameAndRowSame256=result*weight256Weight
  }else{
    resultNumSameAndRowSame256=0
  }
  if(this.grid.numSameAndRowSame(512)){
    resultNumSameAndRowSame512=result*weight512Weight
  }else{
    resultNumSameAndRowSame512=0
  }
  if(this.grid.numSameAndRowSame(1024)){
    resultNumSameAndRowSame1024=result*weight1024Weight
  }else{
    resultNumSameAndRowSame1024=0
  }



  result=result+resultIsSecondAndThirdOppositeSideOfTheLargeNumber+
                resultCoherent+
                resultMiddleMenAmount+
                resultNumSameAndRowSame64+
                resultNumSameAndRowSame128+
                resultNumSameAndRowSame256+
                resultNumSameAndRowSame512+
                resultNumSameAndRowSame1024
 //log("168行result=",result)
  // exit()
  return result
};

// alpha-beta depth first search
AI.prototype.search = function(depth, alpha, beta, positions, cutoffs) {
  ////log("=\n",depth, alpha, beta, positions, cutoffs)
  var bestScore;
  var bestMove = -1;
  var result;

  // the maxing player
  if (this.grid.playerTurn) {
    bestScore = alpha;
    for (var direction in [0, 1, 2, 3]) {
      var newGrid = this.grid.clone();
      if (newGrid.move(direction).moved) {
        positions++;
        if (newGrid.isWin()) {
          return { move: direction, score: 10000, positions: positions, cutoffs: cutoffs };
        }
        var newAI = new AI(newGrid);

        if (depth == 0) {
          result = { move: direction, score: newAI.eval() };
        } else {
          result = newAI.search(depth-1, bestScore, beta, positions, cutoffs);
          if (result.score > 9900) { // win
            result.score--; // to slightly penalize higher depth from win
          }
          positions = result.positions;
          cutoffs = result.cutoffs;
        }

        if (result.score > bestScore) {
          bestScore = result.score;
          bestMove = direction;
        }
        if (bestScore > beta) {
          cutoffs++
          return { move: bestMove, score: beta, positions: positions, cutoffs: cutoffs };
        }
      }
    }
  }

  else { // computer's turn, we'll do heavy pruning to keep the branching factor low
    bestScore = beta;

    // try a 2 and 4 in each cell and measure how annoying it is
    // with metrics from eval
    var candidates = [];
    var cells = this.grid.availableCells();
    var scores = {8: []};
    for (var value in scores) {
      for (var i in cells) {
        scores[value].push(null);
        var cell = cells[i];
        var tile = new Tile(cell, parseInt(value, 10));
        this.grid.insertTile(tile);
        scores[value][i] = -this.grid.smoothness() + this.grid.islands();
        this.grid.removeTile(cell);
      }
    }

    // now just pick out the most annoying moves
    var maxScore = Math.max(Math.max.apply(null, scores[8]));
    for (var value in scores) { // 2 and 4
      for (var i=0; i<scores[value].length; i++) {
        if (scores[value][i] == maxScore) {
          candidates.push( { position: cells[i], value: parseInt(value, 10) } );
        }
      }
    }

    // search on each candidate
    for (var i=0; i<candidates.length; i++) {
      var position = candidates[i].position;
      var value = candidates[i].value;
      var newGrid = this.grid.clone();
      var tile = new Tile(position, value);
      newGrid.insertTile(tile);
      newGrid.playerTurn = true;
      positions++;
      newAI = new AI(newGrid);
      result = newAI.search(depth, alpha, bestScore, positions, cutoffs);
      positions = result.positions;
      cutoffs = result.cutoffs;

      if (result.score < bestScore) {
        bestScore = result.score;
      }
      if (bestScore < alpha) {
        cutoffs++;
        return { move: null, score: alpha, positions: positions, cutoffs: cutoffs };
      }
    }
  }

  return { move: bestMove, score: bestScore, positions: positions, cutoffs: cutoffs };
}

// performs a search and returns the best move
AI.prototype.getBest = function() {
  return this.iterativeDeep();
}

// performs iterative deepening over the alpha-beta search
AI.prototype.iterativeDeep = function() {
  var start = (new Date()).getTime();
  var depth = 0;
  var best;
  do {
   //log("do while best=",best)
    var newBest = this.search(depth, -10000, 10000, 0 ,0);
    if (newBest.move == -1) {
      break;
    } else {
      best = newBest;
    }
    depth++;
  } while ( (new Date()).getTime() - start < minSearchTime);
 //log("best=",best)
  return best
}

AI.prototype.translate = function(move) {
 return {
    0: 'up',
    1: 'right',
    2: 'down',
    3: 'left'
  }[move];
}



//AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI
//      上面是AI的功能区
// AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI AI



// ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
//      下面是方块的功能区
// ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■

function Tile(position, value) {
  this.x                = position.x;
  this.y                = position.y;
  this.value            = value || 8;

  this.previousPosition = null;
  this.mergedFrom       = null; // Tracks tiles that merged together
}

Tile.prototype.savePosition = function () {
  this.previousPosition = { x: this.x, y: this.y };
};

Tile.prototype.updatePosition = function (position) {
  this.x = position.x;
  this.y = position.y;
};

Tile.prototype.clone = function() {
  newTile = new Tile({ x: this.x, y: this.y }, this.value);
  //newTile.previousPosition = { x: this.previousPosition.x, y: this.previousPosition.y };
  //newTile.mergedFrom = { x: this.previousPosition.x, y: this.previousPosition.y };
  return newTile;
}


// ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
//      上面是方块的功能区
// ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■



//□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
//      下面是格子的功能区
// □□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□


Grid.prototype.geneSort=function(){
  var gene = [];
  this.eachCell(function (x, y, tile) {
    if(tile){
      gene.push( {x:x, y:y,num:tile.value} );
    }
  });
  var compareObj = function (prop) {
    return function (obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1);
            val2 = Number(val2);
        }
        if (val1 > val2) {
            return -1;
        } else if (val1 < val2) {
            return 1;
        } else {
            return 0;
        }
    }
  }
  return gene.sort(compareObj("num"))
}


Grid.prototype.extractingSameNumber=function(num){
  var gene = [];
  this.eachCell(function (x, y, tile) {
    if(tile && tile.value==num){
      gene.push( {x:x, y:y,num:tile.value} );
    }
  });
  if(gene.length>=2){
    return gene
  }
  return false
}






Grid.prototype.numSameAndRowSame = function (num) {
  var gene=this.extractingSameNumber(num)
  if(gene){
    switch(gene.length)
    {
      case 2:
        return numTail(gene[0],gene[1])
      case 3:
        return numTail(gene[0],gene[1]) || numTail(gene[0],gene[2]) || numTail(gene[1],gene[2])
      case 4:
        return numTail(gene[0],gene[1]) || numTail(gene[0],gene[2]) || numTail(gene[0],gene[3]) || numTail(gene[1],gene[2]) || numTail(gene[1],gene[3]) || numTail(gene[2],gene[3])
      case 5:
        return numTail(gene[0],gene[1]) || numTail(gene[0],gene[2]) || numTail(gene[0],gene[3]) || numTail(gene[0],gene[4]) || numTail(gene[1],gene[2]) || numTail(gene[1],gene[3]) || numTail(gene[1],gene[4]) || numTail(gene[2],gene[3]) || numTail(gene[2],gene[4]) || numTail(gene[3],gene[4])
      default:
     //log('相同的数字',num,"数组的长度=",gene.length,"相同数字坐标详情=",gene,"数目不是2,3,4,5中的数字","程序检测异常,脚本结束")
      exit()

      // 相同的数字 32 数组的长度= 6 相同数字坐标详情=
      //  [ { x: 0, y: 0, num: 32 },
      //   { x: 1, y: 1, num: 32 },
      //   { x: 1, y: 2, num: 32 },
      //   { x: 2, y: 1, num: 32 },
      //   { x: 3, y: 0, num: 32 },
      //   { x: 3, y: 3, num: 32 } ] 数目不是2,3,4,5中的数字 程序检测异常,脚本结束






    }

  }else{
    return 0
  }

};







//中间人是弱者,中间人两边都是强者,这不符合2048的风格
//2048的风格是   弱,强,更强

//返回中间人是弱者的个数
function isMiddleMan(tile1,tile2,tile3){
  if((tile1.value>tile2.value && tile3.value>tile2.value) ||
     (tile1.value<tile2.value && tile3.value<tile2.value)){
       return true
     }else{
       return false
     }
}
Grid.prototype.middleMenAmount = function () {
  var gene = [];
  this.eachCell(function (x, y, tile) {
    if(tile){
      gene.push( {x:x, y:y,value:tile.value} );
    }
  });
  ////log("Grid.prototype.middleMenAmount")
  // this.toString()
  ////log("\n",gene)
  //   //  00 10 20 30
  //   //  01 11 21 31
  //   //  02 12 22 32
  //   //  03 13 23 33
  var k=0
  if(gene.length==0){return k}
  for(let i=0;i<gene.length;i++){
    if(
      (

        this.cells[(gene[i].x)-1] &&
        this.cells[(gene[i].x)+1] &&
        this.cells[(gene[i].x)-1][(gene[i]).y] &&
        this.cells[(gene[i].x)+1][(gene[i]).y] &&
        isMiddleMan(this.cells[(gene[i].x)-1][(gene[i]).y],
                this.cells[(gene[i].x)][(gene[i]).y],
                this.cells[(gene[i].x)+1][(gene[i]).y]
               ))

               ||

      (

        this.cells[(gene[i].x)] &&
        this.cells[(gene[i].x)][((gene[i]).y)-1] &&
        this.cells[(gene[i].x)][((gene[i]).y)+1] &&
        isMiddleMan(this.cells[(gene[i].x)][((gene[i]).y)-1],
                this.cells[(gene[i].x)][(gene[i]).y],
                this.cells[(gene[i].x)][((gene[i]).y)+1]
              ))

    ){
      ////log(this.cells[(gene[i].x)][(gene[i]).y],
      //     this.cells[(gene[i].x)][(gene[i]).y].value)
      k++;
    }

  }
  return k;
};
//第二第三第四个数字是不是在第一个数字的两侧
//是返回true惩罚

Grid.prototype.isSecondAndThirdOppositeSideOfTheLargeNumber = function () {
  var gene = [];
  this.eachCell(function (x, y, tile) {
    if(tile){
      gene.push( {x:x, y:y,num:tile.value} );
    }
  });

  var compareObj = function (prop) {
    return function (obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1);
            val2 = Number(val2);
        }
        if (val1 > val2) {
            return -1;
        } else if (val1 < val2) {
            return 1;
        } else {
            return 0;
        }
    }
  }
  gene.sort(compareObj("num"))
    //  00 10 20 30
    //  01 11 21 31
    //  02 12 22 32
    //  03 13 23 33

  var result
  if(
    gene[1] && gene[2] && gene[3] &&
     (

      ( (gene[3].x-gene[0].x)>=0 &&
      (gene[1].x-gene[0].x)>=0 &&
      (gene[2].x-gene[0].x)>=0) ||


      ( (gene[3].x-gene[0].x)<=0 &&
      (gene[1].x-gene[0].x)<=0 &&
      (gene[2].x-gene[0].x)<=0)||


      ( (gene[3].y-gene[0].y)<=0 &&
      (gene[1].y-gene[0].y)<=0 &&
      (gene[2].y-gene[0].y)<=0)||


      ( (gene[3].y-gene[0].y)<=0 &&
      (gene[1].y-gene[0].y)<=0 &&
      (gene[2].y-gene[0].y)<=0)

    )
    )

  {
    result= false
   //log("老二和老三在同一侧")
  }
  else{
    result= true
   //log("老二和老三不在同一侧")

  }
  return result;
};


























//-------------------上面是自己定义的权重函数---------------------
function Grid(size) {
  this.size = size;
  this.startTiles   = 2;

  this.cells = [];

  this.build();
  this.playerTurn = true;
}

// pre-allocate these objects (for speed)
Grid.prototype.indexes = [];
for (var x=0; x<4; x++) {
  Grid.prototype.indexes.push([]);
  for (var y=0; y<4; y++) {
    Grid.prototype.indexes[x].push( {x:x, y:y} );
  }
}

// Build a grid of the specified size
Grid.prototype.build = function () {
  for (var x = 0; x < this.size; x++) {
    var row = this.cells[x] = [];

    for (var y = 0; y < this.size; y++) {
      row.push(null);
    }
  }
};


// Find the first available random position
Grid.prototype.randomAvailableCell = function () {
  var cells = this.availableCells();

  if (cells.length) {
    return cells[Math.floor(Math.random() * cells.length)];
  }
};

Grid.prototype.availableCells = function () {
  var cells = [];
  var self = this;

  this.eachCell(function (x, y, tile) {
    if (!tile) {
      //cells.push(self.indexes[x][y]);
      cells.push( {x:x, y:y} );
    }
  });

  return cells;
};

// Call callback for every cell
Grid.prototype.eachCell = function (callback) {
  for (var x = 0; x < this.size; x++) {
    for (var y = 0; y < this.size; y++) {
      callback(x, y, this.cells[x][y]);
    }
  }
};

// Check if there are any cells available
Grid.prototype.cellsAvailable = function () {
  return !!this.availableCells().length;
};

// Check if the specified cell is taken
Grid.prototype.cellAvailable = function (cell) {
  return !this.cellOccupied(cell);
};

Grid.prototype.cellOccupied = function (cell) {
  return !!this.cellContent(cell);
};

Grid.prototype.cellContent = function (cell) {
  if (this.withinBounds(cell)) {
    return this.cells[cell.x][cell.y];
  } else {
    return null;
  }
};

// Inserts a tile at its position
Grid.prototype.insertTile = function (tile) {
  this.cells[tile.x][tile.y] = tile;
};

Grid.prototype.removeTile = function (tile) {
  this.cells[tile.x][tile.y] = null;
};

Grid.prototype.withinBounds = function (position) {
  return position.x >= 0 && position.x < this.size &&
         position.y >= 0 && position.y < this.size;
};

Grid.prototype.clone = function() {
  newGrid = new Grid(this.size);
  newGrid.playerTurn = this.playerTurn;
  for (var x = 0; x < this.size; x++) {
    for (var y = 0; y < this.size; y++) {
      if (this.cells[x][y]) {
        newGrid.insertTile(this.cells[x][y].clone());
      }
    }
  }
  return newGrid;
};

// Set up the initial tiles to start the game with
Grid.prototype.addStartTiles = function () {
  for (var i=0; i<this.startTiles; i++) {
    this.addRandomTile();
  }
};

// Adds a tile in a random position
Grid.prototype.addRandomTile = function () {
  if (this.cellsAvailable()) {
    var value = 8;
    //var value = Math.random() < 0.9 ? 256 : 512;
    var tile = new Tile(this.randomAvailableCell(), value);

    this.insertTile(tile);
  }
};

// Save all tile positions and remove merger info
Grid.prototype.prepareTiles = function () {
  this.eachCell(function (x, y, tile) {
    if (tile) {
      tile.mergedFrom = null;
      tile.savePosition();
    }
  });
};

// Move a tile and its representation
Grid.prototype.moveTile = function (tile, cell) {
  this.cells[tile.x][tile.y] = null;
  this.cells[cell.x][cell.y] = tile;
  tile.updatePosition(cell);
};


Grid.prototype.vectors = {
  0: { x: 0,  y: -1 }, // up
  1: { x: 1,  y: 0 },  // right
  2: { x: 0,  y: 1 },  // down
  3: { x: -1, y: 0 }   // left
}

// Get the vector representing the chosen direction
Grid.prototype.getVector = function (direction) {
  // Vectors representing tile movement
  return this.vectors[direction];
};

// Move tiles on the grid in the specified direction
// returns true if move was successful
Grid.prototype.move = function (direction) {
  // 0: up, 1: right, 2:down, 3: left
  var self = this;

  var cell, tile;

  var vector     = this.getVector(direction);
  var traversals = this.buildTraversals(vector);
  var moved      = false;
  var score      = 0;
  var won        = false;

  // Save the current tile positions and remove merger information
  this.prepareTiles();

  // Traverse the grid in the right direction and move tiles
  traversals.x.forEach(function (x) {
    traversals.y.forEach(function (y) {
      cell = self.indexes[x][y];
      tile = self.cellContent(cell);

      if (tile) {
        //if (debug) {
          //console.log('tile @', x, y);
        //}
        var positions = self.findFarthestPosition(cell, vector);
        var next      = self.cellContent(positions.next);

        // Only one merger per row traversal?
        if (next && next.value === tile.value && !next.mergedFrom) {
          var merged = new Tile(positions.next, tile.value * 2);
          merged.mergedFrom = [tile, next];

          self.insertTile(merged);
          self.removeTile(tile);

          // Converge the two tiles' positions
          tile.updatePosition(positions.next);

          // Update the score
          score += merged.value;

          // The mighty 2048 tile
          if (merged.value === 2048) {
            won = true;
          }
        } else {
          //if (debug) {
            //console.log(cell);
            //console.log(tile);
          //}
          self.moveTile(tile, positions.farthest);
        }

        if (!self.positionsEqual(cell, tile)) {
          self.playerTurn = false;
          //console.log('setting player turn to ', self.playerTurn);
          moved = true; // The tile moved from its original cell!
        }
      }
    });
  });

  //console.log('returning, playerturn is', self.playerTurn);
  //if (!moved) {
    //console.log('cell', cell);
    //console.log('tile', tile);
    //console.log('direction', direction);
    //console.log(this.toString());
  //}
  return {moved: moved, score: score, won: won};
};

Grid.prototype.computerMove = function() {
  this.addRandomTile();
  this.playerTurn = true;
}

// Build a list of positions to traverse in the right order
Grid.prototype.buildTraversals = function (vector) {
  var traversals = { x: [], y: [] };

  for (var pos = 0; pos < this.size; pos++) {
    traversals.x.push(pos);
    traversals.y.push(pos);
  }

  // Always traverse from the farthest cell in the chosen direction
  if (vector.x === 1) traversals.x = traversals.x.reverse();
  if (vector.y === 1) traversals.y = traversals.y.reverse();

  return traversals;
};

Grid.prototype.findFarthestPosition = function (cell, vector) {
  var previous;

  // Progress towards the vector direction until an obstacle is found
  do {
    previous = cell;
    cell     = { x: previous.x + vector.x, y: previous.y + vector.y };
  } while (this.withinBounds(cell) &&
           this.cellAvailable(cell));

  return {
    farthest: previous,
    next: cell // Used to check if a merge is required
  };
};

Grid.prototype.movesAvailable = function () {
  return this.cellsAvailable() || this.tileMatchesAvailable();
};

// Check for available matches between tiles (more expensive check)
// returns the number of matches
Grid.prototype.tileMatchesAvailable = function () {
  var self = this;

  //var matches = 0;

  var tile;

  for (var x = 0; x < this.size; x++) {
    for (var y = 0; y < this.size; y++) {
      tile = this.cellContent({ x: x, y: y });

      if (tile) {
        for (var direction = 0; direction < 4; direction++) {
          var vector = self.getVector(direction);
          var cell   = { x: x + vector.x, y: y + vector.y };

          var other  = self.cellContent(cell);

          if (other && other.value === tile.value) {
            return true; //matches++; // These two tiles can be merged
          }
        }
      }
    }
  }

  //console.log(matches);
  return false; //matches;
};

Grid.prototype.positionsEqual = function (first, second) {
  return first.x === second.x && first.y === second.y;
};

Grid.prototype.toString = function() {
  string = '';
  for (var i=0; i<4; i++) {
    for (var j=0; j<4; j++) {
      if (this.cells[j][i]) {
        string += this.cells[j][i].value + ' ';
      } else {
        string += '_ ';
      }
    }
    string += '\n';
  }
  return string;
}

// counts the number of isolated groups.
Grid.prototype.islands = function() {
  var self = this;
  var mark = function(x, y, value) {
    if (x >= 0 && x <= 3 && y >= 0 && y <= 3 &&
        self.cells[x][y] &&
        self.cells[x][y].value == value &&
        !self.cells[x][y].marked ) {
      self.cells[x][y].marked = true;

      for (direction in [0,1,2,3]) {
        var vector = self.getVector(direction);
        mark(x + vector.x, y + vector.y, value);
      }
    }
  }

  var islands = 0;

  for (var x=0; x<4; x++) {
    for (var y=0; y<4; y++) {
      if (this.cells[x][y]) {
        this.cells[x][y].marked = false
      }
    }
  }
  for (var x=0; x<4; x++) {
    for (var y=0; y<4; y++) {
      if (this.cells[x][y] &&
          !this.cells[x][y].marked) {
        islands++;
        mark(x, y , this.cells[x][y].value);
      }
    }
  }

  return islands;
}


// measures how smooth the grid is (as if the values of the pieces
// were interpreted as elevations). Sums of the pairwise difference
// between neighboring tiles (in log space, so it represents the
// number of merges that need to happen before they can merge).
// Note that the pieces can be distant
Grid.prototype.smoothness = function() {
  var smoothness = 0;
  var midNumber=this.midNum()
  for (var x=0; x<4; x++) {
    for (var y=0; y<4; y++) {
      if ( this.cellOccupied( this.indexes[x][y] || this.indexes[x][y].value>=midNumber)) {
        var value = Math.log(this.cellContent( this.indexes[x][y] ).value) / Math.log(8);
        for (var direction=1; direction<=2; direction++) {
          var vector = this.getVector(direction);
          var targetCell = this.findFarthestPosition(this.indexes[x][y], vector).next;

          if (this.cellOccupied(targetCell)) {
            var target = this.cellContent(targetCell);
            var targetValue = Math.log(target.value) / Math.log(8);
            smoothness -= Math.abs(value - targetValue);
          }
        }
      }
    }
  }
  return smoothness;
}

Grid.prototype.monotonicity = function() {
  var self = this;
  var marked = [];
  var queued = [];
  var highestValue = 0;
  var highestCell = {x:0, y:0};
  var midNumber=this.midNum()

  for (var x=0; x<4; x++) {
    marked.push([]);
    queued.push([]);
    for (var y=0; y<4; y++) {
      marked[x].push(false);
      queued[x].push(false);
      if (this.cells[x][y] &&
          this.cells[x][y].value > midNumber) {
        highestValue = this.cells[x][y].value;
        highestCell.x = x;
        highestCell.y = y;
      }
    }
  }

  increases = 0;
  cellQueue = [highestCell];
  queued[highestCell.x][highestCell.y] = true;
  markList = [highestCell];
  markAfter = 1; // only mark after all queued moves are done, as if searching in parallel

  var markAndScore = function(cell) {
    markList.push(cell);
    var value;
    if (self.cellOccupied(cell)) {
      value = Math.log(self.cellContent(cell).value) / Math.log(8);
    } else {
      value = 0;
    }
    for (direction in [0,1,2,3]) {
      var vector = self.getVector(direction);
      var target = { x: cell.x + vector.x, y: cell.y+vector.y }
      if (self.withinBounds(target) && !marked[target.x][target.y]) {
        if ( self.cellOccupied(target) ) {
          targetValue = Math.log(self.cellContent(target).value ) / Math.log(8);
          if ( targetValue > value ) {
            //console.log(cell, value, target, targetValue);
            increases += targetValue - value;
          }
        }
        if (!queued[target.x][target.y]) {
          cellQueue.push(target);
          queued[target.x][target.y] = true;
        }
      }
    }
    if (markAfter == 0) {
      while (markList.length > 0) {
        var cel = markList.pop();
        marked[cel.x][cel.y] = true;
      }
      markAfter = cellQueue.length;
    }
  }

  while (cellQueue.length > 0) {
    markAfter--;
    markAndScore(cellQueue.shift())
  }

  return -increases;
}

// measures how monotonic the grid is. This means the values of the tiles are strictly increasing
// or decreasing in both the left/right and up/down directions
Grid.prototype.monotonicity2 = function() {
  // scores for all four directions
  var totals = [0, 0, 0, 0];

  // up/down direction
  for (var x=0; x<4; x++) {
    var current = 0;
    var next = current+1;
    while ( next<4 ) {
      while ( next<4 && !this.cellOccupied( this.indexes[x][next] )) {
        next++;
      }
      if (next>=4) { next--; }
      var currentValue = this.cellOccupied({x:x, y:current}) ?
        Math.log(this.cellContent( this.indexes[x][current] ).value) / Math.log(8) :
        0;
      var nextValue = this.cellOccupied({x:x, y:next}) ?
        Math.log(this.cellContent( this.indexes[x][next] ).value) / Math.log(8) :
        0;
      if (currentValue > nextValue) {
        totals[0] += nextValue - currentValue;
      } else if (nextValue > currentValue) {
        totals[1] += currentValue - nextValue;
      }
      current = next;
      next++;
    }
  }

  // left/right direction
  for (var y=0; y<4; y++) {
    var current = 0;
    var next = current+1;
    while ( next<4 ) {
      while ( next<4 && !this.cellOccupied( this.indexes[next][y] )) {
        next++;
      }
      if (next>=4) { next--; }
      var currentValue = this.cellOccupied({x:current, y:y}) ?
        Math.log(this.cellContent( this.indexes[current][y] ).value) / Math.log(8) :
        0;
      var nextValue = this.cellOccupied({x:next, y:y}) ?
        Math.log(this.cellContent( this.indexes[next][y] ).value) / Math.log(8) :
        0;
      if (currentValue > nextValue) {
        totals[2] += nextValue - currentValue;
      } else if (nextValue > currentValue) {
        totals[3] += currentValue - nextValue;
      }
      current = next;
      next++;
    }
  }

  return Math.max(totals[0], totals[1]) + Math.max(totals[2], totals[3]);
}

Grid.prototype.maxValue = function() {
  var max = 0;
  for (var x=0; x<4; x++) {
    for (var y=0; y<4; y++) {
      if (this.cellOccupied(this.indexes[x][y])) {
        var value = this.cellContent(this.indexes[x][y]).value;
        if (value > max) {
          max = value;
        }
      }
    }
  }

  return Math.log(max) / Math.log(8);
}

Grid.prototype.secondMaxValue = function() {
  var max = this.geneSort()[1].num
 //log("secondMaxValue=",max)
  return Math.log(max) / Math.log(8);
}
Grid.prototype.thirdMaxValue = function() {
  var gene=this.geneSort()
  if(gene.length>=3){
    var max = gene[2].num
    return Math.log(max) / Math.log(8);
  }
  return 0
}



Grid.prototype.maxTile = function() {
  var max = 0;
  var maxTile=null
  for (var x=0; x<4; x++) {
    for (var y=0; y<4; y++) {
      if (this.cellOccupied(this.indexes[x][y])) {
        var value = this.cellContent(this.indexes[x][y]).value;
        if (value > max) {
          max = value;
          maxTile=this.cellContent(this.indexes[x][y])
        }
      }
    }
  }

  return maxTile
}

// WIP. trying to favor top-heavy distributions (force consolidation of higher value tiles)
/*
Grid.prototype.valueSum = function() {
  var valueCount = [];
  for (var i=0; i<11; i++) {
    valueCount.push(0);
  }

  for (var x=0; x<4; x++) {
    for (var y=0; y<4; y++) {
      if (this.cellOccupied(this.indexes[x][y])) {
        valueCount[Math.log(this.cellContent(this.indexes[x][y]).value) / Math.log(8)]++;
      }
    }
  }

  var sum = 0;
  for (var i=1; i<11; i++) {
    sum += valueCount[i] * Math.pow(2, i) + i;
  }

  return sum;
}
*/

// check for win
Grid.prototype.isWin = function() {
  var self = this;
  for (var x=0; x<4; x++) {
    for (var y=0; y<4; y++) {
      if (self.cellOccupied(this.indexes[x][y])) {
        if (self.cellContent(this.indexes[x][y]).value == 2048) {
          return true;
        }
      }
    }
  }
  return false;
}



// midNum
// coherent


Grid.prototype.midNum = function () {
  var gene = [];
  this.eachCell(function (x, y, tile) {
    if(tile){
      gene.push( {x:x, y:y,num:tile.value} );
    }
  });
  var compareObj = function (prop) {
    return function (obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1);
            val2 = Number(val2);
        }
        if (val1 > val2) {
            return -1;
        } else if (val1 < val2) {
            return 1;
        } else {
            return 0;
        }
    }
  }
  gene.sort(compareObj("num"))


  let result=gene[Math.floor(gene.length/2)].num

  return result;
};

function numTail(first,second){
  if((first.x==second.x && Math.abs(first.y-second.y)==1) ||
      (first.y==second.y && Math.abs(first.x-second.x)==1)
){
  return true
  }
  return false
}
Grid.prototype.coherent = function () {
  var gene = this.geneSort()


  let result
  if(
    gene[0] && gene[1] && gene[2] &&
    numTail(gene[0],gene[1]) &&
    numTail(gene[2],gene[1])
  ){
    //糖葫芦串串
    result= true
  }else{
    result= 0
  }
  return result;
};


function grid1SameGrid2(grid1,grid2){
  let gene1=grid1.geneSort()
  let gene2=grid2.geneSort()
 //log("gene1=",gene1)
 //log("gene2=",gene2)
  if(gene1.length==gene2.length){
    for(let i=0;i<1;i++){
      if(gene1[i].num==gene2[i].num){

      }else{

       //log("两个格子不一样哦")
        return false
      }
    }
   //log("两个格子一样样儿的")
    return true
  }else{
   //log("两个格子不一样哦")
    return false
  }



}
// Grid.prototype.coherent = function () {
//   var gene = [];
//   this.eachCell(function (x, y, tile) {
//     if(tile){
//       gene.push( {x:x, y:y,num:tile.value} );
//     }
//   });
//   var compareObj = function (prop) {
//     return function (obj1, obj2) {
//         var val1 = obj1[prop];
//         var val2 = obj2[prop];
//         if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
//             val1 = Number(val1);
//             val2 = Number(val2);
//         }
//         if (val1 > val2) {
//             return -1;
//         } else if (val1 < val2) {
//             return 1;
//         } else {
//             return 0;
//         }
//     }
//   }
//   gene.sort(compareObj("num"))
//   function numTail(first,second){
//     if((first.x==second.x && Math.abs(first.y-second.y)==1) ||
//         (first.y==second.y && Math.abs(first.x-second.x)==1)
//   ){
//     return true
//     }
//     return false
//   }

//   let result
//   if(
//     gene[0] && gene[1] && gene[2] &&
//     numTail(gene[0],gene[1]) &&
//     numTail(gene[2],gene[1])
//   ){
//     //糖葫芦串串
//     result= true
//   }else{
//     result= false
//   }
//   return result;
// };






//□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
//      上面是格子的功能区
// □□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□

















function Grid(size) {
  this.size = size;
  this.startTiles   = 2;

  this.cells = [];

  this.build();
  this.playerTurn = true;
}


while(1){

  try{
    foolTime=16000
    // foolTime=0

    minSearchTime=33;
    previousCellsLength=0
    previousNewGrid=new Grid(4)
    previousNewGrid2=new Grid(4)
    ascu = android.os.SystemClock.uptimeMillis;
    //20秒无脑下滑




    startTime=ascu();
    while(1){
      //---------------------无限循环开始-----------------------------
        grids=recogniseGrid()
        ////log("\n",grids)

        ////log(grids)
        // 转换完毕,添加AI,Tile,Grid
        newGrid=new Grid(4)
        for(let i=0;i<grids.length;i++){
          var newTile= new Tile(grids[i][0],grids[i][1])
          newGrid.insertTile(newTile)
        }
        ////log("\n",newGrid.toString())
        ////log("1202行结束脚本")
        // exit()
        ////log(newGrid.toString())
        cellsLength = newGrid.availableCells().length;
        ////log("cellsLength>=5",cellsLength>=5,cellsLength)
        ////log("previousCellsLength=",previousCellsLength)
        ////log("cellsLength!=previousCellsLength",cellsLength!=previousCellsLength)
        // exit()

        endTime=ascu();
        spendTime=endTime-startTime
       //log("AI或者脑残")
       //log("spendTime<foolTime=",spendTime<foolTime,"grid1SameGrid2(previousNewGrid,newGrid)=",grid1SameGrid2(previousNewGrid,newGrid),"newGrid=",newGrid,"previousNewGrid=",previousNewGrid)
        ////log("spendTime<foolTime=",spendTime<foolTime,"cellsLength!=previousCellsLength=",cellsLength!=previousCellsLength,"cellsLength=",cellsLength,"previousCellsLength=",previousCellsLength)
       //log("spendTime<foolTime=",spendTime<foolTime,"grid1SameGrid2(previousNewGrid,newGrid)=",!grid1SameGrid2(previousNewGrid,newGrid))
        if(spendTime<foolTime && !grid1SameGrid2(previousNewGrid,newGrid)){
        // if(spendTime<foolTime && cellsLength!=previousCellsLength){
         //log("脑残")
        // if(cellsLength>=5  && cellsLength!=previousCellsLength){
          // 空格子大于等于7,那么就按照下下左的方式来滑动
          // 滑动的方向取决于最大数的位置
          var maxTile=newGrid.maxTile()
          ////log("maxTile=",maxTile)
          // maxTile= { x: 0, y: 1, value: 8, previousPosition: null, mergedFrom: null }
          var maxTileTwoDimensionalCoordinates=twoDimensionalCoordinates(maxTile)
          var topLeftCorner="00,01,10,11";
          ////log("定义之后就打印的topLeftCorner=",topLeftCorner)
          var topRightCorner="30,31,20,21";
          var bottomLeftCorner="03,02,13,12";
          var bottomRightCorner="33,32,23,22";
          ////log("使用前打印的topLeftCorner=",topLeftCorner);
         //log("要判断如何滑动了,最大值的坐标是",maxTileTwoDimensionalCoordinates)
          if(topLeftCorner.indexOf(maxTileTwoDimensionalCoordinates) != -1){
           //log("up","up","left")
            多次滑动(["up","up","left"])
            previousDirection="topLeftCorner"
          }else if(topRightCorner.indexOf(maxTileTwoDimensionalCoordinates) != -1){
           //log("up","up","right")
            多次滑动(["up","up","right"])
            previousDirection="topRightCorner"
          }else if(bottomLeftCorner.indexOf(maxTileTwoDimensionalCoordinates) != -1){
           //log("down","down","left")
            多次滑动(["down","down","left"])
            previousDirection="bottomLeftCorner"
          }else if(bottomRightCorner.indexOf(maxTileTwoDimensionalCoordinates) != -1){
           //log("down","down","right")
            多次滑动(["down","down","right"])
            previousDirection="bottomRightCorner"
          }else{
          //  log("滑块不在四个角,有内鬼,调用AI")
          //   newAI=new AI(newGrid)
          //   bestDirectionNum=newAI.getBest().move
          //   bestDirection=newAI.translate(bestDirectionNum)
          //   ////log("bestDirection=",bestDirection)
          //   滑动(bestDirection)
          //   // exit()
           log("滑块不在四个角,有内鬼,脚本结束")
            exit()
          }
          previousNewGrid=newGrid
          ////log("多次滑动已经执行")
          // exit()
        }
        else if(spendTime<foolTime && grid1SameGrid2(previousNewGrid2,newGrid)){
          switch(previousDirection)
          {
          case 'topLeftCorner':
            右滑()
            多次滑动(["up","up","left"])
            break;
          case 'topRightCorner':
            左滑()
            多次滑动(["up","up","right"])
            break;
          case 'bottomLeftCorner':
            右滑()
            多次滑动(["down","down","left"])
            break;
          case 'bottomRightCorner':
            左滑()
            多次滑动(["down","down","right"])
              break;
          default:
            log('previousDirection异常',previousDirection)
            exit()
          }
          previousNewGrid2=newGrid

        }




        else{
         //log("AI")

          // 空格子太少了,启动ＡＩ
          ////log("\n",newGrid.toString())
          newAI=new AI(newGrid)
         //log("\n",newAI.grid.toString())
          bestDirectionNum=newAI.getBest()
         //log("bestDirectionNum=",bestDirectionNum)
          bestDirectionNum=newAI.getBest().move
          bestDirection=newAI.translate(bestDirectionNum)
          ////log("bestDirection=",bestDirection)
          滑动(bestDirection)
        }
        sleep(3)
        // exit()


        // tile=[{x:x,y:y},value]  || null
        // function Tile(position, value) {
        //   this.x                = position.x;
        //   this.y                = position.y;
        //   this.value            = value || 2;

        //   this.previousPosition = null;
        //   this.mergedFrom       = null; // Tracks tiles that merged together
        // }


        // Grid.prototype.insertTile = function (tile) {
        //   this.cells[tile.x][tile.y] = tile;
        // };

        // 更新格子信息
        // newGrid = new Grid(4);
        // for(var item of grids){
        //   if(item){
        //     var tile=new Tile({x:item.x,y:item.y},item.num)
        //     newGrid.insertTile(tile)
        //   }
        // }
        ////log("\n插入识别后的格子=\n",newGrid.toString())
        // exit()

        // ai = new AI(newGrid);
          //  00 10 20 30
          //  01 11 21 31
          //  02 12 22 32
          //  03 13 23 33

    }




  }catch(e){
    log(e,e.stack)
  }
}


















function twoDimensionalCoordinates(maxTile){
  return maxTile.x.toString() + maxTile.y.toString()
}



//让打印更醒目
function logStars(content,num){
  var n=num || 300
  var s=""
  for(i=0;i<n;i++){
    s=s+"*"
  }
 //log(s)
 //log(content)
 //log(s)
}































//-------------------------识别数字函数------------------------------------

function recogniseGrid(){
  //初始化十六个格子数字都是0
  var grids = new Array(16);
  var k=0
  var j=0
  for(var i=0;i<grids.length;i++){
    if(i==4 || i==8 || i==12){
      k=0
    }
    if(i==4 || i==8 || i==12){
      j++
    }
    var x=firstGridLeftTopCorner.x+k*leftRightDistance
    var y=firstGridLeftTopCorner.y+j*upDownDistance
    grids[i] = {num:0,x:x,y:y};
    k++;
  }
  img=captureScreen()
  for(var i=0;i<16;i++){
    var color=images.pixel(img, grids[i].x, grids[i].y)
    color=colors.toString(color)
    try{
      Object.keys(NumberColors).forEach(function(key){
        if(colors.isSimilar(color,NumberColors[key])){
          grids[i].num=parseInt(key)
          throw err = new Error("\n第"+i+"个格子是"+key);
        }
      });
    }catch( e ) {
    }
  }
  ////log(grids)
  return oordinateTransformationIntoSequenceNumber(grids)
}


function oordinateTransformationIntoSequenceNumber(grids){
  // tile=[{x:x,y:y},value]  || null

  // gridsLog(grids)
  ////log(grids)
  // 0,0,0,0,
  // 0,8,0,0,
  // 0,16,16,16,
  // 8,8,8,32,

  // [ { num: 0, x: 77, y: 647 },
  //   { num: 0, x: 330, y: 647 },
  //   { num: 0, x: 583, y: 647 },
  //   { num: 0, x: 836, y: 647 },
  //   { num: 0, x: 77, y: 921 },
  //   { num: 8, x: 330, y: 921 },
  //   { num: 0, x: 583, y: 921 },
  //   { num: 0, x: 836, y: 921 },
  //   { num: 0, x: 77, y: 1195 },
  //   { num: 16, x: 330, y: 1195 },
  //   { num: 16, x: 583, y: 1195 },
  //   { num: 16, x: 836, y: 1195 },
  //   { num: 8, x: 77, y: 1469 },
  //   { num: 8, x: 330, y: 1469 },
  //   { num: 8, x: 583, y: 1469 },
  //   { num: 32, x: 836, y: 1469 } ]

  // tile=[{x:x,y:y},value]  || null
    //  00 10 20 30
    //  01 11 21 31
    //  02 12 22 32
    //  03 13 23 33


  var newGrids=[]
  var k=0
  for(let i=0;i<4;i++){
    for(let j=0;j<4;j++){
      var x=j
      var y=i
      var num=grids[k++].num
      var item={x:x,y:y,num:num}
      newGrids.push(item)
    }
  }
  return convertDataToAiStyle(newGrids)
}





function convertDataToAiStyle(info){
  var tiles=[]
  for(let i=0;i<info.length;i++){
    if(info[i].num==0){
    }else{
      tiles.push([{x:info[i].x,y:info[i].y},info[i].num])
    }
  }
  return tiles
}










function gridsLog(grids){
  var gridNums="\n"
  for(var i=0;i<16;i++){
    if(i==4 || i==8 || i==12){
      gridNums=gridNums+"\n"
    }
    if(grids[i]){
      gridNums=gridNums+grids[i]["num"]+","
    }else{
      gridNums=gridNums+"_"+","
    }
  }
 //log(gridNums)
}




























//-------------------------点亮屏幕------------------------------------

function lightScreen(){
  var isScreenOn=device.isScreenOn()
  if(isScreenOn){
  }else{
    device.wakeUpIfNeeded()
    sleep(1000)
    //解锁屏幕
    unlockingScreen()
    sleep(1000)
  }
}

function unlockingScreen(){
  //log("开始上滑")
  swipe(520,1361, 547,335, 300)
  sleep(100)
  //log("九宫格解锁")
  gesture(300, [253,1058], [541,1054], [536,1342],[537,1627])
}

































//-----------------滑动动作------------------------------------------

function 多次滑动(directions,t){
  var t=t || 30  ;
  for(let i=0;i<directions.length;i++){
    滑动(directions[i])
    sleep(t)
  }
 //log("多次滑动结束")
}



function 滑动(direction){
switch(direction)
  {
    case 'up':
      上滑()
      break;
    case 'down':
      下滑()
      break;
    case 'left':
      左滑()
      break;
    case 'right':
      右滑()
      break;
    default:
   //log('不存在这个滑动方向maxNum,',direction)
  }
}
function 上滑(){
  var xy=[461,1084,487,512]
  swipe(xy[0],xy[1],xy[2],xy[3],1);
}
function 下滑(){
  var xy=[487,512,461,1084]
  swipe(xy[0],xy[1],xy[2],xy[3],1);
}
function 左滑(){
  var xy=[972,527,109,525]
  swipe(xy[0],xy[1],xy[2],xy[3],1);
}
function 右滑(){
  var xy=[309,525,972,527]
  swipe(xy[0],xy[1],xy[2],xy[3],1);
}
