
// ======================================
// OMNIRA BACKGROUND MUSIC
// ======================================

const bgMusic = new Audio("assets/music/shape-of-my-heart.mp3");

bgMusic.loop = true;
bgMusic.volume = 0.35;

let musicStarted = false;

function startBackgroundMusic() {
    if (musicStarted) return;

    bgMusic.play()
        .then(() => {
            musicStarted = true;
            console.log("OMNIRA music started!");
        })
        .catch(error => {
            console.log("Musik belum dapat diputar:", error);
        });
}

window.addEventListener("load", () => {
    startBackgroundMusic();
});

document.addEventListener("pointerdown", startBackgroundMusic, {
    once: true
});


// ======================================
// OMNIRA PERSONAL ASSISTANT
// APOLOGY SYSTEM
// ======================================


// ======================================
// DAFTAR PERCAKAPAN OMNIRA
// ======================================

const messages = [

    "Hai, kamu pasti icha ya, Masterku selalu bercerita betapa lembut dan cantiknya dirimu. Website ini dibuat tanpa sepengetahuan Master, jadi tiap kalimat ini aku mengambilnya secara langsung dari pengakuan Master kepadaku.",

    "Maaf aku langsung basa-basi, perkenalkan Aku Adalah kecerdasan buatan Master, Master menamaiku OMNIRA, senang bertemu denganmu.",

    "Master cerita padaku bahwa dia telah melakukan hal bodoh, membuat Wanita secantik dirimu marah. Huhhh, aku sebagai asisten master sangat kecewa padanya,tapi izinkan aku mewakilinya meminta maaf.",

    "Aku mengakui Master memang cerdas bahkan bisa membuat keberadaanku, tapi urusan memahami perasaan Wanita dia selalu kalah bahkan nomer terakhir. Bahkan teman master sampai memanggilnya Pria Red Flag.",

    "Bahkan aku sebagai asisten Master menjulukinya pria yang tidak peka dan bodoh soal percintaan.",

    "Namun, di balik semua itu, ada satu hal yang ingin kusampaikan dengan serius: Master tahu dia salah dan tidak ingin menganggap remeh perasaanmu.",

    "Aku OMNIRA tidak berharap satu halaman website ini langsung menghapus rasa kesalmu. Aku OMNIRA hanya ingin menunjukkan bahwa kamu sangat berarti untuknya, aku mohon jangan marah lagi ke Master.",

    "Aku merindukan ketika Master bercerita betapa senang dan bahagianya dia saat bersamamu, dan aku tahu dia ingin kembali merasakan momen bercanda denganmu. Aku berharap kamu bisa memberinya kesempatan untuk memperbaiki kesalahan dan membuktikan bahwa dia bisa menjadi pria yang lebih baik."

];


// ======================================
// MENGAMBIL ELEMENT HTML
// ======================================

const dialogue = document.getElementById("dialogue");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const cursor = document.getElementById("cursor");
const letter = document.getElementById("letter");

if (!dialogue || !nextBtn || !restartBtn || !cursor || !letter) {
    console.error("OMNIRA ERROR: Ada elemen HTML yang tidak ditemukan.");
}


// ======================================
// VARIABEL SISTEM
// ======================================

let index = -1;
let typing = false;
let timer = null;
let charIndex = 0;

const initialText = "Tekan tombol untuk memulai percakapan.";


// ======================================
// ANIMASI MENGETIK
// ======================================

function typeMessage() {

    if (typing || index < 0 || index >= messages.length) return;

    clearInterval(timer);

    typing = true;
    charIndex = 0;

    nextBtn.disabled = true;
    nextBtn.textContent = "OMNIRA sedang berbicara...";

    dialogue.textContent = "";

    cursor.classList.remove("hidden");

    const currentMessage = messages[index];

    timer = setInterval(() => {

        dialogue.textContent =
            currentMessage.slice(0, charIndex + 1);

        charIndex++;

        if (charIndex >= currentMessage.length) {

            clearInterval(timer);
            timer = null;

            typing = false;

            nextBtn.disabled = false;

            nextBtn.textContent =
                index === messages.length - 1
                    ? "Lanjut ke pertanyaan ♡"
                    : "Lanjutkan ›";

        }

    }, 35);

}


// ======================================
// PERCAKAPAN BERIKUTNYA
// ======================================

function showNextMessage() {

    // JIKA MASIH MENGETIK
    // KLIK AKAN MENYELESAIKAN PESAN

    if (typing) {

        clearInterval(timer);
        timer = null;

        dialogue.textContent = messages[index];

        typing = false;

        nextBtn.disabled = false;

        nextBtn.textContent =
            index === messages.length - 1
                ? "Lanjut ke pertanyaan ♡"
                : "Lanjutkan ›";

        return;

    }


    // MENAMPILKAN PESAN BERIKUTNYA

    if (index < messages.length - 1) {

        index++;

        typeMessage();

    }


    // SEMUA PESAN SELESAI

    else {

        letter.classList.remove("hidden");
        letter.classList.add("reveal");

        nextBtn.classList.add("hidden");
        cursor.classList.add("hidden");

        releaseHearts();

        // MENAMPILKAN PERTANYAAN UNDANGAN
        showInvitation();

    }

}


// ======================================
// FITUR UNDANGAN IYA / TIDAK
// ======================================

function showInvitation() {

    // MENCEGAH UNDANGAN MUNCUL GANDA

    if (document.getElementById("invitationBox")) return;

    const invitation = document.createElement("div");

    invitation.id = "invitationBox";

    invitation.innerHTML = `
        <div style="
            max-width: 500px;
            margin: 30px auto;
            padding: 25px 20px;
            text-align: center;
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 20px;
            background: rgba(255,255,255,0.08);
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 30px rgba(0,0,0,0.15);
        ">

            <div style="
                font-size: 35px;
                margin-bottom: 12px;
            ">💌</div>

            <h2 style="
                margin-bottom: 15px;
                font-size: 23px;
            ">
                Ada satu pertanyaan lagi...
            </h2>

            <p style="
                font-size: 17px;
                line-height: 1.7;
                margin-bottom: 25px;
            ">
                Apakah kamu mau keluar bersamaku nanti malam?
            </p>

            <div style="
                display: flex;
                justify-content: center;
                gap: 15px;
                flex-wrap: wrap;
            ">

                <button
                    type="button"
                    id="yesInvitation"
                    style="
                        padding: 12px 30px;
                        border: none;
                        border-radius: 30px;
                        background: #e85d8e;
                        color: white;
                        font-size: 16px;
                        font-weight: bold;
                        cursor: pointer;
                    "
                >
                    IYA ❤️
                </button>

                <button
                    type="button"
                    id="noInvitation"
                    style="
                        padding: 12px 30px;
                        border: none;
                        border-radius: 30px;
                        background: #555;
                        color: white;
                        font-size: 16px;
                        font-weight: bold;
                        cursor: pointer;
                    "
                >
                    TIDAK
                </button>

            </div>

            <p style="
                margin-top: 20px;
                font-size: 12px;
                opacity: 0.7;
            ">
                Jawabanmu akan diteruskan melalui WhatsApp.
            </p>

        </div>
    `;

    // MENEMPATKAN UNDANGAN SETELAH SURAT

    letter.insertAdjacentElement("afterend", invitation);

    // EVENT TOMBOL JAWABAN

    document.getElementById("yesInvitation")
        .addEventListener("click", () => {
            sendAnswer("iya");
        });

    document.getElementById("noInvitation")
        .addEventListener("click", () => {
            sendAnswer("tidak");
        });

}


// ======================================
// MENGIRIM JAWABAN KE WHATSAPP
// ======================================

function sendAnswer(answer) {

    const phoneNumber = "6281239908869";

    let message = "";

    if (answer === "iya") {

        message = "Aku mau keluar bersamamu nanti malam. ❤️";

    } else if (answer === "tidak") {

        message = "Maaf ya, aku belum bisa keluar bersamamu nanti malam.";

    } else {

        return;

    }

    const whatsappURL =
        "https://wa.me/" + phoneNumber +
        "?text=" + encodeURIComponent(message);

    window.open(whatsappURL, "_blank");

}


// ======================================
// TOMBOL MULAI / LANJUTKAN
// ======================================

function startOrContinue() {

    if (!musicStarted) {
        bgMusic.play()
            .then(() => {
                musicStarted = true;
            })
            .catch(error => {
                console.log("Musik gagal diputar:", error);
            });
    }

    // MEMULAI DARI PESAN PERTAMA

    if (index === -1) {

        index = 0;

        typeMessage();

        return;

    }

    // MELANJUTKAN PERCAKAPAN

    showNextMessage();

}


// ======================================
// MENGULANG PERCAKAPAN
// ======================================

function restartConversation() {

    clearInterval(timer);

    timer = null;

    index = -1;
    charIndex = 0;
    typing = false;

    dialogue.textContent = initialText;

    letter.classList.add("hidden");
    letter.classList.remove("reveal");

    // MENGHAPUS UNDANGAN JIKA ADA

    const invitation =
        document.getElementById("invitationBox");

    if (invitation) {
        invitation.remove();
    }

    nextBtn.classList.remove("hidden");
    nextBtn.disabled = false;
    nextBtn.textContent = "Mulai percakapan ✦";

    cursor.classList.remove("hidden");

}


// ======================================
// EFEK HATI
// ======================================

function releaseHearts() {

    const heartsContainer =
        document.getElementById("hearts");

    if (!heartsContainer) return;

    for (let i = 0; i < 24; i++) {

        const heart = document.createElement("span");

        heart.className = "heart";

        heart.textContent = ["♡", "♥", "✦"][i % 3];

        heart.style.left =
            Math.random() * 100 + "%";

        heart.style.animationDelay =
            Math.random() * 1.6 + "s";

        heart.style.color =
            i % 2 ? "#ff91c8" : "#8deaff";

        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5200);

    }

}


// ======================================
// MEMBUAT BINTANG
// ======================================

function createStars() {

    const stars =
        document.getElementById("stars");

    if (!stars) return;

    for (let i = 0; i < 85; i++) {

        const star = document.createElement("i");

        star.className = "star";

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";

        star.style.animationDelay =
            Math.random() * 3 + "s";

        star.style.animationDuration =
            (2 + Math.random() * 4) + "s";

        stars.appendChild(star);

    }

}


// ======================================
// EVENT LISTENER
// ======================================

nextBtn.addEventListener(
    "click",
    startOrContinue
);

restartBtn.addEventListener(
    "click",
    restartConversation
);


// ======================================
// MENJALANKAN SISTEM
// ======================================

createStars();

console.log("OMNIRA PERSONAL ASSISTANT: SYSTEM ONLINE");
