import { Component, OnInit } from '@angular/core'
declare var $: any

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  constructor() {}

  public tooltip() {
    $(document).ready(function() {
      $('[title != ""]').tooltip()
    })
    setInterval(() => {
      $(document).ready(function() {
        $('[title != ""]').tooltip()
      })
    }, 5000)
  }

  ngOnInit() {
    this.tooltip()
  }
}
