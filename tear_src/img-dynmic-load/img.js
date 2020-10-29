var globalViewer = new IntersectionObserver((entries) => {
  for (let entry of entries) {
    let img = entry.target;
    if (img.dynmicImg && entry.intersectionRatio > 0) {
      setTimeout(() => {
        img.src = img.dynmicImg.src;
      }, 100)
    }
  }
});

class DynmicImg {
  constructor (src, target) {
    var img = document.createElement('img');
    img.classList = 'img-alter';
    target.append && target.append(img);

    img.dataset.alt = '可爱女孩';
    img.alt = '可爱女孩'

    globalViewer.observe(img);
    img.dynmicImg = this;

    this.src = src;
  }
}