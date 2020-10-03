// https://github.com/evoluteur/d3-table-cards
// (c) 2020 Olivier Giulieri

const layoutInfo = {
	table: {
		// ---- row position & size
		top: (d, i) => 40+i*31+'px',
		left: '0px',
		height: '30px',
		width: '594px',
		// ---- row border-radius
		radius: 0,
		// ---- table header
		headerOpacity: 1,
		headerLeft: '0px',
		// ---- column 1
		c1Top: '5px',
		c1Left: '8px',
		c1FontSize: '16px',
		// ---- column 2
		c2Top: '5px',
		c2Left: '200px',
	},
	cards: {
		// ---- card position & size
		top: (d, i) => Math.floor(i/cardsPerRow)*94+'px',
		left: (d, i) => (i%cardsPerRow)*210+'px',
		height: '84px',
		width: '200px',
		// ---- card border-radius
		radius: '4px',
		// ---- table header (hidden)
		headerOpacity: 0,
		headerLeft: '-650px',
		// ---- line 1
		c1Top: '10px',
		c1Left: '10px',
		c1FontSize: '18px',
		// ---- line 2
		c2Top: '38px',
		c2Left: '10px',
	}
};

const selector = '.holder';
const animTime = 600;
let curStyle = 'cards'; // "table" or "cards"
let holder;
let cardsPerRow = 3;

function getLayoutInfo(style){
	cardsPerRow = Math.floor((window.innerWidth -40)/210);
	return layoutInfo[style];
}

function render(){
	const l = getLayoutInfo(curStyle);
	holder = d3.select(selector);
	const sel = holder.selectAll('.item')
		.data(data, d => d.name)
		.enter()
		.append('div').attr('class', d => 'item chakra'+d.chakra);

	sel.insert('div').attr('class', 'c1').style('top', l.c1Top)
		.html(d => d.name);
	sel.insert('div').attr('class', 'c2').style('top', l.c2Top)
		.html(d => d.spirit);

	layout(true, false);
}

function redraw(style){
	curStyle = style || curStyle;
	layout();
}

let curSortField='chakra';
let curSortDirection=1;

function sort(key){
	if(key===curSortField){
		curSortDirection = -curSortDirection;
	}else{
		curSortDirection = 1;
	}
	getLayoutInfo(curStyle);
	if(key=='chakra'){
		data.sort(curSortDirection>0 ? 
			(a, b) => (a.chakra+a.name).localeCompare(b.chakra+b.name)
			: 
			(a, b) => ((8-a.chakra)+a.name).localeCompare((8-b.chakra)+b.name)
		)
	}else{
		data.sort((a, b) => curSortDirection*a.name.localeCompare(b.name))
	}
	curSortField=key;
	layout(false, true);
}

function layout(skipAnim, skipChildren){
	const l = getLayoutInfo(curStyle),
		t = d3.transition().duration(skipAnim ? 0 : animTime);

	holder.selectAll('.item')
		.data(data, d => d.name)
		.transition(t)
		.style('left', l.left)
		.style('top', l.top)
		.style('height', l.height)
		.style('width', l.width)
		.style('border-radius', l.radius);

	if(!skipChildren){
		holder.selectAll('.c1').transition(t)
			.style('top', l.c1Top)
			.style('left', l.c1Left)
			.style('font-size', l.c1FontSize);
		holder.selectAll('.c2').transition(t)
			.style('top', l.c2Top)
			.style('left', l.c2Left);

		holder.select('.header').transition(t)
			.style('opacity', l.headerOpacity)
			.style('left', l.headerLeft);

		const totalHeight = 20+(curStyle==='cards' ?
				Math.ceil(data.length/cardsPerRow)*94
				 : 40+data.length*31);

		holder.transition(t)
			.style('height', totalHeight+'px');
	}
}
