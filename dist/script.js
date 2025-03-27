"use strict";
class Tamaguchi {
    constructor(name, character, mode) {
        this.name = name;
        this.character = character;
        this.energy = 50;
        this.fullness = 50;
        this.happiness = 50;
        this.mode = mode;
        this.startLoop();
    }
    nap() {
        this.energy += 40;
        this.happiness -= 10;
        this.fullness -= 10;
        activityHistory.push(`${this.name} takes a nap and restores some energy`);
    }
    play() {
        this.happiness += 30;
        this.fullness -= 10;
        this.energy -= 10;
        if (this.character === "spartan") {
            activityHistory.push(`${this.name} starts fighting in an epic battle! 🛡️⚔️`);
        }
        else if (this.character === "alien") {
            activityHistory.push(`${this.name} starts experimenting on an innocent human. This brings him great pleasure.`);
        }
        else if (this.character === "dog") {
            activityHistory.push(`${this.name} Starts playing some guitar. Sounds great! 🎸🎵`);
        }
        else {
            activityHistory.push(`${this.name} starts playing`);
        }
    }
    eat() {
        this.fullness += 30;
        this.happiness += 5;
        this.energy -= 15;
        if (this.character === "alien") {
            activityHistory.push(`${this.name} starts eating some brain, yummy! 🧠`);
        }
        else {
            activityHistory.push(`${this.name} starts eating a delicious meal. 🍕🍎`);
        }
    }
    startLoop() {
        let time = 0;
        if (this.mode === "easy") {
            time = 10000;
        }
        else if (this.mode === "medium") {
            time = 5000;
        }
        else {
            time = 1000;
        }
        setInterval(() => {
            this.updateStats();
        }, time);
    }
    updateStats() {
        this.energy -= 15;
        this.fullness -= 15;
        this.happiness -= 15;
    }
}
const createBtn = () => document.createElement("button");
const createDiv = () => document.createElement("div");
const createImg = () => document.createElement("img");
const createP = () => document.createElement("p");
const root = document.querySelector("#root");
const startCont = document.querySelector(".startCont");
let TamaguchiCount = 0;
class Game {
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
        selectText.innerText = "SELECT";
        startText.innerText = "START";
        const selectStartTextsCont = createDiv();
        selectStartTextsCont.classList.add("selectStartTextsCont");
        selectStartTextsCont.append(selectText, startText);
        controllerBase.append(selectStartCont, selectStartTextsCont);
        const upDownBtnDIv = createDiv();
        upDownBtnDIv.classList.add("upDownBtnDIv");
        const uppBtn = createBtn();
        uppBtn.classList.add("uppBtn");
        const downBtn = createBtn();
        downBtn.classList.add("downBtn");
        upDownBtnDIv.append(uppBtn, downBtn);
        const leftRightBtnDIv = createDiv();
        leftRightBtnDIv.classList.add("leftRightBtnDIv");
        const leftBtn = createBtn();
        leftBtn.classList.add("leftBtn");
        const rightBtn = createBtn();
        rightBtn.classList.add("rightBtn");
        leftRightBtnDIv.append(leftBtn, rightBtn);
        const plusBtnsCont = createDiv();
        plusBtnsCont.classList.add("plusBtnsCont");
        plusBtnsCont.append(leftRightBtnDIv, upDownBtnDIv);
        const cont = createDiv();
        cont.classList.add("cont");
        cont.append(plusBtnsCont);
        controllerLeftpart.append(cont);
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
        controllerRightpart.append(XnYCont, AnBCont);
        const fullController = createDiv();
        fullController.classList.add("fullController");
        fullController.append(controllerLeftpart, controllerBase, controllerRightpart);
        startCont === null || startCont === void 0 ? void 0 : startCont.append(fullController);
    }
    static removeAllButtonFunction() {
        document.querySelectorAll("button").forEach(btn => {
            btn.onclick = null;
        });
    }
    static changeMode(direction) {
        Game.currentLevelIndex += direction;
        if (Game.currentLevelIndex < 0) {
            Game.currentLevelIndex = 2;
        }
        else if (Game.currentLevelIndex >= 3) {
            Game.currentLevelIndex = 0;
        }
        const selectionDivLeft = document.querySelector(".selectionDivLeft");
        const selectionDivRight = document.querySelector(".selectionDivRight");
        const levelText = document.querySelector(".level");
        const body = document.querySelector("body");
        if (selectionDivLeft && selectionDivRight && levelText && body) {
            if (Game.currentLevelIndex === 0) {
                selectionDivLeft.className = "selectionDivLeft";
                selectionDivRight.className = "selectionDivRight";
                levelText.className = "level";
                levelText.innerText = "Select your Difficulty - Easy mode";
                body.className = "";
            }
            else if (Game.currentLevelIndex === 1) {
                selectionDivLeft.className = "selectionDivLeft medium";
                selectionDivRight.className = "selectionDivRight medium";
                levelText.className = "level medium";
                body.className = "medium";
                levelText.innerText = "Select your Difficulty - Normal mode";
            }
            else if (Game.currentLevelIndex === 2) {
                selectionDivLeft.className = "selectionDivLeft hard";
                selectionDivRight.className = "selectionDivRight hard";
                levelText.className = "level hard";
                body.className = "hard";
                levelText.innerText = "Select your Difficulty - Hardcore mode";
            }
        }
    }
    static changeCharacter(direction) {
        const track = document.querySelector(".carousel-track");
        const itemWidth = 380;
        const totalItems = Game.characterNames.length;
        if (!track)
            return;
        Game.currentCharacterIndex += direction;
        track.style.transition = "transform 0.4s ease-in-out";
        track.style.transform = `translateX(-${Game.currentCharacterIndex * itemWidth}px)`;
        track.addEventListener("transitionend", function handleTransition() {
            track.removeEventListener("transitionend", handleTransition);
            if (Game.currentCharacterIndex === 0) {
                track.style.transition = "none";
                Game.currentCharacterIndex = totalItems;
                track.style.transform = `translateX(-${Game.currentCharacterIndex * itemWidth}px)`;
            }
            if (Game.currentCharacterIndex === totalItems + 1) {
                track.style.transition = "none";
                Game.currentCharacterIndex = 1;
                track.style.transform = `translateX(-${Game.currentCharacterIndex * itemWidth}px)`;
            }
        });
    }
    static createCharacterItem(character) {
        const item = createDiv();
        const nameClass = character.replaceAll(" ", "-").replaceAll(".", "");
        item.classList.add("carousel-item", nameClass);
        return item;
    }
    static generateHeroSelection() {
        startCont && (startCont.innerHTML = "");
        Game.generateSNESControl();
        const section_8bit = document.createElement("section");
        section_8bit.classList.add("section_8bit");
        const windowCont = createDiv();
        windowCont.classList.add("windowCont", "wrapper", "carousel");
        const glass = createImg();
        glass.src = "../assets/img/glass.svg";
        windowCont.append(glass);
        section_8bit.append(windowCont);
        const carouselTrack = createDiv();
        carouselTrack.classList.add("carousel-track");
        windowCont.append(carouselTrack);
        const title = document.createElement("h2");
        title.innerText = "Hero selection";
        const characterList = [...Game.characterNames];
        const firstClone = characterList[0];
        const lastClone = characterList[characterList.length - 1];
        // Add clone of last
        carouselTrack.append(Game.createCharacterItem(lastClone));
        // Add real items
        characterList.forEach(character => {
            carouselTrack.append(Game.createCharacterItem(character));
        });
        // Add clone of first
        carouselTrack.append(Game.createCharacterItem(firstClone));
        // Start on first real item
        Game.currentCharacterIndex = 1;
        carouselTrack.style.transform = `translateX(-${Game.currentCharacterIndex * 380}px)`;
        const prevBtn = document.querySelector(".leftBtn");
        const nextBtn = document.querySelector(".rightBtn");
        prevBtn && (prevBtn.onclick = () => Game.changeCharacter(-1));
        nextBtn && (nextBtn.onclick = () => Game.changeCharacter(1));
        const startBtn = document.querySelector(".startBtn");
        startBtn && (startBtn.onclick = Game.generateHeroSelection);
        const startContent = document.querySelector(".startCont");
        startContent?.prepend(title, section_8bit);
    }
    static generateIngameContent() {
        const mode = document.createElement("h2");
        if (Game.currentLevelIndex === 0) {
            mode.innerText = "Easy";
        }
        else if (Game.currentLevelIndex === 1) {
            mode.innerText = "Medium";
        }
        else {
            mode.innerText = "Hardcore";
        }
    }
    static generateLevelSelection() {
        Game.removeAllButtonFunction();
        document.querySelector("h1")?.remove();
        const section_8bit = document.createElement("section");
        section_8bit.classList.add("section_8bit");
        const levelSelectionCon = createDiv();
        levelSelectionCon.classList.add("levelSelectionCon", "wrapper", "windowCont");
        const glass = createImg();
        glass.src = "../assets/img/glass.svg";
        const level = document.createElement("h2");
        level.classList.add("level");
        level.innerText = "Select your Difficulty - Easy mode";
        const selectionDivRight = createDiv();
        selectionDivRight.classList.add("selectionDivRight");
        const selectionDivLeft = createDiv();
        selectionDivLeft.classList.add("selectionDivLeft");
        levelSelectionCon.append(glass, selectionDivLeft, selectionDivRight);
        section_8bit.append(levelSelectionCon);
        const startContent = document.querySelector(".startCont");
        startContent?.prepend(level, section_8bit);
        const prevBtn = document.querySelector(".leftBtn");
        const nextBtn = document.querySelector(".rightBtn");
        prevBtn && (prevBtn.onclick = () => Game.changeMode(-1));
        nextBtn && (nextBtn.onclick = () => Game.changeMode(1));
        const startBtn = document.querySelector(".startBtn");
        startBtn && (startBtn.onclick = Game.generateHeroSelection);
    }
}
Game.characters = ["spartan", "alien", "yoda", "dog"];
Game.characterNames = ["Leonidas", "E.T.", "Yoda", "Ebba Green"];
Game.currentLevelIndex = 0;
Game.currentCharacterIndex = 0;
let activityHistory = [];
const generateBtn = document.querySelector("#generateTamaguchi");
