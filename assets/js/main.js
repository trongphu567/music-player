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
      name: "Nevada",
      singer: "Vicetone",
      path: "./assets/music/Nevada.mp3",
      thumb: "./assets/img/Nevada.jpg",
    },
    {
      name: "Song2",
      singer: "Artist2",
      path: "./assets/music/Song2.mp3",
      thumb: "./assets/img/Song2.jpg",
    },
    {
      name: "Song3",
      singer: "Artist3",
      path: "./assets/music/Song3.mp3",
      thumb: "./assets/img/Song3.jpg",
    },
    {
      name: "Song4",
      singer: "Artist4",
      path: "./assets/music/Song4.mp3",
      thumb: "./assets/img/Song4.jpg",
    },
    {
      name: "Song5",
      singer: "Artist5",
      path: "./assets/music/Song5.mp3",
      thumb: "./assets/img/Song5.jpg",
    },
    {
      name: "Song6",
      singer: "Artist6",
      path: "./assets/music/Song6.mp3",
      thumb: "./assets/img/Song6.jpg",
    },
    {
      name: "Song7",
      singer: "Artist7",
      path: "./assets/music/Song7.mp3",
      thumb: "./assets/img/Song7.jpg",
    },
    {
      name: "Song8",
      singer: "Artist8",
      path: "./assets/music/Song8.mp3",
      thumb: "./assets/img/Song8.jpg",
    },
    {
      name: "Song9",
      singer: "Artist9",
      path: "./assets/music/Song9.mp3",
      thumb: "./assets/img/Song9.jpg",
    },
    {
      name: "Song10",
      singer: "Artist10",
      path: "./assets/music/Song10.mp3",
      thumb: "./assets/img/Song10.jpg",
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
