
function getAPIObj () {
  if (window.location.href.split(':')[1] === '//localhost') {

    let scheme = 'https'
    let baseHost = '.amebae21.hasura-app.io'
    let appName = 'amebae21'
    return {
      authUrl: 'https://auth.' + appName + '.hasura-app.io',
      blogicUrl: 'https://api1.' + appName + '.hasura-app.io',
      gremlinUrl: scheme + '://gremlin' + baseHost,
      odin: scheme + '://odin' + baseHost,
      catman: scheme + '://catman' + baseHost,
      orderman: scheme + '://orderman' + baseHost,
      socketUrl: 'https://livered' + baseHost,
      api2: 'https://api2.' + appName + '.hasura-app.io',
      catalog: 'https://catalog.' + appName + '.hasura-app.io',
      retailerMgmt: 'https://retailer.' + appName + '.hasura-app.io',
      // stockandprice: 'https://stockandprice.' + appName + '.hasura-app.io',
    }
  } else {
    let scheme = window.location.href.split(':')[0]
    let baseHost = window.location.hostname.match(/.*?(\..*)/)[1]
    let subdomain = window.location.hostname.split('.')[0]
    let authUrl = scheme + '://auth' + baseHost

    return {
      authUrl: authUrl,
      blogicUrl: scheme + '://api1' + baseHost,
      gremlinUrl: scheme + '://gremlin' + baseHost,
      odin: scheme + '://odin' + baseHost,
      catman: scheme + '://catman' + baseHost,
      orderman: scheme + '://orderman' + baseHost,
      socketUrl: scheme + '://livered' + baseHost,
      api2: scheme + '://api2' + baseHost,
      catalog: scheme + '://catalog' + baseHost,
      retailerMgmt: scheme + '://retailer' + baseHost,
      // stockandprice: scheme + '://stockandprice' + baseHost,
    }
  }
}

export const Api = getAPIObj()
