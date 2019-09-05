/* eslint-disable no-undef */
import BaseSelectMultiple from './_base-select-multiple'

describe('@components/_base-select-multiple', () => {
  it('should select all when click All selection', () => {
    const wrapper = shallowMount(BaseSelectMultiple, {
      propsData: {
        options: options,
        value: [],
      },
    })
    wrapper.trigger('click')
    const checkbox = wrapper.findAll('input[type="checkbox"]').at(0)
    checkbox.setChecked(true)
    expect(wrapper.vm.selectedValues.length).toEqual(3)
  })
  it('should unselect all when click All selection again', () => {
    const wrapper = shallowMount(BaseSelectMultiple, {
      propsData: {
        options: options,
        value: [],
      },
    })
    wrapper.trigger('click')
    const checkbox = wrapper.findAll('input[type="checkbox"]').at(0)
    checkbox.setChecked(true)
    checkbox.setChecked(false)
    expect(wrapper.vm.selectedValues.length).toEqual(0)
  })
  it('should be selected when clicking', () => {
    const wrapper = shallowMount(BaseSelectMultiple, {
      propsData: {
        options: options,
        value: [],
      },
    })
    wrapper.trigger('click')
    const checkbox1 = wrapper.findAll('input[type="checkbox"]').at(1)
    const checkbox2 = wrapper.findAll('input[type="checkbox"]').at(2)
    checkbox1.setChecked(true)
    checkbox2.setChecked(true)
    expect(wrapper.vm.selectedValues.length).toEqual(2)
  })
  it('should be unselected when clicking', () => {
    const wrapper = shallowMount(BaseSelectMultiple, {
      propsData: {
        options: options,
        value: ['1', '2'],
      },
    })
    wrapper.trigger('click')
    const checkbox1 = wrapper.findAll('input[type="checkbox"]').at(1)
    const checkbox2 = wrapper.findAll('input[type="checkbox"]').at(2)
    checkbox1.setChecked(false)
    checkbox2.setChecked(false)
    expect(wrapper.vm.selectedValues.length).toEqual(0)
  })
  it('should render its content when no item was selected', () => {
    const wrapper = shallowMount(BaseSelectMultiple, {
      propsData: {
        options: options,
        value: [],
      },
    })
    expect(wrapper.vm.selectedValues.length).toEqual(0)
    expect(wrapper.vm.howManySelected()).toBe('')
  })
  it('should render its content when selected 2 items', () => {
    const wrapper = shallowMount(BaseSelectMultiple, {
      propsData: {
        options: options,
        value: ['1', '2'],
      },
    })
    expect(wrapper.vm.selectedValues.includes('1')).toBe(true)
    expect(wrapper.vm.selectedValues.includes('2')).toBe(true)
    expect(wrapper.vm.howManySelected()).toBe('Selected (2)')
  })
  it('fiterable component should works correctly', () => {
    const wrapper = shallowMount(BaseSelectMultiple, {
      propsData: {
        options: options,
        value: [],
        filterable: true,
      },
    })
    wrapper.find('.spaceBetween').trigger('click')
    wrapper.vm.matchingValue = 'Jet Li'
    expect(wrapper.find('.matchingInput').exists()).toBe(true)
    expect(wrapper.findAll('li').length).toEqual(1)
  })
  it('fiterable component should disabled correctly', () => {
    const wrapper = shallowMount(BaseSelectMultiple, {
      propsData: {
        options: options,
        value: [],
        filterable: false,
      },
    })
    wrapper.find('.spaceBetween').trigger('click')
    expect(wrapper.find('.matchingInput').exists()).toBe(false)
  })
})

const options = [
  { name: 'All', value: '' },
  { name: 'Jet Li', value: '1' },
  { name: 'Bruce Lee', value: '2' },
  { name: 'Jackie Chan', value: '3' },
]
