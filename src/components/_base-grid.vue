<script>
import {
  take,
  takeRight,
  concat,
  isEmpty,
  isNil,
  isNull,
  isNumber,
  inRange,
  filter,
} from 'lodash'

export default {
  props: {
    data: {
      type: Array,
      default: null,
    },
    eventBus: {
      type: Object,
      default: null,
    },
    columns: {
      type: Array,
      default: () => [],
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
      type: String,
      default: '0',
    },
    filter: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    var sortOrders = {}
    var sortKey = this.query.sort
    var perPage = this.query.limit
    var total = this.data.length

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
      perPage: {
        value: perPage,
      },
      sortKey: sortKey || '',
      sortOrders: sortOrders,
      total: total,
      selectedItems: [],
      isSelectAll: false,
    }
  },
  computed: {
    filteredData() {
      let data = this.data

      // Stickable
      let stickyData
      if (Number(this.stickyRows) > 0) {
        stickyData = take(data, this.stickyRows)
        data = takeRight(data, data.length - this.stickyRows)
      }

      // Filterable
      if (this.filter) {
        data = this.getFilterData(data)
      }

      // Sortable
      data = this.getSortData(data)

      this.setTotal(data.length)

      // Turnable
      if (this.pagination) {
        data = this.getPaginationData(data)
      }

      if (Number(this.stickyRows) > 0) {
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
      deep: true,
    },
  },
  created() {
    this.resetData()
    this.eventBus.$on('onResetData', () => {
      this.resetData()
    })
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
            // ================= Array =================
            if (Array.isArray(filterItem[1])) {
              let tempData = []
              // Show all if there is no filtering
              if (filterItem[1].length <= 0) {
                return
              }
              for (let item of filterItem[1]) {
                data.filter((row) => {
                  let selectItem = !isEmpty(row[filterItem[0]])
                    ? row[filterItem[0]]
                    : ''
                  // For example:
                  //   disposition: {
                  //     key: 'No Sale',
                  //     value: 'Too expensensive',
                  //   }
                  //   Search 'No Sale' but page shows 'Too expensensive'
                  // Since it is multi-select, no lowerCase matching is required,
                  // it must be globally matched.
                  if (!isEmpty(selectItem.key)) {
                    if (selectItem.key === item) {
                      tempData.push(row)
                    }
                  } else {
                    if (selectItem === item) {
                      tempData.push(row)
                    }
                  }
                })
              }
              data = tempData
            } else {
              // ================= Date =================
              // startDate and endDate should not be undefined
              if (
                !isEmpty(filterItem[1].startDate.toString()) &&
                !isEmpty(filterItem[1].endDate.toString())
              ) {
                let startDate = new Date(filterItem[1].startDate).getTime()
                let endDate = new Date(filterItem[1].endDate).getTime()
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
              }
            }

            // ================= Number =================
          } else if (typeof filterItem[1] === 'number') {
            data = data.filter((row) => {
              if (isNumber(row[filterItem[0]])) {
                return row[filterItem[0]] === filterItem[1]
              }
            })

            // ================= String =================
          } else {
            data = data.filter((row) => {
              let selectItem = !isEmpty(row[filterItem[0]])
                ? row[filterItem[0]]
                : ''
              let targetItem = filterItem[1].toString().toLowerCase()
              // For example:
              //   disposition: {
              //     key: 'No Sale',
              //     value: 'Too expensensive',
              //   }
              //   Search 'No Sale' but page shows 'Too expensensive'
              if (!isEmpty(selectItem.key)) {
                return (
                  selectItem.key
                    .toString()
                    .toLowerCase()
                    .indexOf(targetItem) > -1
                )
              } else {
                return (
                  selectItem
                    .toString()
                    .toLowerCase()
                    .indexOf(targetItem) > -1
                )
              }
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
          let columns = this.columns
          data = filter(data, (row) => {
            for (let j of columns) {
              // eslint-disable-line no-unused-vars
              let selectItem = !isNull(eval(`row.${j.key}`))
                ? eval(`row.${j.key}`)
                : ''
              if (
                selectItem
                  .toString()
                  .toLowerCase()
                  .indexOf(filterKey.toLowerCase()) > -1
              ) {
                return true
              }
            }
          })
        }
      }
      return data
    },
    getSortData(data) {
      let sortKey = this.sortKey
      let order = this.sortOrders[sortKey] || 1

      /* eslint no-eval: 0 */
      if (sortKey) {
        data = data.sort((a, b) => {
          a =
            typeof eval(`a.${sortKey}`) === 'string'
              ? eval(`a.${sortKey}`).toLowerCase()
              : isNil(eval(`a.${sortKey}`))
              ? ''
              : eval(`a.${sortKey}`)
          b =
            typeof eval(`b.${sortKey}`) === 'string'
              ? eval(`b.${sortKey}`).toLowerCase()
              : isNil(eval(`b.${sortKey}`))
              ? ''
              : eval(`b.${sortKey}`)
          return (a === b ? 0 : a > b ? 1 : -1) * order
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
    <div v-if="pagination && data.length !== 0" class="paginationContainer">
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
        <BaseSelect
          v-model="perPage.value"
          size="small"
          :filterable="false"
          :need-all-option="false"
          :options="query.perPage"
        />
      </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th v-if="selectable" class="selectableColumn">
            <div>
              <BaseCheckbox
                v-model="isSelectAll"
                @input="selectAll()"
              ></BaseCheckbox>
            </div>
          </th>
          <template v-for="(column, index) in columns">
            <th
              :key="index"
              :style="{ width: column.width, minWidth: column.width }"
            >
              <div
                v-if="column.sort"
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
          </template>
        </tr>
      </thead>
      <tbody>
        <slot name="tbody"></slot>
      </tbody>
    </table>
    <div v-if="pagination && data.length !== 0" class="paginationContainer">
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
        <BaseSelect
          v-model="perPage.value"
          size="small"
          :filterable="false"
          :need-all-option="false"
          :options="query.perPage"
        />
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
    position: sticky;
    top: -1px;
    z-index: $layer-table-header-index;
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

    > div {
      display: flex;
      justify-content: center;
      padding: 9px;
    }
  }

  .perPageContainer {
    display: flex;
    justify-content: space-between;
  }

  .perPageHeader {
    margin: 5px 10px 0 15px;
  }

  .show {
    display: table-cell;
  }

  .hide {
    display: none;
  }
}
</style>
