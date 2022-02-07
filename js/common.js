document.addEventListener('DOMContentLoaded', function () {
  // header scrolling
  const header = document.querySelector('.header')
  window.addEventListener('scroll', function () {
    let scrollPosition = parseInt(window.scrollY)
    if (scrollPosition > 100) {
      header.classList.add('scrolling')
    } else {
      header.classList.remove('scrolling')
    }
  })

  // accordion 1
  const accordItems = document.querySelectorAll('.accordion__item--one')

  accordItems.forEach((item) => {
    item.addEventListener('click', function () {
      const bottomContent = item.parentNode.querySelector('.accordion__bottom')

      item.toggleAttribute('data-accordion-open')
      item.toggleAttribute('data-accordion-close')
      bottomContent.classList.toggle('accordion__bottom--active')
    })
  })

  // accordion 2
  const accordionTwo = document.querySelector('body')

  accordionTwo.addEventListener('click', function (e) {
    const target = e.target
    const accordItemsTwo = document.querySelectorAll('.accordion__item--two')

    if (target.classList.contains('accordion__item--two')) {
      const bottomContent =
        target.parentNode.querySelector('.accordion__bottom')

      accordItemsTwo.forEach((el) => {
        const bottomContent = el.parentNode.querySelector('.accordion__bottom')
        el.setAttribute('data-accordion-close', '')
        el.removeAttribute('data-accordion-open')
        bottomContent.classList.remove('accordion__bottom--active')
      })

      target.removeAttribute('data-accordion-close')
      target.setAttribute('data-accordion-open', '')
      bottomContent.classList.add('accordion__bottom--active')
    }
  })

  // tabs
  const tabs = document.querySelector('.tabs')
  const tabsBtn = document.querySelectorAll('.tabs__btn')
  const tabsContent = document.querySelectorAll('.tabs__content')

  if (tabs) {
    tabs.addEventListener('click', (e) => {
      if (e.target.classList.contains('tabs__btn')) {
        const tabsPath = e.target.dataset.tabsPath
        tabsBtn.forEach((el) => {
          el.classList.remove('tabs__btn--active')
        })
        document
          .querySelector(`[data-tabs-path="${tabsPath}"]`)
          .classList.add('tabs__btn--active')
        tabsHandler(tabsPath)
      }
    })
  }

  const tabsHandler = (tabsPath) => {
    tabsContent.forEach((el) => {
      el.classList.remove('tabs__content--active')
    })
    document
      .querySelector(`[data-tabs-target="${tabsPath}"]`)
      .classList.add('tabs__content--active')
  }

  //stars

  function initialStarRating(e) {
    let stars = this.querySelectorAll('.star')

    stars.forEach((star) => star.classList.remove('star__checked'))
    const i = [...stars].indexOf(e.target)

    console.log([...stars].indexOf(e.target))

    if (i > -1) {
      stars[i].classList.add('star__checked')
      this.setAttribute('data-rating', `${stars.length - i}`)
    }

    // total
    if (this.hasAttribute('data-rating-total')) {
      this.parentNode.querySelector('.total-stars').innerHTML = `${
        stars.length - i
      } / 5`
    }
  }

  document.querySelectorAll('.star-container--chk').forEach((container) => {
    container.addEventListener('click', initialStarRating)
  })

  // button to UP PAGE

  const btnToUp = document.querySelector('.arrUp')

  window.addEventListener('scroll', function () {
    let scrollPosition = parseInt(window.scrollY)
    if (scrollPosition > 130) {
      btnToUp.style.opacity = '1'
      btnToUp.style.visibility = 'visible'
    } else {
      btnToUp.style.opacity = '0'
      btnToUp.style.visibility = 'hidden'
    }
  })

  btnToUp.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })

  // light mode
  const toggleSwitch = document.querySelector(
    '.theme-switch-wrapper input[type="checkbox"]'
  )
  const currentTheme = localStorage.getItem('theme')

  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme)

    if (currentTheme === 'light') {
      toggleSwitch.checked = true
    }
  }

  function switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'light')
      localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.setAttribute('data-theme', 'dark')
      localStorage.setItem('theme', 'dark')
    }
  }

  toggleSwitch.addEventListener('change', switchTheme, false)
})
