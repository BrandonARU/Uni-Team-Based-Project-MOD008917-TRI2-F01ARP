extends Node2D

var leftTerp1: Node2D
const LEFTSTART = -640;
var leftTerp2: Node2D
const LEFTEND = -1920;
var centreTerp1: Node2D
const CENTRESTART = 640;
var centreTerp2: Node2D
const CENTREEND = -640;
var rightTerp1: Node2D
const RIGHTSTART = 1920;
var rightTerp2: Node2D
const RIGHTEND = 640;

var smallAsteroidTexture = preload("res://Assets/Textures/Background/AsteroidsSmallest.png");
var smallAsteroidSprite1: Sprite2D;
var smallAsteroidSprite2: Sprite2D;
var smallAsteroidSprite3: Sprite2D;
var smallAsteroidTerp: float;
@export var smallAsteroidSpeed: float = 1.2;

var mediumAsteroidTexture = preload("res://Assets/Textures/Background/AsteroidsMeduim.png");
var mediumAsteroidSprite1: Sprite2D;
var mediumAsteroidSprite2: Sprite2D;
var mediumAsteroidSprite3: Sprite2D;
var mediumAsteroidTerp: float;
@export var mediumAsteroidSpeed: float = 0.3;

var largeAsteroidTexture = preload("res://Assets/Textures/Background/AsteroidsLarge.png");
var largeAsteroidSprite1: Sprite2D;
var largeAsteroidSprite2: Sprite2D;
var largeAsteroidSprite3: Sprite2D;
var largeAsteroidTerp: float;
@export var largeAsteroidSpeed: float = 0.67;

# Loading the background asteroid nodes
func _ready() -> void:
	loadAsteroids();
	
	createTerpPoints();

func loadAsteroids():
	loadAsteroid(smallAsteroidSprite1, smallAsteroidTexture, "leftSmallAsteroid");
	loadAsteroid(smallAsteroidSprite2, smallAsteroidTexture, "centreSmallAsteroid");
	loadAsteroid(smallAsteroidSprite3, smallAsteroidTexture, "rightSmallAsteroid");
	smallAsteroidSprite1 = $leftSmallAsteroid
	smallAsteroidSprite2 = $centreSmallAsteroid
	smallAsteroidSprite3 = $rightSmallAsteroid
	
	loadAsteroid(mediumAsteroidSprite1, mediumAsteroidTexture, "leftMediumAsteroid");
	loadAsteroid(mediumAsteroidSprite2, mediumAsteroidTexture, "centreMediumAsteroid");
	loadAsteroid(mediumAsteroidSprite3, mediumAsteroidTexture, "rightMediumAsteroid");
	mediumAsteroidSprite1 = $leftMediumAsteroid
	mediumAsteroidSprite2 = $centreMediumAsteroid
	mediumAsteroidSprite3 = $rightMediumAsteroid
	
	loadAsteroid(largeAsteroidSprite1, largeAsteroidTexture, "leftLargeAsteroid");
	loadAsteroid(largeAsteroidSprite2, largeAsteroidTexture, "centreLargeAsteroid");
	loadAsteroid(largeAsteroidSprite3, largeAsteroidTexture, "rightLargeAsteroid");
	largeAsteroidSprite1 = $leftLargeAsteroid
	largeAsteroidSprite2 = $centreLargeAsteroid
	largeAsteroidSprite3 = $rightLargeAsteroid

func loadAsteroid(sprite, texture, name):
	sprite = Sprite2D.new();
	sprite.set_texture(texture);
	sprite.scale = Vector2(2,2);
	sprite.name = name;
	add_child(sprite);

func createTerpPoints():
	createTerpPoint(leftTerp1, LEFTSTART, "leftTerp1");
	createTerpPoint(leftTerp2, LEFTEND, "leftTerp2");
	createTerpPoint(centreTerp1, CENTRESTART, "centreTerp1");
	createTerpPoint(centreTerp2, CENTREEND, "centreTerp2");
	createTerpPoint(rightTerp1, RIGHTSTART, "rightTerp1");
	createTerpPoint(rightTerp2, RIGHTEND, "rightTerp2");
	leftTerp1 = $leftTerp1
	leftTerp2 = $leftTerp2
	centreTerp1 = $centreTerp1
	centreTerp2 = $centreTerp2
	rightTerp1 = $rightTerp1
	rightTerp2 = $rightTerp2
	
	smallAsteroidTerp = 0.0;
	mediumAsteroidTerp = 0.0;
	largeAsteroidTerp = 0.0;

func createTerpPoint(terpPoint, pos, name):
	terpPoint = Node2D.new();
	terpPoint.global_position = Vector2(pos, 0);
	terpPoint.scale = Vector2(2,2);
	terpPoint.name = name;
	add_child(terpPoint);

# Moving the background asteroid nodes
func _process(delta: float) -> void:
	moveAsteroids(delta);

func moveAsteroids(delta):
	moveAsteroidGroup(smallAsteroidSprite1, smallAsteroidSprite2, smallAsteroidSprite3, smallAsteroidSpeed, smallAsteroidTerp);
	moveAsteroidGroup(mediumAsteroidSprite1, mediumAsteroidSprite2, mediumAsteroidSprite3, mediumAsteroidSpeed, mediumAsteroidTerp);
	moveAsteroidGroup(largeAsteroidSprite1, largeAsteroidSprite2, largeAsteroidSprite3, largeAsteroidSpeed, largeAsteroidTerp);
	
	if(smallAsteroidTerp < 1):
		smallAsteroidTerp += smallAsteroidSpeed*delta;
	if(smallAsteroidTerp > 1 || smallAsteroidTerp == 1):
		smallAsteroidTerp = 0;
	
	if(mediumAsteroidTerp < 1):
		mediumAsteroidTerp += mediumAsteroidSpeed*delta;
	if(mediumAsteroidTerp > 1 || mediumAsteroidTerp == 1):
		mediumAsteroidTerp = 0;
	
	if(largeAsteroidTerp < 1):
		largeAsteroidTerp += largeAsteroidSpeed*delta;
	if(largeAsteroidTerp > 1 || largeAsteroidTerp == 1):
		largeAsteroidTerp = 0;

func moveAsteroidGroup(asteroidLeft, asteroidCentre, asteroidRight, speed, terp):
	asteroidLeft.transform = leftTerp1.transform.interpolate_with(leftTerp2.transform, terp)
	asteroidCentre.transform = centreTerp1.transform.interpolate_with(centreTerp2.transform, terp)
	asteroidRight.transform = rightTerp1.transform.interpolate_with(rightTerp2.transform, terp)
