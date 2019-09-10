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
    expect(wrapper.findAll('.option').length).toEqual(4)
  })

  it('should render its content by click', () => {
    const wrapper = shallowMount(BaseSelect, {
      propsData: {
        options: options,
        value: '',
      },
    })
    wrapper.trigger('click')
    const radio = wrapper.findAll('.option input[type="radio"]').at(1)
    radio.setChecked(true)
    expect(radio.element.selected).toEqual(true)
    expect(wrapper.vm.selectedValue).toEqual('1')
  })

  it('should render its content by clicking ALL option', () => {
    const wrapper = shallowMount(BaseSelect, {
      propsData: {
        options: options,
        value: '',
      },
    })
    wrapper.trigger('click')
    const radio = wrapper.findAll('.option input[type="radio"]').at(0)
    radio.setChecked(true)
    expect(radio.element.selected).toEqual(true)
    expect(wrapper.vm.selectedValue).toEqual('')
    expect(wrapper.html()).toContain('<span class="optionName">ALL</span>')
  })

  it('should render its content by ALL option was disabled', () => {
    const wrapper = shallowMount(BaseSelect, {
      propsData: {
        options: options,
        value: '3',
        needAllOption: false,
      },
    })
    wrapper.trigger('click')
    expect(wrapper.html()).not.toContain('<span class="optionName">ALL</span>')
  })

  describe('filterable should works correctly', () => {
    it('when its value equals true', () => {
      const wrapper = shallowMount(BaseSelect, {
        propsData: {
          options: options,
          value: '',
        },
      })
      wrapper.find('.spaceBetween').trigger('click')
      wrapper.vm.matchingValue = 'Bruce Lee'
      expect(
        wrapper
          .findAll('li')
          .at(1)
          .html()
      ).toContain('<li style="display: none;">')
      expect(
        wrapper
          .findAll('li')
          .at(2)
          .html()
      ).not.toContain('<li style="display: none;">')
      expect(
        wrapper
          .findAll('li')
          .at(3)
          .html()
      ).toContain('<li style="display: none;">')
    })
    it('when its value equals false', () => {
      const wrapper = shallowMount(BaseSelect, {
        propsData: {
          options: options,
          value: '',
          filterable: false,
        },
      })
      wrapper.find('.spaceBetween').trigger('click')
      expect(wrapper.find('.matchingInput').exists()).toBe(false)
    })
  })
})

const options = [
  { name: 'Jet Li', value: '1' },
  { name: 'Bruce Lee', value: '2' },
  { name: 'Jackie Chan', value: '3' },
]
