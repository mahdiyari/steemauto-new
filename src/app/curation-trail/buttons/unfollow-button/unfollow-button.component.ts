import { Component, OnInit, Input } from '@angular/core'
import { CurationTrailComponent } from '../../curation-trail.component'

@Component({
  selector: 'app-trail-unfollow-button',
  template: `
    <button
      class="btn btn-danger btn-unfollow btn-xs"
      (click)="_t.unfollow(trailUsername())"
      title="Unfollow"
      *ngIf="_t.indexOf(_t.followingTrails, trailUsername()) > -1 ? 1 : 0"
    >
      <i class="glyphicon glyphicon-remove"></i> {{ text || "" }}
    </button>
  `,
  styles: []
})
export class UnfollowButtonComponent implements OnInit {
  @Input() trail: string
  @Input() text?: string

  constructor(public _t: CurationTrailComponent) {}

  public trailUsername() {
    return this.trail
  }
  ngOnInit() {}
}
