import Cookies from 'js-cookie'

export async function fetchJson(url: string, options: object = {}) {
  const request = await fetch(`/api/budgetmanager/${url}`, options)
  if (request.ok) {
    if (request.status === 204) {
      return null
    } else {  
      return await request.json()
    }
  } else {
    let statusText
    try {
      const response = await request.json()
      const entries = []
      for (const entry of Object.entries(response)) {
        entries.push(`${entry[0]}: ${entry[1]}`)
      }
      statusText = entries.join('\n')
    } catch (SyntaxError) {
      statusText = 'Unknown error'
    }
    throw new Response('', { status: request.status, statusText })
  }
}

export async function sendJson(url: string, options: any) {
  options.headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'X-CSRFToken': Cookies.get('csrftoken'),
  }
  return await fetchJson(url, options)
}

export async function getFields(table: string) {
  const response = await fetchJson(`${table}/`, {
    method: 'options',
  })
  return response.actions.POST
}
