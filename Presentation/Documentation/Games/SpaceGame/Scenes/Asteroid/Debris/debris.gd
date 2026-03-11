extends Sprite2D

@onready var sprite: Sprite2D = $".";
var velocity: Vector2 = Vector2.ZERO;
@export var SPEED: float = 1;
@export var FLYBYSPEED: float = 0.2
@export var LIFETIME: float = 10;
var timer = Timer.new()

func _ready() -> void:
	sprite.frame = randi_range(0,7);
	velocity.x = ((randf()*10) - 5);
	velocity.y = ((randf()*10) - 5);
	add_child(timer)
	timer.autostart = true;
	timer.timeout.connect(_timeout);
	timer.start(LIFETIME);

func _physics_process(delta: float) -> void:
	global_position += velocity * SPEED + Vector2(-FLYBYSPEED, 0);
	FLYBYSPEED += (0.4+FLYBYSPEED) * delta;

func _timeout():
	queue_free()
