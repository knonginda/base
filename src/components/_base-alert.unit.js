/* eslint-disable no-undef */
import BaseAlert from './_base-alert'

describe('@components/_base-alert', () => {
  it('renders its content', () => {
    const slotTitleContent = '<span>title</span>'
    const slotContent = '<span>foo</span>'
    const wrapper = shallowMount(BaseAlert, {
      slots: {
        title: slotTitleContent,
        default: slotContent,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders its content when theme equals success', () => {
    const slotTitleContent = '<span>title</span>'
    const slotContent = '<span>foo</span>'
    const wrapper = shallowMount(BaseAlert, {
      propsData: {
        theme: 'success',
      },
      slots: {
        title: slotTitleContent,
        default: slotContent,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders its content when theme equals warning', () => {
    const slotTitleContent = '<span>title</span>'
    const slotContent = '<span>foo</span>'
    const wrapper = shallowMount(BaseAlert, {
      propsData: {
        theme: 'warning',
      },
      slots: {
        title: slotTitleContent,
        default: slotContent,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders its content when theme equals danger', () => {
    const slotTitleContent = '<span>title</span>'
    const slotContent = '<span>foo</span>'
    const wrapper = shallowMount(BaseAlert, {
      propsData: {
        theme: 'danger',
      },
      slots: {
        title: slotTitleContent,
        default: slotContent,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders its content when theme equals info', () => {
    const slotTitleContent = '<span>title</span>'
    const slotContent = '<span>foo</span>'
    const wrapper = shallowMount(BaseAlert, {
      propsData: {
        theme: 'info',
      },
      slots: {
        title: slotTitleContent,
        default: slotContent,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
