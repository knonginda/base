/* eslint-disable no-undef */
import BaseInput from './_base-input'

describe('@components/_base-input', () => {
  it('works with v-model', () => {
    const wrapper = shallowMount(BaseInput, {
      propsData: {
        value: 'aaa',
        debounce: '0',
      },
    })
    const input = wrapper.find('input')
    const inputEl = input.element

    expect(inputEl.value).toEqual('aaa')

    inputEl.value = 'bbb'
    input.trigger('input')
    setTimeout(() => {
      expect(wrapper.emitted().update).toEqual([['bbb']])
    })

    wrapper.setProps({
      value: 'ccc',
    })
    expect(inputEl.value).toEqual('ccc')
  })
})
