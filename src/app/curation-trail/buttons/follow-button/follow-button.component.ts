import { Component, OnInit, Input } from '@angular/core'
import { CurationTrailComponent } from '../../curation-trail.component'

@Component({
  selector: 'app-trail-follow-button',
  template: `
    <button
      class="btn btn-primary btn-follow btn-xs"
      (click)="_t.follow(trailUsername())"
      title="Follow"
      *ngIf="_t.indexOf(_t.followingTrails, trailUsername()) > -1 ? 0 : 1"
    >
      <i class="glyphicon glyphicon-plus"></i> {{ this.text || '' }}
    </button>
  `,
  styles: []
})
export class FollowButtonComponent implements OnInit {
  @Input() trail: string
  @Input() text?: string

  constructor(public _t: CurationTrailComponent) {}

  public trailUsername() {
    return this.trail
  }
  ngOnInit() {}
}
