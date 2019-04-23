/* eslint-disable no-undef */
import BaseSelect from './_base-select'

describe('@components/_base-radio', () => {
  it('should render its content', () => {
    const wrapper = shallowMount(BaseSelect)
    expect(wrapper.findAll('.option').length).toEqual(0)
    expect(wrapper.find('.selectName').text()).toBe('All')
  })

  it('should render its content by click', () => {
    const wrapper = shallowMount(BaseSelect, {
      propsData: {
        options: options,
        value: { name: 'All', value: '' },
      },
    })
    wrapper.trigger('click')
    const radio = wrapper.findAll('.option input[type="radio"]').at(0)
    radio.setChecked(true)
    expect(radio.element.selected).toEqual(true)
  })

  it('should render its content when it has default', () => {
    const wrapper = shallowMount(BaseSelect, {
      propsData: {
        options: options,
        value: { name: 'Bruce Lee', value: 2 },
      },
    })
    expect(wrapper.find('.selectName').text()).toBe('Bruce Lee')
  })
})

const options = [
  { name: 'Jet Li', value: 1 },
  { name: 'Bruce Lee', value: 2 },
  { name: 'Jackie Chan', value: 3 },
]
