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

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// lay ra div playlist chua danh sach bai hat
const playlist = $(".playlist");

// tao ra 1 fake API chua danh sach bai hat (thong qua object)
const app = {
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
      path: "./assets/music/Taylor-Swift-Black-Space.mp3",
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
    const htmls = this.songs.map((song) => {
      return `
            <div class="song">
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

    // 2. scroll top
    document.onscroll = function () {
        // lay ra vi tri scroll hien tai
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        // tinh toan chieu rong moi cua cd
        const newCdWidth = cdWidth - scrollTop;
        
        // thay doi chieu rong va do trong suot cua cd dua vao newCdWidth
        cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
        cd.style.opacity = (newCdWidth / cdWidth) > 0 ? (newCdWidth / cdWidth) : 0;
    };
  },
  start: function () {
    this.handleEvents();
    this.render();
},
};

app.start();
