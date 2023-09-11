dv.container.classList.add('DMS-Widget-Progress-container')
/* 用户传入的设定与默认设定合并 */
const config = Object.assign({
  fontSize: 0,
  content: ['Year', 'Month', 'Week', 'Day'],
}, input)
/* 进度容器元素 */
const progressEl = document.createElement('div')
progressEl.classList.add('DMS-Widget-Progress')
dv.container.appendChild(progressEl)
/* 设定文字大小，所有元素大小的基准 */
config.fontSize && (progressEl.style = `font-size: ${config.fontSize}px`)
/* 不同进度的细节配置 */
const progressConfig = {
  Year: {
    getProgress: () => {
      const now = new Date()
      const yearStart = new Date(now.getFullYear(), 0, 1)
      const yearEnd = new Date(now.getFullYear()+1, 0, 1)
      return (now.getTime()-yearStart.getTime())/(yearEnd.getTime()-yearStart.getTime())
    },
    interval: 3e5,
  },
  Month: {
    getProgress: () => {
      const now = new Date()
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
      const monthEnd = new Date(now.getFullYear(), now.getMonth()+1, 1)
      return (now.getTime()-monthStart.getTime())/(monthEnd.getTime()-monthStart.getTime())
    },
    interval: 6e4,
  },
  Week: {
    getProgress: () => {
      const now = new Date()
      const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()-now.getDay()+1)
      const weekEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate()+7-now.getDay()+1)
      return (now.getTime()-weekStart.getTime())/(weekEnd.getTime()-weekStart.getTime())
    },
    interval: 6e4,
  },
  Day: {
    getProgress: () => {
      const now = new Date()
      const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const dayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1)
      return (now.getTime()-dayStart.getTime())/(dayEnd.getTime()-dayStart.getTime())
    },
    interval: 4e3,
  },
  Hour: {
    getProgress: () => {
      const now = new Date()
      const hourStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours())
      const hourEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours()+1)
      return (now.getTime()-hourStart.getTime())/(hourEnd.getTime()-hourStart.getTime())
    },
    interval: 1e3,
  },
  Minute: {
    getProgress: () => {
      const now = new Date()
      const minuteStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes())
      const minuteEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes()+1)
      return (now.getTime()-minuteStart.getTime())/(minuteEnd.getTime()-minuteStart.getTime())
    },
    interval: 1e3,
  }
}
/* 获取要显示内容的最小更新间隔 */
const reFreshInterval = config.content.reduce((min, key)=>{
  return Math.min(min, progressConfig[key].interval)
}, 3e5)
/* 进度条元素 */
const els = {}
/* 创建进度条 */
config.content.forEach((key)=>{
  /* 进度条整体容器 */
  const container = document.createElement('div')
  container.classList.add(`DMS-Widget-Progress-${key}-container`)
  progressEl.appendChild(container)
  /* 进度条名称 */
  const progressName = document.createElement('div')
  progressName.classList.add('DMS-Widget-Progress-name')
  progressName.classList.add('clickable')
  progressName.textContent = key
  container.appendChild(progressName)
  /* 进度条容器 */
  const progressContainer = document.createElement('div')
  progressContainer.classList.add(`DMS-Widget-Progress-${key}`)
  progressContainer.classList.add(`DMS-Widget-Progress-content`)
  container.appendChild(progressContainer)
  /* 进度条 */
  const progressbar = document.createElement('div')
  progressbar.classList.add('DMS-Widget-Progress-bar')
  progressContainer.appendChild(progressbar)
  /* 进度值 */
  const progressValue = document.createElement('div')
  progressValue.classList.add('DMS-Widget-Progress-value')
  progressValue.classList.add(`clickable`)
  container.appendChild(progressValue)
  /* 绑定事件 */
  progressName.onclick = (e)=>{
    window.DMSToolsFunc.copyText(e.target.dataset.progress)
  }
  progressValue.onclick = (e)=>{
    window.DMSToolsFunc.copyText(e.target.dataset.progress)
  }
  /* 存入对象 */
  els[key] = {
    container,
    progressName,
    progressContainer,
    progressbar,
    progressValue,
  }
})

/* 更新进度 */
const updateProgress = ()=>{
  config.content.forEach((key)=>{
    const progress = progressConfig[key].getProgress()
    const progressPercent = `${(progress*100).toFixed(2)}%`
    const nowProgress = els[key]
    if(nowProgress.progress !== progress){
      nowProgress.progress = progress
      nowProgress.progressbar.style = `width: ${progressPercent}`
      nowProgress.progressValue.textContent = `${progressPercent}`
      /* 更新复制内容 */
      nowProgress.progressName.dataset.progress = `${key} Progress: ${''.padEnd(Math.round(progress*20), '▓')}${''.padEnd(Math.round((1-progress)*20), '░')} ${progressPercent}`
      nowProgress.progressValue.dataset.progress = `${key} Progress: ${progressPercent}`
    }
  })
}
/* 开始更新进度 */
updateProgress()
window.DMSToolsFunc.setInterval(updateProgress, reFreshInterval, '.DMS-Widget-Progress', dv.container)