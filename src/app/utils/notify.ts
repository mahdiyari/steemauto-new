declare var $: any
/**
 * jquery $.notify function
 * @param res received from API - {id, result?, error?}
 * @param delay time to close the notification
 */
export function notifyResult(res: object, delay: number = 4000) {
  $.notify(
    {
      icon: 'glyphicon glyphicon-' + (res['id'] ? 'ok' : 'remove'),
      message: res['result'] || res['error']
    },
    {
      type: res['id'] ? 'success' : 'danger',
      delay,
      timer: 1000,
    }
  )
}
