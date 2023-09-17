const selectDialog = document.getElementById("user-select");
const selectForm = document.getElementById("select-form");
const selectGesture = document.getElementById("user-gesture-select");
const resultOfThisRound = document.querySelector(".round-res");
const resultOfAllRound = document.querySelector(".game-res");
const startBtn = document.getElementById("start-btn");
const reloadBtn = document.getElementById("reload-btn");
const roundInfo = document.querySelector(".round-header");
const computerScoreDom = document.querySelector(".computer-score");
const userScoreDom = document.querySelector(".user-score");

//手势对象
const GestureEmoji = {
    rock: "✊",
    scissor: "✌",
    paper: "✋"
}
//手势数组
const Gestures = ["rock", "scissor", "paper"];
//分数
const computerScore = {
    win: 0,
    lose: 0
};
const userScore = {
    win: 0,
    lose: 0,
}
//总局数
const MaxRoundNum = 3;
//当前局数
let roundIndex = 0;

//弹出窗口
startBtn.addEventListener("click", () => {
    selectDialog.showModal();
})
//再来一局
reloadBtn.addEventListener("click", () => {
    location.reload();
})
//提交表单绑定事件
selectForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const useGesture = selectGesture.value;
    renderUserGesture(useGesture);
    const computerGesture = renderComputerGesture();
    startBtn.innerHTML = "开始下一回合";
    selectDialog.close();
    judgeWinner(useGesture, computerGesture);
})

//渲染user手势（注意：函数声明提升，函数表达式不提升）
function renderUserGesture(g){
    const userGestureDom = document.querySelector(".user-player-gesture");
    userGestureDom.innerHTML = GestureEmoji[g];
}

//渲染机器人手势
function renderComputerGesture(){
    const computerGestureDom = document.querySelector(".computer-player-gesture");
    const computerGesture = getComputerGesture();
    computerGestureDom.innerHTML = GestureEmoji[computerGesture];
    return computerGesture;
}
//随机生成机器人手势
function getComputerGesture(){
    const random = Math.floor(Math.random()*3);
    const computerGesture = Gestures[random];
    return computerGesture;
}

//判断胜负
function judgeWinner(userGesture, computerGesture){
    roundIndex++;
    let roundRes = "";
    let isUserWin = false;

    if (userGesture === computerGesture){
        roundRes = "本回合打平～";
    } else if (userGesture === "rock" && computerGesture === "scissor" ||
        userGesture === "scissor" && computerGesture === "paper" ||
        userGesture === "paper" && computerGesture === "rock"
    ){
        isUserWin = true;
        roundRes = "本回合你赢啦～";
        userScore.win++;
        computerScore.lose++;
    } else {
        isUserWin = false;
        roundRes = "本回合机器人赢了～";
        userScore.lose++;
        computerScore.win++;
    }

    resultOfThisRound.innerHTML = roundRes;
    roundInfo.innerHTML = `第 ${roundIndex} 回合，共 ${MaxRoundNum} 回合`;
    computerScoreDom.innerHTML = `胜：${computerScore.win} | 负：${computerScore.lose}`;
    userScoreDom.innerHTML = `胜：${userScore.win} | 负：${userScore.lose}`;

    if (roundIndex === MaxRoundNum) {
        if (computerScore.win > userScore.win) {
            finishGame("机器人");
        } else if (computerScore.win < userScore.win) {
            finishGame("你");
        } else {
            finishGame();
        }
    } else {
        if (computerScore.win === 2) {
            finishGame("机器人");
            return;
        } else if (userScore.win === 2) {
            finishGame("你");
            return;
        }
    }   
}

function finishGame(winner) {
    selectDialog.close();
    startBtn.style.display = "none";
    if (!winner) {
        resultOfAllRound.innerHTML = "哎呀，平局了!";
    } else {
        resultOfAllRound.innerHTML = `恭喜${winner}获胜！`;
    }
    reloadBtn.style.display = "block";
}
