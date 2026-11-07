"use strict";

const settings = {
    rowsCount: 21,
    colsCount: 21,
    speed: 2,
    winFoodCount: 50
};

const config = {
    settings,
    score: 0,

    init(userSettings) {
        Object.assign(this.settings, userSettings);
    },

    validate() {
        const result = {
            isValid: true,
            errors: [],
        };

        if (this.settings.rowsCount < 10 || this.settings.rowsCount > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
        }

        if (this.settings.colsCount < 10 || this.settings.colsCount > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение colsCount должно быть в диапазоне [10, 30].');
        }

        if (this.settings.speed < 1 || this.settings.speed > 10) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение speed должно быть в диапазоне [1, 10].');
        }

        if (this.settings.winFoodCount < 5 || this.settings.winFoodCount > 50) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение winFoodCount должно быть в диапазоне [5, 50].');
        }
        
        return result;
    },

    getRowsCount() {
        return this.settings.rowsCount;
    },

    getColsCount() {
        return this.settings.colsCount;
    },

    getSpeed() {
        return this.settings.speed;
    },

    getWinFoodCount() {
        return this.settings.winFoodCount;
    },
    
    getNewScore() {
        this.score += 1;
    },
    
    nullifyScore() {
        this.score = 0;
    },
    
    printScore() { 
        document.getElementById('score').textContent = `Счёт: ${this.score}`;
    }
};

const map = {
    cells: null,
    usedCells: null,

    init(rowsCount, colsCount) {
        const table = document.querySelector('#game');
        table.innerHTML = '';

        this.cells = {};

        this.usedCells = [];

        for (let row = 0; row < rowsCount; row++) {
            const tr = document.createElement('tr');
            tr.classList.add('row');
            table.appendChild(tr);

            for (let col = 0; col < colsCount; col++) {
                const td = document.createElement('td');
                td.classList.add('cell');

                this.cells[`x${col}_y${row}`] = td;

                tr.appendChild(td);
            }
        }
    },
    
    render(snakePointsArray, foodPoint) {
        for (const cell of this.usedCells) {
            cell.className = 'cell';
        }
        
        snakePointsArray.forEach((point, idx) => {
            const snakeCell = this.cells[`x${point.x}_y${point.y}`];
            snakeCell.classList.add(idx === 0 ? 'snakeHead' : 'snakeBody');
            this.usedCells.push(snakeCell);
        });
        
        const foodCell = this.cells[`x${foodPoint.x}_y${foodPoint.y}`];
        foodCell.classList.add('food');
        this.usedCells.push(foodCell);
    }
};

const snake = {
    body: null,
    direction: null,
    lastStepDirection: null,
    config,
    
    init(startBody, startDirection) {
        this.body = startBody;
        this.direction = startDirection;
        this.lastStepDirection = startDirection;
    },
    
    getBody() {
        return this.body;
    },
    
    makeStep() {
        if (!this.canMakeStep()) {
            this.lastStepDirection = this.direction;
            this.body.unshift(this.getNextHeadPoint());
            this.body.pop();
            return;
        }
        
        this.lastStepDirection = this.direction;
        this.body.unshift(this.getNextHeadPoint());
        this.body.pop();
    },
    
    getLastStepDirection() {
        return this.lastStepDirection;
    },
    
    isOnEdge(nextPoint) {
        if (nextPoint.x < 0) {
            nextPoint.x = this.config.settings.colsCount - 1;
            return nextPoint;
        }
        
        if (nextPoint.x >= this.config.settings.colsCount) {
            nextPoint.x = 0;
            return nextPoint;
        }
        
        if (nextPoint.y < 0) {
            nextPoint.y = this.config.settings.rowsCount - 1;
            return nextPoint;
        }
        
        if (nextPoint.y >= this.config.settings.rowsCount) {
            nextPoint.y = 0;
            return nextPoint;
        }
        
        return nextPoint;
    },
    
    canMakeStep() {
        const nextHeadPoint = this.getNextHeadPoint();
        
        return nextHeadPoint.x < this.config.getColsCount() && nextHeadPoint.y < this.config.getRowsCount() && nextHeadPoint.x >= 0 && nextHeadPoint.y >= 0;
    },
    
    getNextHeadPoint() {
        const firstPoint = this.body[0];
        
        switch (this.direction) {
            case 'up':
                return this.isOnEdge({x: firstPoint.x, y: firstPoint.y - 1});
            case 'down':
                return this.isOnEdge({x: firstPoint.x, y: firstPoint.y + 1});
            case 'right':
                return this.isOnEdge({x: firstPoint.x + 1, y: firstPoint.y});
            case 'left':
                return this.isOnEdge({x: firstPoint.x - 1, y: firstPoint.y});
        }
    },
    
    growUp() {
        const lastBodyIdx = this.body.length - 1;
        const lastBodyPoint = this.body[lastBodyIdx];
        const lastBodyPointClone = Object.assign({}, lastBodyPoint);
        this.body.push(lastBodyPointClone);
        this.config.getNewScore();
        this.config.printScore();
    },
    
    setDirection(direction) {
        this.direction = direction;
    }
};

const food = {
    x: null,
    y: null,
    
    getCoordinates() {
        return {
            x: this.x,
            y: this.y,
        }
    },
    
    setCoordinates(point) {
        this.x = point.x;
        this.y = point.y;
    },
    
    isOnPoint(point) {
        return point.x == this.x && point.y === this.y;
    }
};

const status = {
    condition: null,
    
    setPlaying() {
        this.condition = 'playing';
    },
    
    setStopped() {
        this.condition = 'stopped';
    },
    
    setFinished() {
        this.condition = 'finished';
    },
    
    isPlaying() {
        return this.condition === 'playing';
    },

    isStopped() {
        return this.condition === 'stopped';
    }
};

const game = {
    config,
    map,
    snake,
    food,
    status,
    tickInterval: null,

    init(userSettings) {
        this.config.init(userSettings);

        const validation = this.config.validate();

        if (!validation.isValid) {
            for (const err of validation.errors) {
                console.error(err);
            }

            return;
        }

        console.log('Запуск!');

        this.map.init(this.config.getRowsCount(), this.config.getColsCount());
        this.config.nullifyScore();
        this.config.printScore();

        this.setEventHandlers();
        this.reset();
    },
    
    reset() {
        this.stop();
        this.snake.init(this.getStartSnakeBody(), 'up');
        this.food.setCoordinates(this.getRandomFreeCoordinates());
        this.map.render(this.snake.getBody(), this.food.getCoordinates());
        this.config.nullifyScore();
        this.config.printScore();
    },
    
    getStartSnakeBody() {
        return [{
            x: Math.floor(this.config.getColsCount() / 2),
            y: Math.floor(this.config.getRowsCount() / 2) 
        }];
    },
    
    getRandomFreeCoordinates() {
        const exclude = [this.food.getCoordinates(), ...this.snake.getBody()];
        
        while (true) {
            const randPoint = {
                x: Math.floor(Math.random() * this.config.getColsCount()),
                
                y: Math.floor(Math.random() * this.config.getRowsCount())
            };
            
            if (!exclude.some(exPoint => randPoint.x === exPoint.x && randPoint.y === exPoint.y)) {
                return randPoint;
            }
        }
    },
    
    play() {
        this.status.setPlaying();
        
        this.tickInterval = setInterval(() => this.tickHandler(), 1000 / this.config.getSpeed());
        
        this.setPlayButton('Стоп');
    },
    
    stop() {
        this.status.setStopped();
        
        clearInterval(this.tickInterval);
        
        this.setPlayButton('Старт');
    },
    
    finish() {
        this.status.setFinished();
        
        clearInterval(this.tickInterval);
        
        this.setPlayButton('Игра закончена', true);
        
        if (this.config.score == this.config.settings.winFoodCount) {
            setTimeout(() => alert('Победа!'), 100);
        } else {
            setTimeout(() => alert('Поражение :('), 100);
        }
    },
    
    tickHandler() {
        this.isSnakeOnPoint();
        
        if (this.food.isOnPoint(this.snake.getNextHeadPoint())) {
            this.snake.growUp();
            this.food.setCoordinates(this.getRandomFreeCoordinates());
            if (this.isGameWon()) {
                this.finish();
            }
        }
            
        this.snake.makeStep();
        this.render();
    },
    
    isGameWon() {
        return this.snake.body.length > this.config.getWinFoodCount();
    },
    
    render() {
        this.map.render(this.snake.getBody(), this.food.getCoordinates());
    },
    
    isSnakeOnPoint() {
        const nextPoint = this.snake.getNextHeadPoint();
        
        if (this.snake.body.some(snakePoint => snakePoint.x === nextPoint.x && snakePoint.y === nextPoint.y)) {
            this.finish();
        }
    },

    setEventHandlers() {
        document.getElementById('playButton').addEventListener('click', () => this.playClickHandler());
        document.getElementById('newGameButton').addEventListener('click', () => this.reset());
        document.addEventListener('keydown', event => this.keyDownHandler(event));
    },
    
    playClickHandler() {
        if (this.status.isPlaying()) {
            this.stop();
        } else if (this.status.isStopped()) {
            this.play();
        }
    },
    
    keyDownHandler(event) {
        if (!this.status.isPlaying()) {
            return;
        }
        
        const direction = this.getDirectionByCode(event.code);
        
        if (this.canSetDirection(direction)) {
            this.snake.setDirection(direction);
        }
    },
    
    getDirectionByCode(code) {
        switch (code) {
            case 'KeyW':
            case 'ArrowUp':
            case 'Numpad8':
                return 'up';
            case 'KeyD':
            case 'ArrowRight':
            case 'Numpad6':
                return 'right';
            case 'KeyS':
            case 'ArrowDown':
            case 'Numpad2':
                return 'down';
            case 'KeyA':
            case 'ArrowLeft':
            case 'Numpad4':
                return 'left';
            default:
                return '';
        }
    },
    
    canSetDirection(direction) {
        const lastStepDirection = this.snake.getLastStepDirection();
        return direction === 'up' && lastStepDirection !== 'down' || direction === 'right' && lastStepDirection !== 'left' || direction === 'down' && lastStepDirection !== 'up' || direction === 'left' && lastStepDirection !== 'right';
    },
    
    setPlayButton(textContent, isDisabled = false) {
        const playButton = document.getElementById('playButton');
        playButton.textContent = textContent;
        isDisabled ? playButton.classList.add('disabled') : playButton.classList.remove('disabled');
    }
};

game.init({
    speed: 4,
    winFoodCount: 15
});
