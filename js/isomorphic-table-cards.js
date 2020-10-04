// https://github.com/evoluteur/isomorphic-table-cards
// (c) 2020 Olivier Giulieri

const layoutInfo = {
	table: {
		// ---- row position & size
		top: i => 40+i*31+'px',
		left: i =>'0px',
		height: '30px',
		width: '594px',
		// ---- row border-radius
		radius: 0,
		// ---- table header
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
		top: i => Math.floor(i/cardsPerRow)*94+'px',
		left: i => (i%cardsPerRow)*210+'px',
		height: '84px',
		width: '200px',
		// ---- card border-radius
		radius: '4px',
		// ---- table header (hidden)
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
let curStyle = 'cards'; // "table" or "cards"
let holder;
let cardsPerRow = 3;

function getLayoutInfo(style){
	cardsPerRow = Math.floor((window.innerWidth -40)/210);
	return layoutInfo[style];
}

function render(){
	const l = getLayoutInfo(curStyle);
	holder = document.querySelector(selector);
	var node = document.createElement("div");
	node.innerHTML = data.map(d => `<div class="item chakra${d.chakra}" id="${d.name}">
			<div class="c1" style="top:${l.c1Top}">
				${d.name}
			</div>
			<div class="c2" style="top:${l.c2Top}">
				${d.spirit}
			</div>
		</div>
	`).join('')

	holder.appendChild(node)

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
	const l = getLayoutInfo(curStyle)

	const id2idx ={}
	data.forEach((d, idx) => id2idx[d.name] = idx)
 
	const itemCSS = ';height:'+l.height+';width:'+l.width+';border-radius:'+l.radius
	holder.querySelectorAll('.item')
		.forEach(e => {
			const idx = id2idx[e.id]
			e.style = 'left:'+l.left(idx)+';top:'+l.top(idx)+itemCSS
		})

	if(!skipChildren){
		holder.querySelector('.header').style = 'left:'+l.headerLeft;

		const comonC1CSS = 'top:'+l.c1Top+';left:'+l.c1Left+';font-size:'+l.c1FontSize
		holder.querySelectorAll('.c1')
			.forEach(e => e.style = comonC1CSS)
			
		const comonC2CSS = 'top:'+l.c2Top+';left:'+l.c2Left
		holder.querySelectorAll('.c2')
			.forEach(e => e.style = comonC2CSS)


		const totalHeight = 20+(curStyle==='cards' ?
				Math.ceil(data.length/cardsPerRow)*94
				 : 40+data.length*31);

		holder.style.height = totalHeight+'px'
	}
	
}
