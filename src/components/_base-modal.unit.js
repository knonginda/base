/* eslint-disable no-undef */
import BaseModal from './_base-modal'

const mountBaseModal = (options = {}) => {
  return shallowMount(BaseModal, {
    slots: {
      default: 'Lorem Ipsum.',
    },
    ...options,
  })
}

describe('@components/_base-modal', () => {
  it('should has title which from props', () => {
    const wrapper = mountBaseModal({
      propsData: {
        title: 'The title from props',
      },
    })
    expect(wrapper.element.innerHTML).toContain('The title from props')
  })

  it('should has title which from slot', () => {
    const wrapper = mountBaseModal({
      slots: {
        title: 'The title from slots',
      },
    })
    expect(wrapper.element.innerHTML).toContain('The title from slots')
  })

  it('should adjust height and width with pixel', () => {
    const wrapper = mountBaseModal({
      propsData: {
        width: '500px',
        height: '300px',
      },
    })
    expect(wrapper.find('.baseModal').attributes().style).toBe(
      'width: 500px; max-width: none;'
    )
    expect(wrapper.find('.baseContent').attributes().style).toBe(
      'height: 300px; max-height: none;'
    )
  })

  it('should adjust height and width without pixel', () => {
    const wrapper = mountBaseModal({
      propsData: {
        width: '500',
        height: '300',
      },
    })
    expect(wrapper.find('.baseModal').attributes().style).toBe(
      'width: 500px; max-width: none;'
    )
    expect(wrapper.find('.baseContent').attributes().style).toBe(
      'height: 300px; max-height: none;'
    )
  })

  it('should close the modal', () => {
    const wrapper = mountBaseModal()
    wrapper.vm.close()
    expect(wrapper.vm.$data.isOpen).toBe(false)
    expect(wrapper.find('.baseModalOverlay').attributes().style).toBe(
      'display: none;'
    )
  })

  it('should open the modal', () => {
    const wrapper = mountBaseModal()
    wrapper.vm.open()
    expect(wrapper.vm.$data.isOpen).toBe(true)
    expect(wrapper.find('.baseModalOverlay').attributes().style).not.toBe(
      'display: none;'
    )
  })

  it('should close the modal when click overlay', () => {
    const wrapper = mountBaseModal()
    wrapper.vm.open()
    expect(wrapper.vm.$data.isOpen).toBe(true)
    wrapper.find('.baseModalClickable').trigger('click')
    expect(wrapper.vm.$data.visible).toBe(false)
  })

  it('should block the modal', () => {
    const wrapper = mountBaseModal({
      propsData: {
        blocking: true,
      },
    })
    wrapper.vm.open()
    expect(wrapper.vm.$data.isOpen).toBe(true)
    wrapper.find('.baseModalClickable').trigger('click')
    expect(wrapper.vm.$data.isOpen).toBe(true)
  })
})
