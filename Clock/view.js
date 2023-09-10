dv.container.classList.add('DMS-Widget-Clock-container')
/* 用户传入的设定与默认设定合并 */
const config = Object.assign({
  fontSize: dv.container.innerWidth/2.8,
  seconds: true,
  copy: ['time', 'time', 'timeNoSeconds', 'timeNoSeconds', 'timestamp', 'timestamp']
}, input)
/* 两位数字元素代码模板 */
const twoNumberCard = `
  <div class="DMS-Widget-Clock-number">0</div>
  <div class="DMS-Widget-Clock-number">0</div>
`
/* 时钟元素 */
const clockEl = document.createElement('div')
clockEl.classList.add('DMS-Widget-Clock')
dv.container.appendChild(clockEl)
/* 小时元素 */
const hoursEl = document.createElement('div')
hoursEl.classList.add('DMS-Widget-Clock-Hours')
hoursEl.innerHTML = twoNumberCard
clockEl.appendChild(hoursEl)
/* 小时分钟分隔 */
const sepHM = document.createElement('div')
sepHM.classList.add('DMS-Widget-Clock-sepHM')
sepHM.classList.add('DMS-Widget-Clock-sep')
clockEl.appendChild(sepHM)
/* 分钟元素 */
const minutesEl = document.createElement('div')
minutesEl.classList.add('DMS-Widget-Clock-Minutes')
minutesEl.innerHTML = twoNumberCard
clockEl.appendChild(minutesEl)
/* 如果显示秒钟 */
if(config.seconds){
  /* 分钟秒钟分隔 */
  const sepMS = document.createElement('div')
  sepMS.classList.add('DMS-Widget-Clock-sepMS')
  sepMS.classList.add('DMS-Widget-Clock-sep')
  clockEl.appendChild(sepMS)
  /* 秒钟元素 */
  const secondsEl = document.createElement('div')
  secondsEl.classList.add('DMS-Widget-Clock-Seconds')
  secondsEl.innerHTML = twoNumberCard
  clockEl.appendChild(secondsEl)
  if(!input?.fontSize) config.fontSize = dv.container.innerWidth/4.5
}
/* 设定文字大小，所有元素大小的基准 */
clockEl.style = `font-size: ${config.fontSize}px`

/* 选择所有数字元素 */
const numberEls = clockEl.querySelectorAll('.DMS-Widget-Clock-number')
/**
 * 更新时间
 *
 */
const changeTime = ()=>{
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  const timeArr = (hours+minutes+seconds).split('')
  numberEls.forEach((n, i) => {
    if(n.textContent === timeArr[i]) return
    n.textContent = timeArr[i]
  });
  /* 是否偶数秒钟，用来实现间隔符闪烁 */
  seconds%2 ? clockEl.classList.remove('even-seconds') : clockEl.classList.add('even-seconds')
}
/* 开始更新时间 */
changeTime()
window.DMSToolsFunc.setInterval(changeTime, 1000, '.DMS-Widget-Clock', dv.container)

/* 可用于绑定的事件 */
const copyEvents = {
  timestamp:     ()=>window.DMSToolsFunc.copyTimeStr('{ts}', 'TimeStamp'),
  time:          ()=>window.DMSToolsFunc.copyTimeStr('{hh}:{mm}:{ss}', 'Time'),
  timeNoSeconds: ()=>window.DMSToolsFunc.copyTimeStr('{hh}:{mm}', 'TimeNoSeconds'),
}

/* 绑定事件 */
numberEls.forEach((n,i)=>{
  if(
    config?.copy?.length
    && config?.copy[i]
    && copyEvents[config.copy[i]]
    ){
      n.onclick = copyEvents[config.copy[i]]
      n.classList.add('clickable')
    }
})