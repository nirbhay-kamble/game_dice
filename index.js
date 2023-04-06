const gameState = document.getElementsByClassName("state")[0]
const player_1 = document.getElementsByClassName("player-1")[0]
const player_2 = document.getElementsByClassName("player-2")[0]
const player_1_score = document.getElementsByClassName("player-1-score")[0]
const player_2_score = document.getElementsByClassName("player-2-score")[0]
const score_1 = document.getElementsByClassName("score-1")[0] 
const score_2 = document.getElementsByClassName("score-2")[0]
const dice = (document.getElementsByClassName("dice"))[0]
const dblNothingBtn = (document.getElementsByClassName("dice"))[1]
const resetBtn = (document.getElementsByClassName("dice"))[2]
const root = document.documentElement;
const themeBtn = document.getElementsByClassName("theme")[0]
const startBtn = document.getElementById("start")
const setWinningScoreBtn = document.getElementById("win-score")
const main = document.querySelector("main")
const modal = document.querySelector(".modal-container")
const infoBtn = document.getElementsByClassName("get-info")[0]
const resumeBtn = document.querySelector("#resume")
const winScoreLabel = document.querySelector(".modal ol p span")
const chngWinScore = document.querySelector(".chng-winning-score")
const newScoreInput = document.querySelector(".chng-winning-score input")
const setBtn = document.getElementById("chng")

let has_started = false
let winning_score = 20
winScoreLabel.textContent = winning_score
let has_won = false
let check_winner = false
let currentTurn = 1
let dbl_nothing = 1
let cool = {
    '--body_back_1': 'aqua',
    '--body_back_2': 'whitesmoke',
    '--main-color': 'rgb(232, 95, 95)',
    '--main-back': 'whitesmoke',
    '--shadow_color': 'rgba(0, 0, 0, 0.75)',
    '--score_back_1': 'rgba(247, 221, 135, 0.75)',
    '--score_back_2': 'rgba(247, 233, 189, 0.75)',
    '--button_back_1': 'rgb(232, 95, 95)',
    '--button_back_2': 'rgb(240, 151, 151)',
    '--button_color': '#fff'
    
}

let dark = {
    '--body_back_1': 'black',
    '--body_back_2': 'whitesmoke',
    '--main-color': 'black',
    '--main-back': 'whitesmoke',
    '--shadow_color': 'rgba(0, 0, 0, 0.75)',
    '--score_back_1': 'rgba(225, 195, 97, 0.75)',
    '--score_back_2': 'rgba(255, 237, 177, 0.75)',
    '--button_back_1': 'black',
    '--button_back_2': 'rgb(102, 100, 98)',
    '--button_color': '#fff'
}

let warm = {
    '--body_back_1': 'rgb(243, 119, 74)',
    '--body_back_2': 'rgb(240, 162, 90)',
    '--main-color': 'rgb(218, 140, 68)',
    '--main-back': 'whitesmoke',
    '--shadow_color': 'rgba(0, 0, 0, 0.75)',
    '--score_back_1': 'rgba(247, 221, 135, 0.75)',
    '--score_back_2': 'rgba(247, 233, 189, 0.75)',
    '--button_back_1': 'rgb(243, 119, 74)',
    '--button_back_2': 'rgb(240, 162, 90)',
    '--button_color': '#fff'
    
}

dice.addEventListener("click",()=>{
    if (has_won){
        restart()
    }
    else {
        if (currentTurn == 1){
            Move(player_1_score, score_1)
            root.style.setProperty('--score_shadow_1','none')
            root.style.setProperty('--score_shadow_2','-2px 6px 18px 3px var(--shadow_color)')
            currentTurn = 2
            }
        else {
            Move(player_2_score, score_2)
            root.style.setProperty('--score_shadow_2','none')
            root.style.setProperty('--score_shadow_1','-2px 6px 18px 3px var(--shadow_color)')
            currentTurn = 1
        }
        checkWinner()
        if (!(has_won)){
        gameState.textContent = `Player ${currentTurn}'s Turn`
        dblNothingBtn.style.display = "block"
        }
}
})


function Move(player, curScore)
{
    has_started = true
    const score = Math.ceil(Math.random()*6)*dbl_nothing
    curScore.textContent = score
    total = Number(player.textContent)
    player.textContent = total + score
    dbl_nothing = 1
}   

function checkWinner(){
    if (Number(player_1_score.textContent) >= winning_score || Number(player_2_score.textContent) >= winning_score){
        check_winner = true
        }
    if (check_winner){
        if (currentTurn == 1){
            score1 = Number(player_1_score.textContent)
            score2 = Number(player_2_score.textContent)
            if (score1 > score2){
                winner('1')
                has_won = true
            } else if (score2 > score1){
                winner('2')
                has_won = true
            } else {
                winning_score += 10
                check_winner = false
            }
        }
        // else {
        //     gameState.textContent = "Final Turn"
        // }
    }
}

dblNothingBtn.addEventListener("click", ()=>{
    dbl_nothing = Math.ceil(Math.random() * 2)
    if (dbl_nothing == 1){
        dbl_nothing = -1
    }
    console.log(dbl_nothing)
    dblNothingBtn.style.display = "none"
})

resetBtn.addEventListener("click", ()=>{
    restart()
})

function winner(player){
        gameState.textContent = `Player ${player} is the winner`
        has_won = true
        dice.style.display = "none"
        dblNothingBtn.style.display = "none"
        resetBtn.style.display = "block"
        has_started = false
}

function restart() {
    player_1_score.textContent = 0
    score_1.textContent = 0
    player_2_score.textContent = 0
    score_2.textContent = 0
    dice.textContent = "Roll Dice 🎲"
    has_won = false
    check_winner = false
    gameState.textContent = "Player 1's Turn"
    root.style.setProperty('--score_shadow_2','none')
    root.style.setProperty('--score_shadow_1','-2px 6px 18px 3px var(--shadow_color)')
    currentTurn = 1
    dice.style.display = "block"
    dblNothingBtn.style.display = "block"
    resetBtn.style.display = "none"
    setWinningScoreBtn.style.display = "block"
}

// changing theme

themeBtn.addEventListener("click", setTheme)

const themes = [cool, dark, warm]
let theme = 1



function setTheme(){
    setRoot(theme)
}

function setRoot(num){
    root.style.setProperty('--body_back_1', themes[num]["--body_back_1"]);
    root.style.setProperty('--body_back_2', themes[num]["--body_back_2"]);
    root.style.setProperty('--main-color', themes[num]["--main-color"]);
    root.style.setProperty('--main-back', themes[num]["--main-back"]);
    root.style.setProperty('--shadow-color', themes[num]["--shadow-color"]);
    root.style.setProperty('--score_back_1', themes[num]["--score_back_1"]);
    root.style.setProperty('--score_back_2', themes[num]["--score_back_2"]);
    root.style.setProperty('--button_back_1', themes[num]["--button_back_1"]);
    root.style.setProperty('--button_back_2', themes[num]["--button_back_2"]);
    root.style.setProperty('--button_color', themes[num]["--button_color"]);
    theme = (theme + 1)%themes.length
}


startBtn.addEventListener("click", ()=>{
    modal.style.display = "none"
    main.style.display = "block"
    startBtn.style.display = "none"
    resumeBtn.style.display = "block"
    // setWinningScoreBtn.style.display = "none"
})

resumeBtn.addEventListener("click", ()=>{
    modal.style.display = "none"
    main.style.display = "block"
})


setWinningScoreBtn.addEventListener("click", ()=>{
    chngWinScore.style.display = "block"
    modal.style.display = "none"
})




infoBtn.addEventListener("click", ()=>{
    console.log("clicked")
    modal.style.display = "block"
    main.style.display = "none"    
})


setBtn.addEventListener("click", ()=>{
    if (Number(newScoreInput.value)){
        winning_score = Number(newScoreInput.value)
        winScoreLabel.textContent = winning_score

    }
    chngWinScore.style.display = "none"
    modal.style.display = "block"
})
