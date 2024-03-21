/*
  isomorphic-table-cards
  https://github.com/evoluteur/isomorphic-table-cards
  (c) 2024 Olivier Giulieri
*/

let cardsPerRow = 3;
class IsomorphicTableCards {
  holder = null;
  curSortField = "chakra";
  curSortDirection = 1;
  curStyle = "cards"; // "table" or "cards"

  constructor(config) {
    this.config = config;
  }

  render() {
    this.holder = document.querySelector(this.config.selector);
    this.node = document.createElement("div");
    this.node.className = this.curStyle;
    this.node.innerHTML = this.config.data
      .map(this.config.itemTemplate)
      .join("");
    this.holder.appendChild(this.node);
    this.layout(false, true);
    setTimeout(() => this.layout(true, false), 0);
  }

  redraw(style) {
    if (style) {
      this.node.className = style;
    }
    this.curStyle = style || this.curStyle;
    this.layout(false);
  }

  sort(key) {
    const csDirection = key === this.curSortField ? -this.curSortDirection : 1;
    this.curSortDirection = csDirection;
    this.config.data = this.config.sort(this.config.data, key, csDirection);
    this.curSortField = key;
    this.layout(true);
  }

  layout(keepHeader, firstTime) {
    const { rowHeight, cardHeight, cardWidth } = this.config;
    const isCards = this.curStyle === "cards";
    const cardsPerRow = Math.floor((window.innerWidth - 40) / cardWidth);
    const fnTop = isCards
      ? (idx) => Math.floor(idx / cardsPerRow) * cardHeight + "px"
      : (idx) => 40 + idx * this.config.rowHeight + "px";
    const fnLeft = isCards
      ? (idx) => (idx % cardsPerRow) * cardWidth + "px"
      : () => 0;
    const id2idx = {};
    this.config.data.forEach((d, idx) => (id2idx[d.name] = idx));
    if (!firstTime) {
      this.holder.querySelectorAll(".item").forEach((e) => {
        const idx = id2idx[e.id];
        e.style = "transform:translate(" + fnLeft(idx) + "," + fnTop(idx) + ")";
      });
    }
    if (!keepHeader) {
      this.holder.querySelector(".header").style =
        "transform:translateX(" +
        (this.curStyle === "cards" ? "-700px" : "0") +
        ")";
      const totalHeight =
        20 +
        (this.curStyle === "cards"
          ? Math.ceil(this.config.data.length / cardsPerRow) * cardHeight
          : 40 + this.config.data.length * rowHeight);
      this.holder.style.height = totalHeight + "px";
    }
  }
}
