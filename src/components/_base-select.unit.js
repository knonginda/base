/* eslint-disable no-undef */
import BaseSelect from './_base-select'

describe('@components/_base-radio', () => {
  it('should render its content', () => {
    const wrapper = shallowMount(BaseSelect)
    expect(wrapper.findAll('.option').length).toEqual(0)
    expect(wrapper.find('.selectName').text()).toBe('Select')
  })

  it('should render its content by click', () => {
    const wrapper = shallowMount(BaseSelect, {
      propsData: {
        options: options,
      },
    })
    const radio = wrapper.findAll('.option input[type="radio"]').at(0)
    radio.setChecked(true)
    expect(radio.element.selected).toEqual(true)
  })

  it('should render its content when it has default', () => {
    const wrapper = shallowMount(BaseSelect, {
      propsData: {
        options: options,
        value: { key: 1, value: 'Bruce Lee' },
      },
    })
    expect(wrapper.find('.selectName').text()).toBe('Bruce Lee')
  })
})

const options = [
  { key: 0, value: 'Jet Li' },
  { key: 1, value: 'Bruce Lee' },
  { key: 2, value: 'Jackie Chan' },
]
