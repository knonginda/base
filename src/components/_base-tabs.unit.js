/* eslint-disable no-undef */
import BaseTabs from './_base-tabs'

const mountTabs = (options = {}) => {
  return mount(BaseTabs, {
    ...createComponentMocks({
      slots: {
        default: `
          <BaseTab title="Tab Title1" active>Tab Content1</BaseTab>
          <BaseTab title="Tab Title2">Tab Content2</BaseTab>
          <BaseTab title="Tab Title3" disabled>Tab Content3</BaseTab>
        `,
      },
    }),
    ...options,
  })
}

describe('@components/_base-tabs', () => {
  let wrapper = mountTabs()

  it('should open the first tab', () => {
    expect(
      wrapper
        .findAll('.tabContent > div')
        .at(0)
        .attributes().style
    ).not.toBe('display: none;')

    expect(
      wrapper
        .findAll('.tabContent > div')
        .at(1)
        .attributes().style
    ).toBe('display: none;')

    expect(
      wrapper
        .findAll('.tabContent > div')
        .at(2)
        .attributes().style
    ).toBe('display: none;')

    expect(
      wrapper
        .findAll('.tabItem')
        .at(0)
        .classes()
    ).toContain('active')

    expect(
      wrapper
        .findAll('.tabItem')
        .at(1)
        .classes()
    ).not.toContain('active')

    expect(
      wrapper
        .findAll('.tabItem')
        .at(2)
        .classes()
    ).not.toContain('active')
  })

  it('should open the second tab', () => {
    wrapper
      .findAll('.tabItem')
      .at(1)
      .trigger('click')
    expect(
      wrapper
        .findAll('.tabContent > div')
        .at(0)
        .attributes().style
    ).toBe('display: none;')

    expect(
      wrapper
        .findAll('.tabContent > div')
        .at(1)
        .attributes().style
    ).not.toBe('display: none;')

    expect(
      wrapper
        .findAll('.tabContent > div')
        .at(2)
        .attributes().style
    ).toBe('display: none;')

    expect(
      wrapper
        .findAll('.tabItem')
        .at(0)
        .classes()
    ).not.toContain('active')

    expect(
      wrapper
        .findAll('.tabItem')
        .at(1)
        .classes()
    ).toContain('active')

    expect(
      wrapper
        .findAll('.tabItem')
        .at(2)
        .classes()
    ).not.toContain('active')
  })

  it('should be medium size', () => {
    expect(wrapper.element.outerHTML).toContain('medium')
  })

  it('should disabeld third tab', () => {
    expect(
      wrapper
        .findAll('.tabItem')
        .at(2)
        .classes()
    ).toContain('disabled')
  })
})

describe('@components/_base-tabs', () => {
  let wrapper = mountTabs({
    propsData: {
      size: 'large',
    },
  })

  it('should render its content when size is large', () => {
    expect(wrapper).toMatchSnapshot()
  })
})

describe('@components/_base-tabs', () => {
  let wrapper = mountTabs({
    propsData: {
      size: 'small',
    },
  })

  it('should render its content when size is small', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
