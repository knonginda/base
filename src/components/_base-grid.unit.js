/* eslint-disable no-undef */
import BaseGrid from './_base-grid'

describe('@components/_base-grid', () => {
  it('renders its content', () => {
    const wrapper = shallowMount(BaseGrid, {
      propsData: {
        data: gridData,
        columns: gridColumns,
        query: {
          limit: 2,
          offset: 2,
          filterKey: '',
          sort: '',
          order: '',
        },
      },
    })
    expect(wrapper).toMatchSnapshot()
  })

  it('renders its content when order by DESC sort by ID', () => {
    const wrapper = shallowMount(BaseGrid, {
      propsData: {
        data: gridData,
        columns: gridColumns,
        query: {
          limit: 2,
          offset: 0,
          filterKey: '',
          sort: 'id',
          order: 'desc',
        },
      },
    })
    expect(wrapper).toMatchSnapshot()
  })

  it('renders its content by click header', () => {
    const wrapper = shallowMount(BaseGrid, {
      propsData: {
        data: gridData,
        columns: gridColumns,
        query: {
          limit: 2,
          offset: 0,
          filterKey: '',
          sort: 'lastName',
          order: 'asc',
        },
      },
    })
    wrapper
      .findAll('.table > thead > tr > th')
      .at(0)
      .trigger('click')
    expect(wrapper).toMatchSnapshot()
  })

  it('renders its content when filter by DD', () => {
    const wrapper = shallowMount(BaseGrid, {
      propsData: {
        data: gridData,
        columns: gridColumns,
        query: {
          limit: 2,
          offset: 0,
          filterKey: 'DD',
          sort: '',
          order: '',
        },
      },
    })
    expect(wrapper).toMatchSnapshot()
  })

  it('should select item by click checkbox', () => {
    const wrapper = shallowMount(BaseGrid, {
      propsData: {
        data: gridData,
        columns: gridColumns,
        query: {
          limit: 2,
          offset: 0,
          filterKey: '',
          sort: '',
          order: '',
        },
        selector: true,
      },
    })
    const tr = wrapper.findAll('.table > tbody > tr').at(0)
    const td = tr.findAll('td').at(0)
    const checkbox = td.find('input[type="checkbox"]')
    checkbox.trigger('click')
    expect(gridData[0].isSelected).toBe(true)
  })

  it('should unselect item by click checkbox', () => {
    const wrapper = shallowMount(BaseGrid, {
      propsData: {
        data: gridData,
        columns: gridColumns,
        query: {
          limit: 2,
          offset: 0,
          filterKey: '',
          sort: '',
          order: '',
        },
        selector: true,
      },
    })
    wrapper.setData({
      selectedItems: [
        {
          lastName: 'AA',
          firstName: 'AAA',
          id: 1,
          isSelected: true,
        },
      ],
    })
    const tr = wrapper.findAll('.table > tbody > tr').at(0)
    const td = tr.findAll('td').at(0)
    const checkbox = td.find('input[type="checkbox"]')
    checkbox.trigger('click')
    expect(gridData[0].isSelected).toBe(false)
  })

  it('should select all item by click checkbox', () => {
    const wrapper = shallowMount(BaseGrid, {
      propsData: {
        data: gridData,
        columns: gridColumns,
        query: {
          limit: 2,
          offset: 0,
          filterKey: '',
          sort: '',
          order: '',
        },
        selector: true,
      },
    })
    const th = wrapper.findAll('.table > thead > tr > th').at(0)
    const checkbox = th.find('input[type="checkbox"]')
    checkbox.setChecked(true)
    expect(wrapper.vm.selectedItems.length).toEqual(26)
  })

  it('should unselect all item by click checkbox', () => {
    const wrapper = shallowMount(BaseGrid, {
      propsData: {
        data: gridData,
        columns: gridColumns,
        query: {
          limit: 2,
          offset: 0,
          filterKey: '',
          sort: '',
          order: '',
        },
        selector: true,
      },
    })
    wrapper.setData({
      selectedItems: gridData,
      isSelectAll: true,
    })
    const th = wrapper.findAll('.table > thead > tr > th').at(0)
    const checkbox = th.find('input[type="checkbox"]')
    checkbox.setChecked(false)
    expect(wrapper.vm.selectedItems.length).toEqual(0)
  })

  it('should jump to page 5 when you click on the page 5', () => {
    const wrapper = shallowMount(BaseGrid, {
      propsData: {
        data: gridData,
        columns: gridColumns,
        query: {
          limit: 2,
          offset: 0,
          filterKey: '',
          sort: '',
          order: '',
        },
      },
    })
    const pageItem = wrapper.findAll('.pagination .pageItem').at(4)
    const pageLink = pageItem.find('.pageLink')
    pageLink.trigger('click')
    expect(wrapper.vm.query.offset).toBe(8)
  })

  it('should turn to next page when click next button', () => {
    const wrapper = shallowMount(BaseGrid, {
      propsData: {
        data: gridData,
        columns: gridColumns,
        query: {
          limit: 2,
          offset: 0,
          filterKey: '',
          sort: '',
          order: '',
        },
      },
    })
    const pageItem = wrapper.findAll('.pagination .pageItem').at(9)
    pageItem.trigger('click')
    expect(wrapper.vm.query.offset).toBe(2)
  })
})

let gridColumns = [
  {
    key: 'lastName',
    label: 'Last Name',
  },
  {
    key: 'firstName',
    label: 'First Name',
  },
  {
    key: 'id',
    label: 'ID',
  },
]
let gridData = [
  {
    lastName: 'AA',
    firstName: 'AAA',
    id: 1,
  },
  {
    lastName: 'BB',
    firstName: 'BBB',
    id: 2,
  },
  {
    lastName: 'CC',
    firstName: 'CCC',
    id: 3,
  },
  {
    lastName: 'DD',
    firstName: 'DDD',
    id: 4,
  },
  {
    lastName: 'EE',
    firstName: 'EEE',
    id: 5,
  },
  {
    lastName: 'FF',
    firstName: 'FFF',
    id: 6,
  },
  {
    lastName: 'GG',
    firstName: 'GGG',
    id: 7,
  },
  {
    lastName: 'HH',
    firstName: 'HHH',
    id: 8,
  },
  {
    lastName: 'II',
    firstName: 'III',
    id: 9,
  },
  {
    lastName: 'JJ',
    firstName: 'JJJ',
    id: 10,
  },
  {
    lastName: 'KK',
    firstName: 'KKK',
    id: 11,
  },
  {
    lastName: 'LL',
    firstName: 'LLL',
    id: 12,
  },
  {
    lastName: 'MM',
    firstName: 'MMM',
    id: 13,
  },
  {
    lastName: 'NN',
    firstName: 'NNN',
    id: 14,
  },
  {
    lastName: 'OO',
    firstName: 'OOO',
    id: 15,
  },
  {
    lastName: 'PP',
    firstName: 'PPP',
    id: 16,
  },
  {
    lastName: 'QQ',
    firstName: 'QQQ',
    id: 17,
  },
  {
    lastName: 'RR',
    firstName: 'RRR',
    id: 18,
  },
  {
    lastName: 'SS',
    firstName: 'SSS',
    id: 19,
  },
  {
    lastName: 'TT',
    firstName: 'TTT',
    id: 20,
  },
  {
    lastName: 'UU',
    firstName: 'UUU',
    id: 21,
  },
  {
    lastName: 'VV',
    firstName: 'VVV',
    id: 22,
  },
  {
    lastName: 'WW',
    firstName: 'WWW',
    id: 23,
  },
  {
    lastName: 'XX',
    firstName: 'XXX',
    id: 24,
  },
  {
    lastName: 'YY',
    firstName: 'YYY',
    id: 25,
  },
  {
    lastName: 'ZZ',
    firstName: 'ZZZ',
    id: 26,
  },
]
