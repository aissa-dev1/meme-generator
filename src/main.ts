import { Meme } from "./types/main";

const memesContainer = document.querySelector(".memes")!;
const memeImageInput = document.getElementById("meme_img_input") as HTMLInputElement;
const memeTitleInput = document.getElementById("meme_title_input") as HTMLInputElement;
const memeDiscInput = document.getElementById("meme_disc_input") as HTMLInputElement;
const memeGenerateBtn = document.getElementById("meme_generate_btn")!;

const memesList: Meme[] = JSON.parse(`${localStorage.getItem("memesList")}`) || [];

window.addEventListener("load", () => {
    updateMemeList();
    updateMemeHTMLContent();
});

function updateMemeList(): Meme[] {
    memesContainer.textContent = "";

    memesList.map((meme) => {
        const container = document.createElement("div");
        const memeTitle = document.createElement("p");
        const memeImage = document.createElement("img");
        const memeDisc = document.createElement("p");

        container.classList.add("meme");
        memeTitle.classList.add("meme_title");
        memeDisc.classList.add("meme_disc");

        memeTitle.textContent = meme.title;
        memeDisc.textContent = meme.discription;
        memeImage.src = meme.img;
        memeImage.alt = "meme_image";

        container.addEventListener("click", () => removeMeme(meme.id));

        container.append(memeTitle, memeImage, memeDisc);
        memesContainer.appendChild(container);
    });

    return memesList;
}

function generateMeme(): Meme | false {
    const newMeme: Meme = {
        id: Date.now(),
        img: memeImageInput.value,
        title: memeTitleInput.value,
        discription: memeDiscInput.value,
    };

    if (!memeImageInput.value || !memeTitleInput.value || !memeDiscInput.value) {
        alert("Meme can't be empty !");
        return false;
    }

    memesList.push(newMeme);
    localStorage.setItem("memesList", JSON.stringify(memesList));
    updateMemeList();
    updateMemeHTMLContent();
    memeImageInput.value = "";
    memeTitleInput.value = "";
    memeDiscInput.value = "";

    return newMeme;
}

function removeMeme(id: number): number {
    memesList.map((meme, index) => {
        if (id === meme.id) {
            memesList.splice(index, 1);
        }
    });
    localStorage.setItem("memesList", JSON.stringify(memesList));
    updateMemeList();
    updateMemeHTMLContent();

    return id;
}

function updateMemeHTMLContent(): void {
    if (memesList.length < 1) {
        memesContainer.textContent = "No memes to show !";
        memesContainer.classList.remove("memes");
        memesContainer.classList.add("memes_void");
        return;
    }

    memesContainer.classList.remove("memes_void");
    memesContainer.classList.add("memes");
}

memeGenerateBtn.addEventListener("click", generateMeme);
