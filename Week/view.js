dv.container.classList.add('DMS-Widget-Week-container')
/* 用户传入的设定与默认设定合并 */
const config = Object.assign({
  fontSize: dv.container.innerWidth/14,
  link: 'Daily/{YYYY}-{MM}-{DD}.md'
}, input)
/* 日期元素 */
const weekEl = document.createElement('div')
weekEl.classList.add('DMS-Widget-Week')
dv.container.appendChild(weekEl)
/* 设定文字大小，所有元素大小的基准 */
weekEl.style = `font-size: ${config.fontSize}px`
/* 月份标题 */
const monthEl = document.createElement('div')
monthEl.classList.add('DMS-Widget-Week-month')
weekEl.appendChild(monthEl)
/* 星期容器 */
const weekContainerEl = document.createElement('div')
weekContainerEl.classList.add('DMS-Widget-Week-week-container')
weekEl.appendChild(weekContainerEl)

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const weekShortName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const changeWeek = ()=>{
  const now = new Date()
  /* 更新月份 */
  const month = monthNames[now.getMonth()]
  if(monthEl.textContent !== month){
    monthEl.textContent = month
    monthEl.setAttribute('data-value', month)
  }
  /* 这一周的起始时间 */
  const startTime = now.getTime()-864e5*3
  for(let i=0; i<7; i++){
    const thisDay = new Date(startTime+864e5*i)
    const week = thisDay.getDay()
    const weekName = weekShortName[week]
    const date = String(thisDay.getDate()).padStart(2, '0')
    const thisDayEl = document.createElement('div')
    thisDayEl.classList.add('DMS-Widget-Week-day')
    thisDayEl.classList.add('DMS-Widget-Week-day-'+week)
    if(i===3) thisDayEl.classList.add('DMS-Widget-Week-today')
    thisDayEl.innerHTML = `
      <div class="DMS-Widget-Week-day-name" data-value="${week}">${weekName}</div>
      <div class="DMS-Widget-Week-day-date">${
        config.link
        ? `<a class="internal-link" data-href="${window.DMSToolsFunc.formatTime(config.link)}" href="${window.DMSToolsFunc.formatTime(config.link)}" target="_blank" rel="noopener">${date}</a>`
        : date}</div>
    `
    weekContainerEl.appendChild(thisDayEl)
  }
}
changeWeek()