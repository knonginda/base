/* eslint-disable no-undef */
import Vue from 'vue'
import BaseGrid from './_base-grid'

const eventBus = new Vue()
let stickyRows = '0'
let selectable = false
const mountBaseGrid = (options = {}) => {
  return shallowMount(BaseGrid, {
    propsData: {
      data: gridData,
      columns: gridColumns,
      eventBus: eventBus,
      stickyRows: stickyRows,
      selectable: selectable,
      query: {
        ...options,
      },
    },
  })
}

describe('@components/_base-grid', () => {
  afterEach(() => {
    stickyRows = '0'
    selectable = false
  })
  it('renders its content', () => {
    const wrapper = mountBaseGrid({
      limit: 5,
      offset: 0,
    })
    expect(wrapper).toMatchSnapshot()
  })

  it('resetData() should be called when created()', () => {
    const wrapper = mountBaseGrid({
      limit: 5,
      offset: 4,
    })
    wrapper.vm.eventBus.$emit('onResetData')
    wrapper.vm.resetData = jest.fn()
    setTimeout(() => {
      expect(wrapper.vm.resetData).toHaveBeenCalled()
    })
  })

  // limit: 26 (all data)
  // Return all data and test,
  // otherwise it will only return the data of the current page,
  // which will result in inaccurate test results.
  describe('should works with selectable', () => {
    it('select all to be true', () => {
      selectable = true
      const { vm } = mountBaseGrid({
        limit: 26,
        offset: 4,
      })
      vm.isSelectAll = true
      vm.selectAll()
      for (let item of vm.filteredData) {
        expect(item.isSelected).toBe(true)
      }
    })
    it('select all to be false', () => {
      selectable = true
      const { vm } = mountBaseGrid({
        limit: 26,
        offset: 4,
      })
      vm.isSelectAll = true
      vm.selectAll()
      vm.isSelectAll = false
      vm.selectAll()
      for (let item of vm.filteredData) {
        expect(item.isSelected).toBe(false)
      }
    })
  })

  it('should sticky two rows', () => {
    stickyRows = '2'
    const { vm } = mountBaseGrid({
      limit: 5,
      offset: 4,
    })
    // Before sorting
    expect(vm.filteredData[0].lastName).toEqual('AA')
    expect(vm.filteredData[1].lastName).toEqual('BB')
    expect(vm.filteredData[2].lastName).toEqual('GG')
    expect(vm.filteredData[3].lastName).toEqual('HH')
    expect(vm.filteredData[4].lastName).toEqual('II')
    expect(vm.filteredData[5].lastName).toEqual('JJ')
    expect(vm.filteredData[6].lastName).toEqual('KK')
    vm.sortBy({
      key: 'lastName',
      label: 'Last Name',
      sort: true,
    })
    // After sorting
    // Should sticky first two rows
    expect(vm.filteredData[0].lastName).toEqual('AA')
    expect(vm.filteredData[1].lastName).toEqual('BB')
    // Should Changed
    expect(vm.filteredData[2].lastName).toEqual('VV')
    expect(vm.filteredData[3].lastName).toEqual('UU')
    expect(vm.filteredData[4].lastName).toEqual('TT')
    expect(vm.filteredData[5].lastName).toEqual('SS')
    expect(vm.filteredData[6].lastName).toEqual('RR')
  })

  describe('should works with sort and order', () => {
    it('by asc', () => {
      const { vm } = mountBaseGrid({
        limit: 5,
        offset: 0,
        sort: 'lastName',
        order: '',
      })
      expect(vm.sortKey).toEqual('lastName')
      expect(vm.sortOrders['lastName']).toEqual(1)
    })
    it('by desc', () => {
      const { vm } = mountBaseGrid({
        limit: 5,
        offset: 0,
        sort: 'lastName',
        order: 'desc',
      })
      expect(vm.sortKey).toEqual('lastName')
      expect(vm.sortOrders['lastName']).toEqual(-1)
    })
    it('click the column you want to sort', () => {
      const { vm } = mountBaseGrid({
        limit: 5,
        offset: 0,
        sort: '',
        order: '',
      })
      vm.sortBy({
        key: 'disposition.value',
        label: 'Disposition',
        sort: true,
      })
      expect(vm.sortKey).toEqual('disposition.value')
      expect(vm.sortOrders['disposition.value']).toEqual(-1)
    })
  })

  describe('should works with pagination', () => {
    it('to the first page by an offset', () => {
      const { vm } = mountBaseGrid({
        limit: 2,
        offset: 0,
      })
      expect(vm.dspBtns).toEqual([1, 2, 3, 4, 5, 6, 7, 0, 13])
    })
    it('to the middle page via an offset', () => {
      const { vm } = mountBaseGrid({
        limit: 2,
        offset: 12,
      })
      expect(vm.dspBtns).toEqual([1, 0, 5, 6, 7, 8, 9, 0, 13])
    })
    it('to the last page by an offset', () => {
      const { vm } = mountBaseGrid({
        limit: 2,
        offset: 24,
      })
      expect(vm.dspBtns).toEqual([1, 0, 7, 8, 9, 10, 11, 12, 13])
    })
    it('click to select the page you want to jump to', () => {
      const { vm } = mountBaseGrid({
        limit: 2,
        offset: 0,
      })
      vm.handleClick(5)
      expect(vm.query.offset).toEqual(8)
    })
    it('click to go to the next page', () => {
      const { vm } = mountBaseGrid({
        limit: 2,
        offset: 4,
      })
      vm.turnPage(1)
      expect(vm.query.offset).toEqual(6)
    })
    it('click back to the previous page', () => {
      const { vm } = mountBaseGrid({
        limit: 2,
        offset: 4,
      })
      vm.turnPage(-1)
      expect(vm.query.offset).toEqual(2)
    })
    it('how many per page', () => {
      const { vm } = mountBaseGrid({
        limit: 2,
        offset: 0,
      })
      vm.perPage.value = 5
      expect(vm.query.limit).toEqual(5)
    })
  })

  // limit: 26 (all data)
  // Return all data and test,
  // otherwise it will only return the data of the current page,
  // which will result in inaccurate test results.
  describe('should works with filter', () => {
    it('filter string type', () => {
      const { vm } = mountBaseGrid({
        limit: 26,
        offset: 0,
        filterKey: {
          lastName: 'BB',
        },
      })
      expect(vm.filteredData.length).toEqual(1)
    })
    it('filter numeric type', () => {
      const { vm } = mountBaseGrid({
        limit: 26,
        offset: 0,
        filterKey: {
          id: 2,
        },
      })
      expect(vm.filteredData.length).toEqual(1)
    })
    it('filter key/value type', () => {
      const { vm } = mountBaseGrid({
        limit: 26,
        offset: 0,
        filterKey: {
          disposition: 'No Sale',
        },
      })
      expect(vm.filteredData.length).toEqual(8)
    })
    it('filter via global search', () => {
      const { vm } = mountBaseGrid({
        limit: 26,
        offset: 0,
        filterKey: 'No Sure',
      })
      expect(vm.filteredData.length).toEqual(18)
    })

    describe('filter data by date range', () => {
      it('should return 5 items when startDate less than endDate', () => {
        const { vm } = mountBaseGrid({
          limit: 26,
          offset: 0,
          filterKey: {
            date: {
              startDate: '01/01/2001',
              endDate: '01/01/2005',
            },
          },
        })
        expect(vm.filteredData.length).toEqual(5)
      })
      it('should return 0 item when startDate greater than endDate', () => {
        const { vm } = mountBaseGrid({
          limit: 26,
          offset: 0,
          filterKey: {
            date: {
              startDate: '01/01/2006',
              endDate: '01/01/2005',
            },
          },
        })
        expect(vm.filteredData.length).toEqual(0)
      })
    })
  })
})

let gridColumns = [
  {
    key: 'lastName',
    label: 'Last Name',
    sort: true,
  },
  {
    key: 'firstName',
    label: 'First Name',
    sort: true,
  },
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'disposition.value',
    label: 'Disposition',
  },
  {
    key: 'date',
    label: 'Date',
  },
]
let gridData = [
  {
    lastName: 'AA',
    firstName: 'AAA',
    id: 1,
    disposition: {
      key: 'No Sale',
      value: 'Too expensensive',
    },
    date: '01/01/2001',
  },
  {
    lastName: 'BB',
    firstName: 'BBB',
    id: 2,
    disposition: {
      key: 'No Sale',
      value: 'Too expensensive',
    },
    date: '01/01/2002',
  },
  {
    lastName: 'CC',
    firstName: 'CCC',
    id: 3,
    disposition: {
      key: 'Other',
      value: 'No sure',
    },
    date: '01/01/2003',
  },
  {
    lastName: 'DD',
    firstName: 'DDD',
    id: 4,
    disposition: {
      key: 'Other',
      value: 'No sure',
    },
    date: '01/01/2004',
  },
  {
    lastName: 'EE',
    firstName: 'EEE',
    id: 5,
    disposition: {
      key: 'Other',
      value: 'No sure',
    },
    date: '01/01/2005',
  },
  {
    lastName: 'FF',
    firstName: 'FFF',
    id: 6,
    disposition: {
      key: 'No Sale',
      value: 'Too expensensive',
    },
    date: '01/01/2006',
  },
  {
    lastName: 'GG',
    firstName: 'GGG',
    id: 7,
    disposition: {
      key: 'Other',
      value: 'No sure',
    },
    date: '01/01/2007',
  },
  {
    lastName: 'HH',
    firstName: 'HHH',
    id: 8,
    disposition: {
      key: 'Other',
      value: 'No sure',
    },
    date: '01/01/2008',
  },
  {
    lastName: 'II',
    firstName: 'III',
    id: 9,
    disposition: {
      key: 'Other',
      value: 'No sure',
    },
    date: '01/01/2009',
  },
  {
    lastName: 'JJ',
    firstName: 'JJJ',
    id: 10,
    disposition: {
      key: 'No Sale',
      value: 'Too expensensive',
    },
    date: '01/01/2010',
  },
  {
    lastName: 'KK',
    firstName: 'KKK',
    id: 11,
    disposition: {
      key: 'Other',
      value: 'No sure',
    },
    date: '01/01/2011',
  },
  {
    lastName: 'LL',
    firstName: 'LLL',
    id: 12,
    disposition: {
      key: 'Other',
      value: 'No sure',
    },
    date: '01/01/2012',
  },
  {
    lastName: 'MM',
    firstName: 'MMM',
    id: 13,
    disposition: {
      key: 'Other',
      value: 'No sure',
    },
    date: '01/01/2013',
  },
  {
    lastName: 'NN',
    firstName: 'NNN',
    id: 14,
    disposition: {
      key: 'Other',
      value: 'No sure',
    },
    date: '01/01/2014',
  },
  {
    lastName: 'OO',
    firstName: 'OOO',
    id: 15,
    disposition: {
      key: 'No Sale',
      value: 'Too expensensive',
    },
    date: '01/01/2015',
  },
  {
    lastName: 'PP',
    firstName: 'PPP',
    id: 16,
    disposition: {
      key: 'Other',
      value: 'No sure',
    },
    date: '01/01/2016',
  },
  {
    lastName: 'QQ',
    firstName: 'QQQ',
    id: 17,
    disposition: {
      key: 'Other',
      value: 'No sure',
    },
    date: '01/01/2017',
  },
  {
    lastName: 'RR',
    firstName: 'RRR',
    id: 18,
    disposition: {
      key: 'No Sale',
      value: 'Too expensensive',
    },
    date: '01/01/2018',
  },
  {
    lastName: 'SS',
    firstName: 'SSS',
    id: 19,
    disposition: {
      key: 'Other',
      value: 'No sure',
    },
    date: '01/01/2019',
  },
  {
    lastName: 'TT',
    firstName: 'TTT',
    id: 20,
    disposition: {
      key: 'No Sale',
      value: 'Too expensensive',
    },
    date: '01/01/2020',
  },
  {
    lastName: 'UU',
    firstName: 'UUU',
    id: 21,
    disposition: {
      key: 'No Sale',
      value: 'Too expensensive',
    },
    date: '01/01/2021',
  },
  {
    lastName: 'VV',
    firstName: 'VVV',
    id: 22,
    disposition: {
      key: 'Other',
      value: 'No sure',
    },
    date: '01/01/2022',
  },
  {
    lastName: 'WW',
    firstName: 'WWW',
    id: 23,
    disposition: {
      key: 'Other',
      value: 'No sure',
    },
    date: '01/01/2023',
  },
  {
    lastName: 'XX',
    firstName: 'XXX',
    id: 24,
    disposition: {
      key: 'Other',
      value: 'No sure',
    },
    date: '01/01/2024',
  },
  {
    lastName: 'YY',
    firstName: 'YYY',
    id: 25,
    disposition: {
      key: 'Other',
      value: 'No sure',
    },
    date: '01/01/2025',
  },
  {
    lastName: 'ZZ',
    firstName: 'ZZZ',
    id: 26,
    disposition: {
      key: 'Other',
      value: 'No sure',
    },
    date: '01/01/2026',
  },
]
