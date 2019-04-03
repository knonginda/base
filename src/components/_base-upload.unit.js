/* eslint-disable no-undef */
import BaseUpload from './_base-upload'

describe('@components/_base-radio', () => {
  it('renders its content', () => {
    const wrapper = shallowMount(BaseUpload)
    wrapper.find('input[type="file"]').trigger('change')
    expect(wrapper).toMatchSnapshot()
  })
})
