import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavmenuComponent } from '../navmenu/navmenu.component';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css'],
    standalone: true,
    imports: [NavmenuComponent],
})
export class NavigationComponent implements OnInit {
	menu!: { id: number; title: string; link: string; }[];

	menuOpen!: boolean;
	database = 'menu';

	constructor(
		private location: Location,
	) {}

	ngOnInit() {
		this.menuOpen = false;
	}

	toggleMenu(status: boolean) {
		this.menuOpen = status;
	}

	
}