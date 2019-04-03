/* eslint-disable no-undef */
import BaseButton from './_base-button'

describe('@components/_base-button', () => {
  it('renders its content', () => {
    const slotContent = '<span>foo</span>'
    const { element } = shallowMount(BaseButton, {
      slots: {
        default: slotContent,
      },
    })
    expect(element.innerHTML).toContain(slotContent)
  })

  it('renders its content when theme is secondary', () => {
    const slotContent = '<span>secondary</span>'
    const wrapper = shallowMount(BaseButton, {
      propsData: {
        theme: 'secondary',
      },
      slots: {
        default: slotContent,
      },
    })
    expect(wrapper.html()).toBe(
      `<button class="secondary medium button"><span>secondary</span></button>`
    )
  })

  it('renders its content when theme is teritary', () => {
    const slotContent = '<span>teritary</span>'
    const wrapper = shallowMount(BaseButton, {
      propsData: {
        theme: 'teritary',
      },
      slots: {
        default: slotContent,
      },
    })
    expect(wrapper.html()).toBe(
      `<button class="teritary medium button"><span>teritary</span></button>`
    )
  })

  it('renders its content when size is large', () => {
    const slotContent = '<span>large</span>'
    const wrapper = shallowMount(BaseButton, {
      propsData: {
        size: 'large',
      },
      slots: {
        default: slotContent,
      },
    })
    expect(wrapper.html()).toBe(
      `<button class="primary large button"><span>large</span></button>`
    )
  })

  it('renders its content when size is small', () => {
    const slotContent = '<span>small</span>'
    const wrapper = shallowMount(BaseButton, {
      propsData: {
        size: 'small',
      },
      slots: {
        default: slotContent,
      },
    })
    expect(wrapper.html()).toBe(
      `<button class="primary small button"><span>small</span></button>`
    )
  })
})
