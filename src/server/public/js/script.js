const itemCount = 2; //单页总数量
const column = 1; // 列数,修改itemCount是需同main.js中的itemCount常量一起修改

$(document).ready(async function () {
  const files = await getFiles(getQueryVariable('p'))
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
            <span class="filename">${files.files[i].substring(0, files.files[i].indexOf("."))}</span>
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
          data.files = data.files.slice(itemCount * (page - 1), itemCount * (page - 1) + itemCount)
          resolve(data)
        } else {
          resolve(data)
        }
      }
    })
  })
}

function getQueryVariable(variable) {
  const query = window.location.search.substring(1);
  const vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return (false);
}
