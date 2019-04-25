<script>
import { remove, take, takeRight, concat, isEmpty, inRange } from 'lodash'

export default {
  props: {
    data: {
      type: Array,
      default: null,
    },
    columns: {
      type: Array,
      default: null,
    },
    query: {
      type: Object,
      required: true,
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    pagination: {
      type: Boolean,
      default: true,
    },
    stickyRows: {
      type: Number,
      default: 0,
    },
    sort: {
      type: Boolean,
      default: true,
    },
    filter: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    var sortOrders = {}
    var sortKey = this.query.sort

    this.columns.forEach((column) => {
      sortOrders[column.key] = 1
    })

    if (sortKey) {
      if (this.query.order === 'desc') {
        sortOrders[sortKey] = sortOrders[sortKey] * -1
      } else {
        sortOrders[sortKey] = sortOrders[sortKey] * 1
      }
    }

    return {
      perPage: { name: this.query.limit, value: this.query.limit },
      sortKey: sortKey || '',
      sortOrders: sortOrders,
      total: this.data.length,
      selectedItems: [],
      isSelectAll: false,
    }
  },
  computed: {
    filteredData() {
      let data = this.data

      // Stickable
      let stickyData
      if (this.stickyRows !== 0) {
        stickyData = take(data, this.stickyRows)
        data = takeRight(data, data.length - this.stickyRows)
      }

      // Filterable
      if (this.filter) {
        data = this.getFilterData(data)
      }

      // Sortable
      if (this.sort) {
        data = this.getSortData(data)
      }

      this.setTotal(data.length)

      // Turnable
      if (this.pagination) {
        data = this.getPaginationData(data)
      }

      if (this.stickyRows !== 0) {
        return concat(stickyData, data)
      } else {
        return data
      }
    },

    isFirstPage() {
      return +this.query.offset === 0 || +this.query.limit >= this.total
    },

    isLastPage() {
      return +this.query.offset + +this.query.limit >= this.total
    },

    totalPage() {
      return Math.ceil(this.total / +this.query.limit)
    },

    curPage() {
      return Math.ceil(+this.query.offset / +this.query.limit) + 1
    },

    dspBtns() {
      const n = this.totalPage
      const i = this.curPage
      if (n <= 9) {
        return ((n) => {
          const array = Array(n)
          while (n) {
            array[n - 1] = n--
          }
          return array
        })(n)
      }

      // 0 represents `···`
      if (i <= 5) {
        return [1, 2, 3, 4, 5, 6, 7, 0, n]
      }
      if (i >= n - 4) {
        return [1, 0, n - 6, n - 5, n - 4, n - 3, n - 2, n - 1, n]
      }
      return [1, 0, i - 2, i - 1, i, i + 1, i + 2, 0, n]
    },
  },
  watch: {
    query: {
      handler(query) {
        if (this.filteredData.length === 0 && this.curPage !== 1) {
          this.handleClick(1)
        }
        if (this.stickyRows !== 0) {
          if (this.filteredData.length === this.stickyRows) {
            this.handleClick(1)
          }
        }
        this.resetData()
      },
      deep: true,
    },
    perPage: {
      handler(perPage) {
        this.query.offset = 0
        this.query.limit = this.perPage.value
        this.resetData()
      },
    },
  },
  created() {
    this.resetData()
  },
  methods: {
    resetData() {
      this.$emit('changes', this.filteredData)
    },
    setTotal(total) {
      this.total = total
    },
    sortBy(column) {
      this.sortKey = column.key
      this.sortOrders[column.key] = this.sortOrders[column.key] * -1
      this.resetData()
    },
    handleClick(n) {
      this.query.offset = (n - 1) * +this.query.limit
      this.resetData()
    },
    turnPage(i) {
      if ((i < 0 && this.isFirstPage) || (i > 0 && this.isLastPage)) return
      this.query.offset = +this.query.offset + i * +this.query.limit
      this.resetData()
    },
    getFilterData(data) {
      if (isEmpty(this.query.filterKey)) {
        return data
      }
      let filterKey = this.query.filterKey

      // Individual Search, for example:
      // query: {
      //   filterKey: { firstName: '', lastName: '' }
      // }
      if (typeof filterKey === 'object') {
        Object.entries(filterKey).forEach((filterItem) => {
          // ================= Object =================
          // dateRange: { startDate: '', endDate: '' }
          // selectOption: { name: '', value: '' }
          if (typeof filterItem[1] === 'object') {
            // ================= Date =================
            // startDate and endDate should not be undefined
            if (
              !isEmpty(filterItem[1].startDate) &&
              !isEmpty(filterItem[1].endDate)
            ) {
              let startDate =
                new Date(filterItem[1].startDate).getTime() ||
                new Date('01/01/2000').getTime()
              let endDate =
                new Date(filterItem[1].endDate).getTime() ||
                new Date('01/01/2100').getTime()
              if (startDate > endDate) {
                data = []
                return data
              } else {
                data = data.filter((row) => {
                  if (!isEmpty(row[filterItem[0]])) {
                    let currentDate = new Date(row[filterItem[0]]).getTime()
                    return (
                      inRange(currentDate, startDate, endDate) ||
                      currentDate === endDate
                    )
                  }
                })
              }

              // ================= Select =================
              // name and value should not be undefined
            } else if (
              !isEmpty(filterItem[1].name) &&
              !isEmpty(filterItem[1].value)
            ) {
              data = data.filter((row) => {
                let selectItem = row[filterItem[0]]
                if (!isEmpty(selectItem)) {
                  // Filter according to business logic by key
                  // For example:
                  //   disposition: {
                  //     key: 'No Sale',
                  //     value: 'Too expensensive',
                  //   }
                  //   Search 'No Sale' but page shows 'Too expensensive'
                  if (!isEmpty(selectItem.key)) {
                    return selectItem.key.indexOf(filterItem[1].value) > -1

                    // Filter according to value
                    // For example:
                    //   disposition: 'No Sale'
                    //   Search 'No Sale' and page shows 'No Sale'
                  } else {
                    return selectItem.indexOf(filterItem[1].value) > -1
                  }
                }
              })
            }

            // ================= Number =================
          } else if (typeof filterItem[1] === 'number') {
            data = data.filter((row) => {
              let selectItem = !isEmpty(row[filterItem[0]])
                ? row[filterItem[0]]
                : ''
              return selectItem.indexOf(filterItem[1]) > -1
            })

            // ================= String =================
          } else {
            data = data.filter((row) => {
              let selectItem = !isEmpty(row[filterItem[0]])
                ? row[filterItem[0]]
                : ''
              return (
                String(selectItem)
                  .toLowerCase()
                  .indexOf(filterItem[1].toLowerCase()) > -1
              )
            })
          }
        })
      }

      // Global Search, for example:
      // query: {
      //   filterKey: ''
      // }
      else {
        filterKey = filterKey.toLowerCase()
        if (filterKey) {
          data = data.filter((row) => {
            return Object.keys(row).some((key) => {
              let selectItem = !isEmpty(row[key]) ? row[key] : ''
              return (
                String(selectItem)
                  .toLowerCase()
                  .indexOf(filterKey) > -1
              )
            })
          })
        }
      }
      return data
    },
    getSortData(data) {
      let sortKey = this.sortKey
      let order = this.sortOrders[sortKey] || 1
      // let dateRegex = new RegExp('/^([0-9]{1,2})/([0-9]{1,2})/([0-9]{4})$/')

      if (sortKey) {
        data = data.sort((a, b) => {
          a = a[sortKey] === null ? '' : a
          b = b[sortKey] === null ? '' : b

          // it should be sort by Number, for example:
          // { id : '12' }
          // { age: 20 }
          if (Number(a[sortKey]) && Number(b[sortKey])) {
            a = Number(a[sortKey])
            b = Number(b[sortKey])
            return (a === b ? 0 : a > b ? 1 : -1) * order
          }

          // it should be sort by value (Business Logic), for example:
          // { name: 'No Sale', value: 'No Sale - Customer will call back' }
          else if (
            typeof a[sortKey] === 'object' &&
            typeof b[sortKey] === 'object'
          ) {
            a = a[sortKey].value === null ? '' : a[sortKey].value
            b = b[sortKey].value === null ? '' : b[sortKey].value
            return (a === b ? 0 : a > b ? 1 : -1) * order
          }

          // it should be sort by Date, for example:
          // { date: '01/01/2019' }
          // else if (dateRegex.test(a[sortKey]) && dateRegex.test(b[sortKey])) {
          //   a = a[sortKey]
          //     .split('/')
          //     .reverse()
          //     .join()
          //   b = b[sortKey]
          //     .split('/')
          //     .reverse()
          //     .join()
          //   return (a < b ? -1 : a > b ? 1 : 0) * order
          // }

          // it should be sort by String
          else {
            a = a[sortKey] + ''
            b = b[sortKey] + ''
            return (a === b ? 0 : a > b ? 1 : -1) * order
          }
        })
      }
      return data
    },
    getPaginationData(data) {
      if (this.query.offset >= 0) {
        data = take(
          takeRight(data, data.length - this.query.offset),
          this.query.limit
        )
      }
      return data
    },
    select(item) {
      var selectedItems = this.selectedItems
      if (item['isSelected']) {
        selectedItems.push(item)
        return selectedItems
      } else {
        selectedItems = remove(this.selectedItems, (removedItem) => {
          return removedItem === item
        })
        return selectedItems
      }
    },
    selectAll() {
      let data = this.getFilterData(this.data)
      for (let item of data) {
        if (this.isSelectAll) {
          if (!this.selectedItems.includes(item)) {
            item.isSelected = true
            this.selectedItems.push(item)
          }
        } else {
          for (let removeItem of this.selectedItems) {
            removeItem.isSelected = false
          }
          this.selectedItems = []
        }
      }
    },
    getPageInfo() {
      let offset = this.query.offset
      let total = this.total
      let limit = this.query.limit
      return `Showing <strong>
          ${
            this.filteredData.length === this.stickyRows ||
            this.filteredData === 0
              ? 0
              : offset + 1
          }
        </strong> - <strong>
          ${limit + offset >= total ? total : limit + offset}
        </strong> of <strong>
          ${total}
        </strong>`
    },
  },
}
</script>

<template>
  <div class="tableContainer">
    <div v-if="pagination" class="paginationContainer">
      <div class="pageInfo" v-html="getPageInfo()"></div>
      <ul class="pagination" name="Pagination">
        <li v-if="!isFirstPage" class="pageItem" @click="turnPage(-1)">
          <a href="#" class="pageLink" @click.prevent>
            <BaseFasIcon name="angle-left" />
          </a>
        </li>
        <li
          v-for="(i, index) in dspBtns"
          :key="index"
          :class="['pageItem', i === curPage ? 'currentPage' : '']"
        >
          <a
            v-if="i"
            href="#"
            class="pageLink"
            @click.prevent="handleClick(i)"
            >{{ i }}</a
          >
          <a v-else class="pageLink">...</a>
        </li>
        <li v-if="!isLastPage" class="pageItem" @click="turnPage(1)">
          <a href="#" class="pageLink" @click.prevent>
            <BaseFasIcon name="angle-right" />
          </a>
        </li>
      </ul>
      <div class="perPageContainer">
        <div class="perPageHeader">Per Page: </div>
        <BaseSelect v-model="perPage" size="small" :options="query.perPage" />
      </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th v-if="selectable" class="selectableColumn">
            <input
              v-model="isSelectAll"
              type="checkbox"
              @change="selectAll()"
            />
          </th>
          <th
            v-for="(column, index) in columns"
            :key="index"
            :style="{ width: column.width }"
          >
            <div
              v-if="sort"
              :class="[
                'headerItem headerItemSort',
                { active: sortKey === column.key },
              ]"
              @click="sortBy(column)"
            >
              <div v-html="column.label"></div>
              <BaseFasIcon
                v-if="sortOrders[column.key] > 0"
                :class="['sortIcon', { active: sortKey === column.key }]"
                :name="sortKey === column.key ? 'sort-up' : 'sort'"
              />
              <BaseFasIcon
                v-else
                :class="['sortIcon', { active: sortKey === column.key }]"
                :name="sortKey === column.key ? 'sort-down' : 'sort'"
              />
            </div>
            <div v-else class="headerItem">
              <div v-html="column.label"></div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <slot name="tbody"></slot>
      </tbody>
    </table>
    <div v-if="pagination" class="paginationContainer">
      <div class="pageInfo" v-html="getPageInfo()"></div>
      <ul class="pagination" name="Pagination">
        <li v-if="!isFirstPage" class="pageItem" @click="turnPage(-1)">
          <a href="#" class="pageLink" @click.prevent>
            <BaseFasIcon name="angle-left" />
          </a>
        </li>
        <li
          v-for="(i, index) in dspBtns"
          :key="index"
          :class="['pageItem', i === curPage ? 'currentPage' : '']"
        >
          <a
            v-if="i"
            href="#"
            class="pageLink"
            @click.prevent="handleClick(i)"
            >{{ i }}</a
          >
          <a v-else class="pageLink">...</a>
        </li>
        <li v-if="!isLastPage" class="pageItem" @click="turnPage(1)">
          <a href="#" class="pageLink" @click.prevent>
            <BaseFasIcon name="angle-right" />
          </a>
        </li>
      </ul>
      <div class="perPageContainer">
        <div class="perPageHeader">Per Page: </div>
        <BaseSelect v-model="perPage" size="small" :options="query.perPage" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@design';

.tableContainer {
  .table {
    width: 100%;
    height: 100%;
    margin: 10px 0;
    text-align: left;
    border-collapse: collapse;
    background-color: #fff;
    border: 1px solid $light-grey;
    border-radius: 3px;
  }

  th,
  td {
    vertical-align: top;
    border: 1px solid $light-grey;
  }

  td {
    padding: 9px;
  }

  tr:nth-child(even) {
    td {
      background-color: $lightestx-grey;
    }
  }

  .sortIcon {
    margin: 2px 5px 0 0;
  }

  th {
    color: #333;
    user-select: none;
    background-color: $lightest-grey;

    > span {
      color: #333 !important;
    }

    .sortIcon {
      opacity: 0.3;

      &.active {
        opacity: 1;
      }
    }
  }

  .headerItemSort {
    cursor: pointer;
  }

  .headerItem {
    display: flex;
    justify-content: space-between;
    padding: 9px;
  }

  .paginationContainer {
    display: flex;
    justify-content: flex-end;
  }

  .pagination {
    display: flex;
    justify-content: flex-end;

    ul {
      display: flex;
    }
  }

  .pageItem {
    .pageLink {
      display: block;
      border: 1px solid $color-border;
      border-right: 0;
    }

    &:first-child {
      .pageLink {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
    }
    &:last-child {
      .pageLink {
        border-right: 1px solid $color-border;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }

    > a {
      display: block;
      width: 30px;
      height: 30px;
      line-height: 30px;
      color: #333;
      text-align: center;
      text-decoration: none;
      background: #fff;
    }
  }

  .currentPage > a {
    background: $lightest-grey;
  }

  .pageInfo {
    display: block;
    margin: 5px 15px 0 0;
  }

  .selectableColumn {
    width: 36px;

    svg ~ span {
      display: none;
    }
  }

  .perPageContainer {
    display: flex;
    justify-content: space-between;
  }

  .perPageHeader {
    margin: 3px 10px 0 15px;
  }
}
</style>
