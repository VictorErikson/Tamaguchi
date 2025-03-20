"use strict";
class Tamaguchi {
    constructor(name, animalType) {
        this.name = name;
        this.animalType = animalType;
        this.energy = 50;
        this.fullness = 50;
        this.happiness = 50;
        this.startLoop();
    }
    nap() {
        this.energy += 40;
        this.happiness -= 10;
        this.fullness -= 10;
    }
    play() {
        this.happiness += 30;
        this.fullness -= 10;
        this.energy -= 10;
    }
    eat() {
        this.fullness += 30;
        this.happiness += 5;
        this.energy -= 15;
    }
    startLoop() {
        setInterval(() => {
            this.updateStats();
        }, 10000);
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
const root = document.querySelector("#root");
let TamaguchiCount = 0;
class Game {
    static generateStartBtn() {
        const generateBtn = createBtn();
        generateBtn.innerText = "Generate your first Tamaguchi!";
        generateBtn.addEventListener("click", Game.generateMenu);
        root === null || root === void 0 ? void 0 : root.append(generateBtn);
    }
    static generateMenu() {
        if (!root)
            return;
        root.innerHTML = "";
        const tamContainer = createDiv();
        tamContainer.classList.add("tamContainer");
        const chooseBtn = createBtn();
        chooseBtn.innerText = "Choose Hedge the hedgehog!";
        chooseBtn.classList.add("characterSelection");
        chooseBtn.addEventListener("click", () => Game.generateTam(Game.characterNames[Game.currentCharacterIndex], Game.characters[Game.currentCharacterIndex]));
        root === null || root === void 0 ? void 0 : root.append(tamContainer, chooseBtn);
        const btnNext = createBtn();
        const btnNextIcon = createImg();
        btnNextIcon.src = `../assets/icons/arrow_forward.svg`;
        btnNext.classList.add("btnNext");
        btnNext.append(btnNextIcon);
        btnNext.addEventListener("click", () => Game.changeCharacter(1, tam, char));
        const btnPrev = createBtn();
        const btnPrevIcon = createImg();
        btnPrevIcon.src = `../assets/icons/arrow_back.svg`;
        btnPrev.classList.add("btnPrev");
        btnPrev.append(btnPrevIcon);
        btnPrev.addEventListener("click", () => Game.changeCharacter(-1, tam, char));
        const characterContainer = createDiv();
        characterContainer.classList.add("characterContainer");
        const tam = createImg();
        tam.src = `../assets/img/tam${Game.currentCharacterIndex + 1}.svg`;
        tam.classList.add("tam");
        let fileFormat = Game.currentCharacterIndex === 1 ? "webp" : "png";
        const char = createImg();
        char.src = `../assets/img/characters/char${Game.currentCharacterIndex + 1}.${fileFormat}`;
        char.classList.add("char");
        characterContainer.append(tam, char);
        tamContainer.append(btnPrev, characterContainer, btnNext);
    }
    static changeCharacter(direction, tam, char) {
        Game.currentCharacterIndex += direction;
        let fileFormat = Game.currentCharacterIndex === 1 ? "webp" : "png";
        Game.currentCharacterIndex === 2 ? char.classList.add("yoda") : char.classList.remove("yoda");
        if (Game.currentCharacterIndex < 0) {
            Game.currentCharacterIndex = Game.characters.length - 1;
        }
        else if (Game.currentCharacterIndex >= Game.characters.length) {
            Game.currentCharacterIndex = 0;
        }
        char.src = `../assets/img/characters/char${Game.currentCharacterIndex + 1}.${fileFormat}`;
        tam.src = `../assets/img/tam${Game.currentCharacterIndex + 1}.svg`;
        const characterSelection = document.querySelector(".characterSelection");
        characterSelection && (characterSelection.innerText = `Choose ${Game.characterNames[Game.currentCharacterIndex]}!`);
    }
    static generateTam(animalName, animalType) {
        const tam1 = new Tamaguchi(animalName = animalName, animalType = animalType);
        console.log(tam1);
    }
}
Game.characters = ["hedgehog", "giraffe", "yoda", "dog"];
Game.characterNames = ["Hedge the hedgehog", "Gisela", "Yoda", "Ebba Green"];
Game.currentCharacterIndex = 0;
let activityHistory = [];
Game.generateStartBtn();
const generateBtn = document.querySelector("#generateTamaguchi");
