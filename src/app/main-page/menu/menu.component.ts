import {Component, OnInit} from '@angular/core';
import {MenuService} from './service/menu.service';
import {MenuList} from '../domain/menuList';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css', '../head/head.component.css', '../body/body.component.css']
})
export class MenuComponent implements OnInit {

  selector: number;
  menus: Array<MenuList>;

  constructor(private menueService: MenuService) {
  }

  onHover(num: number): void {
    this.selector = num;
  }
  getMenus(): void {
    this.menueService.getMenuList().subscribe((menus: Array<MenuList>) => {
      this.menus = menus;
      console.log(this.menus);
    });
  }

  ngOnInit() {
    this.getMenus();
  }

}
