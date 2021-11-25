// isomorphic-table-cards
// https://github.com/evoluteur/isomorphic-table-cards
// (c) 2020 Olivier Giulieri

let cardsPerRow = 3;
class IsomorphicTableCards {
  selector = ".holder";
  holder = null;
  curSortField = "chakra";
  curSortDirection = 1;
  curStyle = "cards"; // "table" or "cards"

  constructor(config) {
    this.config = config;
  }

  render() {
    this.holder = document.querySelector(this.selector);
    this.node = document.createElement("div");
    this.node.className = this.curStyle;
    this.node.innerHTML = data.map(this.config.itemTemplate).join("");
    this.holder.appendChild(this.node);
    this.layout(false);
  }

  redraw(style) {
    if (style) {
      this.node.className = style;
    }
    this.curStyle = style || this.curStyle;
    this.layout();
  }

  sort(key) {
    const csDirection = key === this.curSortField ? -this.curSortDirection : 1;
    this.curSortDirection = csDirection;
    data = this.config.sort(data, key, csDirection);
    this.curSortField = key;
    this.layout(true);
  }

  layout(keepStyle) {
    const isCards = this.curStyle === "cards";
    const cardsPerRow = Math.floor(
      (window.innerWidth - 40) / this.config.cardWidth
    );
    const fnTop = isCards
      ? (idx) => Math.floor(idx / cardsPerRow) * this.config.cardHeight + "px"
      : (idx) => 40 + idx * this.config.rowHeight + "px";
    const fnLeft = isCards
      ? (idx) => (idx % cardsPerRow) * this.config.cardWidth + "px"
      : (idx) => 0;
    const id2idx = {};
    data.forEach((d, idx) => (id2idx[d.name] = idx));

    this.holder.querySelectorAll(".item").forEach((e) => {
      const idx = id2idx[e.id];
      e.style = "left:" + fnLeft(idx) + ";top:" + fnTop(idx);
    });

    if (!keepStyle) {
      this.holder.querySelector(".header").style =
        "left:" + (this.curStyle === "cards" ? "-650px" : 0);
      const totalHeight =
        20 +
        (this.curStyle === "cards"
          ? Math.ceil(data.length / cardsPerRow) * this.config.cardHeight
          : 40 + data.length * this.config.rowHeight);
      this.holder.style.height = totalHeight + "px";
    }
  }
}
