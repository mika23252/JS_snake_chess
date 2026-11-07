"use strict";

const figures = [
    {
        name: 'p',
        color: 'black',
        pos: 'a2'
    },

    {
        name: 'p',
        color: 'black',
        pos: 'b2'
    },
    {
        name: 'p',
        color: 'black',
        pos: 'c2'
    },
    {
        name: 'p',
        color: 'black',
        pos: 'd2'
    },
    {
        name: 'p',
        color: 'black',
        pos: 'e2'
    },
    {
        name: 'p',
        color: 'black',
        pos: 'f2'
    },
    {
        name: 'p',
        color: 'black',
        pos: 'g2'
    },
    {
        name: 'p',
        color: 'black',
        pos: 'h2'
    },


    {
        name: 'K',
        color: 'black',
        pos: 'd1'
    },
    {
        name: 'K',
        color: 'white',
        pos: 'd8'
    },


    {
        name: 'r',
        color: 'black',
        pos: 'a1'
    },
    {
        name: 'k',
        color: 'black',
        pos: 'b1'
    },
    {
        name: 'b',
        color: 'black',
        pos: 'c1'
    },
    {
        name: 'Q',
        color: 'black',
        pos: 'e1'
    },
    {
        name: 'b',
        color: 'black',
        pos: 'f1'
    },
    {
        name: 'k',
        color: 'black',
        pos: 'g1'
    },
    {
        name: 'r',
        color: 'black',
        pos: 'h1'
    },


    {
        name: 'p',
        color: 'white',
        pos: 'a7'
    },
    {
        name: 'p',
        color: 'white',
        pos: 'b7'
    },
    {
        name: 'p',
        color: 'white',
        pos: 'c7'
    },
    {
        name: 'p',
        color: 'white',
        pos: 'd7'
    },
    {
        name: 'p',
        color: 'white',
        pos: 'e7'
    },
    {
        name: 'p',
        color: 'white',
        pos: 'f7'
    },
    {
        name: 'p',
        color: 'white',
        pos: 'g7'
    },
    {
        name: 'p',
        color: 'white',
        pos: 'h7'
    },


    {
        name: 'r',
        color: 'white',
        pos: 'a8'
    },
    {
        name: 'k',
        color: 'white',
        pos: 'b8'
    },
    {
        name: 'b',
        color: 'white',
        pos: 'c8'
    },
    {
        name: 'Q',
        color: 'white',
        pos: 'e8',
    },
    {
        name: 'b',
        color: 'white',
        pos: 'f8',
    },
    {
        name: 'k',
        color: 'white',
        pos: 'g8'
    },
    {
        name: 'r',
        color: 'white',
        pos: 'h8'
    },
];

const figuresHtml = {
    pblack: '&#9823;',
    pwhite: '&#9817;',

    Kblack: '&#9818;',
    Kwhite: '&#9812;',

    Qwhite: '&#9813;',
    Qblack: '&#9819;',

    bwhite: '&#9815;',
    bblack: '&#9821;',

    kwhite: '&#9816;',
    kblack: '&#9822;',

    rblack: '&#9820;',
    rwhite: '&#9814;',
};

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const game = {
    moveNumber: 0,

    history: [],
    
    timerControl: null,

    whiteKingPosition: null,

    blackKingPosition: null,
    
    whiteTime: 1800,
    
    blackTime: 1800,

    phase: 'white',

    blackFiguresPositions: [],

    whiteFiguresPositions: [],

    possibleStepsBlackFigures: [],

    possibleStepsWhiteFigures: [],

    eatenBlackFigures: [],

    eatenWhiteFigures: [],

    activeFigure: null,

    activeFigurePossibleSteps: null,

    didLeftWhiteRookMove: 0,

    didRightWhiteRookMove: 0,

    didLeftBlackRookMove: 0,

    didRightBlackRookMove: 0,

    didWhiteKingMove: 0,

    didBlackKingMove: 0,

    init() {
        document.querySelector('#whiteEatenFigures').innerHTML = '';
        document.querySelector('#blackEatenFigures').innerHTML = '';
        document.querySelector('.moveHistory').innerHTML = '';
        whiteTime.innerHTML = this.whiteTime;
        blackTime.innerHTML = this.blackTime;
        this.moveNumber = 0;
        this.history = [];
        this.whiteKingPosition = null;
        this.blackKingPosition = null;
        this.phase = 'white';
        this.blackFiguresPositions = [];
        this.whiteFiguresPositions = [];
        this.possibleStepsBlackFigures = [];
        this.possibleStepsWhiteFigures = [];
        this.didLeftBlackRookMove = 0;
        this.didLeftWhiteRookMove = 0;
        this.didRightBlackRookMove = 0;
        this.didRightWhiteRookMove = 0;
        this.didWhiteKingMove = 0;
        this.didBlackKingMove = 0;
        this.activeFigure = null;
        this.activeFigurePossibleSteps = null;
        this.eatenBlackFigures = [];
        this.eatenWhiteFigures = [];
        this.cleartable();
        this.renderBoard();
        this.renderFigures();
        clearInterval(this.timerControl);
        this.timerControl = setInterval(this.timer, 1000);
        this.play();
    },

    cleartable() {
        let board = document.querySelector('#board');
        board.innerHTML = '<table id="board" align="center"></table>';
    },

    renderBoard() {
        let a = document.querySelector('#board');

        for (let i = 0; i < 10; i++) {

            let tr = document.createElement('tr');

            a.appendChild(tr);

            for (let j = 0; j < 10; j++) {

                let td = document.createElement('td');

                a.querySelector(`tr:nth-child(${i + 1})`).appendChild(td);

                // init numbers
                if (i > 0 && (j === 0 || j === 9)) {
                    const number = document.querySelector(`tr:nth-child(${i + 1})`).querySelector(`td:nth-child(${j + 1})`);
                    number.textContent = i;
                }

                // init black cells
                if (((i + 1) % 2 === 0) && ((j + 1) % 2 === 1) && j !== 0 && i !== 9) {
                    const blackCell = document
                        .querySelector(`tr:nth-child(${i + 1})`)
                        .querySelector(`td:nth-child(${j + 1})`);
                    blackCell.style.background = 'grey';
                } else if (((i + 1) % 2 === 1) && ((j + 1) % 2 === 0) && i !== 9 && i !== 0 && j !== 0 && j !== 9) {
                    const blackCell = document
                        .querySelector(`tr:nth-child(${i + 1})`)
                        .querySelector(`td:nth-child(${j + 1})`);
                    blackCell.style.background = 'grey';
                }

                // init letters
                if (j > 0 && j < 9 && i === 0 || i === 9) {
                    const letter = document
                        .querySelector(`tr:nth-child(${i + 1})`)
                        .querySelector(`td:nth-child(${j + 1})`);
                    letter.textContent = letters[j - 1];
                }

                // init cell data
                if (j !== 0 && i !== 0 && j !== 9 && i !== 9) {
                    const cellData = document
                        .querySelector(`tr:nth-child(${i + 1})`)
                        .querySelector(`td:nth-child(${j + 1})`);

                    cellData.dataset.pos = letters[j - 1] + i;
                }
            }
        }
    },

    renderFigures() {
        for (let i = 0; i < figures.length; i++) {
            let figure = figures[i].name + figures[i].color;
            figures[i].color == 'black' && figures[i].name == 'K' ? this.blackKingPosition = figures[i].pos : null;
            figures[i].color == 'white' && figures[i].name == 'K' ? this.whiteKingPosition = figures[i].pos : null;
            let activeCell = document.querySelector(`td[data-pos='${figures[i].pos}']`);
            figures[i].color === 'black' ? this.blackFiguresPositions.push(figures[i].pos) : this.whiteFiguresPositions.push(figures[i].pos);
            activeCell.innerHTML = figuresHtml[figure];
            activeCell.dataset.color = figures[i].color;
            activeCell.dataset.figure = figures[i].name;
        }
    },

    play() {
        board.onclick = (event) => {
            this.getFigure(event)
        };
    },
    
    decrementBlackTimer() {
        blackTime.textContent = +blackTime.textContent - 1;
        if (+blackTime.textContent == 0) {
            alert('Белые победили');
            board.onclick = () => {};
            clearInterval(this.timerControl);
        }
    },
    
    decrementWhiteTimer() {
        whiteTime.textContent = +whiteTime.textContent - 1;
        if (+whiteTime.textContent == 0) {
            alert('Черные победили');
            board.onclick = () => {};
            clearInterval(this.timerControl);
        }
    },
    
    timer() {
        if (game.phase == 'white') {
            game.decrementWhiteTimer();
        } else if (game.phase == 'black') {
            game.decrementBlackTimer();
        };
    },

    getFigure(e) {
        if (e.target.dataset.figure && e.target.dataset.color == this.phase) {
            e.target.classList.add('active-td');
            let possibleSteps = this.getPossibleSteps(e.target);
            this.activeFigure = e.target;
            this.activeFigurePossibleSteps = possibleSteps;
            this.drawPossibleSteps(possibleSteps);
        }
    },

    drawPossibleSteps(possibleSteps) {
        for (let i = 0; i < possibleSteps.length; i++) {
            let possibleStepSquare = document.querySelector(`td[data-pos='${possibleSteps[i]}']`);
            possibleStepSquare.classList.add('possibleStep');
        }
        board.onclick = (event) => {
            this.replaceFigure(event)
        };
    },

    replaceFigure(e) {
        let target = e.target;
        let newPos = target.dataset.pos;
        let pos = this.activeFigure.dataset.pos;
        if (e.target.className == 'possibleStep') {

            //checking if any rook moved
            if (this.activeFigure.dataset.figure == 'r' && this.activeFigure.dataset.color == 'white') {
                if (this.activeFigure.dataset.pos == 'a8') {
                    this.didLeftWhiteRookMove = 1;
                } else if (this.activeFigure.dataset.pos == 'h8') {
                    this.didRightWhiteRookMove = 1;
                }
            } else if (this.activeFigure.dataset.figure == 'r' && this.activeFigure.dataset.color == 'black') {
                if (this.activeFigure.dataset.pos == 'a1') {
                    this.didLeftBlackRookMove = 1;
                } else if (this.activeFigure.dataset.pos == 'h1') {
                    this.didRightBlackRookMove = 1;
                }
            }

            //checking if any king moved
            if (this.activeFigure.dataset.figure == 'K' && this.activeFigure.dataset.color == 'white') {
                this.whiteKingPosition = target.dataset.pos;
                this.didWhiteKingMove = 1;
            } else if (this.activeFigure.dataset.figure == 'K' && this.activeFigure.dataset.color == 'black') {
                this.blackKingPosition = target.dataset.pos;
                this.didBlackKingMove = 1;
            }
            
            //checking if it is king making castling
            if (this.activeFigure.dataset.figure == 'K') {
                if (this.phase == 'white') {
                    this.whiteKingPosition = newPos;
                    if (newPos == letters[letters.indexOf(pos[0]) - 2] + pos[1]) {
                        //replacing king
                        target.textContent = this.activeFigure.textContent;
                        target.dataset.color = this.activeFigure.dataset.color;
                        target.dataset.figure = this.activeFigure.dataset.figure;

                        //replacing rook
                        let leftRook = document.querySelector('td[data-pos="a8"]');
                        let leftRookNewPos = document.querySelector('td[data-pos="c8"]');
                        leftRookNewPos.textContent = leftRook.textContent;
                        leftRookNewPos.dataset.color = leftRook.dataset.color;
                        leftRookNewPos.dataset.figure = leftRook.dataset.figure;

                        this.history.push([this.phase, this.activeFigure.dataset.figure, this.activeFigure.dataset.pos, target.dataset.pos]);
                        this.history.push([this.phase, 'r', 'a8', 'c8']);
                        this.moveNumber++;

                        this.whiteFiguresPositions.splice(this.whiteFiguresPositions.indexOf(this.activeFigure.dataset.pos), 1);
                        this.whiteFiguresPositions.push(target.dataset.pos);
                        this.whiteFiguresPositions.splice(this.whiteFiguresPositions.indexOf('a8'), 1);
                        this.whiteFiguresPositions.push('c8');

                        this.activeFigure.textContent = '';
                        this.activeFigure.removeAttribute('data-color');
                        this.activeFigure.removeAttribute('data-figure');
                        leftRook.textContent = '';
                        leftRook.removeAttribute('data-color');
                        leftRook.removeAttribute('data-figure');

                        this.activeFigure.classList.remove('active-td');

                        while (document.querySelector('.possibleStep')) {
                            document.querySelector('.possibleStep').classList.remove('possibleStep');
                        }
                    } else if (newPos == letters[letters.indexOf(pos[0]) + 2] + pos[1]) {
                        //replacing king
                        target.textContent = this.activeFigure.textContent;
                        target.dataset.color = this.activeFigure.dataset.color;
                        target.dataset.figure = this.activeFigure.dataset.figure;

                        //replacing rook
                        let rightRook = document.querySelector('td[data-pos="h8"]');
                        let rightRookNewPos = document.querySelector('td[data-pos="e8"]');
                        rightRookNewPos.textContent = rightRook.textContent;
                        rightRookNewPos.dataset.color = rightRook.dataset.color;
                        rightRookNewPos.dataset.figure = rightRook.dataset.figure;

                        this.history.push([this.phase, this.activeFigure.dataset.figure, this.activeFigure.dataset.pos, target.dataset.pos]);
                        this.history.push([this.phase, 'r', 'h8', 'e8']);
                        this.moveNumber++;

                        this.whiteFiguresPositions.splice(this.whiteFiguresPositions.indexOf(this.activeFigure.dataset.pos), 1);
                        this.whiteFiguresPositions.push(target.dataset.pos);
                        this.whiteFiguresPositions.splice(this.whiteFiguresPositions.indexOf('h8'), 1);
                        this.whiteFiguresPositions.push('e8');

                        this.activeFigure.textContent = '';
                        this.activeFigure.removeAttribute('data-color');
                        this.activeFigure.removeAttribute('data-figure');
                        rightRook.textContent = '';
                        rightRook.removeAttribute('data-color');
                        rightRook.removeAttribute('data-figure');

                        this.activeFigure.classList.remove('active-td');

                        while (document.querySelector('.possibleStep')) {
                            document.querySelector('.possibleStep').classList.remove('possibleStep');
                        }
                    }
                } else {
                    this.blackKingPosition = newPos;
                    if (newPos == letters[letters.indexOf(pos[0]) - 2] + pos[1]) {
                        //replacing king
                        target.textContent = this.activeFigure.textContent;
                        target.dataset.color = this.activeFigure.dataset.color;
                        target.dataset.figure = this.activeFigure.dataset.figure;

                        //replacing rook
                        let leftRook = document.querySelector('td[data-pos="a1"]');
                        let leftRookNewPos = document.querySelector('td[data-pos="c1"]');
                        leftRookNewPos.textContent = leftRook.textContent;
                        leftRookNewPos.dataset.color = leftRook.dataset.color;
                        leftRookNewPos.dataset.figure = leftRook.dataset.figure;

                        this.history.push([this.phase, this.activeFigure.dataset.figure, this.activeFigure.dataset.pos, target.dataset.pos]);
                        this.history.push([this.phase, 'r', 'a1', 'c1']);
                        this.moveNumber++;

                        this.blackFiguresPositions.splice(this.blackFiguresPositions.indexOf(this.activeFigure.dataset.pos), 1);
                        this.blackFiguresPositions.push(target.dataset.pos);
                        this.blackFiguresPositions.splice(this.blackFiguresPositions.indexOf('a1'), 1);
                        this.blackFiguresPositions.push('c1');

                        this.activeFigure.textContent = '';
                        this.activeFigure.removeAttribute('data-color');
                        this.activeFigure.removeAttribute('data-figure');
                        leftRook.textContent = '';
                        leftRook.removeAttribute('data-color');
                        leftRook.removeAttribute('data-figure');

                        this.activeFigure.classList.remove('active-td');

                        while (document.querySelector('.possibleStep')) {
                            document.querySelector('.possibleStep').classList.remove('possibleStep');
                        }
                    } else if (newPos == letters[letters.indexOf(pos[0]) + 2] + pos[1]) {
                        //replacing king
                        target.textContent = this.activeFigure.textContent;
                        target.dataset.color = this.activeFigure.dataset.color;
                        target.dataset.figure = this.activeFigure.dataset.figure;

                        //replacing rook
                        let rightRook = document.querySelector('td[data-pos="h1"]');
                        let rightRookNewPos = document.querySelector('td[data-pos="e1"]');
                        rightRookNewPos.textContent = rightRook.textContent;
                        rightRookNewPos.dataset.color = rightRook.dataset.color;
                        rightRookNewPos.dataset.figure = rightRook.dataset.figure;

                        this.history.push([this.phase, this.activeFigure.dataset.figure, pos, newPos]);
                        this.history.push([this.phase, 'r', 'h1', 'e1']);
                        this.moveNumber++;

                        this.blackFiguresPositions.splice(this.blackFiguresPositions.indexOf(pos), 1);
                        this.blackFiguresPositions.push(newPos);
                        this.blackFiguresPositions.splice(this.blackFiguresPositions.indexOf('h1'), 1);
                        this.blackFiguresPositions.push('e1');

                        this.activeFigure.textContent = '';
                        this.activeFigure.removeAttribute('data-color');
                        this.activeFigure.removeAttribute('data-figure');
                        rightRook.textContent = '';
                        rightRook.removeAttribute('data-color');
                        rightRook.removeAttribute('data-figure');

                        this.activeFigure.classList.remove('active-td');

                        while (document.querySelector('.possibleStep')) {
                            document.querySelector('.possibleStep').classList.remove('possibleStep');
                        }
                    }

                }
            }

            //checking if it is pawn capturing en passant and making a move
            let isActiveFigurePawn = this.moveNumber != 0 && this.activeFigure.dataset.figure == 'p';
            let isPreviousMoveMadeByPawn = isActiveFigurePawn ? this.history[this.moveNumber - 1][1] == 'p' : 0;

            let whetherTheNewPosIsJumpedOver = isActiveFigurePawn ? (target.dataset.pos == this.history[this.moveNumber - 1][2][0] + (+this.history[this.moveNumber - 1][2][1] + 1) || target.dataset.pos == this.history[this.moveNumber - 1][2][0] + (+this.history[this.moveNumber - 1][2][1] - 1)) : 0;

            let didEnemyPawnJumpAcrossTheSquare = isActiveFigurePawn ? (this.history[this.moveNumber - 1][2][0] + (+this.history[this.moveNumber - 1][2][1] + 2) == this.history[this.moveNumber - 1][3] || this.history[this.moveNumber - 1][2][0] + (+this.history[this.moveNumber - 1][2][1] - 2) == this.history[this.moveNumber - 1][3]) : 0;

            if (isActiveFigurePawn && isPreviousMoveMadeByPawn && whetherTheNewPosIsJumpedOver && didEnemyPawnJumpAcrossTheSquare) {
                let eatenPawn = document.querySelector(`td[data-pos='${this.history[this.moveNumber - 1][3]}']`);

                if (this.phase == 'white') {
                    this.eatenBlackFigures.push(eatenPawn.textContent);
                    this.blackFiguresPositions.splice(this.blackFiguresPositions.indexOf(this.history[this.moveNumber - 1][3]), 1);
                } else {
                    this.eatenWhiteFigures.push(eatenPawn.textContent);
                    this.whiteFiguresPositions.splice(this.whiteFiguresPositions.indexOf(this.history[this.moveNumber - 1][3]), 1);
                }

                //deleting previous position
                this.history.push([this.phase, this.activeFigure.dataset.figure, this.activeFigure.dataset.pos, target.dataset.pos, eatenPawn.textContent]);
                this.moveNumber++;

                //replacing figure
                target.textContent = this.activeFigure.textContent;
                target.dataset.color = this.activeFigure.dataset.color;
                target.dataset.figure = this.activeFigure.dataset.figure;

                eatenPawn.textContent = '';
                eatenPawn.removeAttribute('data-color');
                eatenPawn.removeAttribute('data-figure');

                if (this.phase == 'white') {
                    this.whiteFiguresPositions.splice(this.whiteFiguresPositions.indexOf(this.activeFigure.dataset.pos), 1);
                    this.whiteFiguresPositions.push(target.dataset.pos);
                } else {
                    this.blackFiguresPositions.splice(this.blackFiguresPositions.indexOf(this.activeFigure.dataset.pos), 1);
                    this.blackFiguresPositions.push(target.dataset.pos);
                }

                this.activeFigure.textContent = '';
                this.activeFigure.removeAttribute('data-color');
                this.activeFigure.removeAttribute('data-figure');

                this.activeFigure.classList.remove('active-td');

                while (document.querySelector('.possibleStep')) {
                    document.querySelector('.possibleStep').classList.remove('possibleStep');
                }


                console.log(this.eatenBlackFigures);
                console.log(this.eatenWhiteFigures);
                console.log(this.history);
                console.log(this.blackFiguresPositions);
                console.log(this.whiteFiguresPositions);

            }

            //checking if one figure eats other and making a move
            else if ((this.activeFigure.dataset.color == 'white' && this.blackFiguresPositions.includes(target.dataset.pos)) || (this.activeFigure.dataset.color == 'black' && this.whiteFiguresPositions.includes(target.dataset.pos))) {
                if (this.phase == 'white') {
                    this.eatenBlackFigures.push(target.textContent);
                    this.blackFiguresPositions.splice(this.blackFiguresPositions.indexOf(target.dataset.pos), 1);
                } else {
                    this.eatenWhiteFigures.push(target.textContent);
                    this.whiteFiguresPositions.splice(this.whiteFiguresPositions.indexOf(target.dataset.pos), 1);
                }

                this.history.push([this.phase, this.activeFigure.dataset.figure, this.activeFigure.dataset.pos, target.dataset.pos, target.textContent]);
                this.moveNumber++;

                target.textContent = this.activeFigure.textContent;
                target.dataset.color = this.activeFigure.dataset.color;
                target.dataset.figure = this.activeFigure.dataset.figure;

                if (this.phase == 'white') {
                    this.whiteFiguresPositions.splice(this.whiteFiguresPositions.indexOf(this.activeFigure.dataset.pos), 1);
                    this.whiteFiguresPositions.push(target.dataset.pos);
                } else {
                    this.blackFiguresPositions.splice(this.blackFiguresPositions.indexOf(this.activeFigure.dataset.pos), 1);
                    this.blackFiguresPositions.push(target.dataset.pos);
                }

                this.activeFigure.textContent = '';
                this.activeFigure.removeAttribute('data-color');
                this.activeFigure.removeAttribute('data-figure');

                this.activeFigure.classList.remove('active-td');

                while (document.querySelector('.possibleStep')) {
                    document.querySelector('.possibleStep').classList.remove('possibleStep');
                }

                console.log(this.eatenBlackFigures);
                console.log(this.eatenWhiteFigures);
                console.log(this.history);
                console.log(this.blackFiguresPositions);
                console.log(this.whiteFiguresPositions);
            }
            
            //making a move
            else if (this.activeFigure.dataset.figure) {
                target.textContent = this.activeFigure.textContent;
                target.dataset.color = this.activeFigure.dataset.color;
                target.dataset.figure = this.activeFigure.dataset.figure;

                this.history.push([this.phase, this.activeFigure.dataset.figure, this.activeFigure.dataset.pos, target.dataset.pos]);
                this.moveNumber++;

                if (this.phase == 'white') {
                    this.whiteFiguresPositions.splice(this.whiteFiguresPositions.indexOf(this.activeFigure.dataset.pos), 1);
                    this.whiteFiguresPositions.push(target.dataset.pos);
                } else {
                    this.blackFiguresPositions.splice(this.blackFiguresPositions.indexOf(this.activeFigure.dataset.pos), 1);
                    this.blackFiguresPositions.push(target.dataset.pos);
                }

                this.activeFigure.textContent = '';
                this.activeFigure.removeAttribute('data-color');
                this.activeFigure.removeAttribute('data-figure');

                this.activeFigure.classList.remove('active-td');

                while (document.querySelector('.possibleStep')) {
                    document.querySelector('.possibleStep').classList.remove('possibleStep');
                }
            }

            //прописать функции проверки нахождения пешки на границе карты, проверки шаха и мата
            
            this.writeHistory();
            this.writeEatenFigures();
            
            console.log(this.eatenBlackFigures);
            console.log(this.eatenWhiteFigures);
            console.log(this.history);
            this.phase = this.phase == 'white' ? 'black' : 'white';
            this.isPawnOnEdge(target);
            setTimeout(() => {
                this.isCheck();
            }, 50);
        } else {
            this.activeFigure.classList.remove('active-td');
            while (document.querySelector('.possibleStep')) {
                document.querySelector('.possibleStep').classList.remove('possibleStep');
            }
            this.play();
        }
    },
    
    writeHistory() {
        let historyList = document.querySelector('.moveHistory');
        historyList.innerHTML = '';
        this.history.forEach((step) => {
            let p = document.createElement('p');
            let figure = figuresHtml[step[1] + step[0]];
            let subString = step.length == 5 ? figure + ': ' + step[2] + '<i style="font-size: 10px;" class="fa-solid fa-arrow-right"></i>' + step[3] + ', ' + step[4] : figure + ': ' + step[2] + '<i style="font-size: 10px;" class="fa-solid fa-arrow-right"></i>' + step[3];
            p.innerHTML = subString;
            historyList.append(p);
            historyList.scroll(0, historyList.scrollHeight);
        });
    },
    
    writeEatenFigures() {
        let whiteEatenFiguresList = document.querySelector('#whiteEatenFigures');
        let blackEatenFiguresList = document.querySelector('#blackEatenFigures');
        let whiteFigures = '';
        let blackFigures = '';
        this.eatenBlackFigures.forEach((figure) => {
            blackFigures += figure + ' ';
        });
        this.eatenWhiteFigures.forEach((figure) => {
            whiteFigures += figure + ' ';
        });
        whiteEatenFiguresList.innerHTML = whiteFigures;
        blackEatenFiguresList.innerHTML = blackFigures;
    },

    isPawnOnEdge(target) {
        if (target.dataset.figure == 'p' && (target.dataset.pos[1] == 1 || target.dataset.pos[1] == 8)) {
            this.drawFigureMenu(target);
        } else {
            this.play();
        }
    },

    drawFigureMenu(target) {
        if (target.dataset.color == 'white') {
            document.querySelector(`td[data-pos="${target.dataset.pos}"]`).style.position = 'absolute';

            let div = document.createElement('div');

            div.classList.add('possibleFigureMenu');

            div.innerHTML = `<div onclick="game.writeNewFigure('Q', '&#9813', '${target.dataset.pos}')" class="possibleFigureMenuList" data-figure="Q" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">&#9813;</div> <div onclick="game.writeNewFigure('r', '&#9814', '${target.dataset.pos}')" class="possibleFigureMenuList">&#9814;</div> <div onclick="game.writeNewFigure('b', '&#9815', '${target.dataset.pos}')" class="possibleFigureMenuList">&#9815;</div> <div onclick="game.writeNewFigure('k', '&#9816', '${target.dataset.pos}')" class="possibleFigureMenuList" style="border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; border-bottom: 1px solid;">&#9816;</div>`

            document.querySelector(`td[data-pos="${target.dataset.pos}"]`).appendChild(div);
        } else {
            document.querySelector(`td[data-pos="${target.dataset.pos}"]`).style.position = 'absolute';

            let div = document.createElement('div');

            div.classList.add('possibleFigureMenu');

            div.innerHTML = `<div onclick="game.writeNewFigure('Q', '&#9819', '${target.dataset.pos}')" class="possibleFigureMenuList" data-figure="Q" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">&#9819;</div> <div onclick="game.writeNewFigure('r', '&#9820', '${target.dataset.pos}')" class="possibleFigureMenuList">&#9820;</div> <div onclick="game.writeNewFigure('b', '&#9821', '${target.dataset.pos}')" class="possibleFigureMenuList">&#9821;</div> <div onclick="game.writeNewFigure('k', '&#9822', '${target.dataset.pos}')" class="possibleFigureMenuList" style="border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; border-bottom: 1px solid;">&#9822;</div>`

            document.querySelector(`td[data-pos="${target.dataset.pos}"]`).appendChild(div);

        }
    },

    writeNewFigure(figure, figureCode, pos) {
        document.querySelector('.possibleFigureMenu').remove();

        document.querySelector(`td[data-pos="${pos}"]`).style.removeProperty('position');
        document.querySelector(`td[data-pos="${pos}"]`).dataset.figure = figure;
        document.querySelector(`td[data-pos="${pos}"]`).innerHTML = figureCode;
        this.history[this.moveNumber - 1].push(figureCode);
        this.isCheck();
    },

    isCheck() {
        if (this.phase == 'black') {
            if (this.getPossibleStepsEnemy(this.blackFiguresPositions).includes(this.blackKingPosition)) {
                alert('Шах черным');
            }
        } else {
            if (this.getPossibleStepsEnemy(this.whiteFiguresPositions).includes(this.whiteKingPosition)) {
                alert('Шах белым');
            }
        }
        this.isMate();
    },

    isMate() {
        if (this.phase == 'black') {
            this.possibleStepsBlackFigures = [];

            for (let i = 0; i < this.blackFiguresPositions.length; i++) {
                let activeCell = document.querySelector(`td[data-pos='${this.blackFiguresPositions[i]}']`);

                let figure = activeCell.dataset.figure;

                switch (figure) {
                    case 'p':
                        this.possibleStepsBlackFigures.push(...this.getStepsPawn(activeCell));
                        break;
                    case 'r':
                        this.possibleStepsBlackFigures.push(...this.getStepsRook(activeCell));
                        break;
                    case 'k':
                        this.possibleStepsBlackFigures.push(...this.getStepsKnight(activeCell));
                        break;
                    case 'b':
                        this.possibleStepsBlackFigures.push(...this.getStepsBishop(activeCell));
                        break;
                    case 'Q':
                        this.possibleStepsBlackFigures.push(...this.getStepsQueen(activeCell));
                        break;
                    case 'K':
                        this.possibleStepsBlackFigures.push(...this.getStepsKing(activeCell));
                        break;
                }
            }

            if (this.possibleStepsBlackFigures.length == 0) {
                alert('Мат черным');
                board.onclick = () => {};
                clearInterval(this.timerControl);
            } else {
                this.play();
            }
        } else {
            this.possibleStepsWhiteFigures = [];

            for (let i = 0; i < this.whiteFiguresPositions.length; i++) {
                let activeCell = document.querySelector(`td[data-pos='${this.whiteFiguresPositions[i]}']`);

                let figure = activeCell.dataset.figure;

                switch (figure) {
                    case 'p':
                        this.possibleStepsWhiteFigures.push(...this.getStepsPawn(activeCell));
                        break;
                    case 'r':
                        this.possibleStepsWhiteFigures.push(...this.getStepsRook(activeCell));
                        break;
                    case 'k':
                        this.possibleStepsWhiteFigures.push(...this.getStepsKnight(activeCell));
                        break;
                    case 'b':
                        this.possibleStepsWhiteFigures.push(...this.getStepsBishop(activeCell));
                        break;
                    case 'Q':
                        this.possibleStepsWhiteFigures.push(...this.getStepsQueen(activeCell));
                        break;
                    case 'K':
                        this.possibleStepsWhiteFigures.push(...this.getStepsKing(activeCell));
                        break;
                }
            }
            if (this.possibleStepsWhiteFigures.length == 0) {
                alert('Мат белым');
                board.onclick = () => {};
                clearInterval(this.timerControl);
            } else {
                this.play();
            }
        }
    },

    getPossibleSteps(target) {
        let possibleSteps = [];
        switch (target.dataset.figure) {
            case 'p':
                possibleSteps.push(...this.getStepsPawn(target));
                break;
            case 'r':
                possibleSteps.push(...this.getStepsRook(target));
                break;
            case 'k':
                possibleSteps.push(...this.getStepsKnight(target));
                break;
            case 'b':
                possibleSteps.push(...this.getStepsBishop(target));
                break;
            case 'Q':
                possibleSteps.push(...this.getStepsQueen(target));
                break;
            case 'K':
                possibleSteps.push(...this.getStepsKing(target));
                break;
        }
        return possibleSteps;
    },

    getPossibleStepsEnemy(enemyFigures) {
        let color = this.phase == 'white' ? 'black' : 'white';

        if (color == 'black') {

            let possibleStepsEnemy = [];

            for (let i = 0; i < this.blackFiguresPositions.length; i++) {
                let activeCell = document.querySelector(`td[data-pos='${this.blackFiguresPositions[i]}']`);

                let figure = activeCell.dataset.figure;

                switch (figure) {
                    case 'p':
                        possibleStepsEnemy.push(...this.getStepsPawnEnemy(this.blackFiguresPositions[i], color, enemyFigures));
                        break;
                    case 'r':
                        possibleStepsEnemy.push(...this.getStepsRookEnemy(this.blackFiguresPositions[i], color, enemyFigures));
                        break;
                    case 'k':
                        possibleStepsEnemy.push(...this.getStepsKnightEnemy(this.blackFiguresPositions[i], color, enemyFigures));
                        break;
                    case 'b':
                        possibleStepsEnemy.push(...this.getStepsBishopEnemy(this.blackFiguresPositions[i], color, enemyFigures));
                        break;
                    case 'Q':
                        possibleStepsEnemy.push(...this.getStepsQueenEnemy(this.blackFiguresPositions[i], color, enemyFigures));
                        break;
                    case 'K':
                        possibleStepsEnemy.push(...this.getStepsKingEnemy(this.blackFiguresPositions[i], color, enemyFigures));
                        break;
                }
            }
            return possibleStepsEnemy;
        } else {
            let possibleStepsEnemy = [];

            for (let i = 0; i < this.whiteFiguresPositions.length; i++) {
                let activeCell = document.querySelector(`td[data-pos='${this.whiteFiguresPositions[i]}']`);

                let figure = activeCell.dataset.figure;

                switch (figure) {
                    case 'p':
                        possibleStepsEnemy.push(...this.getStepsPawnEnemy(this.whiteFiguresPositions[i], color, enemyFigures));
                        break;
                    case 'r':
                        possibleStepsEnemy.push(...this.getStepsRookEnemy(this.whiteFiguresPositions[i], color, enemyFigures));
                        break;
                    case 'k':
                        possibleStepsEnemy.push(...this.getStepsKnightEnemy(this.whiteFiguresPositions[i], color, enemyFigures));
                        break;
                    case 'b':
                        possibleStepsEnemy.push(...this.getStepsBishopEnemy(this.whiteFiguresPositions[i], color, enemyFigures));
                        break;
                    case 'Q':
                        possibleStepsEnemy.push(...this.getStepsQueenEnemy(this.whiteFiguresPositions[i], color, enemyFigures));
                        break;
                    case 'K':
                        possibleStepsEnemy.push(...this.getStepsKingEnemy(this.whiteFiguresPositions[i], color, enemyFigures));
                        break;
                }
            }
            return possibleStepsEnemy;
        }
    },

    getStepsPawn(target) {
        let pos = target.dataset.pos;
        let color = target.dataset.color;

        let possibleSteps = [];

        if (color == 'white') {

            //clone figures positions list
            let whiteFiguresPositionsClone = [];
            for (let i = 0; i < this.whiteFiguresPositions.length; i++) {
                whiteFiguresPositionsClone.push(this.whiteFiguresPositions[i]);
            }

            //deleting position of the current figure
            whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(pos), 1);

            // <===CALCULATING===>

            //checking if pawn can move 2 squares
            if (pos[1] == 7) {
                if (!this.whiteFiguresPositions.includes(pos[0] + (+pos[1] - 2)) && !this.whiteFiguresPositions.includes(pos[0] + (+pos[1] - 1)) && !this.blackFiguresPositions.includes(pos[0] + (+pos[1] - 2)) && !this.blackFiguresPositions.includes(pos[0] + (+pos[1] - 1))) {

                    //making possible positions of figures after the move
                    whiteFiguresPositionsClone.push(pos[0] + (+pos[1] - 2));
                    this.moveNumber++;
                    this.history.push(['white', 'p', pos, pos[0] + (+pos[1] - 2)]);

                    //checking if the king can be eaten with new positions of figures
                    if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                        possibleSteps.push(pos[0] + (+pos[1] - 2));
                    }

                    whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(pos[0] + (+pos[1] - 2)), 1);
                    this.moveNumber--;
                    this.history.pop();
                }
            }

            //checking if pawn can move a square
            if (!this.whiteFiguresPositions.includes(pos[0] + (+pos[1] - 1)) && !this.blackFiguresPositions.includes(pos[0] + (+pos[1] - 1))) {
                whiteFiguresPositionsClone.push(pos[0] + (+pos[1] - 1));

                if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                    possibleSteps.push(pos[0] + (+pos[1] - 1));
                }

                whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(pos[0] + (+pos[1] - 1)));
            }

            //checking if pawn can eat
            let left = !(letters.indexOf(pos[0]) - 1 < 0) && !(+pos[1] - 1 < 1) ? letters[letters.indexOf(pos[0]) - 1] + (+pos[1] - 1) : 0;
            let right = !(letters.indexOf(pos[0]) + 1 > 7) && !(+pos[1] - 1 < 1) ? letters[letters.indexOf(pos[0]) + 1] + (+pos[1] - 1) : 0;

            if (left && this.blackFiguresPositions.includes(left)) {
                whiteFiguresPositionsClone.push(left);

                this.blackFiguresPositions.splice(this.blackFiguresPositions.indexOf(left), 1);

                if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                    possibleSteps.push(left);
                }

                whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(left), 1);
                this.blackFiguresPositions.push(left);
            }

            if (right && this.blackFiguresPositions.includes(right)) {
                whiteFiguresPositionsClone.push(right);

                this.blackFiguresPositions.splice(this.blackFiguresPositions.indexOf(right), 1);

                if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                    possibleSteps.push(right);
                }

                whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(right), 1);
                this.blackFiguresPositions.push(right);
            }

            //checking if pawn can capture en passant
            if (this.moveNumber != 0) {
                if (this.history[this.moveNumber - 1][0] != 'white' && this.history[this.moveNumber - 1][1] == 'p') {
                    if (right) {
                        if (this.history[this.moveNumber - 1][2][0] + (+this.history[this.moveNumber - 1][2][1] + 1) == right && this.history[this.moveNumber - 1][3] == this.history[this.moveNumber - 1][2][0] + (+this.history[this.moveNumber - 1][2][1] + 2)) {
                            whiteFiguresPositionsClone.push(right);

                            this.blackFiguresPositions.splice(this.blackFiguresPositions.indexOf(right[0] + (+right[1] + 1)), 1);

                            if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                                possibleSteps.push(right);
                            }

                            whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(right), 1);
                            this.blackFiguresPositions.push(right[0] + (+right[1] + 1));
                        }
                    }

                    if (left) {
                        if (this.history[this.moveNumber - 1][2][0] + (+this.history[this.moveNumber - 1][2][1] + 1) == left && this.history[this.moveNumber - 1][3] == this.history[this.moveNumber - 1][2][0] + (+this.history[this.moveNumber - 1][2][1] + 2)) {
                            whiteFiguresPositionsClone.push(left);

                            this.blackFiguresPositions.splice(this.blackFiguresPositions.indexOf(left[0] + (+left[1] + 1)), 1);

                            if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                                possibleSteps.push(left);
                            }

                            whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(left), 1);
                            this.blackFiguresPositions.push(left[0] + (+left[1] + 1));
                        }
                    }
                }
            }
        } else {
            //clone figures positions list
            let blackFiguresPositionsClone = [];
            for (let i = 0; i < this.blackFiguresPositions.length; i++) {
                blackFiguresPositionsClone.push(this.blackFiguresPositions[i]);
            }

            //deleting position of the current figure
            blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(pos), 1);

            // <===CALCULATING===>

            //checking if pawn can move 2 squares
            if (pos[1] == 2) {
                if (!this.blackFiguresPositions.includes(pos[0] + (+pos[1] + 2)) && !this.blackFiguresPositions.includes(pos[0] + (+pos[1] + 1)) && !this.whiteFiguresPositions.includes(pos[0] + (+pos[1] + 2)) && !this.whiteFiguresPositions.includes(pos[0] + (+pos[1] + 1))) {

                    //making possible positions of figures after the move
                    blackFiguresPositionsClone.push(pos[0] + (+pos[1] + 2));

                    //checking if the king can be eaten with new positions of figures
                    if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                        possibleSteps.push(pos[0] + (+pos[1] + 2));
                    }

                    blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(pos[0] + (+pos[1] + 2)), 1);
                }
            }

            //checking if pawn can move a square
            if (!this.blackFiguresPositions.includes(pos[0] + (+pos[1] + 1)) && !this.whiteFiguresPositions.includes(pos[0] + (+pos[1] + 1))) {
                blackFiguresPositionsClone.push(pos[0] + (+pos[1] + 1));

                if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                    possibleSteps.push(pos[0] + (+pos[1] + 1));
                }

                blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(pos[0] + (+pos[1] + 1)), 1);
            }

            //checking if pawn can eat
            let left = !(letters.indexOf(pos[0]) - 1 < 0) && !(+pos[1] + 1 > 8) ? letters[letters.indexOf(pos[0]) - 1] + (+pos[1] + 1) : 0;
            let right = !(letters.indexOf(pos[0]) + 1 > 7) && !(+pos[1] + 1 > 8) ? letters[letters.indexOf(pos[0]) + 1] + (+pos[1] + 1) : 0;

            if (left && this.whiteFiguresPositions.includes(left)) {
                blackFiguresPositionsClone.push(left);

                this.whiteFiguresPositions.splice(this.whiteFiguresPositions.indexOf(left), 1);

                if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                    possibleSteps.push(left);
                }

                blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(left), 1);
                this.whiteFiguresPositions.push(left);
            }

            if (right && this.whiteFiguresPositions.includes(right)) {
                blackFiguresPositionsClone.push(right);

                this.whiteFiguresPositions.splice(this.whiteFiguresPositions.indexOf(right), 1);

                if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                    possibleSteps.push(right);
                }

                blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(right), 1);
                this.whiteFiguresPositions.push(right);
            }

            //checking if pawn can capture en passant
            if (this.moveNumber != 0) {
                if (this.history[this.moveNumber - 1][0] != 'black' && this.history[this.moveNumber - 1][1] == 'p') {
                    if (right) {
                        if (this.history[this.moveNumber - 1][2][0] + (+this.history[this.moveNumber - 1][2][1] - 1) == right && this.history[this.moveNumber - 1][3] == this.history[this.moveNumber - 1][2][0] + (+this.history[this.moveNumber - 1][2][1] - 2)) {
                            blackFiguresPositionsClone.push(right);

                            this.whiteFiguresPositions.splice(this.whiteFiguresPositions.indexOf(right[0] + (+right[1] - 1)), 1);

                            if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                                possibleSteps.push(right);
                            }

                            blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(right), 1);
                            this.whiteFiguresPositions.push(right[0] + (+right[1] - 1));
                        }
                    }

                    if (left) {
                        if (this.history[this.moveNumber - 1][2][0] + (+this.history[this.moveNumber - 1][2][1] - 1) == left && this.history[this.moveNumber - 1][3] == this.history[this.moveNumber - 1][2][0] + (+this.history[this.moveNumber - 1][2][1] - 2)) {
                            blackFiguresPositionsClone.push(left);

                            this.whiteFiguresPositions.splice(this.whiteFiguresPositions.indexOf(left[0] + (+left[1] - 1)), 1);

                            if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                                possibleSteps.push(left);
                            }

                            blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(left), 1);
                            this.whiteFiguresPositions.push(left[0] + (+left[1] - 1));
                        }
                    }
                }
            }
        }
        return possibleSteps;
    },

    getStepsPawnEnemy(pos, color, enemyFigures) {
        let possibleSteps = [];

        if (color == 'white') {
            if (pos[1] == 7) {
                if (!this.whiteFiguresPositions.includes(pos[0] + (+pos[1] - 2)) && !this.whiteFiguresPositions.includes(pos[0] + (+pos[1] - 1)) && !enemyFigures.includes(pos[0] + (+pos[1] - 2)) && !enemyFigures.includes(pos[0] + (+pos[1] - 1))) {
                    possibleSteps.push(pos[0] + (+pos[1] - 2));
                }
            }

            if (!this.whiteFiguresPositions.includes(pos[0] + (+pos[1] - 1)) && !enemyFigures.includes(pos[0] + (+pos[1] - 1))) {
                possibleSteps.push(pos[0] + (+pos[1] - 1));
            }

            let left = !(letters.indexOf(pos[0]) - 1 < 0) && !(+pos[1] - 1 < 1) ? letters[letters.indexOf(pos[0]) - 1] + (+pos[1] - 1) : 0;
            let right = !(letters.indexOf(pos[0]) + 1 > 7) && !(+pos[1] - 1 < 1) ? letters[letters.indexOf(pos[0]) + 1] + (+pos[1] - 1) : 0;

            if (left && enemyFigures.includes(left)) {
                possibleSteps.push(left);
            }

            if (right && enemyFigures.includes(right)) {
                possibleSteps.push(right);
            }

            if (this.moveNumber != 0) {
                if (this.history[this.moveNumber - 1][0] != 'white' && this.history[this.moveNumber - 1][1] == 'p') {
                    if (right) {
                        if (this.history[this.moveNumber - 1][2][0] + (+this.history[this.moveNumber - 1][2][1] + 1) == right && this.history[this.moveNumber - 1][3] == this.history[this.moveNumber - 1][2][0] + (+this.history[this.moveNumber - 1][2][1] + 2)) {
                            possibleSteps.push(right);
                        }
                    }

                    if (left) {
                        if (this.history[this.moveNumber - 1][2][0] + (+this.history[this.moveNumber - 1][2][1] + 1) == left) {
                            possibleSteps.push(left);
                        }
                    }
                }
            }
        } else {
            if (pos[1] == 2) {
                if (!this.blackFiguresPositions.includes(pos[0] + (+pos[1] + 2)) && !enemyFigures.includes(pos[0] + (+pos[1] + 2)) && !enemyFigures.includes(pos[0] + (+pos[1] + 1)) && !this.blackFiguresPositions.includes(pos[0] + (+pos[1] + 1))) {
                    possibleSteps.push(pos[0] + (+pos[1] + 2));
                }
            }

            if (!this.blackFiguresPositions.includes(pos[0] + (+pos[1] + 1)) && !enemyFigures.includes(pos[0] + (+pos[1] + 1))) {
                possibleSteps.push(pos[0] + (+pos[1] + 1));
            }

            let right = !(letters.indexOf(pos[0]) - 1 < 0) && !(+pos[1] + 1 > 8) ? letters[letters.indexOf(pos[0]) - 1] + (+pos[1] + 1) : 0;
            let left = !(letters.indexOf(pos[0]) + 1 > 7) && !(+pos[1] + 1 > 8) ? letters[letters.indexOf(pos[0]) + 1] + (+pos[1] + 1) : 0;

            if (left && enemyFigures.includes(left)) {
                possibleSteps.push(left);
            }

            if (right && enemyFigures.includes(right)) {
                possibleSteps.push(right);
            }

            if (this.moveNumber != 0) {
                if (this.history[this.moveNumber - 1][0] != 'black' && this.history[this.moveNumber - 1][1] == 'p') {
                    if (right) {
                        if (this.history[this.moveNumber - 1][2][0] + (+this.history[this.moveNumber - 1][2][1] - 1) == right && this.history[this.moveNumber - 1][3] == this.history[this.moveNumber - 1][2][0] + (+this.history[this.moveNumber - 1][2][1] - 2)) {
                            possibleSteps.push(right);
                        }
                    }

                    if (left) {
                        if (this.history[this.moveNumber - 1][2][0] + (+this.history[this.moveNumber - 1][2][1] - 1) == left && this.history[this.moveNumber - 1][3] == this.history[this.moveNumber - 1][2][0] + (+this.history[this.moveNumber - 1][2][1] - 2)) {
                            possibleSteps.push(left);
                        }
                    }
                }
            }
        }

        return possibleSteps;
    },

    getStepsRook(target) {
        let pos = target.dataset.pos;
        let color = target.dataset.color;

        let possibleSteps = [];

        if (color == 'white') {

            //clone figures positions list
            let whiteFiguresPositionsClone = [];
            for (let i = 0; i < this.whiteFiguresPositions.length; i++) {
                whiteFiguresPositionsClone.push(this.whiteFiguresPositions[i]);
            }

            //deleting position of the current figure
            whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(pos), 1);

            // <===CALCULATING===>

            //moving down
            for (let i = +pos[1] + 1; i < 9; i++) {
                if (!whiteFiguresPositionsClone.includes(pos[0] + i)) {
                    if (this.blackFiguresPositions.includes(pos[0] + i)) {
                        whiteFiguresPositionsClone.push(pos[0] + i);

                        this.blackFiguresPositions.splice(this.blackFiguresPositions.indexOf(pos[0] + i), 1);

                        if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                            possibleSteps.push(pos[0] + i);
                        }

                        whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(pos[0] + i), 1);
                        this.blackFiguresPositions.push(pos[0] + i);
                        break;
                    }

                    whiteFiguresPositionsClone.push(pos[0] + i);

                    if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                        possibleSteps.push(pos[0] + i);
                    }

                    whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(pos[0] + i));
                } else {
                    break;
                }
            }

            //moving up 
            for (let i = +pos[1] - 1; i > 0; i--) {
                if (!whiteFiguresPositionsClone.includes(pos[0] + i)) {
                    if (this.blackFiguresPositions.includes(pos[0] + i)) {
                        whiteFiguresPositionsClone.push(pos[0] + i);

                        this.blackFiguresPositions.splice(this.blackFiguresPositions.indexOf(pos[0] + i), 1);

                        if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                            possibleSteps.push(pos[0] + i);
                        }

                        whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(pos[0] + i), 1);
                        this.blackFiguresPositions.push(pos[0] + i);
                        break;
                    }

                    whiteFiguresPositionsClone.push(pos[0] + i);

                    if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                        possibleSteps.push(pos[0] + i);
                    }

                    whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(pos[0] + i));
                } else {
                    break;
                }
            }

            //moving right
            for (let i = letters.indexOf(pos[0]) + 1; i < letters.length; i++) {
                if (!whiteFiguresPositionsClone.includes(letters[i] + pos[1])) {
                    if (this.blackFiguresPositions.includes(letters[i] + pos[1])) {
                        whiteFiguresPositionsClone.push(letters[i] + pos[1]);

                        this.blackFiguresPositions.splice(this.blackFiguresPositions.indexOf(letters[i] + pos[1]), 1);

                        if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                            possibleSteps.push(letters[i] + pos[1]);
                        }

                        whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(letters[i] + pos[1]), 1);
                        this.blackFiguresPositions.push(letters[i] + pos[1]);
                        break;
                    }

                    whiteFiguresPositionsClone.push(letters[i] + pos[1]);

                    if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                        possibleSteps.push(letters[i] + pos[1]);
                    }

                    whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(letters[i] + pos[1]));
                } else {
                    break;
                }
            }

            //moving left
            for (let i = letters.indexOf(pos[0]) - 1; i > -1; i--) {
                if (!whiteFiguresPositionsClone.includes(letters[i] + pos[1])) {
                    if (this.blackFiguresPositions.includes(letters[i] + pos[1])) {
                        whiteFiguresPositionsClone.push(letters[i] + pos[1]);

                        this.blackFiguresPositions.splice(this.blackFiguresPositions.indexOf(letters[i] + pos[1]), 1);

                        if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                            possibleSteps.push(letters[i] + pos[1]);
                        }

                        whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(letters[i] + pos[1]), 1);
                        this.blackFiguresPositions.push(letters[i] + pos[1]);
                        break;
                    }

                    whiteFiguresPositionsClone.push(letters[i] + pos[1]);

                    if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                        possibleSteps.push(letters[i] + pos[1]);
                    }

                    whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(letters[i] + pos[1]));
                } else {
                    break;
                }
            }

        } else {

            //clone figures positions list
            let blackFiguresPositionsClone = [];
            for (let i = 0; i < this.blackFiguresPositions.length; i++) {
                blackFiguresPositionsClone.push(this.blackFiguresPositions[i]);
            }

            //deleting position of the current figure
            blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(pos), 1);

            // <===CALCULATING===>

            //moving down
            for (let i = +pos[1] + 1; i < 9; i++) {
                if (!blackFiguresPositionsClone.includes(pos[0] + i)) {
                    if (this.whiteFiguresPositions.includes(pos[0] + i)) {
                        blackFiguresPositionsClone.push(pos[0] + i);

                        this.whiteFiguresPositions.splice(this.whiteFiguresPositions.indexOf(pos[0] + i), 1);

                        if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                            possibleSteps.push(pos[0] + i);
                        }

                        blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(pos[0] + i), 1);
                        this.whiteFiguresPositions.push(pos[0] + i);
                        break;
                    }

                    blackFiguresPositionsClone.push(pos[0] + i);

                    if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                        possibleSteps.push(pos[0] + i);
                    }

                    blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(pos[0] + i));
                } else {
                    break;
                }
            }

            //moving up 
            for (let i = +pos[1] - 1; i > 0; i--) {
                if (!blackFiguresPositionsClone.includes(pos[0] + i)) {
                    if (this.whiteFiguresPositions.includes(pos[0] + i)) {
                        blackFiguresPositionsClone.push(pos[0] + i);

                        this.whiteFiguresPositions.splice(this.whiteFiguresPositions.indexOf(pos[0] + i), 1);

                        if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                            possibleSteps.push(pos[0] + i);
                        }

                        blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(pos[0] + i), 1);
                        this.whiteFiguresPositions.push(pos[0] + i);
                        break;
                    }

                    blackFiguresPositionsClone.push(pos[0] + i);

                    if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                        possibleSteps.push(pos[0] + i);
                    }

                    blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(pos[0] + i));
                } else {
                    break;
                }
            }

            //moving right
            for (let i = letters.indexOf(pos[0]) + 1; i < letters.length; i++) {
                if (!blackFiguresPositionsClone.includes(letters[i] + pos[1])) {
                    if (this.whiteFiguresPositions.includes(letters[i] + pos[1])) {
                        blackFiguresPositionsClone.push(letters[i] + pos[1]);

                        this.whiteFiguresPositions.splice(this.whiteFiguresPositions.indexOf(letters[i] + pos[1]), 1);

                        if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                            possibleSteps.push(letters[i] + pos[1]);
                        }

                        blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(letters[i] + pos[1]), 1);
                        this.whiteFiguresPositions.push(letters[i] + pos[1]);
                        break;
                    }

                    blackFiguresPositionsClone.push(letters[i] + pos[1]);

                    if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                        possibleSteps.push(letters[i] + pos[1]);
                    }

                    blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(letters[i] + pos[1]));
                } else {
                    break;
                }
            }

            //moving left
            for (let i = letters.indexOf(pos[0]) - 1; i > -1; i--) {
                if (!blackFiguresPositionsClone.includes(letters[i] + pos[1])) {
                    if (this.whiteFiguresPositions.includes(letters[i] + pos[1])) {
                        blackFiguresPositionsClone.push(letters[i] + pos[1]);

                        this.whiteFiguresPositions.splice(this.whiteFiguresPositions.indexOf(letters[i] + pos[1]), 1);

                        if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                            possibleSteps.push(letters[i] + pos[1]);
                        }

                        blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(letters[i] + pos[1]), 1);
                        this.whiteFiguresPositions.push(letters[i] + pos[1]);
                        break;
                    }

                    blackFiguresPositionsClone.push(letters[i] + pos[1]);

                    if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                        possibleSteps.push(letters[i] + pos[1]);
                    }

                    blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(letters[i] + pos[1]));
                } else {
                    break;
                }
            }

        }

        return possibleSteps;
    },

    getStepsRookEnemy(pos, color, enemyFigures) {
        let possibleSteps = [];

        if (color == 'white') {

            //moving down
            for (let i = +pos[1] + 1; i < 9; i++) {
                if (!this.whiteFiguresPositions.includes(pos[0] + i)) {
                    if (enemyFigures.includes(pos[0] + i)) {
                        possibleSteps.push(pos[0] + i);
                        break;
                    }

                    possibleSteps.push(pos[0] + i);
                } else {
                    break;
                }
            }

            //moving up
            for (let i = +pos[1] - 1; i > 0; i--) {
                if (!this.whiteFiguresPositions.includes(pos[0] + i)) {
                    if (enemyFigures.includes(pos[0] + i)) {
                        possibleSteps.push(pos[0] + i);
                        break;
                    }

                    possibleSteps.push(pos[0] + i);
                } else {
                    break;
                }
            }

            //moving right
            for (let i = letters.indexOf(pos[0]) + 1; i < letters.length; i++) {
                if (!this.whiteFiguresPositions.includes(letters[i] + pos[1])) {
                    if (enemyFigures.includes(letters[i] + pos[1])) {
                        possibleSteps.push(letters[i] + pos[1]);
                        break;
                    }

                    possibleSteps.push(letters[i] + pos[1]);
                } else {
                    break;
                }
            }

            //moving left
            for (let i = letters.indexOf(pos[0]) - 1; i > -1; i--) {
                if (!this.whiteFiguresPositions.includes(letters[i] + pos[1])) {
                    if (enemyFigures.includes(letters[i] + pos[1])) {
                        possibleSteps.push(letters[i] + pos[1]);
                        break;
                    }

                    possibleSteps.push(letters[i] + pos[1]);
                } else {
                    break;
                }
            }

        } else {

            //moving down
            for (let i = +pos[1] + 1; i < 9; i++) {
                if (!this.blackFiguresPositions.includes(pos[0] + i)) {
                    if (enemyFigures.includes(pos[0] + i)) {
                        possibleSteps.push(pos[0] + i);
                        break;
                    }

                    possibleSteps.push(pos[0] + i);
                } else {
                    break;
                }
            }

            //moving up
            for (let i = +pos[1] - 1; i > 0; i--) {
                if (!this.blackFiguresPositions.includes(pos[0] + i)) {
                    if (enemyFigures.includes(pos[0] + i)) {
                        possibleSteps.push(pos[0] + i);
                        break;
                    }

                    possibleSteps.push(pos[0] + i);
                } else {
                    break;
                }
            }

            //moving right
            for (let i = letters.indexOf(pos[0]) + 1; i < letters.length; i++) {
                if (!this.blackFiguresPositions.includes(letters[i] + pos[1])) {
                    if (enemyFigures.includes(letters[i] + pos[1])) {
                        possibleSteps.push(letters[i] + pos[1]);
                        break;
                    }

                    possibleSteps.push(letters[i] + pos[1]);
                } else {
                    break;
                }
            }

            //moving left
            for (let i = letters.indexOf(pos[0]) - 1; i > -1; i--) {
                if (!this.blackFiguresPositions.includes(letters[i] + pos[1])) {
                    if (enemyFigures.includes(letters[i] + pos[1])) {
                        possibleSteps.push(letters[i] + pos[1]);
                        break;
                    }

                    possibleSteps.push(letters[i] + pos[1]);
                } else {
                    break;
                }
            }
        }

        return possibleSteps;
    },

    getStepsBishop(target) {
        let pos = target.dataset.pos;
        let color = target.dataset.color;

        let possibleSteps = [];

        if (color == 'white') {

            //clone figures positions list
            let whiteFiguresPositionsClone = [];
            for (let i = 0; i < this.whiteFiguresPositions.length; i++) {
                whiteFiguresPositionsClone.push(this.whiteFiguresPositions[i]);
            }

            //deleting position of the current figure
            whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(pos), 1);

            // <===CALCULATING===>

            //moving down and right
            for (let i = letters.indexOf(pos[0]) + 1, j = +pos[1] + 1; i < letters.length && j < 9; i++, j++) {
                if (!whiteFiguresPositionsClone.includes(letters[i] + j)) {
                    if (this.blackFiguresPositions.includes(letters[i] + j)) {
                        whiteFiguresPositionsClone.push(letters[i] + j);

                        this.blackFiguresPositions.splice(this.blackFiguresPositions.indexOf(letters[i] + j), 1);

                        if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                            possibleSteps.push(letters[i] + j);
                        }

                        whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(letters[i] + j), 1);
                        this.blackFiguresPositions.push(letters[i] + j);
                        break;
                    }

                    whiteFiguresPositionsClone.push(letters[i] + j);

                    if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                        possibleSteps.push(letters[i] + j);
                    }

                    whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(letters[i] + j));
                } else {
                    break;
                }
            }

            //moving down and left
            for (let i = letters.indexOf(pos[0]) - 1, j = +pos[1] + 1; i > -1 && j < 9; i--, j++) {
                if (!whiteFiguresPositionsClone.includes(letters[i] + j)) {
                    if (this.blackFiguresPositions.includes(letters[i] + j)) {
                        whiteFiguresPositionsClone.push(letters[i] + j);

                        this.blackFiguresPositions.splice(this.blackFiguresPositions.indexOf(letters[i] + j), 1);

                        if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                            possibleSteps.push(letters[i] + j);
                        }

                        whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(letters[i] + j), 1);
                        this.blackFiguresPositions.push(letters[i] + j);
                        break;
                    }

                    whiteFiguresPositionsClone.push(letters[i] + j);

                    if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                        possibleSteps.push(letters[i] + j);
                    }

                    whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(letters[i] + j));
                } else {
                    break;
                }
            }

            //moving up and right
            for (let i = letters.indexOf(pos[0]) + 1, j = +pos[1] - 1; i < letters.length && j > 0; i++, j--) {
                if (!whiteFiguresPositionsClone.includes(letters[i] + j)) {
                    if (this.blackFiguresPositions.includes(letters[i] + j)) {
                        whiteFiguresPositionsClone.push(letters[i] + j);

                        this.blackFiguresPositions.splice(this.blackFiguresPositions.indexOf(letters[i] + j), 1);

                        if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                            possibleSteps.push(letters[i] + j);
                        }

                        whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(letters[i] + j), 1);
                        this.blackFiguresPositions.push(letters[i] + j);
                        break;
                    }

                    whiteFiguresPositionsClone.push(letters[i] + j);

                    if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                        possibleSteps.push(letters[i] + j);
                    }

                    whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(letters[i] + j));
                } else {
                    break;
                }
            }

            //moving up and left
            for (let i = letters.indexOf(pos[0]) - 1, j = +pos[1] - 1; i > -1 && j > 0; i--, j--) {
                if (!whiteFiguresPositionsClone.includes(letters[i] + j)) {
                    if (this.blackFiguresPositions.includes(letters[i] + j)) {
                        whiteFiguresPositionsClone.push(letters[i] + j);

                        this.blackFiguresPositions.splice(this.blackFiguresPositions.indexOf(letters[i] + j), 1);

                        if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                            possibleSteps.push(letters[i] + j);
                        }

                        whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(letters[i] + j), 1);
                        this.blackFiguresPositions.push(letters[i] + j);
                        break;
                    }

                    whiteFiguresPositionsClone.push(letters[i] + j);

                    if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                        possibleSteps.push(letters[i] + j);
                    }

                    whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(letters[i] + j));
                } else {
                    break;
                }
            }

        } else {
            //clone figures positions list
            let blackFiguresPositionsClone = [];
            for (let i = 0; i < this.blackFiguresPositions.length; i++) {
                blackFiguresPositionsClone.push(this.blackFiguresPositions[i]);
            }

            //deleting position of the current figure
            blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(pos), 1);

            // <===CALCULATING===>

            //moving down and right
            for (let i = letters.indexOf(pos[0]) + 1, j = +pos[1] + 1; i < letters.length && j < 9; i++, j++) {
                if (!blackFiguresPositionsClone.includes(letters[i] + j)) {
                    if (this.whiteFiguresPositions.includes(letters[i] + j)) {
                        blackFiguresPositionsClone.push(letters[i] + j);

                        this.whiteFiguresPositions.splice(this.whiteFiguresPositions.indexOf(letters[i] + j), 1);

                        if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                            possibleSteps.push(letters[i] + j);
                        }

                        blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(letters[i] + j), 1);
                        this.whiteFiguresPositions.push(letters[i] + j);
                        break;
                    }

                    blackFiguresPositionsClone.push(letters[i] + j);

                    if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                        possibleSteps.push(letters[i] + j);
                    }

                    blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(letters[i] + j));
                } else {
                    break;
                }
            }

            //moving down and left
            for (let i = letters.indexOf(pos[0]) - 1, j = +pos[1] + 1; i > -1 && j < 9; i--, j++) {
                if (!blackFiguresPositionsClone.includes(letters[i] + j)) {
                    if (this.whiteFiguresPositions.includes(letters[i] + j)) {
                        blackFiguresPositionsClone.push(letters[i] + j);

                        this.whiteFiguresPositions.splice(this.whiteFiguresPositions.indexOf(letters[i] + j), 1);

                        if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                            possibleSteps.push(letters[i] + j);
                        }

                        blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(letters[i] + j), 1);
                        this.whiteFiguresPositions.push(letters[i] + j);
                        break;
                    }

                    blackFiguresPositionsClone.push(letters[i] + j);

                    if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                        possibleSteps.push(letters[i] + j);
                    }

                    blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(letters[i] + j));
                } else {
                    break;
                }
            }

            //moving up and right
            for (let i = letters.indexOf(pos[0]) + 1, j = +pos[1] - 1; i < letters.length && j > 0; i++, j--) {
                if (!blackFiguresPositionsClone.includes(letters[i] + j)) {
                    if (this.whiteFiguresPositions.includes(letters[i] + j)) {
                        blackFiguresPositionsClone.push(letters[i] + j);

                        this.whiteFiguresPositions.splice(this.whiteFiguresPositions.indexOf(letters[i] + j), 1);

                        if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                            possibleSteps.push(letters[i] + j);
                        }

                        blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(letters[i] + j), 1);
                        this.whiteFiguresPositions.push(letters[i] + j);
                        break;
                    }

                    blackFiguresPositionsClone.push(letters[i] + j);

                    if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                        possibleSteps.push(letters[i] + j);
                    }

                    blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(letters[i] + j));
                } else {
                    break;
                }
            }

            //moving up and left
            for (let i = letters.indexOf(pos[0]) - 1, j = +pos[1] - 1; i > -1 && j > 0; i--, j--) {
                if (!blackFiguresPositionsClone.includes(letters[i] + j)) {
                    if (this.whiteFiguresPositions.includes(letters[i] + j)) {
                        blackFiguresPositionsClone.push(letters[i] + j);

                        this.whiteFiguresPositions.splice(this.whiteFiguresPositions.indexOf(letters[i] + j), 1);

                        if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                            possibleSteps.push(letters[i] + j);
                        }

                        blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(letters[i] + j), 1);
                        this.whiteFiguresPositions.push(letters[i] + j);
                        break;
                    }

                    blackFiguresPositionsClone.push(letters[i] + j);

                    if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                        possibleSteps.push(letters[i] + j);
                    }

                    blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(letters[i] + j));
                } else {
                    break;
                }
            }
        }

        return possibleSteps;
    },

    getStepsBishopEnemy(pos, color, enemyFigures) {
        let possibleSteps = [];

        if (color == 'white') {

            //moving down and right
            for (let i = letters.indexOf(pos[0]) + 1, j = +pos[1] + 1; i < letters.length && j < 9; i++, j++) {
                if (!this.whiteFiguresPositions.includes(letters[i] + j)) {
                    if (enemyFigures.includes(letters[i] + j)) {
                        possibleSteps.push(letters[i] + j);
                        break;
                    }

                    possibleSteps.push(letters[i] + j);
                } else {
                    break;
                }
            }

            //moving down and left
            for (let i = letters.indexOf(pos[0]) - 1, j = +pos[1] + 1; i > -1 && j < 9; i--, j++) {
                if (!this.whiteFiguresPositions.includes(letters[i] + j)) {
                    if (enemyFigures.includes(letters[i] + j)) {
                        possibleSteps.push(letters[i] + j);
                        break;
                    }

                    possibleSteps.push(letters[i] + j);
                } else {
                    break;
                }
            }

            //moving up and right
            for (let i = letters.indexOf(pos[0]) + 1, j = +pos[1] - 1; i < letters.length && j > 0; i++, j--) {
                if (!this.whiteFiguresPositions.includes(letters[i] + j)) {
                    if (enemyFigures.includes(letters[i] + j)) {
                        possibleSteps.push(letters[i] + j);
                        break;
                    }

                    possibleSteps.push(letters[i] + j);
                } else {
                    break;
                }
            }

            //moving up and left
            for (let i = letters.indexOf(pos[0]) - 1, j = +pos[1] - 1; i > -1 && j > 0; i--, j--) {
                if (!this.whiteFiguresPositions.includes(letters[i] + j)) {
                    if (enemyFigures.includes(letters[i] + j)) {
                        possibleSteps.push(letters[i] + j);
                        break;
                    }

                    possibleSteps.push(letters[i] + j);
                } else {
                    break;
                }
            }

        } else {

            //moving down and right
            for (let i = letters.indexOf(pos[0]) + 1, j = +pos[1] + 1; i < letters.length && j < 9; i++, j++) {
                if (!this.blackFiguresPositions.includes(letters[i] + j)) {
                    if (enemyFigures.includes(letters[i] + j)) {
                        possibleSteps.push(letters[i] + j);
                        break;
                    }

                    possibleSteps.push(letters[i] + j);
                } else {
                    break;
                }
            }

            //moving down and left
            for (let i = letters.indexOf(pos[0]) - 1, j = +pos[1] + 1; i > -1 && j < 9; i--, j++) {
                if (!this.blackFiguresPositions.includes(letters[i] + j)) {
                    if (enemyFigures.includes(letters[i] + j)) {
                        possibleSteps.push(letters[i] + j);
                        break;
                    }

                    possibleSteps.push(letters[i] + j);
                } else {
                    break;
                }
            }

            //moving up and right
            for (let i = letters.indexOf(pos[0]) + 1, j = +pos[1] - 1; i < letters.length && j > 0; i++, j--) {
                if (!this.blackFiguresPositions.includes(letters[i] + j)) {
                    if (enemyFigures.includes(letters[i] + j)) {
                        possibleSteps.push(letters[i] + j);
                        break;
                    }

                    possibleSteps.push(letters[i] + j);
                } else {
                    break;
                }
            }

            //moving up and left
            for (let i = letters.indexOf(pos[0]) - 1, j = +pos[1] - 1; i > -1 && j > 0; i--, j--) {
                if (!this.blackFiguresPositions.includes(letters[i] + j)) {
                    if (enemyFigures.includes(letters[i] + j)) {
                        possibleSteps.push(letters[i] + j);
                        break;
                    }

                    possibleSteps.push(letters[i] + j);
                } else {
                    break;
                }
            }
        }

        return possibleSteps;
    },

    getStepsQueen(target) {
        let pos = target.dataset.pos;
        let color = target.dataset.color;

        let possibleSteps = [];

        if (color == 'white') {

            //clone figures positions list
            let whiteFiguresPositionsClone = [];
            for (let i = 0; i < this.whiteFiguresPositions.length; i++) {
                whiteFiguresPositionsClone.push(this.whiteFiguresPositions[i]);
            }

            //deleting position of the current figure
            whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(pos), 1);

            // <===CALCULATING===>

            //moving up and right
            for (let i = letters.indexOf(pos[0]) + 1, j = +pos[1] + 1; i < letters.length && j < 9; i++, j++) {
                if (!whiteFiguresPositionsClone.includes(letters[i] + j)) {
                    if (this.blackFiguresPositions.includes(letters[i] + j)) {
                        whiteFiguresPositionsClone.push(letters[i] + j);

                        this.blackFiguresPositions.splice(this.blackFiguresPositions.indexOf(letters[i] + j), 1);

                        if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                            possibleSteps.push(letters[i] + j);
                        }

                        whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(letters[i] + j), 1);
                        this.blackFiguresPositions.push(letters[i] + j);
                        break;
                    }

                    whiteFiguresPositionsClone.push(letters[i] + j);

                    if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                        possibleSteps.push(letters[i] + j);
                    }

                    whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(letters[i] + j));
                } else {
                    break;
                }
            }

            //moving up and left
            for (let i = letters.indexOf(pos[0]) - 1, j = +pos[1] + 1; i > -1 && j < 9; i--, j++) {
                if (!whiteFiguresPositionsClone.includes(letters[i] + j)) {
                    if (this.blackFiguresPositions.includes(letters[i] + j)) {
                        whiteFiguresPositionsClone.push(letters[i] + j);

                        this.blackFiguresPositions.splice(this.blackFiguresPositions.indexOf(letters[i] + j), 1);

                        if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                            possibleSteps.push(letters[i] + j);
                        }

                        whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(letters[i] + j), 1);
                        this.blackFiguresPositions.push(letters[i] + j);
                        break;
                    }

                    whiteFiguresPositionsClone.push(letters[i] + j);

                    if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                        possibleSteps.push(letters[i] + j);
                    }

                    whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(letters[i] + j));
                } else {
                    break;
                }
            }

            //moving down and right
            for (let i = letters.indexOf(pos[0]) + 1, j = +pos[1] - 1; i < letters.length && j > 0; i++, j--) {
                if (!whiteFiguresPositionsClone.includes(letters[i] + j)) {
                    if (this.blackFiguresPositions.includes(letters[i] + j)) {
                        whiteFiguresPositionsClone.push(letters[i] + j);

                        this.blackFiguresPositions.splice(this.blackFiguresPositions.indexOf(letters[i] + j), 1);

                        if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                            possibleSteps.push(letters[i] + j);
                        }

                        whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(letters[i] + j), 1);
                        this.blackFiguresPositions.push(letters[i] + j);
                        break;
                    }

                    whiteFiguresPositionsClone.push(letters[i] + j);

                    if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                        possibleSteps.push(letters[i] + j);
                    }

                    whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(letters[i] + j));
                } else {
                    break;
                }
            }

            //moving down and left
            for (let i = letters.indexOf(pos[0]) - 1, j = +pos[1] - 1; i > -1 && j > 0; i--, j--) {
                if (!whiteFiguresPositionsClone.includes(letters[i] + j)) {
                    if (this.blackFiguresPositions.includes(letters[i] + j)) {
                        whiteFiguresPositionsClone.push(letters[i] + j);

                        this.blackFiguresPositions.splice(this.blackFiguresPositions.indexOf(letters[i] + j), 1);

                        if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                            possibleSteps.push(letters[i] + j);
                        }

                        whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(letters[i] + j), 1);
                        this.blackFiguresPositions.push(letters[i] + j);
                        break;
                    }

                    whiteFiguresPositionsClone.push(letters[i] + j);

                    if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                        possibleSteps.push(letters[i] + j);
                    }

                    whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(letters[i] + j));
                } else {
                    break;
                }
            }

            //moving down
            for (let i = +pos[1] + 1; i < 9; i++) {
                if (!whiteFiguresPositionsClone.includes(pos[0] + i)) {
                    if (this.blackFiguresPositions.includes(pos[0] + i)) {
                        whiteFiguresPositionsClone.push(pos[0] + i);

                        this.blackFiguresPositions.splice(this.blackFiguresPositions.indexOf(pos[0] + i), 1);

                        if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                            possibleSteps.push(pos[0] + i);
                        }

                        whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(pos[0] + i), 1);
                        this.blackFiguresPositions.push(pos[0] + i);
                        break;
                    }

                    whiteFiguresPositionsClone.push(pos[0] + i);

                    if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                        possibleSteps.push(pos[0] + i);
                    }

                    whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(pos[0] + i));
                } else {
                    break;
                }
            }

            //moving up 
            for (let i = +pos[1] - 1; i > 0; i--) {
                if (!whiteFiguresPositionsClone.includes(pos[0] + i)) {
                    if (this.blackFiguresPositions.includes(pos[0] + i)) {
                        whiteFiguresPositionsClone.push(pos[0] + i);

                        this.blackFiguresPositions.splice(this.blackFiguresPositions.indexOf(pos[0] + i), 1);

                        if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                            possibleSteps.push(pos[0] + i);
                        }

                        whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(pos[0] + i), 1);
                        this.blackFiguresPositions.push(pos[0] + i);
                        break;
                    }

                    whiteFiguresPositionsClone.push(pos[0] + i);

                    if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                        possibleSteps.push(pos[0] + i);
                    }

                    whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(pos[0] + i));
                } else {
                    break;
                }
            }

            //moving right
            for (let i = letters.indexOf(pos[0]) + 1; i < letters.length; i++) {
                if (!whiteFiguresPositionsClone.includes(letters[i] + pos[1])) {
                    if (this.blackFiguresPositions.includes(letters[i] + pos[1])) {
                        whiteFiguresPositionsClone.push(letters[i] + pos[1]);

                        this.blackFiguresPositions.splice(this.blackFiguresPositions.indexOf(letters[i] + pos[1]), 1);

                        if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                            possibleSteps.push(letters[i] + pos[1]);
                        }

                        whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(letters[i] + pos[1]), 1);
                        this.blackFiguresPositions.push(letters[i] + pos[1]);
                        break;
                    }

                    whiteFiguresPositionsClone.push(letters[i] + pos[1]);

                    if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                        possibleSteps.push(letters[i] + pos[1]);
                    }

                    whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(letters[i] + pos[1]));
                } else {
                    break;
                }
            }

            //moving left
            for (let i = letters.indexOf(pos[0]) - 1; i > -1; i--) {
                if (!whiteFiguresPositionsClone.includes(letters[i] + pos[1])) {
                    if (this.blackFiguresPositions.includes(letters[i] + pos[1])) {
                        whiteFiguresPositionsClone.push(letters[i] + pos[1]);

                        this.blackFiguresPositions.splice(this.blackFiguresPositions.indexOf(letters[i] + pos[1]), 1);

                        if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                            possibleSteps.push(letters[i] + pos[1]);
                        }

                        whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(letters[i] + pos[1]), 1);
                        this.blackFiguresPositions.push(letters[i] + pos[1]);
                        break;
                    }

                    whiteFiguresPositionsClone.push(letters[i] + pos[1]);

                    if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                        possibleSteps.push(letters[i] + pos[1]);
                    }

                    whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(letters[i] + pos[1]));
                } else {
                    break;
                }
            }

        } else {
            //clone figures positions list
            let blackFiguresPositionsClone = [];
            for (let i = 0; i < this.blackFiguresPositions.length; i++) {
                blackFiguresPositionsClone.push(this.blackFiguresPositions[i]);
            }

            //deleting position of the current figure
            blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(pos), 1);

            // <===CALCULATING===>

            //moving up and right
            for (let i = letters.indexOf(pos[0]) + 1, j = +pos[1] + 1; i < letters.length && j < 9; i++, j++) {
                if (!blackFiguresPositionsClone.includes(letters[i] + j)) {
                    if (this.whiteFiguresPositions.includes(letters[i] + j)) {
                        blackFiguresPositionsClone.push(letters[i] + j);

                        this.whiteFiguresPositions.splice(this.whiteFiguresPositions.indexOf(letters[i] + j), 1);

                        if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                            possibleSteps.push(letters[i] + j);
                        }

                        blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(letters[i] + j), 1);
                        this.whiteFiguresPositions.push(letters[i] + j);
                        break;
                    }

                    blackFiguresPositionsClone.push(letters[i] + j);

                    if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                        possibleSteps.push(letters[i] + j);
                    }

                    blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(letters[i] + j));
                } else {
                    break;
                }
            }

            //moving up and left
            for (let i = letters.indexOf(pos[0]) - 1, j = +pos[1] + 1; i > -1 && j < 9; i--, j++) {
                if (!blackFiguresPositionsClone.includes(letters[i] + j)) {
                    if (this.whiteFiguresPositions.includes(letters[i] + j)) {
                        blackFiguresPositionsClone.push(letters[i] + j);

                        this.whiteFiguresPositions.splice(this.whiteFiguresPositions.indexOf(letters[i] + j), 1);

                        if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                            possibleSteps.push(letters[i] + j);
                        }

                        blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(letters[i] + j), 1);
                        this.whiteFiguresPositions.push(letters[i] + j);
                        break;
                    }

                    blackFiguresPositionsClone.push(letters[i] + j);

                    if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                        possibleSteps.push(letters[i] + j);
                    }

                    blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(letters[i] + j));
                } else {
                    break;
                }
            }

            //moving down and right
            for (let i = letters.indexOf(pos[0]) + 1, j = +pos[1] - 1; i < letters.length && j > 0; i++, j--) {
                if (!blackFiguresPositionsClone.includes(letters[i] + j)) {
                    if (this.whiteFiguresPositions.includes(letters[i] + j)) {
                        blackFiguresPositionsClone.push(letters[i] + j);

                        this.whiteFiguresPositions.splice(this.whiteFiguresPositions.indexOf(letters[i] + j), 1);

                        if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                            possibleSteps.push(letters[i] + j);
                        }

                        blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(letters[i] + j), 1);
                        this.whiteFiguresPositions.push(letters[i] + j);
                        break;
                    }

                    blackFiguresPositionsClone.push(letters[i] + j);

                    if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                        possibleSteps.push(letters[i] + j);
                    }

                    blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(letters[i] + j));
                } else {
                    break;
                }
            }

            //moving down and left
            for (let i = letters.indexOf(pos[0]) - 1, j = +pos[1] - 1; i > -1 && j > 0; i--, j--) {
                if (!blackFiguresPositionsClone.includes(letters[i] + j)) {
                    if (this.whiteFiguresPositions.includes(letters[i] + j)) {
                        blackFiguresPositionsClone.push(letters[i] + j);

                        this.whiteFiguresPositions.splice(this.whiteFiguresPositions.indexOf(letters[i] + j), 1);

                        if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                            possibleSteps.push(letters[i] + j);
                        }

                        blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(letters[i] + j), 1);
                        this.whiteFiguresPositions.push(letters[i] + j);
                        break;
                    }

                    blackFiguresPositionsClone.push(letters[i] + j);

                    if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                        possibleSteps.push(letters[i] + j);
                    }

                    blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(letters[i] + j));
                } else {
                    break;
                }
            }

            //moving down
            for (let i = +pos[1] + 1; i < 9; i++) {
                if (!blackFiguresPositionsClone.includes(pos[0] + i)) {
                    if (this.whiteFiguresPositions.includes(pos[0] + i)) {
                        blackFiguresPositionsClone.push(pos[0] + i);

                        this.whiteFiguresPositions.splice(this.whiteFiguresPositions.indexOf(pos[0] + i), 1);

                        if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                            possibleSteps.push(pos[0] + i);
                        }

                        blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(pos[0] + i), 1);
                        this.whiteFiguresPositions.push(pos[0] + i);
                        break;
                    }

                    blackFiguresPositionsClone.push(pos[0] + i);

                    if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                        possibleSteps.push(pos[0] + i);
                    }

                    blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(pos[0] + i));
                } else {
                    break;
                }
            }

            //moving up 
            for (let i = +pos[1] - 1; i > 0; i--) {
                if (!blackFiguresPositionsClone.includes(pos[0] + i)) {
                    if (this.whiteFiguresPositions.includes(pos[0] + i)) {
                        blackFiguresPositionsClone.push(pos[0] + i);

                        this.whiteFiguresPositions.splice(this.whiteFiguresPositions.indexOf(pos[0] + i), 1);

                        if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                            possibleSteps.push(pos[0] + i);
                        }

                        blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(pos[0] + i), 1);
                        this.whiteFiguresPositions.push(pos[0] + i);
                        break;
                    }

                    blackFiguresPositionsClone.push(pos[0] + i);

                    if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                        possibleSteps.push(pos[0] + i);
                    }

                    blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(pos[0] + i));
                } else {
                    break;
                }
            }

            //moving right
            for (let i = letters.indexOf(pos[0]) + 1; i < letters.length; i++) {
                if (!blackFiguresPositionsClone.includes(letters[i] + pos[1])) {
                    if (this.whiteFiguresPositions.includes(letters[i] + pos[1])) {
                        blackFiguresPositionsClone.push(letters[i] + pos[1]);

                        this.whiteFiguresPositions.splice(this.whiteFiguresPositions.indexOf(letters[i] + pos[1]), 1);

                        if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                            possibleSteps.push(letters[i] + pos[1]);
                        }

                        blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(letters[i] + pos[1]), 1);
                        this.whiteFiguresPositions.push(letters[i] + pos[1]);
                        break;
                    }

                    blackFiguresPositionsClone.push(letters[i] + pos[1]);

                    if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                        possibleSteps.push(letters[i] + pos[1]);
                    }

                    blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(letters[i] + pos[1]));
                } else {
                    break;
                }
            }

            //moving left
            for (let i = letters.indexOf(pos[0]) - 1; i > -1; i--) {
                if (!blackFiguresPositionsClone.includes(letters[i] + pos[1])) {
                    if (this.whiteFiguresPositions.includes(letters[i] + pos[1])) {
                        blackFiguresPositionsClone.push(letters[i] + pos[1]);

                        this.whiteFiguresPositions.splice(this.whiteFiguresPositions.indexOf(letters[i] + pos[1]), 1);

                        if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                            possibleSteps.push(letters[i] + pos[1]);
                        }

                        blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(letters[i] + pos[1]), 1);
                        this.whiteFiguresPositions.push(letters[i] + pos[1]);
                        break;
                    }

                    blackFiguresPositionsClone.push(letters[i] + pos[1]);

                    if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                        possibleSteps.push(letters[i] + pos[1]);
                    }

                    blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(letters[i] + pos[1]));
                } else {
                    break;
                }
            }
        }

        return possibleSteps;
    },

    getStepsQueenEnemy(pos, color, enemyFigures) {
        let possibleSteps = [];

        if (color == 'white') {

            //moving down and right
            for (let i = letters.indexOf(pos[0]) + 1, j = +pos[1] + 1; i < letters.length && j < 9; i++, j++) {
                if (!this.whiteFiguresPositions.includes(letters[i] + j)) {
                    if (enemyFigures.includes(letters[i] + j)) {
                        possibleSteps.push(letters[i] + j);
                        break;
                    }

                    possibleSteps.push(letters[i] + j);
                } else {
                    break;
                }
            }

            //moving down and left
            for (let i = letters.indexOf(pos[0]) - 1, j = +pos[1] + 1; i > -1 && j < 9; i--, j++) {
                if (!this.whiteFiguresPositions.includes(letters[i] + j)) {
                    if (enemyFigures.includes(letters[i] + j)) {
                        possibleSteps.push(letters[i] + j);
                        break;
                    }

                    possibleSteps.push(letters[i] + j);
                } else {
                    break;
                }
            }

            //moving up and right
            for (let i = letters.indexOf(pos[0]) + 1, j = +pos[1] - 1; i < letters.length && j > 0; i++, j--) {
                if (!this.whiteFiguresPositions.includes(letters[i] + j)) {
                    if (enemyFigures.includes(letters[i] + j)) {
                        possibleSteps.push(letters[i] + j);
                        break;
                    }

                    possibleSteps.push(letters[i] + j);
                } else {
                    break;
                }
            }

            //moving up and left
            for (let i = letters.indexOf(pos[0]) - 1, j = +pos[1] - 1; i > -1 && j > 0; i--, j--) {
                if (!this.whiteFiguresPositions.includes(letters[i] + j)) {
                    if (enemyFigures.includes(letters[i] + j)) {
                        possibleSteps.push(letters[i] + j);
                        break;
                    }

                    possibleSteps.push(letters[i] + j);
                } else {
                    break;
                }
            }

            //moving down
            for (let i = +pos[1] + 1; i < 9; i++) {
                if (!this.whiteFiguresPositions.includes(pos[0] + i)) {
                    if (enemyFigures.includes(pos[0] + i)) {
                        possibleSteps.push(pos[0] + i);
                        break;
                    }

                    possibleSteps.push(pos[0] + i);
                } else {
                    break;
                }
            }

            //moving up
            for (let i = +pos[1] - 1; i > 0; i--) {
                if (!this.whiteFiguresPositions.includes(pos[0] + i)) {
                    if (enemyFigures.includes(pos[0] + i)) {
                        possibleSteps.push(pos[0] + i);
                        break;
                    }

                    possibleSteps.push(pos[0] + i);
                } else {
                    break;
                }
            }

            //moving right
            for (let i = letters.indexOf(pos[0]) + 1; i < letters.length; i++) {
                if (!this.whiteFiguresPositions.includes(letters[i] + pos[1])) {
                    if (enemyFigures.includes(letters[i] + pos[1])) {
                        possibleSteps.push(letters[i] + pos[1]);
                        break;
                    }

                    possibleSteps.push(letters[i] + pos[1]);
                } else {
                    break;
                }
            }

            //moving left
            for (let i = letters.indexOf(pos[0]) - 1; i > -1; i--) {
                if (!this.whiteFiguresPositions.includes(letters[i] + pos[1])) {
                    if (enemyFigures.includes(letters[i] + pos[1])) {
                        possibleSteps.push(letters[i] + pos[1]);
                        break;
                    }

                    possibleSteps.push(letters[i] + pos[1]);
                } else {
                    break;
                }
            }

        } else {

            //moving down and right
            for (let i = letters.indexOf(pos[0]) + 1, j = +pos[1] + 1; i < letters.length && j < 9; i++, j++) {
                if (!this.blackFiguresPositions.includes(letters[i] + j)) {
                    if (enemyFigures.includes(letters[i] + j)) {
                        possibleSteps.push(letters[i] + j);
                        break;
                    }

                    possibleSteps.push(letters[i] + j);
                } else {
                    break;
                }
            }

            //moving down and left
            for (let i = letters.indexOf(pos[0]) - 1, j = +pos[1] + 1; i > -1 && j < 9; i--, j++) {
                if (!this.blackFiguresPositions.includes(letters[i] + j)) {
                    if (enemyFigures.includes(letters[i] + j)) {
                        possibleSteps.push(letters[i] + j);
                        break;
                    }

                    possibleSteps.push(letters[i] + j);
                } else {
                    break;
                }
            }

            //moving up and right
            for (let i = letters.indexOf(pos[0]) + 1, j = +pos[1] - 1; i < letters.length && j > 0; i++, j--) {
                if (!this.blackFiguresPositions.includes(letters[i] + j)) {
                    if (enemyFigures.includes(letters[i] + j)) {
                        possibleSteps.push(letters[i] + j);
                        break;
                    }

                    possibleSteps.push(letters[i] + j);
                } else {
                    break;
                }
            }

            //moving up and left
            for (let i = letters.indexOf(pos[0]) - 1, j = +pos[1] - 1; i > -1 && j > 0; i--, j--) {
                if (!this.blackFiguresPositions.includes(letters[i] + j)) {
                    if (enemyFigures.includes(letters[i] + j)) {
                        possibleSteps.push(letters[i] + j);
                        break;
                    }

                    possibleSteps.push(letters[i] + j);
                } else {
                    break;
                }
            }

            //moving down
            for (let i = +pos[1] + 1; i < 9; i++) {
                if (!this.blackFiguresPositions.includes(pos[0] + i)) {
                    if (enemyFigures.includes(pos[0] + i)) {
                        possibleSteps.push(pos[0] + i);
                        break;
                    }

                    possibleSteps.push(pos[0] + i);
                } else {
                    break;
                }
            }

            //moving up
            for (let i = +pos[1] - 1; i > 0; i--) {
                if (!this.blackFiguresPositions.includes(pos[0] + i)) {
                    if (enemyFigures.includes(pos[0] + i)) {
                        possibleSteps.push(pos[0] + i);
                        break;
                    }

                    possibleSteps.push(pos[0] + i);
                } else {
                    break;
                }
            }

            //moving right
            for (let i = letters.indexOf(pos[0]) + 1; i < letters.length; i++) {
                if (!this.blackFiguresPositions.includes(letters[i] + pos[1])) {
                    if (enemyFigures.includes(letters[i] + pos[1])) {
                        possibleSteps.push(letters[i] + pos[1]);
                        break;
                    }

                    possibleSteps.push(letters[i] + pos[1]);
                } else {
                    break;
                }
            }

            //moving left
            for (let i = letters.indexOf(pos[0]) - 1; i > -1; i--) {
                if (!this.blackFiguresPositions.includes(letters[i] + pos[1])) {
                    if (enemyFigures.includes(letters[i] + pos[1])) {
                        possibleSteps.push(letters[i] + pos[1]);
                        break;
                    }

                    possibleSteps.push(letters[i] + pos[1]);
                } else {
                    break;
                }
            }

        }

        return possibleSteps;
    },

    getStepsKnight(target) {
        let pos = target.dataset.pos;
        let color = target.dataset.color;

        let possibleSteps = [];

        function calculating(vertical, horizontal) {
            if (letters.indexOf(pos[0]) + horizontal > -1) {
                if (0 < +pos[1] + vertical && +pos[1] + vertical < 9) {
                    return (letters[letters.indexOf(pos[0]) + horizontal] + (+pos[1] + vertical));
                }
            }
            if (letters.indexOf(pos[0]) + horizontal < letters.length) {
                if (0 < +pos[1] + vertical && +pos[1] + vertical < 9) {
                    return (letters[letters.indexOf(pos[0]) + horizontal] + (+pos[1] + vertical));
                }
            }
        }

        let coords = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]];

        let steps = [];

        coords.forEach((i) => {
            let step = calculating(...i);
            typeof (step) == 'string' ? steps.push(step): 0;
        });

        if (color == 'white') {

            //clone figures positions list
            let whiteFiguresPositionsClone = [];
            for (let i = 0; i < this.whiteFiguresPositions.length; i++) {
                whiteFiguresPositionsClone.push(this.whiteFiguresPositions[i]);
            }

            //deleting position of the current figure
            whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(pos), 1);

            // <===CALCULATING===>

            //usual moves
            steps.forEach((possibleStep) => {
                if (!whiteFiguresPositionsClone.includes(possibleStep)) {
                    if (this.blackFiguresPositions.includes(possibleStep)) {
                        whiteFiguresPositionsClone.push(possibleStep);

                        this.blackFiguresPositions.splice(this.blackFiguresPositions.indexOf(possibleStep), 1);

                        if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                            possibleSteps.push(possibleStep);
                        }

                        whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(possibleStep), 1);
                        this.blackFiguresPositions.push(possibleStep);
                    } else {
                        whiteFiguresPositionsClone.push(possibleStep);

                        if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                            possibleSteps.push(possibleStep);
                        }

                        whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(possibleStep), 1);
                    }
                }
            });

        } else {
            //clone figures positions list
            let blackFiguresPositionsClone = [];
            for (let i = 0; i < this.blackFiguresPositions.length; i++) {
                blackFiguresPositionsClone.push(this.blackFiguresPositions[i]);
            }

            //deleting position of the current figure
            blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(pos), 1);

            // <===CALCULATING===>

            //usual moves
            steps.forEach((possibleStep) => {
                if (!blackFiguresPositionsClone.includes(possibleStep)) {
                    if (this.whiteFiguresPositions.includes(possibleStep)) {
                        blackFiguresPositionsClone.push(possibleStep);

                        this.whiteFiguresPositions.splice(this.whiteFiguresPositions.indexOf(possibleStep), 1);

                        if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                            possibleSteps.push(possibleStep);
                        }

                        blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(possibleStep), 1);
                        this.whiteFiguresPositions.push(possibleStep);
                    } else {
                        blackFiguresPositionsClone.push(possibleStep);

                        if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                            possibleSteps.push(possibleStep);
                        }

                        blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(possibleStep), 1);
                    }
                }
            });
        }

        return possibleSteps;
    },

    getStepsKnightEnemy(pos, color, enemyFigures) {
        let possibleSteps = [];

        function calculating(vertical, horizontal) {
            if (letters.indexOf(pos[0]) + horizontal > -1) {
                if (0 < +pos[1] + vertical && +pos[1] + vertical < 9) {
                    return (letters[letters.indexOf(pos[0]) + horizontal] + (+pos[1] + vertical));
                }
            }
            if (letters.indexOf(pos[0]) + horizontal < letters.length) {
                if (0 < +pos[1] + vertical && +pos[1] + vertical < 9) {
                    return (letters[letters.indexOf(pos[0]) + horizontal] + (+pos[1] + vertical));
                }
            }
        }

        let coords = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]];

        let steps = [];

        coords.forEach((i) => {
            let step = calculating(...i);
            typeof (step) == 'string' ? steps.push(step): 0;
        });

        if (color == 'white') {
            steps.forEach((possibleStep) => {
                if (!this.whiteFiguresPositions.includes(possibleStep)) {
                    possibleSteps.push(possibleStep);
                }
            });
        } else {
            steps.forEach((possibleStep) => {
                if (!this.whiteFiguresPositions.includes(possibleStep)) {
                    possibleSteps.push(possibleStep);
                }
            });
        }

        return possibleSteps;
    },

    getStepsKing(target) {
        let pos = target.dataset.pos;
        let color = target.dataset.color;

        let possibleSteps = [];

        function calculating(vertical, horizontal) {
            if (letters.indexOf(pos[0]) + horizontal > -1) {
                if (0 < +pos[1] + vertical && +pos[1] + vertical < 9) {
                    return (letters[letters.indexOf(pos[0]) + horizontal] + (+pos[1] + vertical));
                }
            }
            if (letters.indexOf(pos[0]) + horizontal < letters.length) {
                if (0 < +pos[1] + vertical && +pos[1] + vertical < 9) {
                    return (letters[letters.indexOf(pos[0]) + horizontal] + (+pos[1] + vertical));
                }
            }
        }

        let coords = [[1, 0], [1, 1], [1, -1], [0, -1], [0, 1], [-1, 0], [-1, 1], [-1, -1]];

        let steps = [];

        coords.forEach((i) => {
            let step = calculating(...i);
            typeof (step) == 'string' ? steps.push(step): 0;
        });

        let whiteFiguresOnTheLeft = this.whiteFiguresPositions.includes(letters[letters.indexOf(pos[0]) - 1] + pos[1]) && this.whiteFiguresPositions.includes(letters[letters.indexOf(pos[0]) - 2] + pos[1]);

        let whiteFiguresOnTheRight = this.whiteFiguresPositions.includes(letters[letters.indexOf(pos[0]) + 1] + pos[1]) && this.whiteFiguresPositions.includes(letters[letters.indexOf(pos[0]) + 2] + pos[1]) && this.whiteFiguresPositions.includes(letters[letters.indexOf(pos[0]) + 3] + pos[1]);

        let blackFiguresOnTheLeft = this.blackFiguresPositions.includes(letters[letters.indexOf(pos[0]) - 1] + pos[1]) && this.blackFiguresPositions.includes(letters[letters.indexOf(pos[0]) - 2] + pos[1]);

        let blackFiguresOnTheRight = this.blackFiguresPositions.includes(letters[letters.indexOf(pos[0]) + 1] + pos[1]) && this.blackFiguresPositions.includes(letters[letters.indexOf(pos[0]) + 2] + pos[1]) && this.blackFiguresPositions.includes(letters[letters.indexOf(pos[0]) + 3] + pos[1]);

        if (color == 'white') {

            //clone figures positions list
            let whiteFiguresPositionsClone = [];
            for (let i = 0; i < this.whiteFiguresPositions.length; i++) {
                whiteFiguresPositionsClone.push(this.whiteFiguresPositions[i]);
            }

            let isCheck = this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(pos);

            //deleting position of the current figure
            whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(pos), 1);

            // <===CALCULATING===>

            //usual moves
            steps.forEach((possibleStep) => {
                if (!whiteFiguresPositionsClone.includes(possibleStep)) {
                    if (this.blackFiguresPositions.includes(possibleStep)) {
                        whiteFiguresPositionsClone.push(possibleStep);

                        this.blackFiguresPositions.splice(this.blackFiguresPositions.indexOf(possibleStep), 1);
                        this.whiteKingPosition = possibleStep;

                        if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                            possibleSteps.push(possibleStep);
                        }

                        whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(possibleStep), 1);
                        this.blackFiguresPositions.push(possibleStep);
                        this.whiteKingPosition = pos;
                    } else {
                        whiteFiguresPositionsClone.push(possibleStep);
                        this.whiteKingPosition = possibleStep;

                        if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                            possibleSteps.push(possibleStep);
                        }

                        whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(possibleStep), 1);
                        this.whiteKingPosition = pos;
                    }
                }
            });

            //castling
            if (!isCheck && !this.didWhiteKingMove) {
                if (!this.didLeftWhiteRookMove && !whiteFiguresOnTheLeft && !blackFiguresOnTheLeft) {
                    if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes('c8') && !this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes('b8')) {
                        whiteFiguresPositionsClone.push(letters[letters.indexOf(pos[0]) - 2] + pos[1]);
                        this.whiteKingPosition = letters[letters.indexOf(pos[0]) - 2] + pos[1];
                        whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf('a8'), 1);
                        whiteFiguresPositionsClone.push('c8');

                        if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                            possibleSteps.push(letters[letters.indexOf(pos[0]) - 2] + pos[1]);
                        }

                        whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(letters[letters.indexOf(pos[0]) - 2] + pos[1]), 1);
                        this.whiteKingPosition = pos;
                        whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf('c8'), 1);
                        whiteFiguresPositionsClone.push('a8');
                    }
                } else if (!this.didRightWhiteRookMove && !whiteFiguresOnTheRight && !blackFiguresOnTheRight) {
                    if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes('e8') && !this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes('f8')) {
                        whiteFiguresPositionsClone.push(letters[letters.indexOf(pos[0]) + 2] + pos[1]);
                        this.whiteKingPosition = letters[letters.indexOf(pos[0]) + 2] + pos[1];
                        whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf('h8'), 1);
                        whiteFiguresPositionsClone.push('e8');

                        if (!this.getPossibleStepsEnemy(whiteFiguresPositionsClone).includes(this.whiteKingPosition)) {
                            possibleSteps.push(letters[letters.indexOf(pos[0]) + 2] + pos[1]);
                        }

                        whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf(letters[letters.indexOf(pos[0]) + 2] + pos[1]), 1);
                        this.whiteKingPosition = pos;
                        whiteFiguresPositionsClone.splice(whiteFiguresPositionsClone.indexOf('e8'), 1);
                        whiteFiguresPositionsClone.push('h8');
                    }
                }
            }
        } else {

            //clone figures positions list
            let blackFiguresPositionsClone = [];
            for (let i = 0; i < this.blackFiguresPositions.length; i++) {
                blackFiguresPositionsClone.push(this.blackFiguresPositions[i]);
            }

            let isCheck = this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(pos);

            //deleting position of the current figure
            blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(pos), 1);

            // <===CALCULATING===>

            //usual moves
            steps.forEach((possibleStep) => {
                if (!blackFiguresPositionsClone.includes(possibleStep)) {
                    if (this.whiteFiguresPositions.includes(possibleStep)) {
                        blackFiguresPositionsClone.push(possibleStep);

                        this.whiteFiguresPositions.splice(this.whiteFiguresPositions.indexOf(possibleStep), 1);
                        this.blackKingPosition = possibleStep;

                        if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                            possibleSteps.push(possibleStep);
                        }

                        blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(possibleStep), 1);
                        this.whiteFiguresPositions.push(possibleStep);
                        this.blackKingPosition = pos;
                    } else {
                        blackFiguresPositionsClone.push(possibleStep);
                        this.blackKingPosition = possibleStep;

                        if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                            possibleSteps.push(possibleStep);
                        }

                        blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(possibleStep), 1);
                        this.blackKingPosition = pos;
                    }
                }
            });

            //castling
            if (!isCheck && !this.didBlackKingMove) {
                if (!this.didLeftBlackRookMove && !whiteFiguresOnTheLeft && !blackFiguresOnTheLeft) {
                    if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes('c1') && !this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes('b1')) {
                        blackFiguresPositionsClone.push(letters[letters.indexOf(pos[0]) - 2] + pos[1]);
                        this.blackKingPosition = letters[letters.indexOf(pos[0]) - 2] + pos[1];
                        blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf('a1'), 1);
                        blackFiguresPositionsClone.push('c1');

                        if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                            possibleSteps.push(letters[letters.indexOf(pos[0]) - 2] + pos[1]);
                        }

                        blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(letters[letters.indexOf(pos[0]) - 2] + pos[1]), 1);
                        this.blackKingPosition = pos;
                        blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf('c1'), 1);
                        blackFiguresPositionsClone.push('a1');
                    }
                } else if (!this.didRightBlackRookMove && !whiteFiguresOnTheRight && !blackFiguresOnTheRight) {
                    if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes('e1') && !this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes('f1')) {
                        blackFiguresPositionsClone.push(letters[letters.indexOf(pos[0]) + 2] + pos[1]);
                        this.blackKingPosition = letters[letters.indexOf(pos[0]) + 2] + pos[1];
                        blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf('h1'), 1);
                        blackFiguresPositionsClone.push('e1');

                        if (!this.getPossibleStepsEnemy(blackFiguresPositionsClone).includes(this.blackKingPosition)) {
                            possibleSteps.push(letters[letters.indexOf(pos[0]) + 2] + pos[1]);
                        }

                        blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf(letters[letters.indexOf(pos[0]) + 2] + pos[1]), 1);
                        this.blackKingPosition = pos;
                        blackFiguresPositionsClone.splice(blackFiguresPositionsClone.indexOf('e1'), 1);
                        blackFiguresPositionsClone.push('h1');
                    }
                }
            }
        }

        return possibleSteps;
    },

    getStepsKingEnemy(pos, color, enemyFigures) {
        let possibleSteps = [];

        function calculating(vertical, horizontal) {
            if (letters.indexOf(pos[0]) + horizontal > -1) {
                if (0 < +pos[1] + vertical && +pos[1] + vertical < 9) {
                    return (letters[letters.indexOf(pos[0]) + horizontal] + (+pos[1] + vertical));
                }
            }
            if (letters.indexOf(pos[0]) + horizontal < letters.length) {
                if (0 < +pos[1] + vertical && +pos[1] + vertical < 9) {
                    return (letters[letters.indexOf(pos[0]) + horizontal] + (+pos[1] + vertical));
                }
            }
        }

        let coords = [[1, 0], [1, 1], [1, -1], [0, -1], [0, 1], [-1, 0], [-1, 1], [-1, -1]];

        let steps = [];

        coords.forEach((i) => {
            let step = calculating(...i);
            typeof (step) == 'string' ? steps.push(step): 0;
        });

        let whiteFiguresOnTheLeft = this.whiteFiguresPositions.includes(letters[letters.indexOf(pos[0]) - 1] + pos[1]) && this.whiteFiguresPositions.includes(letters[letters.indexOf(pos[0]) - 2] + pos[1]);

        let whiteFiguresOnTheRight = this.whiteFiguresPositions.includes(letters[letters.indexOf(pos[0]) + 1] + pos[1]) && this.whiteFiguresPositions.includes(letters[letters.indexOf(pos[0]) + 2] + pos[1]) && this.whiteFiguresPositions.includes(letters[letters.indexOf(pos[0]) + 3] + pos[1]);

        let blackFiguresOnTheLeft = this.blackFiguresPositions.includes(letters[letters.indexOf(pos[0]) - 1] + pos[1]) && this.blackFiguresPositions.includes(letters[letters.indexOf(pos[0]) - 2] + pos[1]);

        let blackFiguresOnTheRight = this.blackFiguresPositions.includes(letters[letters.indexOf(pos[0]) + 1] + pos[1]) && this.blackFiguresPositions.includes(letters[letters.indexOf(pos[0]) + 2] + pos[1]) && this.blackFiguresPositions.includes(letters[letters.indexOf(pos[0]) + 3] + pos[1]);

        if (color == 'white') {

            steps.forEach((possibleStep) => {
                if (!this.whiteFiguresPositions.includes(possibleStep)) {
                    possibleSteps.push(possibleStep);
                }
            });

            if (!this.didWhiteKingMove) {
                if (!this.didLeftWhiteRookMove && !whiteFiguresOnTheLeft && !blackFiguresOnTheLeft) {
                    possibleSteps.push(letters[letters.indexOf(pos[0]) - 2] + pos[1]);
                } else if (!this.didRightWhiteRookMove && !whiteFiguresOnTheRight && !blackFiguresOnTheRight) {
                    possibleSteps.push(letters[letters.indexOf(pos[0]) + 2] + pos[1]);
                }
            }
        } else {

            steps.forEach((possibleStep) => {
                if (!this.blackFiguresPositions.includes(possibleStep)) {
                    possibleSteps.push(possibleStep);
                }
            });

            if (!this.didBlackKingMove) {
                if (!this.didLeftBlackRookMove && !whiteFiguresOnTheLeft && !blackFiguresOnTheLeft) {
                    possibleSteps.push(letters[letters.indexOf(pos[0]) - 2] + pos[1]);
                } else if (!this.didRightBlackRookMove && !whiteFiguresOnTheRight && !blackFiguresOnTheRight) {
                    possibleSteps.push(letters[letters.indexOf(pos[0]) + 2] + pos[1]);
                }
            }
        }

        return possibleSteps;
    }
}

game.init();