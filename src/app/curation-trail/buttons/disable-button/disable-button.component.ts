import { Component, OnInit, Input } from '@angular/core'
import { CurationTrailComponent } from '../../curation-trail.component'

@Component({
  selector: 'app-trail-disable-button',
  template: `
    <button
      class="btn btn-warning btn-disable btn-xs"
      title="Disable"
      (click)="_t.disableTrail(trail)"
      *ngIf="enable"
    >
      <i class="glyphicon glyphicon-ban-circle"></i> {{ text || '' }}
    </button>
  `,
  styles: []
})
export class DisableButtonComponent implements OnInit {
  @Input() trail: string
  @Input() enable: number
  @Input() text?: string
  constructor(public _t: CurationTrailComponent) {}

  ngOnInit() {}
}
