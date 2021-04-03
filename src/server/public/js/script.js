const itemCount = Number(getQueryVariable('itemCount'))
const column = Number(getQueryVariable('column'))

$(document).ready(async function () {
  const files = await getFiles(Number(getQueryVariable('p')))
  for (let i = 0; i < files.files.length; i++) {
    const e = document.getElementById('container')
    const marginTopBottom = 30
    const marginLeftRight = 10
    const borderWidth = 1
    const difference = borderWidth * 4 + (marginTopBottom + marginLeftRight)
    e.innerHTML += `
        <div class="item" style="
        margin: ${marginTopBottom}px ${marginLeftRight}px;
        border: solid 1px black;
        flex: 0 0 calc(${100 / column}% - ${difference}px);
        ">
            <img src="image/${files.files[i]}">
            <span class="filename" style="
            font-size: ${getQueryVariable('fontSize')};
            top: calc(100% - ${getQueryVariable('fontSize') / 2}px);">
                ${files.files[i].substring(0, files.files[i].indexOf("."))}
            </span>
        </div>
        `
  }
})

const getFiles = (page) => {
  return new Promise(resolve => {
    $.ajax({
      url: "/api/files",
      dataType: 'json',
      success: function (data) {
        if (page) {
          const start = itemCount * (page - 1)
          let end = itemCount * (page - 1) + itemCount
          if (end > data.files.length) end = data.files.length
          data.files = data.files.slice(start, end)
          resolve(data)
        } else {
          resolve(data)
        }
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
