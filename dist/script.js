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
        this.updateBars();
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
        this.updateBars();
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
        this.updateBars();
    }
    startLoop() {
        let time = 0;
        if (this.mode === 0) {
            time = 10000000;
        }
        else if (this.mode === 1) {
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
        this.updateBars();
    }
    updateBars() {
        Game.updateEnergy(this.energy);
        Game.updateFullness(this.fullness);
        Game.updateHappiness(this.happiness);
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
        const modeLabel = document.querySelector(".mode-label");
        const body = document.querySelector("body");
        if (selectionDivLeft && selectionDivRight && modeLabel && body) {
            if (Game.currentLevelIndex === 0) {
                selectionDivLeft.className = "selectionDivLeft";
                selectionDivRight.className = "selectionDivRight";
                modeLabel.className = "mode-label";
                modeLabel.innerText = "Easy";
                body.className = "";
            }
            else if (Game.currentLevelIndex === 1) {
                selectionDivLeft.className = "selectionDivLeft medium";
                selectionDivRight.className = "selectionDivRight medium";
                modeLabel.className = "mode-label medium";
                body.className = "medium";
                modeLabel.innerText = "Normal";
            }
            else if (Game.currentLevelIndex === 2) {
                selectionDivLeft.className = "selectionDivLeft hard";
                selectionDivRight.className = "selectionDivRight hard";
                modeLabel.className = "mode-label hard";
                body.className = "hard";
                modeLabel.innerText = "Hardcore";
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
        Game.selectedCharacterIndex = (Game.currentCharacterIndex - 1 + Game.characterNames.length) % Game.characterNames.length;
        let heroName = document.querySelector(".heroName");
        let nameIndex = Game.currentCharacterIndex - 1;
        if (Game.currentCharacterIndex === 0) {
            nameIndex = Game.characterNames.length - 1;
        }
        else if (Game.currentCharacterIndex === Game.characterNames.length + 1) {
            nameIndex = 0;
        }
        if (heroName) {
            heroName.innerText = `${Game.characterNames[nameIndex]}`;
        }
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
        console.log(Game.currentCharacterIndex);
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
        const title = document.createElement("h2");
        title.classList.add("titleHeroSelection");
        title.innerText = "Hero selection";
        const heroNameCont = createDiv();
        heroNameCont.classList.add("heroNameCont");
        const heroName = document.createElement("h2");
        heroName.innerText = "Spartacus";
        heroName.classList.add("heroName");
        heroNameCont.append(heroName);
        section_8bit.append(windowCont, title);
        const carouselTrack = createDiv();
        carouselTrack.classList.add("carousel-track");
        windowCont.append(carouselTrack);
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
        const selectBtn = document.querySelector(".selectBtn");
        startBtn && (startBtn.onclick = () => { Game.countdown(3, Game.generateIngameContent); });
        selectBtn && (selectBtn.onclick = () => Game.countdown(3, Game.generateIngameContent));
        const startContent = document.querySelector(".startCont");
        startContent?.prepend(heroNameCont, section_8bit);
    }
    static countdown(startNmbr, runFunction) {
        const startCont = document.querySelector(".startCont");
        startCont && (startCont.innerHTML = "");
        let count = startNmbr;
        let countdownNmbr = document.createElement("h1");
        countdownNmbr.classList.add("countdownNmbr");
        countdownNmbr.innerText = `${count}`;
        startCont.append(countdownNmbr);
        Game.generateSNESControl();
        const interval = setInterval(() => {
            count--;
            if (count === 0) {
                countdownNmbr.innerText = `START`;
            }
            else if (count < 0) {
                clearInterval(interval);
                runFunction();
            }
            else {
                countdownNmbr.innerText = `${count}`;
            }
        }, 1000);
    }
    static generateHeroBox() {
        const section_8bit = document.createElement("section");
        section_8bit.classList.add("section_8bit");
        const levelSelectionCon = createDiv();
        levelSelectionCon.classList.add("wrapper", "windowCont");
        const glass = createImg();
        glass.src = "../assets/img/glass.svg";
        levelSelectionCon.append(glass);
        section_8bit.append(levelSelectionCon);
        return (section_8bit);
    }
    static generateTextbox() {
        const textbox = createDiv();
        textbox.classList.add("textbox");
        const textUl = document.createElement("ul");
        textUl.classList.add("textUl");
        return textbox;
    }
    static updateEnergy(percentage) {
        const energyFill = document.querySelector(".energyFill");
        energyFill && (energyFill.style.width = `${percentage}%`);
    }
    static updateHappiness(percentage) {
        const happinessFill = document.querySelector(".happinessFill");
        happinessFill && (happinessFill.style.width = `${percentage}%`);
    }
    static updateFullness(percentage) {
        const fullnessFill = document.querySelector(".fullnessFill");
        fullnessFill && (fullnessFill.style.width = `${percentage}%`);
    }
    static generateStatBars() {
        const statsCont = createDiv();
        statsCont.classList.add("statsCont");
        const energyCont = createDiv();
        energyCont.classList.add("energyCont");
        const energyImgCont = createDiv();
        energyImgCont.classList.add("energyImgCont", "ImgCont");
        const energyImg = createImg();
        energyImg.classList.add("energyImg", "barSymbol");
        energyImg.src = "/assets/icons/stats/energy_symbol.svg";
        energyImgCont.append(energyImg);
        const energyBar = createDiv();
        energyBar.classList.add("energyBar", "bar");
        const energyFill = createDiv();
        energyFill.classList.add("energyFill", "fill");
        energyBar.append(energyFill);
        energyCont.append(energyImgCont, energyBar);
        const happinessCont = createDiv();
        happinessCont.classList.add("happinessCont");
        const happinessImgCont = createDiv();
        happinessImgCont.classList.add("happinessImgCont", "ImgCont");
        const happinessImg = createImg();
        happinessImg.src = "/assets/icons/stats/happiness/happy.svg";
        happinessImg.classList.add("happinessImg", "barSymbol");
        happinessImgCont.append(happinessImg);
        const happinessBar = createDiv();
        happinessBar.classList.add("happinessBar", "bar");
        const happinessFill = createDiv();
        happinessFill.classList.add("happinessFill", "fill");
        happinessBar.append(happinessFill);
        happinessCont.append(happinessBar);
        happinessCont.append(happinessImgCont, happinessBar);
        const fullnessCont = createDiv();
        fullnessCont.classList.add("fullnessCont");
        const fullnessImgCont = createDiv();
        fullnessImgCont.classList.add("fullnessImgCont", "ImgCont");
        const fullnessImg = createImg();
        fullnessImg.src = "/assets/icons/stats/fullness.svg";
        fullnessImg.classList.add("fullnessImg", "barSymbol");
        fullnessImgCont.append(fullnessImg);
        const fullnessBar = createDiv();
        fullnessBar.classList.add("fullnessBar", "bar");
        const fullnessFill = createDiv();
        fullnessFill.classList.add("fullnessFill", "fill");
        fullnessBar.append(fullnessFill);
        fullnessCont.append(fullnessImgCont, fullnessBar);
        statsCont.append(energyCont, happinessCont, fullnessCont);
        return statsCont;
    }
    static generateSmallHeroMenu() {
        const smallHeroMenuCont = createDiv();
        smallHeroMenuCont.classList.add("smallHeroMenuCont");
        Game.characters.forEach(char => {
            const charBtn = createBtn();
            charBtn.classList.add("charBtn", `${char}`);
            charBtn.style.backgroundImage = `url("assets/img/characters/8bit/${char}.png")`;
            charBtn.onclick = () => {
                const index = Game.characters.indexOf(char);
                const charName = Game.characterNames[index];
                charBtn.classList.add("disabled");
                const newHero = new Tamaguchi(charName, char, Game.currentLevelIndex);
                Game.heroInstances.push(newHero);
                Game.addCharacterToCarousel(charName);
            };
            if (Game.activeCharacters.includes(char)) {
                charBtn.classList.add("disabled");
            }
            smallHeroMenuCont.append(charBtn);
        });
        return smallHeroMenuCont;
    }
    static changeCharacterIngame(direction) {
        const track = document.querySelector(".carousel-track");
        const itemWidth = 380;
        const totalItems = Game.heroInstances.length;
        if (!track)
            return;
        Game.currentCharacterIndex += direction;
        console.log("totalItems: " + totalItems);
        console.log("Index: " + Game.currentCharacterIndex);
        Game.selectedCharacterIndex = (Game.currentCharacterIndex - 1 + totalItems) % totalItems;
        let heroName = document.querySelector(".heroName");
        let nameIndex = Game.currentCharacterIndex - 1;
        console.log("NameIndex: " + nameIndex);
        if (Game.currentCharacterIndex === 0) {
            nameIndex = totalItems - 1;
        }
        else if (Game.currentCharacterIndex === totalItems + 1) {
            nameIndex = 0;
        }
        if (heroName) {
            heroName.innerText = `${Game.characterNames[nameIndex]}`;
        }
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
        console.log(Game.currentCharacterIndex);
    }
    static addCharacterToCarousel(characterName) {
        const track = document.querySelector(".carousel-track");
        if (!track)
            return;
        const className = characterName.replaceAll(" ", "-").replaceAll(".", "");
        const existing = track.querySelector(`.carousel-item.${className}`);
        if (existing)
            return;
        const item = Game.createCharacterItem(characterName);
        track.appendChild(item);
        const index = track.querySelectorAll(".carousel-item").length - 1;
        const itemWidth = 380;
        track.style.transition = "transform 0.4s ease-in-out";
        track.style.transform = `translateX(-${index * itemWidth}px)`;
        // selectedName;
        // selectedType
        if (Game.heroInstances.length > 1) {
            const rightBtn = document.querySelector(".rightBtn");
            const leftBtn = document.querySelector(".leftBtn");
            rightBtn && (rightBtn.onclick = () => {
                Game.changeCharacterIngame(1);
            });
            leftBtn && (leftBtn.onclick = () => {
                Game.changeCharacterIngame(-1);
            });
            // const greenBtn = document.querySelector(".yBtn");
            // const redBtn = document.querySelector(".aBtn");
            // const yellowBtn = document.querySelector(".bBtn");
            // const currentHero = Game.heroInstances.forEach(hero => {
            //     if(hero.name === characterName){return hero}
            // })
            // greenBtn?.addEventListener("click", () => {
            //     currentHero?.eat()
            // });
        }
    }
    static generateIngameContent() {
        const startCont = document.querySelector(".startCont");
        if (startCont)
            startCont.innerHTML = "";
        const selectedName = Game.characterNames[Game.selectedCharacterIndex];
        const selectedType = Game.characters[Game.selectedCharacterIndex];
        Game.activeCharacters.push(selectedType);
        console.log("Game.activeCharacters: " + Game.activeCharacters);
        Game.generateSNESControl();
        // const characterList = [...Game.characterNames];
        const startHero = new Tamaguchi(selectedName, selectedType, Game.currentLevelIndex);
        Game.heroInstances.push(startHero);
        console.log("Game.heroInstances: " + Game.heroInstances[0]);
        // const mode = document.createElement("h2");
        // mode.innerText =
        //   Game.currentLevelIndex === 0
        //     ? "Easy"
        //     : Game.currentLevelIndex === 1
        //     ? "Medium"
        //     : "Hardcore";
        const filler = createDiv();
        filler.classList.add("fillerBox");
        const textbox = Game.generateTextbox();
        const section_8bit = document.createElement("section");
        section_8bit.classList.add("section_8bit");
        const windowCont = createDiv();
        windowCont.classList.add("windowCont", "wrapper", "carousel");
        const glass = createImg();
        glass.src = "../assets/img/glass.svg";
        windowCont.append(glass);
        const carouselTrack = createDiv();
        carouselTrack.classList.add("carousel-track");
        windowCont.append(carouselTrack);
        Game.currentCharacterIndex = 1;
        carouselTrack.style.transform = `translateX(-${Game.currentCharacterIndex * 380}px)`;
        // carouselTrack.append(Game.createCharacterItem(selectedName));
        const title = document.createElement("h2");
        title.classList.add("heroName");
        title.innerText = `${selectedName}`;
        section_8bit.append(windowCont, title);
        const statBars = Game.generateStatBars();
        section_8bit.append(statBars);
        const heroCont = createDiv();
        heroCont.classList.add("heroCont");
        heroCont.append(section_8bit);
        const smallHeroMenu = Game.generateSmallHeroMenu();
        const gameCont = createDiv();
        gameCont.classList.add("gameCont");
        gameCont.append(textbox, heroCont, filler);
        startCont?.prepend(smallHeroMenu, gameCont);
        Game.addCharacterToCarousel(selectedName);
        // const track = document.querySelector(".carousel-track") as HTMLDivElement;
        // const index = track.querySelectorAll(".carousel-item").length - 1;
        // const itemWidth = 380;
        carouselTrack.style.transition = "transform 0.4s ease-in-out";
        // // clones
        // const firstClone = characterList[0];
        // const lastClone = characterList[characterList.length - 1];
        // // add last clone
        // carouselTrack.append(Game.createCharacterItem(lastClone));
        // // add real items
        // characterList.forEach(character => {
        // carouselTrack.append(Game.createCharacterItem(character));
        // });
        // // add first clone
        // carouselTrack.append(Game.createCharacterItem(firstClone));
        // // initialize
        // Game.currentCharacterIndex = 1;
        // carouselTrack.style.transform = `translateX(-${Game.currentCharacterIndex * 380}px)`;
    }
    // static generateIngameContent() {
    //     const startCont = document.querySelector(".startCont");
    //     if (startCont) startCont.innerHTML = "";
    //     const selectedName = Game.characterNames[Game.selectedCharacterIndex];
    //     const selectedType = Game.characters[Game.selectedCharacterIndex];
    //     Game.activeCharacters.push(selectedType);
    //     Game.generateSNESControl();
    //     const characterList = [...Game.characterNames];
    //     const startHero = new Tamaguchi(
    //     selectedName,
    //     selectedType,
    //     Game.currentLevelIndex
    //     );
    //     Game.addCharacterToCarousel(selectedName);
    //     Game.heroInstances.push(startHero);
    //     // const mode = document.createElement("h2");
    //     // mode.innerText =
    //     //   Game.currentLevelIndex === 0
    //     //     ? "Easy"
    //     //     : Game.currentLevelIndex === 1
    //     //     ? "Medium"
    //     //     : "Hardcore";
    //     const filler = createDiv();
    //     filler.classList.add("fillerBox");
    //     const textbox = Game.generateTextbox();
    //     const section_8bit = document.createElement("section");
    //     section_8bit.classList.add("section_8bit");
    //     const windowCont = createDiv();
    //     windowCont.classList.add("windowCont", "wrapper", "carousel");
    //     const glass = createImg();
    //     glass.src = "../assets/img/glass.svg";
    //     windowCont.append(glass);
    //     const carouselTrack = createDiv();
    //     carouselTrack.classList.add("carousel-track");
    //     windowCont.append(carouselTrack);
    //     Game.currentCharacterIndex = 1;
    //     carouselTrack.style.transform = `translateX(-${Game.currentCharacterIndex * 380}px)`;
    //     carouselTrack.append(Game.createCharacterItem(selectedName));
    //     const title = document.createElement("h2");
    //     title.classList.add("heroName");
    //     title.innerText = `${selectedName}`;
    //     section_8bit.append(windowCont, title);
    //     const statBars = Game.generateStatBars();
    //     section_8bit.append(statBars);
    //     const heroCont = createDiv();
    //     heroCont.classList.add("heroCont");
    //     heroCont.append(section_8bit);
    //     const smallHeroMenu = Game.generateSmallHeroMenu();
    //     const gameCont = createDiv();
    //     gameCont.classList.add("gameCont");
    //     gameCont.append(textbox, heroCont, filler);
    //     startCont?.prepend(smallHeroMenu, gameCont);
    //     const track = document.querySelector(".carousel-track") as HTMLDivElement;
    //     const index = track.querySelectorAll(".carousel-item").length - 1;
    //     const itemWidth = 380;
    //     carouselTrack.style.transition = "transform 0.4s ease-in-out";
    //     carouselTrack.style.transform = `translateX(-${index * itemWidth}px)`;
    //   }
    static generateLevelSelection() {
        Game.removeAllButtonFunction();
        document.querySelector(".startAnimController")?.classList.remove("startAnimController");
        document.querySelector("h1")?.remove();
        const section_8bit = Game.generateHeroBox();
        const level = document.createElement("h2");
        level.classList.add("level");
        level.innerText = "Press START to select Difficulty";
        const mode = document.createElement("h2");
        mode.classList.add("mode");
        mode.innerHTML = `Mode: <span class="mode-label">Easy</span>`;
        const selectionDivRight = createDiv();
        selectionDivRight.classList.add("selectionDivRight");
        const selectionDivLeft = createDiv();
        selectionDivLeft.classList.add("selectionDivLeft");
        const startContent = document.querySelector(".startCont");
        startContent?.prepend(level, section_8bit);
        const levelSelectionCon = document.querySelector(".windowCont");
        levelSelectionCon?.classList.add("levelSelectionCon");
        levelSelectionCon?.append(selectionDivLeft, selectionDivRight);
        levelSelectionCon && (section_8bit.append(levelSelectionCon, mode));
        const prevBtn = document.querySelector(".leftBtn");
        const nextBtn = document.querySelector(".rightBtn");
        prevBtn && (prevBtn.onclick = () => Game.changeMode(-1));
        nextBtn && (nextBtn.onclick = () => Game.changeMode(1));
        const startBtn = document.querySelector(".startBtn");
        startBtn && (startBtn.onclick = Game.generateHeroSelection);
    }
}
Game.characters = ["spartan", "alien", "yoda", "dog"];
Game.characterNames = ["Spartacus", "E.T.", "Yoda", "Ebba Green"];
Game.currentLevelIndex = 0;
Game.currentCharacterIndex = 0;
Game.activeCharacters = [];
Game.heroInstances = [];
Game.selectedCharacterIndex = 0;
let activityHistory = [];
const generateBtn = document.querySelector("#generateTamaguchi");
