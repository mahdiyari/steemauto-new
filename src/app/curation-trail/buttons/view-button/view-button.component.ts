import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-trail-view-button',
  template: `
    <button
      class="btn btn-default btn-xs"
      title="View"
      [routerLink]="['@' + trail]"
    >
      <i class="glyphicon glyphicon-eye-open"></i> {{ text || '' }}
    </button>
  `,
  styles: []
})
export class ViewButtonComponent implements OnInit {
  @Input() trail: string
  @Input() text?: string

  constructor() {}

  ngOnInit() {}
}
