import { Component, OnInit } from '@angular/core'
import { nodeCall as call } from '../../utils/nodeCall'
import config from '../../app.config'

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {
  public annTitle = 'None'
  public annCreated
  public annLink
  constructor() {
    this.getAnnouncement()
  }

  public getAnnouncement() {
    call(
      config.rpc.https,
      'condenser_api.get_blog',
      ['steemauto', 0, 30]
    ).then(res => {
      let index
      for (const i in res) {
        if (res[i].comment.category === 'announcement') {
          index = i
          break
        }
      }
      if (index) {
        this.annTitle = res[index].comment.title
        this.annCreated = res[index].comment.created
        this.annLink = 'https://steemit.com/@steemauto/' + res[index].comment.permlink
      }
    })
  }
  ngOnInit() {
  }

}
