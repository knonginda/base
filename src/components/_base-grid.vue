<script>
import { drop, take, remove } from 'lodash'

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
    selector: {
      type: Boolean,
      default: false,
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
      sortKey: sortKey || '',
      sortOrders: sortOrders,
      total: this.data.length,
      selectedItems: [],
      isSelectAll: false,
    }
  },
  computed: {
    filteredData() {
      var data = this.data
      data = this.getFilterData(data)
      data = this.getSortData(data)
      this.setTotal(data.length)
      data = this.getPaginationData(data)
      return data
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
      if (i <= 5) {
        return [1, 2, 3, 4, 5, 6, 7, 0, n] // 0 represents `···`
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
      },
      deep: true,
    },
  },
  methods: {
    setTotal(total) {
      this.total = total
    },

    sortBy(column) {
      this.sortKey = column.key
      this.sortOrders[column.key] = this.sortOrders[column.key] * -1
    },

    handleClick(n) {
      this.query.offset = (n - 1) * +this.query.limit
    },

    turnPage(i) {
      if ((i < 0 && this.isFirstPage) || (i > 0 && this.isLastPage)) return
      this.query.offset = +this.query.offset + i * +this.query.limit
    },

    getFilterData(data) {
      var filterKey = this.query.filterKey && this.query.filterKey.toLowerCase()
      if (filterKey) {
        data = data.filter((row) => {
          return Object.keys(row).some((key) => {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(filterKey) > -1
            )
          })
        })
      }
      return data
    },

    getSortData(data) {
      var sortKey = this.sortKey
      var order = this.sortOrders[sortKey] || 1
      if (sortKey) {
        data = data.slice().sort((a, b) => {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    },

    getPaginationData(data) {
      if (this.query.offset >= 0) {
        data = take(drop(data, this.query.offset), this.query.limit)
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
  },
}
</script>

<template>
  <div class="tableContainer">
    <table class="table">
      <thead>
        <tr>
          <th v-if="selector" class="selectorColumn">
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
            :class="sortKey === column.key ? 'active' : ''"
            @click="sortBy(column)"
          >
            {{ column.label }}
            <BaseFasIcon
              v-if="sortOrders[column.key] > 0"
              class="sortIcon"
              name="angle-up"
            />
            <BaseFasIcon v-else class="sortIcon" name="angle-down" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredData" :key="index">
          <td v-if="selector">
            <input
              v-model="item['isSelected']"
              type="checkbox"
              @change="select(item)"
            />
          </td>
          <td v-for="(column, index2) in columns" :key="index2">
            <div v-html="item[column.key]"></div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="bottomSpace">
      <div class="total">
        Total:
        <strong>{{ total }}</strong>
      </div>
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@design';

.tableContainer {
  .table {
    width: 100%;
    height: 100%;
    text-align: left;
    border-collapse: collapse;
    background-color: #fff;
    border: 1px solid $light-grey;
    border-radius: 3px;
  }

  th,
  td {
    padding: 9px;
    vertical-align: top;
    border: 1px solid $light-grey;
  }

  tr:nth-child(even) {
    td {
      background-color: $lightestx-grey;
    }
  }

  .sortIcon {
    margin-left: 5px;
  }

  th {
    color: #333;
    cursor: pointer;
    user-select: none;
    background-color: $lightest-grey;

    > span {
      color: #333 !important;
    }

    .sortIcon {
      display: none !important;
    }

    &.active {
      opacity: 1;

      > span {
        color: #333 !important;
      }

      .sortIcon {
        display: inline-block !important;
      }
    }
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;

    ul {
      display: flex;
    }
  }

  .pageItem > a {
    display: block;
    width: 24px;
    height: 24px;
    margin-left: 10px;
    line-height: 26px;
    color: #333;
    text-align: center;
    text-decoration: none;
    background: #f2f2f2;

    .pageLink {
      display: block;
    }
  }

  .currentPage > a {
    color: #fff;
    background: $blue;
  }

  .bottomSpace {
    display: flex;
    justify-content: space-between;
  }

  .total {
    padding: 8px;
  }

  .selectorColumn {
    width: 36px;

    svg ~ span {
      display: none;
    }
  }
}
</style>
