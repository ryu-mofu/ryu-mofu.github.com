enchant();
enchant.ENV.SOUND_ENABLED_ON_MOBILE_SAFARI = false;
window.onload = function() {
    var game = new Game(320, 320);
    game.enemy_speed = 1;
    game.preload('chara1.png', 'map0.png');

    var Bear = enchant.Class.create(enchant.Sprite, {
        initialize: function(x, y) {
            enchant.Sprite.call(this, 32, 32);
            this.x = x;
            this.y = y;
            this.image = game.assets['chara1.png'];
            this.frame = 5;
            game.rootScene.addChild(this);
        }
    });

    var Enemy = enchant.Class.create(Bear, {
        initialize: function(x, y) {
            Bear.call(this, x, y);
            var delete_flag = false;
            this.addEventListener('enterframe', function() {
                if (delete_flag) {
                    this.frame = [3][0] + 5;
                }else{
                    this.x += game.enemy_speed;
                    this.frame = [0, 1, 0, 2][Math.floor(this.age/5) % 4] + 5;
                }
            });

            this.addEventListener("touchstart", function(){
                delete_flag = true;

                this.tl.cue( {
                    30:function(){game.rootScene.removeChild(this);}
                });
                
        });
        }
    });

    var Treasure = enchant.Class.create(enchant.Sprite, {
        initialize: function(x, y) {
            enchant.Sprite.call(this, 16, 16);
            this.x = x;
            this.y = y;
            this.image = game.assets['map0.png'];
            this.frame = 0;
            game.rootScene.addChild(this);
        }
    });

    game.onload = function() {
        game.rootScene.addEventListener('enterframe', function() {
            if(this.age % 20 == 0){
                var enemy = new Enemy(0, rand(320));
            }
        });
    };

    game.start();
};

function rand(num){ return Math.floor(Math.random() * num) };