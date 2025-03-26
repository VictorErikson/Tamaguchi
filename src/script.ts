type CharacterType = "spartan" | "alien" | "yoda" | "dog";
type CharacterName = "Leonidas" | "E.T." | "Yoda" | "Ebba Green";
type Mode = "easy" | "medium" | "hard";


class Tamaguchi {
    name: string;
    character: CharacterType;
    energy: number;
    fullness: number;
    happiness: number;
    mode: Mode;
    
    constructor(name: string, character: CharacterType, mode: Mode){
        this.name = name;
        this.character = character;
        this.energy = 50;
        this.fullness = 50;
        this.happiness = 50;
        this.mode = mode;

        this.startLoop();
    }

    nap(){
        this.energy += 40;
        this.happiness -= 10;
        this.fullness -= 10;

        activityHistory.push(`${this.name} takes a nap and restores some energy`);
    }
    
    play(){
        this.happiness += 30;
        this.fullness -= 10;
        this.energy -= 10;
        
        if(this.character === "spartan"){
            activityHistory.push(`${this.name} starts fighting in an epic battle! 🛡️⚔️`);
        } else if(this.character === "alien"){
            activityHistory.push(`${this.name} starts experimenting on an innocent human. This brings him great pleasure.`);
        }else if (this.character === "dog"){
            activityHistory.push(`${this.name} Starts playing some guitar. Sounds great! 🎸🎵`);
        }else{activityHistory.push(`${this.name} starts playing`);}
    }
    
    eat(){
        this.fullness += 30;
        this.happiness += 5;
        this.energy -= 15;

        if(this.character === "alien"){
            activityHistory.push(`${this.name} starts eating some brain, yummy! 🧠`);
        } else {
        activityHistory.push(`${this.name} starts eating a delicious meal. 🍕🍎`);
        }
    }

    private startLoop(): void {
        let time = 0;
        if (this.mode === "easy"){ 
            time = 10000
        }else if(this.mode === "medium"){
            time = 5000
        }else{time = 1000}
        setInterval(() => {
            this.updateStats()
        }, time)
    }

    private updateStats(): void {
        this.energy -= 15;
        this.fullness -= 15;
        this.happiness -= 15;
    }

}

const createBtn = () => document.createElement("button");
const createDiv = () => document.createElement("div");
const createImg = () => document.createElement("img");

const root:HTMLDivElement | null = document.querySelector("#root")
let TamaguchiCount = 0;

class Game {
    static characters : CharacterType[] = ["spartan", "alien", "yoda", "dog"];
    static characterNames: CharacterName[] = ["Leonidas", "E.T.", "Yoda", "Ebba Green"];
    static currentLevelIndex = 0;
    static currentCharacterIndex = 0;

    static generateSNESControl() {
        const controllerBase = createDiv();
        controllerBase.classList.add("controllerBase");
        const controllerLeftpart = createDiv();
        controllerLeftpart.classList.add("controllerLeftpart");
        const controllerRightpart = createDiv();
        controllerRightpart.classList.add("controllerRightpart");

        const startBtn = createBtn();
        startBtn.classList.add("startBtn");
        const selectBtn = createBtn();
        selectBtn.classList.add("selectBtn");
        const selectStartCont = createDiv();
        selectStartCont.classList.add("selectStartCont");
        selectStartCont.append(selectBtn, startBtn);

        const selectText = document.createElement("p");
        const startText = document.createElement("p");
        selectText.innerText = "SELECT"
        startText.innerText = "START"
        const selectStartTextsCont = createDiv();
        selectStartTextsCont.classList.add("selectStartTextsCont");
        selectStartTextsCont.append(selectText, startText)
        controllerBase.append(selectStartCont, selectStartTextsCont)

        const upDownBtnDIv = createDiv();
        upDownBtnDIv.classList.add("upDownBtnDIv")
        const uppBtn = createBtn();
        uppBtn.classList.add("uppBtn");
        const downBtn = createBtn();
        downBtn.classList.add("downBtn");
        upDownBtnDIv.append(uppBtn, downBtn)
        
        const leftRightBtnDIv = createDiv();
        leftRightBtnDIv.classList.add("leftRightBtnDIv")
        const leftBtn = createBtn();
        leftBtn.classList.add("leftBtn");
        const rightBtn = createBtn();
        rightBtn.classList.add("rightBtn");
        leftRightBtnDIv.append(leftBtn, rightBtn)

        const plusBtnsCont = createDiv();
        plusBtnsCont.classList.add("plusBtnsCont")
        plusBtnsCont.append(leftRightBtnDIv, upDownBtnDIv)
        const cont = createDiv();
        cont.classList.add("cont")
        cont.append(plusBtnsCont)
        controllerLeftpart.append(cont)

        const xBtn = createBtn();
        xBtn.classList.add("xBtn");
        const yBtn = createBtn();
        yBtn.classList.add("yBtn");
        const XnYCont = createDiv();
        XnYCont.classList.add("XnYCont");
        XnYCont.append(xBtn, yBtn);
        
        const aBtn = createBtn();
        aBtn.classList.add("aBtn");
        const bBtn = createBtn();
        bBtn.classList.add("bBtn");
        const AnBCont = createDiv();
        AnBCont.classList.add("AnBCont");
        AnBCont.append(aBtn, bBtn);

        controllerRightpart.append(XnYCont, AnBCont)

        const fullController = createDiv();
        fullController.classList.add("fullController")
        fullController.append(controllerLeftpart, controllerBase, controllerRightpart)
        
        
        
        root === null || root === void 0 ? void 0 : root.append(fullController);
    }

    static removeAllButtonFunction() {
        document.querySelectorAll("button").forEach(btn => {
            btn.onclick = null;
          });
    }

    static changeMode(direction: number) {
        Game.currentLevelIndex += direction;

        if(Game.currentLevelIndex < 0){
            Game.currentLevelIndex = 2;
        } else if (Game.currentLevelIndex >= 3){
            Game.currentLevelIndex = 0;
        }

        const selectionDivLeft = document.querySelector(".selectionDivLeft");
        const selectionDivRight = document.querySelector(".selectionDivRight");
        const levelText:HTMLParagraphElement | null = document.querySelector(".level");
        const body = document.querySelector("body");

        if (selectionDivLeft && selectionDivRight && levelText && body){
            if(Game.currentLevelIndex === 0){
                selectionDivLeft.className = "selectionDivLeft";
                selectionDivRight.className = "selectionDivRight";
                levelText.className = "level";
                levelText.innerText = "Select your Difficulty - Easy mode"
                body.className = "";
            }  else if (Game.currentLevelIndex === 1){
                selectionDivLeft.className = "selectionDivLeft medium";
                selectionDivRight.className = "selectionDivRight medium";
                levelText.className = "level medium";
                body.className = "medium";
                levelText.innerText = "Select your Difficulty - Normal mode"
            } else if(Game.currentLevelIndex === 2){
                selectionDivLeft.className = "selectionDivLeft hard";
                selectionDivRight.className = "selectionDivRight hard";
                levelText.className = "level hard";
                body.className = "hard";
                levelText.innerText = "Select your Difficulty - Hardcore mode"
            }
        }
    }

    static generateLevelSelection() {

        Game.removeAllButtonFunction();

        document.querySelector("h1")?.remove();
        const section_8bit = document.createElement("section");
        section_8bit.classList.add("section_8bit")

        const levelSelectionCon = createDiv();
        levelSelectionCon.classList.add("levelSelectionCon", "wrapper");
        const glass = createImg();
        glass.src = "../assets/img/glass.svg"

        const level = document.createElement("h2");
        level.classList.add("level");
        level.innerText = "Select your Difficulty - Easy mode"
        const selectionDivRight = createDiv();
        selectionDivRight.classList.add("selectionDivRight");
        const selectionDivLeft = createDiv();
        selectionDivLeft.classList.add("selectionDivLeft");

        levelSelectionCon.append(glass, selectionDivLeft, selectionDivRight);
        section_8bit.append(levelSelectionCon);
        const startContent = document.querySelector(".startCont")
        startContent?.prepend(level, section_8bit);

        const prevBtn:HTMLButtonElement | null = document.querySelector(".leftBtn");
        const nextBtn:HTMLButtonElement | null = document.querySelector(".rightBtn");
        prevBtn && (prevBtn.onclick = () => Game.changeMode(-1))
        nextBtn && (nextBtn.onclick = () => Game.changeMode(1))
    }
}

let activityHistory: string[] = [];


const generateBtn = document.querySelector("#generateTamaguchi");
