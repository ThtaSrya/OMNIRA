
// ======================================
// OMNIRA BACKGROUND MUSIC
// ======================================

const bgMusic = new Audio("assets/music/shape-of-my-heart.mp3");

bgMusic.loop = true;
bgMusic.volume = 0.35;

let musicStarted = false;

// Fungsi memulai musik
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

// Coba autoplay ketika website dibuka
window.addEventListener("load", () => {
    startBackgroundMusic();
});

// Satu kali interaksi pengguna di halaman
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

    "Hai, kamu pasti icha ya, masterku selalu bercerita betapa lembut dan cantiknya dirimu. Website ini dibuat tanpa sepengetahuan Master, jadi tiap kalimat ini aku mengambilnya secara langsung dari pengakuan Master kepadaku.",

    "Maaf aku langsung basa-basi, perkenalkan Aku Adalah kecerdasan buatan Master, Master menamaiku OMNIRA, senang bertemu denganmu.",

    "Master cerita padaku bahwa dia telah melakukan hal bodoh, membuat Wanita secantik dirimu marah. Huhhh, aku sebagai asisten master sangat kecewa padanya,tapi izinkan aku mewakilinya meminta maaf.",

    "Aku mengakui Master memang cerdas bahkan bisa membuat keberadaanku, tapi urusan memahami perasaan Wanita dia selalu kalah bahkan nomer terakhir. Bahkan teman master sampai memanggilnya Pria Red Flag.",

    "Bahkan aku sebagai asisten Master menjulukinya pria yang tidak peka dan bodoh soal percintaan.",

    "Namun, di balik semua candaan itu, ada satu hal yang ingin kusampaikan dengan serius: Master tahu dia salah dan tidak ingin menganggap remeh perasaanmu.",

    "Aku OMNIRA tidak berharap satu halaman website ini langsung menghapus rasa kesalmu. Dia hanya ingin menunjukkan bahwa kamu berarti, dan bahwa permintaan maaf ini datang dengan niat untuk belajar menjadi lebih baik.",

    "Aku merindukan ketika Master bercerita betapa senang dan bahagianya dia saat bersamamu, dan aku tahu dia ingin kembali merasakan momen bergurau denganmu. Aku berharap kamu bisa memberinya kesempatan untuk memperbaiki kesalahan dan membuktikan bahwa dia bisa menjadi pria yang lebih baik."

];


// ======================================
// MENGAMBIL ELEMENT HTML
// ======================================

const dialogue = document.getElementById("dialogue");

const nextBtn = document.getElementById("nextBtn");

const restartBtn = document.getElementById("restartBtn");

const cursor = document.getElementById("cursor");

const letter = document.getElementById("letter");


// ======================================
// VALIDASI ELEMENT HTML
// ======================================

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

        // JIKA PESAN SELESAI

        if (charIndex >= currentMessage.length) {

            clearInterval(timer);

            timer = null;

            typing = false;

            nextBtn.disabled = false;

            nextBtn.textContent =
                index === messages.length - 1
                ? "Baca pesan dari master ♡"
                : "Lanjutkan ›";

        }

    }, 35);

}


// ======================================
// PERCAKAPAN BERIKUTNYA
// ======================================

function showNextMessage() {

    // JIKA MASIH MENGETIK
    // KLIK AKAN MENYELESAIKAN PESAN SAAT INI

    if (typing) {

        clearInterval(timer);

        timer = null;

        dialogue.textContent = messages[index];

        typing = false;

        nextBtn.disabled = false;

        nextBtn.textContent =
            index === messages.length - 1
            ? "Baca pesan dari master ♡"
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

    }

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
