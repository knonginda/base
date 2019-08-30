/* eslint-disable no-undef */
import BaseSwitch from './_base-switch'

describe('@components/_base-checkbox', () => {
  it('renders its content', () => {
    const wrapper = shallowMount(BaseSwitch, {
      propsData: {
        onLabel: 'Yes',
        offLabel: 'No',
      },
    })
    expect(wrapper).toMatchSnapshot()
  })

  it('default value changes', () => {
    const wrapper = shallowMount(BaseSwitch, {
      propsData: {
        onLabel: 'Yes',
        offLabel: 'No',
      },
    })
    const checkbox = wrapper.find('input[type="checkbox"]')
    checkbox.setChecked(true)
    expect(wrapper.emitted('input', true)).toEqual([[true]])
    checkbox.setChecked(false)
    expect(wrapper.emitted('input', false)).toEqual([[true], [false]])
  })
})
