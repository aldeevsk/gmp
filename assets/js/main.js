import { tns } from "./tns.js";

(function () {
    function leavingPanel({
      panelSel = '.panel',
      openSel = '.open',
      closeSel = '.close',
      activeClass = 'active',
      lockBody = false,
    }) {
      const openButton = document.querySelector(openSel)
      const closeButton = document.querySelector(closeSel)
      const leavePanel = document.querySelector(panelSel)

      if (!openButton || !closeButton || !leavePanel) return

      openButton.addEventListener('click', () => {
        leavePanel.classList.add(activeClass)
        if (lockBody) document.body.classList.add('locked')
      })
      closeButton.addEventListener('click', () => {
        leavePanel.classList.remove(activeClass)
        if (document.body.classList.contains('locked'))
          document.body.classList.remove('locked')
      })
    }

    leavingPanel({
      panelSel: '[data-role="nav"]',
      openSel: '[data-role="nav-show"]',
      closeSel: '[data-role="nav-hide"]',
      activeClass: 'active',
      lockBody: true,
    })


    function setupSliders(options={}) {
        const sliders = document.querySelectorAll('[data-role="slider"]')

        if(!sliders) return

        sliders.forEach( slider => {
            const container = slider.querySelector('.slides')
            const axis = slider.dataset.axis || 'horizontal'
            const items = slider.dataset.items || 3
            const nextButton = slider.querySelector('.next') || false
            const prevButton = slider.querySelector('.prev') || false
            const navContainer = slider.querySelector('.slider__nav') || false
            const nav = navContainer ? true : false
            const controls = slider.querySelector('.slider__controls') || false
            const autoplay = slider.dataset.autoplay ? true : false
            const gutter = slider.dataset.gutter || 10
            const direction = slider.dataset.direction || 'forward' // or 'backward'

            let options = {
              container: container,
              items: 1,
              controls: false,
              mouseDrag: true,
              autoplay: autoplay,
              autoplayDirection: direction,
              autoplayButtonOutput: false,
              autoplayTimeout: 4000,
              speed: 1500,
              gutter: gutter,
              axis: axis,
              nextButton: nextButton,
              prevButton: prevButton,
              nav: nav,
              navContainer: navContainer,
              autoplayHoverPause: true,
              navAsThumbnails: false,
              loop: true,
              freezable: false,
              responsive: {
                680: {
                  items: items > 1 ? 2 : items,
                },
                940: {
                  items: items > 1 ? 3 : items,
                },
                1200: {
                  items: items,
                },
              },
            }

            const slider_instance = tns(options)
            if(nextButton) nextButton.addEventListener('click', () => slider_instance.goTo('next'))
            if(prevButton) prevButton.addEventListener('click', () => slider_instance.goTo('prev'))

        })
    }
    setupSliders()

    function setupModal({modalSel = '[data-role="modal"]', onSel = '[data-action="show-modal"]', offSel = '[data-action="hide-modal"]', activeClass = 'active'}) {
      const modal = document.querySelector(modalSel)
      const showButton = document.querySelector(onSel)
      const hideButton = document.querySelector(offSel)

      if(!modal || !showButton || !hideButton) return

      showButton.addEventListener('click', () => modal.classList.add(activeClass))
      hideButton.addEventListener('click', (event) => {if(event.target === hideButton) modal.classList.remove(activeClass)})
    }
    setupModal({modalSel: '[data-role="modal"]', onSel: '[data-action="show-modal"]', offSel: '[data-action="hide-modal"]', activeClass: 'active'})

})()