declare var $: any
/**
 * jquery $.notify function
 * @param res received from API - {id, result?, error?}
 */
export function notifyResult(res) {
  $.notify(
    {
      icon: 'glyphicon glyphicon-' + (res['id'] ? 'ok' : 'remove'),
      message: res['result'] || res['error']
    },
    {
      type: res['id'] ? 'success' : 'danger',
      timer: 3000
    }
  )
}
