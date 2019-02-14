import { Component, OnInit } from '@angular/core'
import { accountIsInvalid } from '../../utils/accountIsInvalid'
import { invalidTag } from '../../utils/invalidTag'
import { AuthService } from 'src/app/services/auth.service'
import config from '../../app.config'
import { ActivatedRoute } from '@angular/router'
import { notifyResult } from '../../utils/notify'
declare var $: any

@Component({
  selector: 'app-trail-settings',
  templateUrl: './trail-settings.component.html',
  styleUrls: ['./trail-settings.component.css']
})
export class TrailSettingsComponent implements OnInit {
  public trailNameUrl
  public trailDetails
  public enable
  public weight
  public votingMethod
  public delay
  public selfVote
  public commentVote
  public tagMethod
  public tag
  public tags = []
  public authorMethod
  public author
  public authors = []
  public tagError
  public authorError
  constructor(public auth: AuthService, private route: ActivatedRoute) {}

  /** change tag variable by changing input */
  public changeTag(tag) {
    this.tag = tag
  }
  /** validate tag then push tag to the array */
  public addTag() {
    const isInvalid = invalidTag(this.tag)
    if (isInvalid) {
      this.tagError = isInvalid
      return
    }
    this.tags.push(this.tag)
    $('#tagInput').val('')
    this.tag = ''
    this.tagError = ''
  }

  /** change author variable by changing input */
  public changeAuthor(author) {
    this.author = author
  }
  /** validate username then push author to the array */
  public addAuthor() {
    const isInvalid = accountIsInvalid(this.author)
    if (isInvalid) {
      this.authorError = isInvalid
      return
    }
    this.authors.push(this.author)
    $('#authorInput').val('')
    this.author = ''
    this.authorError = ''
  }

  /** remove an item from array by specific index */
  public removeItem(arrayName, i) {
    const temp = []
    for (let k = 0; k < this[arrayName].length; k++) {
      if (k === i) {
        continue
      }
      temp.push(this[arrayName][k])
    }
    this[arrayName] = temp
  }

  /** Get trail information from API */
  public getTrailDetails() {
    this.auth
      .postCall(config.api.one_following_trail, {
        user: this.auth.username,
        trail: this.trailNameUrl
      })
      .then(res => {
        if (res['id'] === 1) {
          this.trailDetails = res['result'][0]
          this.updateParams()
          this.updateUI()
          this.updateVarsOnChange()
        } else {
          notifyResult(res)
        }
      })
      .catch(e => {
        notifyResult({ id: 0, error: 'Error in back-end API' })
      })
  }

  /** Set variables based on the received values from API */
  public updateParams() {
    if (this.trailDetails) {
      const d = this.trailDetails
      this.enable = Number(d.enable)
      this.delay = d.aftermin
      this.weight = d.weight / 100
      this.votingMethod = Number(d.votingway)
      this.selfVote = d.selfvote
      this.commentVote = d.commentvote
      this.tagMethod = Number(d.tagmethod)
      this.authorMethod = Number(d.authormethod)
      this.tags =
        d.tags && Array.isArray(JSON.parse(d.tags)['tags'])
          ? JSON.parse(d.tags)['tags']
          : []
      this.authors =
        d.authors && Array.isArray(JSON.parse(d.authors)['authors'])
          ? JSON.parse(d.authors)['authors']
          : []
    }
  }

  /** Update UI with values received from API */
  public updateUI() {
    // update enable-checkbox
    $('#enable-checkbox')
      .prop('checked', this.enable ? true : false)
      .change()

    // update weight rangeslider and keep the update button disabled
    $('#weight')
      .val(this.weight)
      .change()
    this.disableWeightUpdateBtn(0)

    // update delay rangeslider and keep button disabled
    $('#delay')
      .val(this.delay)
      .change()
    this.disableDelayUpdateBtn(0)

    // update votingmethod radio input
    $('#vm_' + this.votingMethod)
      .prop('checked', true)
      .change()

    // update commentvote checkbox
    $('#commentvote')
      .prop('checked', this.commentVote ? true : false)
      .change()

    // update selfvote checkbox
    $('#selfvote')
      .prop('checked', this.selfVote ? true : false)
      .change()

    // update tagmethod radio input
    $('#tm_' + this.tagMethod)
      .prop('checked', true)
      .change()

    // update authormethod radio input
    $('#am_' + this.authorMethod)
      .prop('checked', true)
      .change()
  }

  /** Submit or update params on input change */
  public updateVarsOnChange() {
    // when document is ready
    $(() => {
      // update tagmethod var on input change
      $('input[type=radio][name=tagmethod]').change(
        e => (this.tagMethod = Number(e.target.value))
      )

      // update authormethod var on input change
      $('input[type=radio][name=authormethod]').change(
        e => (this.authorMethod = Number(e.target.value))
      )

      // update votingmethod var on input change
      $('input[type=radio][name=votingmethod]').change(e => {
        this.disableWeightUpdateBtn(1)
        return (this.votingMethod = Number(e.target.value))
      })

      // process on enable input change
      $('#enable-checkbox').change(e => {
        this.tempDisableToggle(e.target)
        if ($(e.target).prop('checked')) {
          this.submitToggle('enabletrail')
        } else {
          this.submitToggle('disabletrail')
        }
      })

      // process on selfvote input change
      $('#selfvote').change(e => {
        this.tempDisableToggle(e.target)
        if ($(e.target).prop('checked')) {
          this.submitToggle('enableselfvote')
        } else {
          this.submitToggle('disableselfvote')
        }
      })
      // process on selfvote input change
      $('#commentvote').change(e => {
        this.tempDisableToggle(e.target)
        if ($(e.target).prop('checked')) {
          this.submitToggle('enablecommentvote')
        } else {
          this.submitToggle('disablecommentvote')
        }
      })
    })
  }

  // Disable toggle input for 1 second
  public tempDisableToggle(toggle) {
    $(toggle).bootstrapToggle('disable')
    setTimeout(() => {
      $(toggle).bootstrapToggle('enable')
    }, 1000)
  }

  /** Enable/Disable a variable */
  public submitToggle(mode) {
    let action
    switch (mode) {
      case 'enabletrail':
        action = 'enabletrail'
        break
      case 'disabletrail':
        action = 'disabletrail'
        break
      case 'enableselfvote':
        action = 'enableselfvote'
        break
      case 'disableselfvote':
        action = 'disableselfvote'
        break
      case 'enablecommentvote':
        action = 'enablecommentvote'
        break
      case 'disablecommentvote':
        action = 'disablecommentvote'
        break
      default:
        return
    }
    const api = config.api.settings.curation_trail[action]
    this.auth
      .postCall(api, {
        trails: [this.trailNameUrl]
      })
      .then(res => {
        notifyResult(res, 2000)
      })
  }

  /** Submit weight and voting method changes */
  public submitWeight() {
    this.disableWeightUpdateBtn(0)
    this.auth
      .postCall(config.api.settings.curation_trail.weight, {
        trails: [this.trailNameUrl],
        method: this.votingMethod,
        weight: this.weight
      })
      .then(res => {
        notifyResult(res, 2000)
      })
  }

  /** Submit delay changes */
  public submitDelay() {
    this.disableDelayUpdateBtn(0)
    this.auth
      .postCall(config.api.settings.curation_trail.delay, {
        trails: [this.trailNameUrl],
        delay: this.delay
      })
      .then(res => {
        notifyResult(res, 2000)
      })
  }

  /** Disable/enable the update button for weight */
  private disableWeightUpdateBtn(i) {
    $('#update-weight-btn')
      .prop('disabled', !i ? true : false)
      .change()
  }

  /** Disable/enable the update button for delay */
  private disableDelayUpdateBtn(i) {
    $('#update-delay-btn')
      .prop('disabled', !i ? true : false)
      .change()
  }

  // ngOnInit runs when document has been initialized
  ngOnInit() {
    // when document is ready
    $(() => {
      // change all checkboxs to bootstraptoggle
      $('input[type="checkbox"]').bootstrapToggle()
    })

    // change regular weight slider to rangeslider.js
    $('#weight').rangeslider({
      polyfill: false,
      // change weight variable on silder change
      onSlide: (position, value) => {
        this.disableWeightUpdateBtn(1)
        this.weight = value
      }
    })

    // change regular weight time slider to rangeslider.js
    $('#delay').rangeslider({
      polyfill: false,
      // change delay variable on silder change
      onSlide: (position, value) => {
        this.disableDelayUpdateBtn(1)
        this.delay = value
      }
    })

    // get curation trail name from URL
    this.route.url.subscribe(url => {
      const userRegex = /^[\@]+[a-zA-Z0-9\-.]+$/
      if (url.length === 3 && url[1].path.match(userRegex)) {
        this.trailNameUrl = url[1].path.replace('@', '')
        this.getTrailDetails()
      }
    })
  }
}
