document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const doodler = document.createElement('div');
    let doodlerLeftSpace = 50;
    let doodlerBottomSpace = 150;
    let isGameOver = false;
    let platformCount = 5;
    let platforms = [];
    let upTimerId;
    let downTimerId;
    let isJump = true;

    function createDoodler() {
        grid.appendChild(doodler);
        doodler.classList.add('doodler');
        doodlerLeftSpace = platforms[0].left;
        doodler.style.left = doodlerLeftSpace +'px';
        doodler.style.bottom = doodlerBottomSpace +'px';
    }

    class Platform {
        constructor(newPlatformBottom) {
            this.bottom = newPlatformBottom;
            this.left = Math.random() * 320;
            this.visual = document.createElement('div');
            
            const visual = this.visual;
            visual.classList.add('platform');
            visual.style.left = this.left +'px';
            visual.style.bottom = this.bottom + 'px';
            grid.appendChild(visual);
        }
    }

    function createPlatforms() {
        for( let i = 0; i < platformCount; i++) {
            let platformGap = 600 / platformCount;
            let newPlatformBottom = 100 + i * platformGap;
            let newPlatform = new Platform(newPlatformBottom);
            platforms.push(newPlatform);
        }        
    }

    function movePlatforms() {
        if(doodlerBottomSpace > 140) {
            platforms.forEach(platform => {
                platform.bottom -= 4;
                //let visual = platform.visual;
                platform.visual.style.bottom = platform.bottom + 'px';
            })
        }
    }

    function jump() {
        clearInterval(downTimerId);
        isJump = true;
        upTimerId = setInterval(function() {
            doodlerBottomSpace += 20;
            doodler.style.bottom = doodlerBottomSpace + 'px';
            if(doodlerBottomSpace > 350) {
                fall();
            }
            platforms.forEach(platform => {
                if (
                    (doodlerBottomSpace >= platform.bottom) &&
                    (doodlerBottomSpace <= platform.bottom + 15) &&
                    ((doodlerLeftSpace + 60) >= platform.left) &&
                    (doodlerLeftSpace <= (platform.left + 85)) &&
                    !isJump
                ) {
                    console.log('landed');
                    jump();
                }
            })
        }, 30)
    }

    function fall() {
        clearInterval(upTimerId);
        isJump = false;
        downTimerId = setInterval( function() {
            doodlerBottomSpace -= 5;
            doodler.style.bottom = doodlerBottomSpace + 'px';

            if(doodlerBottomSpace <= 0) {
                gameOver();
            }

        }, 30)
    }

    function gameOver () {
        console.log('You fucked up! Doodler is dead');
        isGameOver = true;
        clearInterval(upTimerId);
        clearInterval(downTimerId);
    }

    function control(e) {
        if (e.key === "ArrowLeft") {
            //move left
        } else if (e.key === "ArrowRight") {
            //move right
        } else if (e.key === "ArrowUp") {
            //jump
        }
    }

    function start() {
        if (!isGameOver) {
            createPlatforms();
            createDoodler();
            setInterval(movePlatforms, 30);
            jump();
        }
    }
    
    start();
})