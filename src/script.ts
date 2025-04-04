type CharacterType = "spartan" | "alien" | "yoda" | "dog";
type CharacterName = "Spartacus" | "E.T." | "Yoda" | "Ebba Green";

class Tamaguchi {
    name: CharacterName;
    character: CharacterType;
    energy: number;
    fullness: number;
    happiness: number;
    mode: number;
    index: number;
    dead: boolean;

    constructor(name: CharacterName, character: CharacterType, mode: number){
        this.name = name;
        this.character = character;
        this.energy = 50;
        this.fullness = 50;
        this.happiness = 50;
        this.mode = mode;
        this.index = Game.heroInstances.length;
        this.dead = false;

        this.startLoop();
    }

    private intervalId: number | undefined;
    private imageResetTimeout: number | null = null;

    nap(){
        
        if(!this.dead){
            Game.klickSfx.play();
            this.energy += 40;
            this.happiness -= 10;
            this.fullness -= 10;
            activityHistory.push(`${this.name} takes a nap and restores some energy... 😴💤`);

            const carouselItems = document.querySelectorAll(".carousel-track > .carousel-item");

            if(carouselItems.length > this.index){
                const hero = carouselItems[this.index] as HTMLElement
                hero.style.backgroundImage = `url("/assets/img/characters/8bit/${this.character}-sleeping.png")`;

                if (this.imageResetTimeout !== null) {
                    clearTimeout(this.imageResetTimeout);
                    this.imageResetTimeout = null;
                }

                this.imageResetTimeout = setTimeout(() => {
                    if (!this.dead) {
                        hero.style.backgroundImage = `url("/assets/img/characters/8bit/${this.character}.png")`;
                    }
                    this.imageResetTimeout = null;
                }, 3000);
            }; 

            this.MinMaxStats();
            this.checkIfDead();
            this.updateBars();
        }
    }
    
    play(){
        if(!this.dead){
            Game.klickSfx.play();
            this.happiness += 30;
            this.fullness -= 10;
            this.energy -= 10;
            
            if(this.character === "spartan"){
                activityHistory.push(`${this.name} starts fighting in an epic battle! 🛡️⚔️`);
            } else if(this.character === "alien"){
                activityHistory.push(`${this.name} starts experimenting on an innocent human. This brings him great pleasure.👽`);
            }else if (this.character === "dog"){
                activityHistory.push(`${this.name} starts playing some guitar. Sounds great! 🎸🎵`);
            }else{activityHistory.push(`${this.name} starts playing.`);}

            const carouselItems = document.querySelectorAll(".carousel-track > .carousel-item");

            if(carouselItems.length > this.index){
                const hero = carouselItems[this.index] as HTMLElement
                hero.style.backgroundImage = `url("/assets/img/characters/8bit/${this.character}-playing.png")`;

                if (this.imageResetTimeout !== null) {
                    clearTimeout(this.imageResetTimeout);
                    this.imageResetTimeout = null;
                }

                this.imageResetTimeout = setTimeout(() => {
                    if (!this.dead) {
                        hero.style.backgroundImage = `url("/assets/img/characters/8bit/${this.character}.png")`;
                    }
                    this.imageResetTimeout = null;
                }, 3000);
            }; 

            this.MinMaxStats();
            this.checkIfDead();
            this.updateBars();
        }
    }
    
    eat(){
        if(!this.dead){
            Game.klickSfx.play();
            this.fullness += 30;
            this.happiness += 5;
            this.energy -= 15;

            if(this.character === "alien"){
                activityHistory.push(`${this.name} starts eating some brain, yummy! 🧠`);
            } else {
            activityHistory.push(`${this.name} starts eating a delicious meal. 🍕🍎`);
            }

            const carouselItems = document.querySelectorAll(".carousel-track > .carousel-item");

            if(carouselItems.length > this.index){
                const hero = carouselItems[this.index] as HTMLElement
                hero.style.backgroundImage = `url("/assets/img/characters/8bit/${this.character}-eating.png")`;

                if (this.imageResetTimeout !== null) {
                    clearTimeout(this.imageResetTimeout);
                    this.imageResetTimeout = null;
                }

                this.imageResetTimeout = setTimeout(() => {
                    if (!this.dead) {
                        hero.style.backgroundImage = `url("/assets/img/characters/8bit/${this.character}.png")`;
                    }
                    this.imageResetTimeout = null;
                }, 3000);
            }; 
            
            this.MinMaxStats();
            this.checkIfDead();
            this.updateBars();
            
        }
    }

    private startLoop(): void {
        let time = this.mode === 0 ? 10000 : this.mode === 1 ? 5000 : 1000;

        this.intervalId = setInterval(() => {
            this.updateStats();
        }, time)
    }

    private updateStats(): void {
        if(!this.dead){
            this.energy -= 15;
            this.fullness -= 15;
            this.happiness -= 15;

            this.MinMaxStats();
            this.checkIfDead();
            this.updateBars();
        }
    }

    private updateBars(): void {
        const smallMenuHero: HTMLImageElement | null = document.querySelector(`.smallHeroMenuCont > .${this.character}`);

        if(this.energy <  35 || this.fullness <  35 || this.happiness <  35 ){
            smallMenuHero?.classList.add("low");
        }else{
            smallMenuHero?.classList.remove("low");
        }
        
        if (Game.currentHeroIndex === this.index) {

            Game.updateEnergy(this.energy);
            Game.updateFullness(this.fullness);
            Game.updateHappiness(this.happiness);
        }

    }

    private checkIfDead(): void {
        if (this.energy === 0 || this.fullness === 0 || this.happiness === 0){
            this.dying();
        }
    }

    private MinMaxStats(): void {
        this.energy = Math.max(0, Math.min(this.energy, 100));
        this.fullness = Math.max(0, Math.min(this.fullness, 100));
        this.happiness = Math.max(0, Math.min(this.happiness, 100));
    }

    private dying(): void {
        this.dead = true;

        if (this.intervalId !== undefined) {
            clearInterval(this.intervalId);
        }
        if(this.energy === 0){
            activityHistory.push(`${this.name} died from exhaustion! 💤💀`);
            this.happiness = 0;
            this.fullness = 0;
        } else if(this.fullness === 0){
            activityHistory.push(`${this.name} starves to death! 🍽️💀`);
            this.energy = 0;
            this.happiness = 0;
        }else {
            activityHistory.push(`${this.name} died from boredom! 💀⚰️`);
            this.energy = 0;
            this.fullness = 0;
        }
        GameActions.printAction();
        this.updateBars();

        const smallMenuHero: HTMLImageElement | null = document.querySelector(`.smallHeroMenuCont > .${this.character}`);
        smallMenuHero?.classList.add("dead");

        if(smallMenuHero){smallMenuHero.style.backgroundImage = `url("assets/img/characters/8bit/${this.character}-skull.png")`};


        const carouselItems = document.querySelectorAll(".carousel-track > .carousel-item");

        if(carouselItems.length > this.index){
            const hero = carouselItems[this.index] as HTMLElement
            hero.style.backgroundImage = `url("/assets/img/characters/8bit/${this.character}-dead.png")`;
        }; 

    }


}

const createBtn = () => document.createElement("button");
const createDiv = () => document.createElement("div");
const createImg = () => document.createElement("img");
const createP = () => document.createElement("p");

const root:HTMLDivElement | null = document.querySelector("#root")
const startCont:HTMLDivElement | null = document.querySelector(".startCont");
let TamaguchiCount = 0;

class Game {
    static characters: CharacterType[] = ["spartan", "alien", "yoda", "dog"];
    static characterNames: CharacterName[] = ["Spartacus", "E.T.", "Yoda", "Ebba Green"];
    static currentLevelIndex: number = 0;
    static currentCharacterIndex: number = 0;
    static activeCharacters: CharacterType[] = []
    static heroInstances: Tamaguchi[] = [];
    static selectedCharacterIndex: number = 0;
    static currentHeroIndex: number = 0;
    static currentAudio: HTMLAudioElement | null = null;
    static klickSfx = new Audio("assets/music/klick.wav");
        


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
        
        
        
        startCont === null || startCont === void 0 ? void 0 : startCont.append(fullController);
    }

    static removeAllButtonFunction() {
        document.querySelectorAll("button").forEach(btn => {
            btn.onclick = null;
          });
    }

    static changeMode(direction: number) {
        Game.currentLevelIndex += direction;
        Game.klickSfx.play();
        if(Game.currentLevelIndex < 0){
            Game.currentLevelIndex = 2;
        } else if (Game.currentLevelIndex >= 3){
            Game.currentLevelIndex = 0;
        }

        const selectionDivLeft = document.querySelector(".selectionDivLeft");
        const selectionDivRight = document.querySelector(".selectionDivRight");
        const modeLabel:HTMLParagraphElement | null = document.querySelector(".mode-label");
        const body = document.querySelector("body");

        if (selectionDivLeft && selectionDivRight && modeLabel && body){
            if(Game.currentLevelIndex === 0){
                selectionDivLeft.className = "selectionDivLeft";
                selectionDivRight.className = "selectionDivRight";
                modeLabel.className = "mode-label";
                modeLabel.innerText = "Easy"
                body.className = "";
            }  else if (Game.currentLevelIndex === 1){
                selectionDivLeft.className = "selectionDivLeft medium";
                selectionDivRight.className = "selectionDivRight medium";
                modeLabel.className = "mode-label medium";
                body.className = "medium";
                modeLabel.innerText = "Normal"
            } else if(Game.currentLevelIndex === 2){
                selectionDivLeft.className = "selectionDivLeft hard";
                selectionDivRight.className = "selectionDivRight hard";
                modeLabel.className = "mode-label hard";
                body.className = "hard";
                modeLabel.innerText = "Hardcore"
            }
        }
    }

    static changeCharacter(direction: number) {
        Game.klickSfx.play();
        const track = document.querySelector(".carousel-track") as HTMLDivElement;
        const itemWidth = 380;
        const totalItems = Game.characterNames.length;
        if (!track) return;

        Game.currentCharacterIndex += direction;
        Game.selectedCharacterIndex = (Game.currentCharacterIndex - 1 + Game.characterNames.length) % Game.characterNames.length;
        let heroName: HTMLHeadingElement | null = document.querySelector(".heroName")
        let nameIndex = Game.currentCharacterIndex - 1;

        if(Game.currentCharacterIndex === 0){
            nameIndex = Game.characterNames.length - 1;
        } else if (Game.currentCharacterIndex === Game.characterNames.length + 1){
            nameIndex = 0;
        }
        if(heroName){
                heroName.innerText = `${Game.characterNames[nameIndex]}`
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

    static createCharacterItem(character: CharacterName): HTMLDivElement {
        const item = createDiv();
        const nameClass = character.replaceAll(" ", "-").replaceAll(".", "");
        item.classList.add("carousel-item", nameClass);
        return item;
    }

    static generateHeroSelection() {
        startCont && (startCont.innerHTML = "");
        Game.klickSfx.play();
        Game.generateSNESControl();

        const section_8bit = document.createElement("section");
        section_8bit.classList.add("section_8bit")

        const windowCont = createDiv();
        windowCont.classList.add("windowCont", "wrapper", "carousel");

        const glass = createImg();
        glass.src = "../assets/img/glass.svg"
        windowCont.append(glass);

        const title = document.createElement("h2");
        title.classList.add("titleHeroSelection");
        title.innerText = "Hero selection";

        const heroNameCont = createDiv();
        heroNameCont.classList.add("heroNameCont");

        const heroName = document.createElement("h2");
        heroName.innerText = "Spartacus"
        heroName.classList.add("heroName");
        heroNameCont.append(heroName)

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


        

        const prevBtn:HTMLButtonElement | null = document.querySelector(".leftBtn");
        const nextBtn:HTMLButtonElement | null = document.querySelector(".rightBtn");
        prevBtn && (prevBtn.onclick = () => Game.changeCharacter(-1))
        nextBtn && (nextBtn.onclick = () => Game.changeCharacter(1))

        const startBtn:HTMLButtonElement | null = document.querySelector(".startBtn");
        const selectBtn:HTMLButtonElement | null = document.querySelector(".selectBtn");
        startBtn && (startBtn.onclick = () => {Game.countdown(3, Game.generateIngameContent)}) 
        selectBtn && (selectBtn.onclick = () => Game.countdown(3, Game.generateIngameContent)) 

        
        const startContent = document.querySelector(".startCont")
        startContent?.prepend(heroNameCont, section_8bit);
    }

    static countdown(startNmbr: number, runFunction: () => void) {
        const startCont = document.querySelector(".startCont") as HTMLDivElement;
        startCont && (startCont.innerHTML = "");
        Game.klickSfx.play();
        let count = startNmbr;
        let countdownNmbr = document.createElement("h1");
        countdownNmbr.classList.add("countdownNmbr")
        countdownNmbr.innerText = `${count}`;

        startCont.append(countdownNmbr);
        Game.generateSNESControl();

        const interval = setInterval(() => {
            Game.klickSfx.play();
            count--;
            if(count === 0){
                countdownNmbr.innerText = `START`;
            }else if(count < 0){
                clearInterval(interval);
                runFunction();
            }else{
                countdownNmbr.innerText = `${count}`;
            }

            
        }, 1000);
    }
    static generateHeroBox() {
        
        const section_8bit = document.createElement("section");
        section_8bit.classList.add("section_8bit")

        const levelSelectionCon = createDiv();
        levelSelectionCon.classList.add("wrapper", "windowCont");
        const glass = createImg();
        glass.src = "../assets/img/glass.svg"
        levelSelectionCon.append(glass);
        section_8bit.append(levelSelectionCon)
        return(section_8bit)

    }
    static generateTextbox() {

        const textbox = createDiv();
        textbox.classList.add("textbox");
        const textUl = document.createElement("ul");
        textUl.classList.add("textUl");
        textbox.append(textUl);
        return textbox;
    }

    static updateEnergy(percentage:number) {
        const container: HTMLDivElement | null = document.querySelector(".statsCont");
        if(percentage === 0){
            if(container){container.style.visibility = "hidden"};
        } else{
            if(container){container.style.visibility = "visible"};
        }
        const energyFill: HTMLDivElement | null = document.querySelector(".energyFill");
        energyFill && (energyFill.style.width = `${percentage}%`);
    }

    static updateHappiness(percentage:number) {
        const container: HTMLDivElement | null = document.querySelector(".statsCont");
        if(percentage === 0){
            if(container){container.style.visibility = "hidden"};
        } else{
            if(container){container.style.visibility = "visible"};
        }
        const happinessFill: HTMLDivElement | null = document.querySelector(".happinessFill");
        happinessFill && (happinessFill.style.width = `${percentage}%`);
    }

    static updateFullness(percentage:number) {
        const container: HTMLDivElement | null = document.querySelector(".statsCont");
        if(percentage === 0){
            if(container){container.style.visibility = "hidden"};
        } else{
            if(container){container.style.visibility = "visible"};
        }
        const fullnessFill: HTMLDivElement | null = document.querySelector(".fullnessFill");
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
        energyImg.classList.add("energyImg", "barSymbol")
        energyImg.src = "/assets/icons/stats/new/energy-pointy.svg";
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
        happinessImg.src = "/assets/icons/stats/new/happiness8bit.svg"
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
        fullnessImg.src = "/assets/icons/stats/new/fullness.svg";
        fullnessImg.classList.add("fullnessImg", "barSymbol");
        fullnessImgCont.append(fullnessImg);
        const fullnessBar = createDiv();
        fullnessBar.classList.add("fullnessBar", "bar");
        const fullnessFill = createDiv();
        fullnessFill.classList.add("fullnessFill", "fill");
        fullnessBar.append(fullnessFill);
        fullnessCont.append(fullnessImgCont, fullnessBar);


        statsCont.append(energyCont, happinessCont, fullnessCont)

        return statsCont;
    }


    static generateSmallHeroMenu() {

        const smallHeroMenuCont = createDiv();
        smallHeroMenuCont.classList.add("smallHeroMenuCont");

        Game.characters.forEach(char => {
            const charBtn = createBtn();
            charBtn.classList.add("charBtn", `${char}`)
            charBtn.style.backgroundImage = `url("assets/img/characters/8bit/${char}.png")`;

            charBtn.addEventListener("click",() => {
                const index = Game.characters.indexOf(char);
                const charName = Game.characterNames[index];
                charBtn.classList.add("disabled");
                Game.addNewHero(charName, char)
            })

            if (Game.activeCharacters.includes(char)) {
                charBtn.classList.add("disabled");
            }

            smallHeroMenuCont.append(charBtn);
        });

        return smallHeroMenuCont;
    }

   static addNewHero(heroName:CharacterName, heroType:CharacterType) {
        Game.klickSfx.play();
        const newHero = new Tamaguchi(
            heroName,
            heroType,
            Game.currentLevelIndex
        );
        Game.heroInstances.push(newHero);

        const carouselTrack = document.querySelector(".carousel-track") as HTMLDivElement;
        let Activeheroes = [...Game.heroInstances];


        const carouselItem = createDiv();
        const className = newHero.name.replaceAll(" ", "-").replaceAll(".", "");
        carouselItem.classList.add("carousel-item", `${className}`)
        carouselTrack.append(carouselItem);

        const updateNameAndBars = () => {
            const heroName: HTMLHeadingElement | null = document.querySelector(".heroName");
            heroName && (heroName.innerText = `${Game.heroInstances[Game.currentHeroIndex].name}`);
            Game.updateFullness(Game.heroInstances[Game.currentHeroIndex].fullness);
            Game.updateHappiness(Game.heroInstances[Game.currentHeroIndex].happiness);
            Game.updateEnergy(Game.heroInstances[Game.currentHeroIndex].energy);
        }

        const moveCarousel = (direction:number) =>{
            Game.klickSfx.play();
            Game.currentHeroIndex += direction;
            Game.currentHeroIndex = Math.max(0, Math.min(Game.currentHeroIndex, Activeheroes.length - 1));
            carouselTrack.style.transform = `translateX(-${Game.currentHeroIndex * 380}px)`;
            updateNameAndBars()
        }

        Game.currentHeroIndex = (Game.currentHeroIndex, Activeheroes.length - 1);
        carouselTrack.style.transform = `translateX(-${Game.currentHeroIndex * 380}px)`;
        updateNameAndBars()


        Game.removeAllButtonFunction();
        const rightBtn = document.querySelector(".rightBtn") as HTMLButtonElement | null;
        if (rightBtn) {
            rightBtn.onclick = () => moveCarousel(1);
        }
        const leftBtn = document.querySelector(".leftBtn") as HTMLButtonElement | null;
        if (leftBtn) {
            leftBtn.onclick = () => moveCarousel(-1);
        }

       
    }   
      
    static generateIngameContent() {

        const startCont = document.querySelector(".startCont");
        if (startCont) startCont.innerHTML = "";
        const selectedName = Game.characterNames[Game.selectedCharacterIndex];
        const selectedType = Game.characters[Game.selectedCharacterIndex];
        Game.klickSfx.play();
        


        if (Game.currentAudio) {
            Game.currentAudio.pause();
            Game.currentAudio.currentTime = 0;
        }

        const audio = new Audio("assets/music/ingame.wav");
        audio.play();
        audio.loop = true;
        audio.volume = 0.2;
        Game.currentAudio = audio;

        Game.activeCharacters.push(selectedType);

        Game.generateSNESControl();

       
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

        const newHero = new Tamaguchi(
            selectedName,
            selectedType,
            Game.currentLevelIndex
        );
        Game.heroInstances.push(newHero);
    
        const carouselItem = createDiv();
        const className = newHero.name.replaceAll(" ", "-").replaceAll(".", "");
        carouselItem.classList.add("carousel-item", `${className}`)
        carouselTrack.append(carouselItem);

        document.querySelector(".yBtn")?.addEventListener("click", GameActions.eat);
        document.querySelector(".aBtn")?.addEventListener("click", GameActions.play);
        document.querySelector(".bBtn")?.addEventListener("click", GameActions.nap);

      }

    static generateLevelSelection() {
        Game.klickSfx.volume = 0.3;
        Game.klickSfx.play();
        Game.removeAllButtonFunction();
        document.querySelector(".startAnimController")?.classList.remove("startAnimController");
        const audio = new Audio("assets/music/menu2.wav");
        audio.volume = 0;
        audio.play();
        let volume = 0;
        const fadeIn = setInterval(() => {
          volume += 0.01;
          if (volume >= 0.3) {
            audio.volume = 0.3;
            clearInterval(fadeIn);
          } else {
            audio.volume = volume;
          }
        }, 100);
        

        audio.loop = true;
        Game.currentAudio = audio;

        document.querySelector("h1")?.remove();
      
        const section_8bit = Game.generateHeroBox();
        const level = document.createElement("h2");
        level.classList.add("level");
        level.innerText = "Press START to select Difficulty"
        const mode = document.createElement("h2");
        mode.classList.add("mode");
        mode.innerHTML = `Mode: <span class="mode-label">Easy</span>`;

        const selectionDivRight = createDiv();
        selectionDivRight.classList.add("selectionDivRight");
        const selectionDivLeft = createDiv();
        selectionDivLeft.classList.add("selectionDivLeft");

        const startContent = document.querySelector(".startCont")
        startContent?.prepend(level, section_8bit);
        const levelSelectionCon:HTMLDivElement | null = document.querySelector(".windowCont");
        levelSelectionCon?.classList.add("levelSelectionCon")
        levelSelectionCon?.append(selectionDivLeft, selectionDivRight);
        levelSelectionCon && (section_8bit.append(levelSelectionCon, mode));

        const prevBtn:HTMLButtonElement | null = document.querySelector(".leftBtn");
        const nextBtn:HTMLButtonElement | null = document.querySelector(".rightBtn");
        prevBtn && (prevBtn.onclick = () => Game.changeMode(-1))
        nextBtn && (nextBtn.onclick = () => Game.changeMode(1))

        const startBtn:HTMLButtonElement | null = document.querySelector(".startBtn");
        startBtn && (startBtn.onclick = Game.generateHeroSelection) 
    }
}

class GameActions {
    static eat() {
        Game.heroInstances[Game.currentHeroIndex].eat();
        GameActions.printAction();
    };
    static nap() {
        Game.heroInstances[Game.currentHeroIndex].nap();
        GameActions.printAction();
    };
    static play() {
        Game.heroInstances[Game.currentHeroIndex].play();
        GameActions.printAction();
    }
    static printAction() {
        const textUl = document.querySelector(".textUl");
        const textbox = document.querySelector(".textbox");

        activityHistory.forEach(message => {
            const li = document.createElement("li");
            li.innerText = message;
            textUl?.append(li);
        })
        activityHistory = [];

        if (textbox) {
            textbox.scrollTop = textbox.scrollHeight;
        }
    }
}

let activityHistory: string[] = [];


const generateBtn = document.querySelector("#generateTamaguchi");
