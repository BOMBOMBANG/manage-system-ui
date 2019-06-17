const download = (data, name) => {
  if(!data) return
  let url = window.URL.createObjectURL(new Blob([data]))
  let link = document.createElement('a')
  link.href = url
  link.setAttribute('download', name)
  document.body.appendChild(link)
  link.click()
}

export default download