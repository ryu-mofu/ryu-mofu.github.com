enchant();
enchant.ENV.SOUND_ENABLED_ON_MOBILE_SAFARI = false;
window.onload = function() {
    var touchX = null;
    var touchY = null;
    var isTouch = false;

    var game = new Game(320, 320);
    game.enemy_speed = 1;

    game.rootScene.backgroundColor = "black";
    
    game.preload('exsozai.png');

    var CutEffect = enchant.Class.create(enchant.Sprite, {
        initialize: function(startX, startY, endX, endY) {
            console.log(startX + ':' + startY + ':' + endX + ':' + endY);
            enchant.Sprite.call(this, 100, 100);

            //角度計算
            var radian = Math.atan2(startY - endY, startX - endX);
            console.log(radian);
            var angel = (radian * 180 / Math.PI + 180) % 360;

            console.log(angel);

            var distance = Math.sqrt(((endY - startY) * (endY - startY)) + ((endX - startX) * (endX - startX)));
            this.scale(distance/100, 1);
            //console.log(distance);
            this.x = startX;
            this.y = startY;

            if (angel <= 0) {
                this.y = startY - 50;
            }else if (angel <= 45) {
                this.y = startY - 45 + angel;
            }else if (angel <= 90) {
                this.x = startX - angel + 40;
            }else if (angel <= 135) {
                this.x = startX - angel + 35;
            }else if (angel <= 180) {
                this.x = startX - 100;
                this.y = startY - angel + 130;
            }else if (angel <= 225) {
                this.x = startX - 100;
                this.y = startY - angel + 125;
            }else if (angel <= 270) {
                this.x = startX - 320 + angel;
                this.y = startY - 100;
            }else if (angel <= 315) {
                this.x = startX - 315 + angel;
                this.y = startY - 100;
            }else {
                this.y = startY - 410 + angel;
            }
            this.rotate(angel);
            this.image = game.assets['exsozai.png'];
            game.rootScene.addChild(this);
            //this.backgroundColor='green';

            this.addEventListener('enterframe', function() {
                this.frame = [0,1,2,3,4,5][this.age];

                if (this.age === 6) {
                    game.rootScene.removeChild(this);
                }
            });
        }
    });
/*
    var Enemy = enchant.Class.create(CutEffect, {
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
    });*/
    game.onload = function() {
        
        game.rootScene.addEventListener('enterframe', function() {
            /*if(this.age % 20 == 0){
                var cutEffect = new CutEffect(rand(320), rand(320));
            }*/
        });

        game.rootScene.addEventListener('touchstart', function(e) {
            touchX = e.localX;
            touchY = e.localY;
        });

        game.rootScene.addEventListener('touchend', function(e) {
            var cutEffect = new CutEffect(touchX, touchY, e.localX, e.localY);
        });

        game.rootScene.addEventListener('touchmove', function(e) {

        });
    };

    game.start();
};

function rand(num){ return Math.floor(Math.random() * num) };