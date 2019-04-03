/* eslint-disable no-undef */
import BaseRadio from './_base-radio'

describe('@components/_base-radio', () => {
  it('should renders its content', () => {
    const slotContent = '<span>foo</span>'
    const { element } = shallowMount(BaseRadio, {
      slots: {
        default: slotContent,
      },
    })
    expect(element.innerHTML).toContain(slotContent)
  })

  it('should de checked when clicked', () => {
    const wrapper = shallowMount(BaseRadio, {
      slots: {
        default: 'Yes',
      },
      propsData: {
        name: 'radio-group',
        value: 'Yes',
        modelValue: 'No',
        checked: true,
      },
    })
    const radio = wrapper.find('input[type="radio"]')
    radio.setChecked(true)
    expect(radio.element.selected).toEqual(true)
  })
})
