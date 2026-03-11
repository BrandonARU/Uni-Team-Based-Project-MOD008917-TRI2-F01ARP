extends Node2D



func _ready() -> void:
	spawnAsteroid()


func _process(delta: float) -> void:
	pass

#Input variables
var charBuffer: Array[int];
var charBufferString: String;
@export var charBufferLabel: Label

#Input functions
func addToCharBuffer(value):
	if(charBuffer.size() > 4):
		##char buffer full
		pass
	else:
		charBuffer.append(value);
	updateCharBufferDisplay();

func removeFromCharBuffer():
	if(!charBuffer.is_empty()):
		charBuffer.pop_back();
	updateCharBufferDisplay();

func updateCharBufferDisplay():
	charBufferString = "";
	for i in charBuffer.size():
		charBufferString = charBufferString + str(charBuffer.get(i))
	charBufferLabel.text = charBufferString

func _input(event: InputEvent) -> void:
	if(event.is_action_pressed("0")):
		addToCharBuffer(0);
	if(event.is_action_pressed("1")):
		addToCharBuffer(1);
	if(event.is_action_pressed("2")):
		addToCharBuffer(2);
	if(event.is_action_pressed("3")):
		addToCharBuffer(3);
	if(event.is_action_pressed("4")):
		addToCharBuffer(4);
	if(event.is_action_pressed("5")):
		addToCharBuffer(5);
	if(event.is_action_pressed("6")):
		addToCharBuffer(6);
	if(event.is_action_pressed("7")):
		addToCharBuffer(7);
	if(event.is_action_pressed("8")):
		addToCharBuffer(8);
	if(event.is_action_pressed("9")):
		addToCharBuffer(9);
	if(event.is_action_pressed("Backspace")):
		removeFromCharBuffer();
	if(event.is_action_pressed("Enter")):
		if(int(charBufferString) == questionAnswer):
			questionCorrect();
		else:
			questionIncorrect();
		
		for i in 5:
			removeFromCharBuffer();

#Question asteroid variables
var questionAsteroid1Scene = preload("res://Scenes/Asteroid/questionAsteroid.tscn")
var questionAsteroid1Instance = questionAsteroid1Scene.instantiate()
var questionAsteroid1Root = Node2D.new();
var questionAsteroid1Label = Label.new();
var questionAsteroid1Sprite = Sprite2D.new();

#Question asteroid generation

func spawnAsteroid():
	questionAsteroid1Instance.name = "questionAsteroid1";
	add_child(questionAsteroid1Instance)
	questionAsteroid1Root = $questionAsteroid1
	questionAsteroid1Label = $questionAsteroid1/Label
	questionAsteroid1Sprite = $questionAsteroid1/Sprite2D
	
	questionAsteroid1Sprite.rotation = randf_range(-360, 360)
	
	generateQuestion();
	questionAsteroid1Label.text = str(questionNo1) + " + " + str(questionNo2) + " = ?";

var questionNo1: float;
var questionNo2: float;
var questionNo3: float;
var questionNo4: float;
var questionNo5: float;
var questionAnswer: int;
var questionNoAmount: int;

var randInt1: int;

#Question generation functions
func generateQuestion():
	clearValues();
	generateAdditionQuestion();

func clearValues():
	questionNo1 = 0.0;
	questionNo2 = 0.0;
	questionNo3 = 0.0;
	questionNo4 = 0.0;
	questionNo5 = 0.0;
	questionAnswer = 0;
	questionNoAmount = 0;

func generateAdditionQuestion():
	#randInt1 = randi_range(1,10) #choosing difficulty
	randInt1 = 2;
	if(randInt1 < 3): #Easiest
		questionNoAmount = 2;
		questionNo1 = randi_range(10,100);
		questionNo2 = randi_range(10,100);
		questionAnswer = int(questionNo1 + questionNo2);
	elif(randInt1 <6): #Easy
		questionNoAmount = 3;
		questionNo1 = randf_range(10.0,100.0);
		questionNo2 = randf_range(10.0,100.0);
		questionNo3 = randf_range(10.0,100.0);
		questionAnswer = int(questionNo1 + questionNo2 + questionNo3);

#Answer variables
var debrisScene = preload("res://Scenes/Asteroid/Debris/debris.tscn");
var debrisInstance = debrisScene.instantiate();

#Answer functions
func questionCorrect():
	for i in 10:
		debrisInstance = debrisScene.instantiate()
		add_child(debrisInstance);
	spawnAsteroid()

func questionIncorrect():
	pass
