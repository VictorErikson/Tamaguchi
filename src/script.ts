type AnimalType = "hedgehog" | "giraffe" | "yoda" | "dog";
type AnimalName = "Hedge the hedgehog" | "Gisela" | "Yoda" | "Ebba Green";


class Tamaguchi {
    name: string;
    animalType: AnimalType;
    energy: number;
    fullness: number;
    happiness: number;
    
    constructor(name: string, animalType: AnimalType){
        this.name = name;
        this.animalType = animalType;
        this.energy = 50;
        this.fullness = 50;
        this.happiness = 50;

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
        
        activityHistory.push(`${this.name} starts playing`);
    }
    
    eat(){
        this.fullness += 30;
        this.happiness += 5;
        this.energy -= 15;

        activityHistory.push(`${this.name} starts eating, yummy!`);
    }

    private startLoop(): void {
        setInterval(() => {
            this.updateStats()
        }, 10000)
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
    static characters : AnimalType[] = ["hedgehog", "giraffe", "yoda", "dog"];
    static characterNames: AnimalName[] = ["Hedge the hedgehog", "Gisela", "Yoda", "Ebba Green"];
    static currentCharacterIndex = 0;

    static generateStartBtn(){
        const generateBtn = createBtn();
        generateBtn.innerText = "Generate your first Tamaguchi!"
        generateBtn.classList.add("btn", "startBtn")
        generateBtn.addEventListener("click", Game.generateMenu)
        
        root?.append(generateBtn)
    }

    static generateMenu(){
        if (!root) return;
        root.innerHTML = "";

        const tamContainer = createDiv();
        tamContainer.classList.add("tamContainer");

        const chooseBtn = createBtn();
        chooseBtn.innerText = "Choose Hedge the hedgehog!";
        chooseBtn.classList.add("btn", "characterSelection");
        chooseBtn.addEventListener("click", () => Game.generateTam(Game.characterNames[Game.currentCharacterIndex], Game.characters[Game.currentCharacterIndex]));

        root?.append(tamContainer, chooseBtn)

        const btnNext = createBtn();
        const btnNextIcon = createImg();
        btnNextIcon.src = `../assets/icons/arrow_forward.svg`;
        btnNext.classList.add("btnNext");
        btnNext.append(btnNextIcon);
        btnNext.addEventListener("click", () => Game.changeCharacter(1, tam, char))
        
        const btnPrev = createBtn();
        const btnPrevIcon = createImg();
        btnPrevIcon.src = `../assets/icons/arrow_back.svg`
        btnPrev.classList.add("btnPrev");
        btnPrev.append(btnPrevIcon);
        btnPrev.addEventListener("click", () => Game.changeCharacter(-1, tam, char))

        const characterContainer = createDiv();
        characterContainer.classList.add("characterContainer");

        const tam = createImg();
        tam.src = `../assets/img/tam${Game.currentCharacterIndex + 1}.svg`;
        tam.classList.add("tam");

        let fileFormat = Game.currentCharacterIndex === 1 ? "webp" : "png";

        const char = createImg();
        char.src = `../assets/img/characters/char${Game.currentCharacterIndex + 1}.${fileFormat}`
        char.classList.add("char");


        characterContainer.append(tam, char)
        tamContainer.append(btnPrev, characterContainer, btnNext);
    }

    static changeCharacter(direction: number, tam: HTMLImageElement, char: HTMLImageElement){
        Game.currentCharacterIndex += direction;

        
        
        
        if(Game.currentCharacterIndex < 0){
            Game.currentCharacterIndex = Game.characters.length -1;
        } else if (Game.currentCharacterIndex >= Game.characters.length){
            Game.currentCharacterIndex = 0;
        }

        const fileFormat = Game.currentCharacterIndex === 1 ? "webp" : "png";
        const newCharSrc = `../assets/img/characters/char${Game.currentCharacterIndex + 1}.${fileFormat}`;
        const newTamSrc = `../assets/img/tam${Game.currentCharacterIndex + 1}.svg`;

        const newChar = new Image();
        const newTam = new Image();

        let loaded = 0;

        const onLoad = () => {
            loaded++;

            if (loaded === 2) {

                char.src = newChar.src;
                tam.src = newTam.src;

                Game.currentCharacterIndex === 2 
                    ? char.classList.add("yoda") 
                    : char.classList.remove("yoda");
                
                const characterSelection = document.querySelector(".characterSelection") as HTMLButtonElement;
                characterSelection && (characterSelection.innerText = `Choose ${Game.characterNames[Game.currentCharacterIndex]}!`);
            }
        }

        newChar.onload = onLoad;
        newTam.onload = onLoad;

        newChar.src = newCharSrc;
        newTam.src = newTamSrc;
    };


    static generateTam(animalName:AnimalName, animalType: AnimalType){
        TamaguchiCount++;
        const tam = new Tamaguchi (animalName = animalName, animalType = animalType);
        if (!root) return;
        root.innerHTML = "";

        const characterContainer = createDiv();
        characterContainer.classList.add("characterContainer");

        const tamImg = createImg();
        tamImg.src = `../assets/img/tam${Game.currentCharacterIndex + 1}.svg`;
        tamImg.classList.add("tam");

        let fileFormat = Game.currentCharacterIndex === 1 ? "webp" : "png";

        const char = createImg();
        char.src = `../assets/img/characters/char${Game.currentCharacterIndex + 1}.${fileFormat}`
        char.classList.add("char");


        Game.currentCharacterIndex === 2 
            ? char.classList.add("yoda") 
            : char.classList.remove("yoda");

        
        const napBtn = createBtn();
        napBtn.classList.add("action", "napBtn");
        const playBtn = createBtn();
        playBtn.classList.add("action","playBtn");
        const eatBtn = createBtn();
        eatBtn.classList.add("action","eatBtn");

        const btnNapIcon = createImg();
        btnNapIcon.src = `../assets/icons/moon.svg`;
        btnNapIcon.classList.add("btnNapIcon");
        napBtn.append(btnNapIcon);
        napBtn.addEventListener("click", () => (tam.nap))
       
        const btnPlayIcon = createImg();
        btnPlayIcon.src = `../assets/icons/tennis.svg`;
        btnPlayIcon.classList.add("btnPlayIcon");
        playBtn.append(btnPlayIcon);
        playBtn.addEventListener("click", () => (tam.play))
        
        const btnEatIcon = createImg();
        btnEatIcon.src = `../assets/icons/fork.svg`;
        btnEatIcon.classList.add("btnEatIcon");
        eatBtn.append(btnEatIcon);
        eatBtn.addEventListener("click", () => (tam.eat))
        
        const controlBtnContainer = createDiv();
        controlBtnContainer.classList.add("controlBtnContainer");
        controlBtnContainer.append(napBtn, playBtn, eatBtn);

        const tamContainer = createDiv();
        tamContainer.classList.add("tamContainer");

        characterContainer.append(tamImg, char, controlBtnContainer);
        tamContainer.append(characterContainer);
        root.append(tamContainer);
        // console.log(tam);
    }
}

let activityHistory: string[] = [];

Game.generateStartBtn();

const generateBtn = document.querySelector("#generateTamaguchi");
