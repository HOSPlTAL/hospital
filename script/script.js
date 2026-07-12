const canvas = document.getElementById('background')
const ctx = canvas.getContext('2d')
const cursor = document.querySelector('.cursor')
const header = document.querySelector('.header')
const menu = document.querySelector('.menu')
const nav = document.querySelector('.nav')
const links = [...document.querySelectorAll('.nav a[href^="#"]')]
const sections = [...document.querySelectorAll('section[id]')]
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches

let width = innerWidth
let height = innerHeight
let dpr = Math.min(devicePixelRatio || 1, 2)
let stars = []
let mouse = { x: -999, y: -999, live: false }
let cursorPosition = { x: -999, y: -999 }

function star() {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    baseX: Math.random() * width,
    baseY: Math.random() * height,
    radius: Math.random() * 1.15 + .25,
    alpha: Math.random() * .45 + .08,
    speed: Math.random() * .055 + .012,
    phase: Math.random() * Math.PI * 2
  }
}

function resize() {
  width = innerWidth
  height = innerHeight
  dpr = Math.min(devicePixelRatio || 1, 2)
  canvas.width = width * dpr
  canvas.height = height * dpr
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  stars = Array.from({ length: Math.max(58, Math.floor(width * height / 13000)) }, star)
}

function draw(time) {
  ctx.clearRect(0, 0, width, height)
  const t = reduceMotion ? 0 : time * .00018

  for (const item of stars) {
    item.baseY += item.speed
    if (item.baseY > height + 8) {
      item.baseY = -8
      item.baseX = Math.random() * width
    }

    let x = item.baseX + Math.sin(t + item.phase) * 5
    let y = item.baseY + Math.cos(t * .7 + item.phase) * 3
    const dx = x - mouse.x
    const dy = y - mouse.y
    const distance = Math.hypot(dx, dy)

    if (mouse.live && distance < 120 && distance > 0) {
      const force = (120 - distance) / 120
      x += dx / distance * force * 34
      y += dy / distance * force * 34
    }

    item.x += (x - item.x) * .05
    item.y += (y - item.y) * .05
    const pulse = .82 + Math.sin(t * 5 + item.phase) * .18

    ctx.beginPath()
    ctx.fillStyle = `rgba(255,255,255,${item.alpha * pulse})`
    ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2)
    ctx.fill()
  }

  requestAnimationFrame(draw)
}

function move(event) {
  mouse.x = event.clientX
  mouse.y = event.clientY
  mouse.live = true
}

function animateCursor() {
  cursorPosition.x += (mouse.x - cursorPosition.x) * .18
  cursorPosition.y += (mouse.y - cursorPosition.y) * .18
  cursor.style.left = `${cursorPosition.x}px`
  cursor.style.top = `${cursorPosition.y}px`
  requestAnimationFrame(animateCursor)
}

function update() {
  header.classList.toggle('scrolled', scrollY > 12)
  const active = sections.reduce((value, section) => scrollY >= section.offsetTop - 180 ? section.id : value, 'home')
  links.forEach(link => link.classList.toggle('current', link.getAttribute('href') === `#${active}`))
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
      observer.unobserve(entry.target)
    }
  })
}, { threshold: .12 })

document.querySelectorAll('.section-intro, .channels, .feature-groups article, .plans article, .closing').forEach(item => {
  item.classList.add('reveal')
  observer.observe(item)
})

document.querySelectorAll('a, button').forEach(item => {
  item.addEventListener('mouseenter', () => cursor.classList.add('active'))
  item.addEventListener('mouseleave', () => cursor.classList.remove('active'))
})

menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open')
  menu.setAttribute('aria-expanded', String(open))
})

links.forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open')
  menu.setAttribute('aria-expanded', 'false')
}))

addEventListener('mousemove', move)
addEventListener('mouseleave', () => mouse.live = false)
addEventListener('resize', resize)
addEventListener('scroll', update, { passive: true })

document.getElementById('year').textContent = new Date().getFullYear()
resize()
update()
requestAnimationFrame(draw)
requestAnimationFrame(animateCursor)
