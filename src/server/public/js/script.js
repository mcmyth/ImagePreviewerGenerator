const itemCount = Number(getQueryVariable('itemCount'))
const column = Number(getQueryVariable('column'))

$(document).ready(async function () {
  const files = await getFiles()
  const p = getQueryVariable('p') - 1
  const e = document.getElementById('container')
  e.innerHTML = `<style>.img_container::before,.img_container::after {font-size: ${getQueryVariable('fontSize')}</style>`
  for (let i = 0; i < itemCount; i++) {
    const marginTopBottom = Number(getQueryVariable('fontSize').replace(/[^\d.]/g, '')) / 2 + 5
    e.style.padding = `0 25px ${marginTopBottom}px 25px`
    const marginLeftRight = 10
    const borderWidth = 1
    const difference = borderWidth * 4 + (marginTopBottom + marginLeftRight)
    e.innerHTML += `
        <div class="item" style="margin: ${marginTopBottom}px ${marginLeftRight}px;flex: 0 0 calc(${100 / column}% - ${difference}px);">
        <span class="img_container"
        data-before="${getQueryVariable('sizeLabel')}"
        data-after="${files.files[p].substring(0, files.files[p].indexOf("."))}"
        >
            <img src="image/${files.files[p]}"></div></span>`
  }
})

const getFiles = (page) => {
  return new Promise(resolve => {
    $.ajax({
      url: "/api/files",
      dataType: 'json',
      success: function (data) {
        resolve(data)
      }
    })
  })
}

function getQueryVariable(variable) {
  const query = window.location.search.substring(1)
  const vars = query.split("&")
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=")
    if (pair[0] === variable) {
      return pair[1]
    }
  }
  return (false)
}
