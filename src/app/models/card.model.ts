export class Card {
	id: string;
	createdAt: number;
	caption: string;
	src: string;
	selectedFilter: string;
	type:string;

	constructor(type:string, id:string, createdAt: number, caption: string, src: string, filter:string) {
		this.id = id;
		this.createdAt = createdAt;
		this.caption = caption;
		this.src = src;
		this.selectedFilter = filter;
	  this.type = type;
	}
}

