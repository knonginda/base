/* eslint-disable no-undef */
import BaseCheckbox from './_base-checkbox'

describe('@components/_base-checkbox', () => {
  it('renders its content', () => {
    const slotContent = '<span>foo</span>'
    const { element } = shallowMount(BaseCheckbox, {
      slots: {
        default: slotContent,
      },
    })
    expect(element.innerHTML).toContain(slotContent)
  })

  it('default value changes', () => {
    const wrapper = shallowMount(BaseCheckbox)

    const checkbox = wrapper.find('input[type="checkbox"]')

    checkbox.setChecked(true)
    expect(wrapper.emitted('input', true)).toEqual([[true]])

    checkbox.setChecked(false)
    expect(wrapper.emitted('input', false)).toEqual([[true], [false]])
  })

  it('trueValue and falseValue changes', () => {
    const wrapper = shallowMount(BaseCheckbox, {
      propsData: {
        trueValue: 'Y',
        falseValue: 'N',
      },
    })

    const checkbox = wrapper.find('input[type="checkbox"]')

    checkbox.setChecked(true)
    expect(wrapper.emitted('input', 'Y')).toEqual([['Y']])

    checkbox.setChecked(false)
    expect(wrapper.emitted('input', 'N')).toEqual([['Y'], ['N']])
  })
})
