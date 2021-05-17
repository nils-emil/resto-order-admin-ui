import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../httpservice/user.service";
import {UiService} from "../../httpservice/ui.service";

@Component({
  selector: 'app-ui-config',
  templateUrl: './ui-config.component.html',
  styleUrls: ['./ui-config.component.css']
})
export class UiConfigComponent implements OnInit {


  public passwordForm: FormGroup;
  public error = '';
  public configuration = [];


  constructor(private formBuilder: FormBuilder,
              private uiService: UiService,
              private userService: UserService) {
  }

  ngOnInit(): void {

    this.configuration = [
      {
        title: "Kasutajaliidese põhitoon (RGB KOOD)",
        type: "text",
        key: "color",
        value: ""
      },
      {
        title: "Avakuva logo",
        type: "text",
        key: "logo",
        value: ""
      }
    ]

    this.uiService.getConfiguration().subscribe(e => {
      if (e){
        let color = e.find(e => e.key === 'color');
        if (color) {
          this.configuration[0].value = color.value;
        }
        let find = e.find(e => e.key === 'logo');
        if (find) {
          this.configuration[1].key = find.value;
        }
      }
      console.log(e)
    }, error1 => {
      console.log(error1)
    })

  }

  submit(config: any) {
    this.uiService.updateConfiguration(config).subscribe(e => {
      console.log(e)
    }, error1 => {
      console.log(error1)
    })

  }

}
