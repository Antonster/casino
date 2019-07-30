const startBtn = document.getElementById('start');
const score = document.getElementById('score');
const rate = document.getElementById('rate');
const imagesBlock = document.getElementsByClassName('image');
const imagesArr = [
  './src/img/img1.png',
  './src/img/img2.png',
  './src/img/img3.png',
  './src/img/img4.png',
  './src/img/img5.png',
];
const alertBlock1 = document.getElementById('alert_1');
const alertBlock2 = document.getElementById('alert_2');
const alertBlock3 = document.getElementById('alert_3');
const prizeBlock = document.getElementById('prize');

class CasinoUi {
  constructor(options) {
    this.images = options.images;
    this.score = options.score;
  }

  randomizer() {
    const arr = [];

    for (let i = 0; i < 3; i += 1) {
      arr[i] = Math.floor(Math.random() * this.images);
    }

    return arr;
  }

  updateScore(myRate) {
    const newArr = this.randomizer();
    const filteredArr = Array.from(new Set(newArr));

    if ((myRate <= this.score / 2 && myRate > 0) || myRate === 1) {
      if (filteredArr.length === 1) {
        this.score = this.score + myRate * 2;
        return {
          score: this.score,
          arr: newArr,
          rate: `+${myRate * 2}`,
          color: 'green',
        };
      }
      if (filteredArr.length === 2) {
        this.score = this.score + myRate;
        return {
          score: this.score,
          arr: newArr,
          rate: `+${myRate}`,
          color: 'green',
        };
      }
      this.score = this.score - myRate;
      return {
        score: this.score,
        arr: newArr,
        rate: `-${myRate}`,
        color: 'red',
      };
    }
    if (myRate <= 0) {
      return 0;
    }
    if (myRate > this.score / 2 && myRate <= this.score) {
      return 1;
    }
    return 2;
  }
}

class Dom {
  constructor(options) {
    this.imagesQuantity = options.imagesQuantity;
    this.startButton = options.startButton;
    this.alert1 = options.alert1;
    this.alert2 = options.alert2;
    this.alert3 = options.alert3;
    this.score = options.score;
    this.prize = options.prize;
  }

  imagesRoll(arr) {
    for (let i = 0; i < this.imagesQuantity.length; i += 1) {
      this.imagesQuantity[i].style.transform = 'rotateX(-90deg)';
      setTimeout(() => {
        this.imagesQuantity[i].src = imagesArr[arr[i]];
        this.imagesQuantity[i].style.transform = 'rotateX(-360deg)';
      }, (i + 1) * 300);
    }
  }

  start() {
    this.startButton.disabled = true;
    setTimeout(() => {
      this.startButton.disabled = false;
    }, 1000);
  }

  refresh(obj) {
    this.alert1.style.display = 'none';
    this.alert2.style.display = 'none';
    this.alert3.style.display = 'none';

    if (obj === 0) {
      this.alert3.style.display = 'block';
    } else if (obj === 1) {
      this.alert1.style.display = 'block';
    } else if (obj === 2) {
      this.alert2.style.display = 'block';
    } else {
      this.score.innerText = obj.score;
      this.prize.innerText = obj.rate;
      this.start();
      this.imagesRoll(obj.arr);
      this.prize.style.display = 'block';
      this.prize.style.color = obj.color;
      setTimeout(() => {
        this.prize.style.display = 'none';
      }, 1000);
    }
  }
}

const casino = new CasinoUi({
  images: imagesArr.length,
  score: 500,
});

const dom = new Dom({
  imagesQuantity: imagesBlock,
  startButton: startBtn,
  alert1: alertBlock1,
  alert2: alertBlock2,
  alert3: alertBlock3,
  prize: prizeBlock,
  score,
});

startBtn.addEventListener('click', () => {
  dom.refresh(casino.updateScore(+rate.value));
});
