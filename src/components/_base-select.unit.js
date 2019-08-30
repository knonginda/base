/* eslint-disable no-undef */
import BaseSelect from './_base-select'

describe('@components/_base-select', () => {
  it('should render its content', () => {
    const wrapper = shallowMount(BaseSelect, {
      propsData: {
        options: options,
        value: '1',
      },
    })
    expect(wrapper.find('.selectName').text()).toBe('Jet Li')
    expect(wrapper.findAll('.option').length).toEqual(3)
  })

  it('should render its content by click', () => {
    const wrapper = shallowMount(BaseSelect, {
      propsData: {
        options: options,
        value: '1',
      },
    })
    wrapper.trigger('click')
    const radio = wrapper.findAll('.option input[type="radio"]').at(1)
    radio.setChecked(true)
    expect(radio.element.selected).toEqual(true)
  })

  it('editable component should works correctly', () => {
    const wrapper = shallowMount(BaseSelect, {
      propsData: {
        options: options,
        value: '1',
        editable: true,
      },
    })
    wrapper.find('.spaceBetween').trigger('click')
    wrapper.vm.matchingValue = 'Bruce Lee'
    expect(
      wrapper
        .findAll('li')
        .at(0)
        .html()
    ).toContain('<li style="display: none;">')
    expect(
      wrapper
        .findAll('li')
        .at(1)
        .html()
    ).not.toContain('<li style="display: none;">')
    expect(
      wrapper
        .findAll('li')
        .at(2)
        .html()
    ).toContain('<li style="display: none;">')
  })
})

const options = [
  { name: 'Jet Li', value: '1' },
  { name: 'Bruce Lee', value: '2' },
  { name: 'Jackie Chan', value: '3' },
]
