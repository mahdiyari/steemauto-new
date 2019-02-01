import { Component, OnInit, Input } from '@angular/core'
import { CurationTrailComponent } from '../../curation-trail.component'

@Component({
  selector: 'app-trail-enable-button',
  template: `
    <button
      class="btn btn-success btn-disable btn-xs"
      title="Enable"
      (click)="_t.enableTrail(trail)"
      *ngIf="!enable"
    >
      <i class="glyphicon glyphicon-ok"></i> {{ text || '' }}
    </button>
  `,
  styles: []
})
export class EnableButtonComponent implements OnInit {
  @Input() trail: string
  @Input() enable: number
  @Input() text?: string

  constructor(public _t: CurationTrailComponent) {}

  ngOnInit() {}
}
