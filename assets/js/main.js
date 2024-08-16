/*
    Cac chuc nang can lam voi music player:
    1. render songs
    2. scroll top
    3. play / pause / seek
    4. CD rotate
    5. next / prev
    6. random
    7. next / repeat when ended
    8. active song
    9. scroll active song into view
    10. play song when click
*/

// dinh nghia document
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// lay ra div playlist chua danh sach bai hat
const playlist = $(".playlist");

// lay ra cac thong tin cua bai hat se load len
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");

// lay ra cac controls khi audio dang chay
// player 
const player = $(".player");

// thanh progress tien do bai hat
const progress = $("#progress");

// lay ra nut play / pause
const playBtn = $(".btn-toggle-play");

// nut next / prev
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');

// lay ra nut random
const randomBtn = $('.btn-random');
// lay ra nut repeat
const repeatBtn = $('.btn-repeat');

// tao ra 1 fake API chua danh sach bai hat (thong qua object)
const app = {
    // khoi tao index cua bai hat dau tien
    currentIndex: 0,
    // khoi tao trang thai cua player
    isPlaying: false,
    // khoi tao trang thai cua randomBtn
    isRandom: false,
    // khoi tao trang thai cua repeatBtn
    isRepeat: false,
    songs: [
        {
            name: "Đừng Làm Trái Tim Anh Đau",
            singer: "Sơn Tùng M-TP",
            path: "./assets/music/Son-Tung-M-TP-Dung-Lam-Trai-Tim-Anh-Dau.mp3",
            thumb: "./assets/img/dung-lam-trai-tim-anh-dau.jpg",
        },
        {
            name: "Still With You",
            singer: "Jungkook",
            path: "./assets/music/Jungkook-Still-With-You.mp3",
            thumb: "./assets/img/still-with-you.jpg",
        },
        {
            name: "Blank Space",
            singer: "Taylor Swift",
            path: "./assets/music/Taylor-Swift-Blank-Space.mp3",
            thumb: "./assets/img/blank-space.jpg",
        },
        {
            name: "Từng Quen",
            singer: "Wren Evans",
            path: "./assets/music/Wren-Evans-Tung-Quen.mp3",
            thumb: "./assets/img/tung-quen.jpg",
        },
        {
            name: "This Love",
            singer: "DAVICHI",
            path: "./assets/music/DAVICHI-This-Love.mp3",
            thumb: "./assets/img/this-love.jpg",
        },
        {
            name: "Love Me Like You Do",
            singer: "Ellie Goulding",
            path: "./assets/music/Ellie-Goulding-Love-Me-Like-You-Do.mp3",
            thumb: "./assets/img/love-me-like-you-do.jpg",
        },
        {
            name: "Bạn Đời",
            singer: "Karik ft GDucky",
            path: "./assets/music/Karik-Ban-Doi-ft-GDucky.mp3",
            thumb: "./assets/img/ban-doi.jpg",
        },
        {
            name: "Ánh Sao Và Bầu Trời",
            singer: "T.R.I x Cá",
            path: "./assets/music/TRI-Anh-Sao-Va-Bau-Troi.mp3",
            thumb: "./assets/img/anh-sao-va-bau-troi.jpg",
        },
        {
            name: "We Don't Talk Anymore",
            singer: "Charlie Puth ft Selena Gomez",
            path: "./assets/music/Charlie-Puth-We-Don-t-Talk-Anymore.mp3",
            thumb: "./assets/img/we-dont-talk-anymore.jpg",
        },
        {
            name: "Lily",
            singer: "Alan Walker, K-391 & Emelie Hollow",
            path: "./assets/music/Alan-Walker-Lily.mp3",
            thumb: "./assets/img/lily.jpg",
        },
    ],

    // 1. render songs
    render: function () {
        // tu object app tro den songs va lay ra cac thuoc tinh cua tung bai hat
        const htmls = this.songs.map((song, index) => {
        return `
                <div class="song ${index === this.currentIndex ? 'active' : ''}">
                    <div class="thumb" style="background-image: url('${song.thumb}')"></div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>`;
        });

        // chuyen mang htmls thanh chuoi va gan vao playlist
        playlist.innerHTML = htmls.join("");
    },

    // tao ra 1 key de xu ly tat ca su kien
    handleEvents: function () {
        const cd = $(".cd");
        const cdWidth = cd.offsetWidth;

        // 4. CD rotate
        // xu ly Cd khi audio dang chay
        // quay -> dang phat, dung -> ko phat
        const cdThumbAnimate = cdThumb.animate(
            [
                {transform: "rotate(360deg)"}
            ],
            {
                duration: 10000,    // 10s
                iterations: Infinity    // lap vo han lan
            }
        );

        cdThumbAnimate.pause();

        // 2. scroll top
        document.onscroll = function () {
        // lay ra vi tri scroll hien tai
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        // tinh toan chieu rong moi cua cd
        const newCdWidth = cdWidth - scrollTop;

        // thay doi chieu rong va do trong suot cua cd dua vao newCdWidth
        cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
        cd.style.opacity = newCdWidth / cdWidth > 0 ? newCdWidth / cdWidth : 0;

        
        };

        // 3. play / pause / seek
        // lang nghe su kien click vao nut play / pause
        playBtn.onclick = function() {
            if (app.isPlaying) {
                audio.pause();
            }
            else {
                audio.play();
            }
        }

        // khi audio dang play
        audio.onplay = function() {
            // cap nhat trang thai cua player khi audio dang play
            app.isPlaying = true;
            // khi audio dang play -> quay cd
            cdThumbAnimate.play();
            player.classList.add("playing");
        }

        // khi audio dang pause
        audio.onpause = function() {
            // cap nhat trang thai cua player khi dung audio
            app.isPlaying = false;
            // khi audio dang pause -> dung cd
            cdThumbAnimate.pause();
            player.classList.remove("playing");
        }

        // khi audio dang chay -> cap nhat thanh progress
        audio.ontimeupdate = function() {
            
            const progressPercent = Math.floor((audio.currentTime / audio.duration) * 100);
            progress.value = progressPercent;
        }

        // khi tua bai hat -> lay phan tram vua tua, cap nhat thoi gian cua bai hat
        progress.oninput = function(e) {
            const seekTime = (audio.duration / 100) * e.target.value;
            audio.currentTime = seekTime;
        }

        // 5. next / prev
        // lang nghe su kien click vao nut next
        nextBtn.onclick = function() {
            // neu dang o trang thai random -> random bai hat khac
            if (app.isRandom) {
                app.randomSong();
            }
            else {
                // chuyen bai hat ke tiep
                app.nextSong();
            }
            // khi chuyen bai hat -> play bai hat do
            audio.play();

            // Reset cdThumb animation
            cdThumbAnimate.cancel();
            cdThumbAnimate.play();

            // active song
            app.activeSong();
            


            
        }
        
        // lang nghe su kien click vao nut prev
        prevBtn.onclick = function() {
            // neu dang o trang thai random -> random bai hat khac
            if (app.isRandom) {
                app.randomSong();
            }
            else {
                // chuyen bai hat truoc do
                app.prevSong();

            }
            // khi chuyen bai hat -> play bai hat do
            audio.play();

            // Reset cdThumb animation
            cdThumbAnimate.cancel();
            cdThumbAnimate.play();

            // active song
            app.activeSong();
        }

        // 6. random
        // lang nghe su kien click vao nut random
        randomBtn.onclick = function() {
            app.isRandom = !app.isRandom;
            this.classList.toggle("active", app.isRandom);
            
        }

        // 7. next / repeat when ended
        // lang nghe su kien khi audio ket thuc
        audio.onended = function() {
            if (app.isRepeat) {
                audio.play();
            }
            else {
                nextBtn.click();
            }
        }

        // lang nghe su kien click vao nut repeat
        repeatBtn.onclick = function() {
            app.isRepeat = !app.isRepeat;
            this.classList.toggle("active", app.isRepeat);
        }
    },

    defineProperties: function() {
        Object.defineProperty(this, "currentSong",
            {
                get: function() {
                    return this.songs[this.currentIndex];
                }
            }
        )
    },
    
    // load bai hat hien tai len
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.thumb}')`;
        audio.src = this.currentSong.path;
    },

    // 5. next / prev
    nextSong: function() {
        // tang index len 1
        this.currentIndex++;
        // neu index vuot qua so luong bai hat -> quay lai bai dau tien
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }

        // load bai hat hien tai len
        this.loadCurrentSong();
    },
    
    prevSong: function() {
        // giam index xuong 1
        this.currentIndex--;
        // neu index < 0 -> chuyen den bai hat cuoi cung
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }

        // load bai hat hien tai len
        this.loadCurrentSong();
    },

    // 6. random
    randomSong: function() {
        // muc tieu: random bai hat khac voi bai hat hien tai
        // random ra 1 currentIndex
        let newIndex;
        do {
            // random ra 1 so tu 0 -> so luong bai hat
            newIndex = Math.floor(Math.random() * this.songs.length);
        }
        while (newIndex === this.currentIndex);

        // cap nhat currentIndex moi
        this.currentIndex = newIndex;
        this.loadCurrentSong();
        
    },

    // 8. active song
    activeSong: function() {
        // lay ra danh sach bai hat
        const songs = $$(".song");
        // xoa active cua bai hat hien tai va them vao bai hat moi
        songs.forEach((song, index) => {
            if (index === app.currentIndex) {
                song.classList.add("active");
            }
            else {
                song.classList.remove("active");
            }
        });
    },

    start: function () {
        // dinh nghia cac thuoc tinh cho object app
        this.defineProperties();

        // lang nghe / xu ly cac su kien
        this.handleEvents();

        // tai thong tin bai hat hien tai len UI khi chay ung dung
        this.loadCurrentSong();

        // render danh sach bai hat
        this.render();
    },
};

app.start();

// add them logic han che toi da viec lap lai bai hat khi random
// moi khi random -> luu lai index hoac id cua bai hat hien tai va dua vao mang da phat
// lan luot phat sao cho ko trung lap voi id bai hat trong mang da phat
// khi mang da phat day -> clear mang da phat va bat dau lai tu dau

