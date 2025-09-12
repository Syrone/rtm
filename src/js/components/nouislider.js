import noUiSlider from 'nouislider'
import wNumb from 'wnumb'

document.querySelectorAll('[data-nouislider]')?.forEach(wrapper => {
  const mode = wrapper.getAttribute('data-nouislider') || 'multiple'

  const sliderEl = wrapper.querySelector('[data-nouislider-element]')
  const sliderCurrentEl = wrapper.querySelector('[data-nouislider-current]')
  const inputMin = wrapper.querySelector('input[name="price-min"]')
  const inputMax = wrapper.querySelector('input[name="price-max"]')
  const sliderStep = parseInt(wrapper.getAttribute('data-nouislider-step')) || 10
  const sliderPipsSuffix = wrapper.getAttribute('data-nouislider-pips-suffix') || ''
  const sliderCurrentSymbol = sliderCurrentEl?.getAttribute('data-nouislider-current') || ''
  const sliderStart = inputMin ? (parseInt(inputMin.getAttribute('min')) || 0) : (parseInt(wrapper.getAttribute('data-nouislider-start')) || 0)

  const min = inputMin ? (parseInt(inputMin.getAttribute('min')) || 0) : (parseInt(wrapper.getAttribute('data-nouislider-min')) || 0)
  const max = inputMax ? (parseInt(inputMax.getAttribute('max')) || 10000) : (parseInt(wrapper.getAttribute('data-nouislider-max')) || 10000)
  const marginValue = ((max - min) * 5) / 100

  let pipValues = []
  const pipsAttr = wrapper.getAttribute('data-nouislider-pips')
  if (pipsAttr) {
    try {
      pipValues = JSON.parse(pipsAttr)
    } catch(e) {
      console.warn('data-nouislider-pips должен быть валидным JSON массивом', e)
    }
  }

  noUiSlider.create(sliderEl, {
    start: mode === 'multiple' ? [min, max] : sliderStart,
    connect: mode === 'multiple' ? true : 'lower',
    range: {
      'min': min,
      'max': max
    },
    step: sliderStep,
    margin: marginValue
  })

  if (pipValues.length) {
    sliderEl.noUiSlider.pips({
      mode: 'values',
      values: pipValues,
      density: 100,
      format: wNumb({
        decimals: 0,
        thousand: ' ',
        suffix: ` ${sliderPipsSuffix}`
      })
    })
  }

  sliderEl.noUiSlider.on('update', (values, handle) => {
    if (inputMin && inputMax) {
      const value = Math.round(values[handle])
      if (handle === 0) {
        inputMin.value = value
      } else {
        inputMax.value = value
      }
    }

    if (sliderCurrentEl) {
      if (mode === 'multiple') {
        sliderCurrentEl.textContent = `${Math.round(values[0]).toLocaleString()} - ${Math.round(values[1]).toLocaleString()} ${sliderCurrentSymbol}`
      } else {
        sliderCurrentEl.textContent = `${Math.round(values[0]).toLocaleString()} ${sliderCurrentSymbol}`
      }
    }

    if (pipValues.length) {
      const pips = wrapper.querySelectorAll('.noUi-value')
      const value = parseFloat(values[0])

      pips.forEach(pip => {
        const pipValue = parseFloat(pip.getAttribute('data-value'))
        const marker = pip.previousElementSibling
        if (!marker) return

        if (pipValue <= value) {
          marker.classList.add('is-active')
        } else {
          marker.classList.remove('is-active')
        }
      })
    }
  })

  if (inputMin && inputMax) {
    function setSliderFromInput(input, handleIndex) {
      let val = parseInt(input.value)
      if (isNaN(val)) val = handleIndex === 0 ? min : max
      if (val < min) val = min
      if (val > max) val = max

      sliderEl.noUiSlider.set(handleIndex === 0 ? [val, null] : [null, val])
    }

    inputMin.addEventListener('change', () => setSliderFromInput(inputMin, 0))
    inputMax.addEventListener('change', () => setSliderFromInput(inputMax, 1))

    inputMin.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault()
        setSliderFromInput(inputMin, 0)
      }
    })

    inputMax.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault()
        setSliderFromInput(inputMax, 1)
      }
    })
  }
})
