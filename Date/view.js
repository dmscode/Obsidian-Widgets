dv.container.classList.add('DMS-Widget-Date-container')
/* 用户传入的设定与默认设定合并 */
const config = Object.assign({
  fontSize: dv.container.innerWidth/9,
  copy: ['date', 'fullTime', 'dateWithWeek']
}, input)
/* 日期元素 */
const dateEl = document.createElement('div')
dateEl.classList.add('DMS-Widget-Date')
dv.container.appendChild(dateEl)
/* 设定文字大小，所有元素大小的基准 */
dateEl.style = `font-size: ${config.fontSize}px`
/* 日元素 */
const dayEl = document.createElement('div')
dayEl.classList.add('DMS-Widget-Date-day')
dateEl.appendChild(dayEl)
/* 月元素 */
const monthEl = document.createElement('div')
monthEl.classList.add('DMS-Widget-Date-month')
dateEl.appendChild(monthEl)
/* 星期元素 */
const weekEl = document.createElement('div')
weekEl.classList.add('DMS-Widget-Date-week')
dateEl.appendChild(weekEl)

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const weekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
/* 更新日期 */
const changeDate = ()=>{
  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = monthNames[now.getMonth()]
  const week = weekNames[now.getDay()]
  if(dayEl.textContent !== day){
    dayEl.textContent = day
    dayEl.setAttribute('data-value', day)
  }
  if(monthEl.textContent !== month){
    monthEl.textContent = month
    monthEl.setAttribute('data-value', month)
  }
  if(weekEl.textContent !== week){
    weekEl.textContent = week
    weekEl.setAttribute('data-value', week)
  }
}
/* 开始更新时间 */
changeDate()
// window.DMSToolsFunc.setInterval(changeDate, 6e4, '.DMS-Widget-Date', dv.container)

/* 可用于绑定的事件 */
const copyEvents = {
  date: ()=>window.DMSToolsFunc.copyTimeStr('{YYYY}-{MM}-{DD}', 'Date'),
  dateWithWeek: ()=>window.DMSToolsFunc.copyTimeStr('{YYYY}-{MM}-{DD} {EEEE}', 'DateWithWeek'),
  fullTime: ()=>window.DMSToolsFunc.copyTimeStr('{YYYY}-{MM}-{DD} {hh}:{mm}:{ss}', 'FullTime'),
}
/* 绑定事件 */
dateEl.querySelectorAll('*').forEach((n,i)=>{
  if(
    config?.copy?.length
    && config?.copy[i]
    && copyEvents[config.copy[i]]
    ){
      n.onclick = copyEvents[config.copy[i]]
      n.classList.add('clickable')
    }
})