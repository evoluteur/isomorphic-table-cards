// https://github.com/evoluteur/isomorphic-table-cards
// (c) 2020 Olivier Giulieri

const layoutInfo = {
	table: {
		// ---- row position & size
		top: i => 40+i*31+'px',
		left: i => 0,
		// ---- table header (hidden)
		headerLeft: 0,
	},
	cards: {
		// ---- card position & size
		top: i => Math.floor(i/cardsPerRow)*94+'px',
		left: i => (i%cardsPerRow)*210+'px',
		// ---- table header (hidden)
		headerLeft: '-650px',
	}
};

const selector = '.holder';
let cardsPerRow = 3;
class IsomorphicTableCards {
	
	holder = null;
	curSortField = 'chakra';
	curSortDirection = 1;
	curStyle = 'cards'; // "table" or "cards"

	getLayoutInfo(style){
		cardsPerRow = Math.floor((window.innerWidth -40)/210);
		return layoutInfo[style];
	}
	
	render(){
		const l = this.getLayoutInfo(this.curStyle);
		this.holder = document.querySelector(selector);
		this.node = document.createElement("div");
		this.node.className = 'cards'
		this.node.innerHTML = data.map(d => `<div class="item chakra${d.chakra}" id="${d.name}">
				<div class="c1">
					${d.name}
				</div>
				<div class="c2">
					${d.spirit}
				</div>
			</div>
		`).join('')
		this.holder.appendChild(this.node)
		this.layout(true, false);
	}
	
	redraw(style){
		this.node.className = style
		this.curStyle = style || this.curStyle;
		this.layout();
	}
	
	sort(key){
		const csDirection = key===this.curSortField ? -this.curSortDirection : 1;
		  
		this.getLayoutInfo(this.curStyle);
		if(key=='chakra'){
			data.sort(csDirection>0 ? 
				(a, b) => (a.chakra+a.name).localeCompare(b.chakra+b.name)
				: 
				(a, b) => ((8-a.chakra)+a.name).localeCompare((8-b.chakra)+b.name)
			)
		}else{
			data.sort((a, b) => csDirection*a.name.localeCompare(b.name))
		}
		this.curSortField=key;
		this.layout(false, true);
	}
	
	layout(skipAnim, skipChildren){
		const l = this.getLayoutInfo(this.curStyle)
	
		const id2idx ={}
		data.forEach((d, idx) => id2idx[d.name] = idx)
	 
		this.holder.querySelectorAll('.item')
			.forEach(e => {
				const idx = id2idx[e.id]
				e.style = 'left:'+l.left(idx)+';top:'+l.top(idx)
			})
	
		if(!skipChildren){
			this.holder.querySelector('.header').style = 'left:'+l.headerLeft;
			const totalHeight = 20+(this.curStyle==='cards' ?
					Math.ceil(data.length/cardsPerRow)*94
					 : 40+data.length*31);
			this.holder.style.height = totalHeight+'px'
		}
		
	}

}
