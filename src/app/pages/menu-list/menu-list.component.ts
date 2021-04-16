import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../httpservice/category.service";
import {MenuItemService} from "../../httpservice/menu-item.service";
import {MatDialog} from "@angular/material/dialog";
import {EditMenuItemComponent} from "../../components/edit-menu-item/edit-menu-item.component";
import {faArrowDown, faArrowUp, faPen, faTrash} from '@fortawesome/free-solid-svg-icons';
import {AddNewCategoryModalComponent} from "../../components/add-new-category-modal/add-new-category-modal.component";
import {LoadingScreenService} from "../../service/loading-screen.service";

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {

  public categories = [];
  public menuItems = [];
  public faUp = faArrowUp;
  public faDown = faArrowDown;
  public faEdit = faPen;
  public faTrash = faTrash;
  public openCategoryId = null;
  public openCategoryName: string;

  constructor(private catogoryService: CategoryService,
              private menuService: MenuItemService,
              private loadingScreenService: LoadingScreenService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadingScreenService.startSpinner();
    this.catogoryService.getCategories().subscribe(e => {
      this.categories = e;
      this.loadingScreenService.stopSpinner();
    })
    this.menuService.getMenuItems().subscribe(items => {
      this.menuItems = items;
      this.loadingScreenService.stopSpinner();
    })
  }

  openCategoryItems(item) {
    this.loadingScreenService.startSpinner();
    this.menuService.getMenuItemsByCategoryId(item._id).subscribe(items => {
      this.menuItems = items
      this.loadingScreenService.stopSpinner();
    })
    this.openCategoryId = item._id
    this.openCategoryName = item.name
  }

  editMenuItem(item: any) {
    const dialogRef = this.dialog.open(EditMenuItemComponent, {
      width: '100%',
      data: {item: item}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.menuService.getMenuItems().subscribe(items => {
        this.menuItems = items;
        this.loadingScreenService.stopSpinner();
      })
    });
  }

  moveCategory(action: string) {
    this.loadingScreenService.startSpinner();
    let category = this.categories.find(e => e._id === this.openCategoryId)
    if (action === 'UP') {
      category.order = category.order - 1
      this.catogoryService.updateCategory(category).subscribe(e => {
        this.catogoryService.getCategories().subscribe(e => {
          this.categories = e;
          this.loadingScreenService.stopSpinner();
        })
      })
    }
    if (action === 'DOWN') {
      category.order = category.order + 1
      this.catogoryService.updateCategory(category).subscribe(e => {
        this.catogoryService.getCategories().subscribe(e => {
          this.categories = e;
          this.loadingScreenService.stopSpinner();
        })
      })
    }
  }

  addNewCategory() {
    const dialogRef = this.dialog.open(AddNewCategoryModalComponent, {
      width: '100%',
      data: {order: this.categories.length}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.loadingScreenService.startSpinner();
      this.catogoryService.getCategories().subscribe(e => {
        if (result) {
          this.openCategoryName = result
        }
        this.categories = e;
        this.loadingScreenService.stopSpinner();
      })
    });
  }

  editCategory() {
    let category = this.categories.find(e => e._id === this.openCategoryId)
    const dialogRef = this.dialog.open(AddNewCategoryModalComponent, {
      width: '100%',
      data: {category: category}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.openCategoryName = result
      }
      this.loadingScreenService.startSpinner();
      this.catogoryService.getCategories().subscribe(e => {
        this.categories = e;
        this.loadingScreenService.stopSpinner();
      })
    });

  }

  deleteCategory() {
    this.loadingScreenService.startSpinner();
    let category = this.categories.find(e => e._id === this.openCategoryId)
    this.catogoryService.deleteCategory(category._id).subscribe(e => {
      this.catogoryService.getCategories().subscribe(result => {
        this.categories = result;
        this.openCategoryId = null;
        this.openCategoryName = null;
        this.loadingScreenService.stopSpinner();
      })
      this.menuService.getMenuItems().subscribe(items => {
        this.menuItems = items;
        this.loadingScreenService.stopSpinner();
      })
    })
  }
}
