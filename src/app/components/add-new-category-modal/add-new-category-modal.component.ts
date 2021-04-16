import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../httpservice/category.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-new-category-modal',
  templateUrl: './add-new-category-modal.component.html',
  styleUrls: ['./add-new-category-modal.component.css']
})
export class AddNewCategoryModalComponent implements OnInit {

  public createMenuItemForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AddNewCategoryModalComponent>,
              private categoryService: CategoryService,
              @Inject(MAT_DIALOG_DATA) public data: { order: any, category: any }) {
  }


  ngOnInit(): void {
    if (this.data.category) {
      this.createMenuItemForm = this.formBuilder.group({
        name: [this.data.category.name, Validators.required]
      });
    } else {
      this.createMenuItemForm = this.formBuilder.group({
        name: ['', Validators.required]
      });
    }
  }

  submit() {
    console.log(this.data.category)
    if (this.data.category) {
      this.categoryService.updateCategory
      ({
        ...this.data.category,
        ...this.createMenuItemForm.value,
      }).subscribe(result => {
        this.dialogRef.close(this.createMenuItemForm.value.name);
      })
      return
    }
    this.categoryService.createCategory({
      ...this.createMenuItemForm.value,
      order: this.data.order
    }).subscribe(result => {
      this.dialogRef.close(this.createMenuItemForm.value.name);
    })
  }
}
