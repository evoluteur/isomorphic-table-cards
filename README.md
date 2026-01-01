# Isomorphic-Table-Cards &middot; [![GitHub license](https://img.shields.io/github/license/evoluteur/meet-the-fans)](https://github.com/evoluteur/isomorphic-table-cards/blob/master/LICENSE)

Isomorphic-Table-Cards is a Javascript class for Table and Cards views with animated transitions on sorting, view toggle, and browser resizing.

Check out the [live demo](https://evoluteur.github.io/isomorphic-table-cards/index.html).

[![screenshot](https://raw.github.com/evoluteur/isomorphic-table-cards/master/screenshot.gif)](https://evoluteur.github.io/isomorphic-table-cards/index.html)

## Usage

The [code](https://github.com/evoluteur/isomorphic-table-cards) is just Vanilla Javascript, CSS, and HTML.

### Importing the code

In the "head" section your html page, import the Javascript and CSS:

```html
<link href="css/isomorphic-table-cards.css" rel="stylesheet" />
<script src="js/isomorphic-table-cards.js" charset="utf-8"></script>
```

### Config options

Isomorphic-Table-Cards is a Javascript class with configuration options for re-use.

**data**: data to display (JSON array).

**selector**: CSS selector for the root element which will hold the cards or table.

**rowHeight**: Row height (in pixels).

**cardHeight**: Card height (in pixels).

**cardWidth**: Card width (in pixels).

**itemTemplate**: HTML template to display an item. It is the same for both table and cards views, only the CSS changes.

**sort**: Function for sorting the data (arguments: data, key, direction).

### Methods

**render()**: Initial rendering method.

**redraw(style)**: Redraw method (style="table" or "cards").

**sort(key)**: Sort method (key=data attribute to sort by).

### Example

```javascript
const tableCards = new IsomorphicTableCards({
  data: <yourData>,
  selector: ".holder",
  // row and card dimensions
  rowHeight: 30,
  cardHeight: 100,
  cardWidth: 250,
  // item template
  itemTemplate: d => `<div class="item" id="${d.name}">
      <div class="c1">
        ${d.name}
      </div>
      <div class="c2">
        ${d.descriptionn}
      </div>
    </div>
  `,
  // sort function
  sort: (data, key, direction) => data.sort((a, b) => direction*a[key].localeCompare(b[key]))   }
});

tableCards.render()
```

The same animations can also be done [using D3.js](https://evoluteur.github.io/d3-table-cards/).

## License

Isomorphic-Table-Cards is open source at [GitHub](https://github.com/evoluteur/isomorphic-table-cards) with MIT license.

(c) 2026 [Olivier Giulieri](https://evoluteur.github.io/).
