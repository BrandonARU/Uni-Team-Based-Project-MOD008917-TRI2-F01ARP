extends Node2D

@export var baseSpeed: float = 0.1;
@export var speed: float = 0.1;
@export var speedTarget: float = 0.1;
var debrisScene = preload("res://Scenes/Asteroid/Debris/debris.tscn");
var debrisInstance = debrisScene.instantiate();

#User input
var charBuffer: Array[int];
var charBufferString: String;
@export var charBufferLabel: Label

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass

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
