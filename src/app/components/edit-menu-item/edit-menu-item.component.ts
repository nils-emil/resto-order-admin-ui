import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {ImageCroppedEvent} from "ngx-image-cropper";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategoryService} from "../../httpservice/category.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MenuItemService} from "../../httpservice/menu-item.service";
import {ImageService} from "../../httpservice/image.service";

@Component({
  selector: 'app-edit-menu-item',
  templateUrl: './edit-menu-item.component.html',
  styleUrls: ['./edit-menu-item.component.css']
})
export class EditMenuItemComponent implements OnInit, AfterViewInit {


  @ViewChild("fileInput") fileInput: ElementRef;
  public createMenuItemForm: FormGroup;
  public categories = [];
  public imageChangedEvent: any = '';
  public croppedImage: any = '';
  public imageUrl: string = ''
  public imageBlob: any
  public fileToReturn: any;
  constructor(private formBuilder: FormBuilder,
              private categoryService: CategoryService,
              public dialogRef: MatDialogRef<EditMenuItemComponent>,
              private menuService: MenuItemService,
              private imageService: ImageService,
              @Inject(MAT_DIALOG_DATA) public data: {item: any}) { }

  ngOnInit(): void {
    console.log(this.data)
    this.categoryService.getCategories().subscribe(e => {
      this.categories = e;
    })
    this.createMenuItemForm = this.formBuilder.group({
      title: [this.data.item.title, Validators.required],
      visible: [this.data.item.visible, Validators.required],
      categoryId: [this.data.item.categoryId, []],
      price: [this.data.item.price, [Validators.required]],
      description: [this.data.item.description, [Validators.required]]
    });

  }

  ngAfterViewInit (): void {
    if(this.data.item && this.data.item.imageUrl) {
      let imageUrl = this.data.item.imageUrl;
      this.setCropperImage(imageUrl)
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    // Preview
    this.croppedImage = event.base64;

    this.fileToReturn = this.base64ToFile(
      event.base64,
      this.imageChangedEvent.target.files[0].name,
    )
    return this.fileToReturn;
  }

  base64ToFile(data, filename) {

    const arr = data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  imageLoaded(image: HTMLImageElement) {
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
  }

  async setCropperImage(url: string) {
    this.imageBlob = null;
    try {
      const result = await fetch(url, {mode: "no-cors"});
      console.log(result)
      const blob = await result.blob();
      // I would expect the following to update the image-cropper, but alas...
      // I've tried setTimeout for a few milliseconds, but it doesn't seem to help
      this.imageBlob = blob;
      console.log(this.imageBlob)
    } catch (error) {
      console.error(`Trouble loading url:`, error);
    }
  }

  openUploadDialog() {
    this.fileInput.nativeElement.click();
  }

  async onSubmit() {
    const formData = new FormData()
    formData.append('image', this.fileToReturn)
    if (this.imageChangedEvent && this.fileToReturn) {
      return this.imageService.uploadImage(formData).subscribe(
        success => {
          this.updateMenuItem(success.imageUrl);

        }, error => {
          return null
        })
    } else {
      this.updateMenuItem(this.data.item.imageUrl);
    }
  }

  private updateMenuItem(imageUrl: String) {
    console.log(this.createMenuItemForm.value)
    if (this.data.item._id) {
      this.menuService.updateMenuItem({
          ...this.data.item,
          ...this.createMenuItemForm.value,
          imageUrl: imageUrl
        },
        this.data.item._id
      ).subscribe(result => {
        this.data.item.imageUrl = imageUrl;
        this.cancelImageUpload()
        this.dialogRef.close();
      })
    } else {
      this.menuService.addMenuItem({...this.createMenuItemForm.value, imageUrl: imageUrl}).subscribe(result => {
        console.log(result)
        this.data.item.imageUrl = imageUrl;
        this.cancelImageUpload()
      })
    }
  }


  cancelImageUpload() {
    this.imageChangedEvent = null;
  }

  deleteItem() {
    this.menuService.deleteMenuItem(this.data.item._id)
      .subscribe(result => {
        this.dialogRef.close(result);
      })
  }
}
