/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */
var Engine = (function(global) {
	var doc = global.document,
		win = global.window,
		canvas = doc.createElement('canvas'),
		ctx = canvas.getContext('2d'),
		lastTime;
	canvas.width = 1010;
	canvas.height = 1010;
	doc.body.appendChild(canvas);

	function main() {
		var now = Date.now(),
			dt = (now - lastTime) / 1000.0;
		update(dt);
		render();
		lastTime = now;
		win.requestAnimationFrame(main);
	}

	function init() {
		reset();
		lastTime = Date.now();
		main();
	}

	function update(dt) {
        updateEntities(dt);
        checkCollisions()
	}

	function updateEntities(dt) {
		allEnemies.forEach(function(enemy) {
			enemy.update(dt);
		});
		player.update();
	}
	var Rectangle = function(left, top, width, height) {
		this.left = left;
		this.top = top;
		this.right = this.left + width;
		this.bottom = this.top + height;
		this.width = width;
		this.height = height;
    };

    function checkCollisions() {
        var playerRect = new Rectangle(player.x + 28, player.y + 124, 44, 47);
        obstacles.forEach(function(obstacle) {
            var obstacleRect = new Rectangle(obstacle.x + 28, obstacle.y + 124, 44, 47);
            if (doRectanglesIntersect(obstacleRect, playerRect)){
                console.log("Player collided with an obstacle!");
                player.x = player.previousLocation.x;
                player.y = player.previousLocation.y;
            }
    });
        allEnemies.forEach(function (bug){
			var bugRect = new Rectangle(bug.x + 28, bug.y + 124, 44, 47);
			if(doRectanglesIntersect(bugRect, playerRect)){
			console.log("Player collided with a bug")
		}
		obstacles.forEach(function(obstacle){
			var obstacleRect = new Rectangle(obstacle.x + 28, obstacle.y + 124, 44, 47);
			if (doRectanglesIntersect(bugRect, obstacleRect)){
				console.log("Bug collided with an obstacle")
			}
		})	
	})
}

// Checks to see if rectangle variables intersect. Parameters: rectangle 1 and rectangle 2
function doRectanglesIntersect(r1, r2) {
        return !(r2.left > r1.right || r2.right < r1.left || r2.top > r1.bottom || r2.bottom < r1.top);
    }  

	var IMPASSABLE = 0,
		PASSABLE = 1,
		ITEM = 2,
		Key = {
			sprite: 'images/Key.png',
			type: ITEM
		},
		Green_Gem = {
			sprite: 'images/Small Green Gem.png',
			type: ITEM
		},
		// PASSABLE tiles the character and bugs can walk on
		Wood = {
			sprite: 'images/Wood Block.png',
			type: PASSABLE
		},
		Wood2 = {
			sprite: 'images/Wood Block2.png',
			type: PASSABLE
		},
		Grass = {
			sprite: 'images/Grass Block.png',
			type: PASSABLE
		},
		Stone = {
			sprite: 'images/Stone Block.png',
			type: PASSABLE
		},
		Plain = {
			sprite: 'images/Plain Block.png',
			type: PASSABLE
		},
		// IMPASSABLE tiles the character and bugs cannot walk on
		Water = {
			sprite: 'images/Dark Water Block.png',
			type: IMPASSABLE
		},
		Door = {
			sprite: 'images/Door.png',
			type: IMPASSABLE
		},
		Tree = {
			sprite: 'images/tall-tree.png',
			type: IMPASSABLE
		},
		Wall = {
			sprite: 'images/Wall Block Tall.png',
			type: IMPASSABLE
		},
		Roof_SW = {
			sprite: 'images/Roof South West.png',
			type: IMPASSABLE
		},
		Roof_SE = {
			sprite: 'images/Roof South East.png',
			type: IMPASSABLE
		},
		Roof_S = {
			sprite: 'images/Roof South.png',
			type: IMPASSABLE
		},
		Rock = {
			sprite: 'images/Rock.png',
			type: IMPASSABLE
		},
		Bush = {
			sprite: 'images/Bush.png',
			type: IMPASSABLE
		},
		Statue = {
			sprite: 'images/Statue.png',
			type: IMPASSABLE
		},
		Block = {
			sprite: 'images/Stone Block.png',
			type: IMPASSABLE
		},
		numRows,
		numCols,
		col,
		row,
		index,
		obstacle,
		item,
		buildingPiece;
	var Tile = function(tileInfo, x, y) {
		this.tileInfo = tileInfo;
		this.x = x;
		this.y = y;
	};
	/*LEVEL 1*/
	var baseLayer = [
		[new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass)],
		[new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass)],
		[new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass)],
		[new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass)],
		[new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass)],
		[new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass)],
		[new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass)],
		[new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass)],
		[new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass)],
		[new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass), new Tile(Grass)]
	];
	var tileXSpan = 101,
		tileYSpan = 80;
	for (row = 0; row < 10; row++) {
		for (col = 0; col < 10; col++) {
			var tile = baseLayer[row][col];
			tile.y = tileYSpan * (row + 1.5);
			tile.x = tileXSpan * col;
		}
	}
	var obstacles = [
		new Tile(Rock, 0, 90),
		new Tile(Bush, 0, 170),
		new Tile(Water, 0,280),
		new Tile(Water, 900,0),
		new Tile(Water, 800,0),
		new Tile(Water, 700,0),
		new Tile(Water, 200,0),
		new Tile(Water, 100,0),
		new Tile(Water, 0,0),
		new Tile(Tree, 0, 400),
		new Tile(Bush, 0, 500),
		new Tile(Rock, 0, 578),
		new Tile(Rock, 0, 740),
		new Tile(Tree, 0, 820),
		new Tile(Bush, 0, 655),
		new Tile(Block, 908, 840),
		new Tile(Bush, 908, 730),
		new Tile(Tree, 908, 340),
		new Tile(Tree, 908, 170),
		new Tile(Rock, 908, 580),
		new Tile(Bush, 908, 500),
		new Tile(Rock, 908, 400),	
		new Tile(Tree, 200, 340)
    ];
	var items = [
		new Tile(Key, 135, 500),
		new Tile(Green_Gem, 730, 485)
	];
	obstacles.push(new Tile(Door, 505, 80));
	obstacles.push(new Tile(Door, 405, 80));
	var building = [
		new Tile(Wall, 605, 82),
		new Tile(Wall, 305, 82),
		new Tile(Wood2, 260, 150),
		new Tile(Wood, 605, 150),
		new Tile(Roof_SW, 305, 0),
		new Tile(Roof_SE, 605, 0),
		new Tile(Roof_S, 405, 0),
		new Tile(Roof_S, 505, 0),
		new Tile(Tree, 270, 130),
		new Tile(Tree, 640, 130)
	];

	function render() {
		ctx.clearRect(0, 0, canvas.width, canvas.height); // Clears Canvas
		numRows = baseLayer.length;
		for (row = 0; row < numRows; row++) {
			numCols = baseLayer[row].length;
			for (col = 0; col < numCols; col++) {
				var tile = baseLayer[row][col];
				ctx.drawImage(Resources.get(tile.tileInfo.sprite), tile.x, tile.y);
			}
		}
		/*Objects in Level 1*/
		for (index = 0; index < obstacles.length; index++) {
			obstacle = obstacles[index];
			ctx.drawImage(Resources.get(obstacle.tileInfo.sprite), obstacle.x, obstacle.y);
		}
		/*Entrance to Next Level*/
		for (index = 0; index < building.length; index++) {
			buildingPiece = building[index];
			ctx.drawImage(Resources.get(buildingPiece.tileInfo.sprite), buildingPiece.x, buildingPiece.y);
		}
		renderEntities()
	}

	function renderEntities() {
		allEnemies.forEach(function(enemy) {
			enemy.render();
		});
		player.render();
	}

	function reset() {}
	Resources.load(['images/Dark Water Block.png', 'images/Rock.png', 'images/tall-tree.png', 'images/Bush.png', 'images/Grass Block.png', 'images/Bush.png', 'images/Key.png', 'images/Small Green Gem.png', 'images/Door.png', 'images/Statue.png', 'images/Wall Block Tall.png', 'images/Roof South West.png', 'images/Roof South East.png', 'images/Roof South.png', 'images/Wood Block.png', 'images/Wood Block2.png', 'images/Stone Block.png', 'images/Plain Block.png', 'images/Character Boy.png', 'images/RightEnemyBug.png', 'images/LeftEnemyBug.png', 'images/enemy-bug-blue.png', 'images/enemy-bug-green.png', 'images/enemy-bug-purple.png']);
	Resources.onReady(init);
	global.ctx = ctx;
})(this);