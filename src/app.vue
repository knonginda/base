<script>
import Vue from 'vue'
import appConfig from '@src/app.config'

export default {
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === 'function' ? title(this.$store) : title
      return title ? `${title} | ${appConfig.title}` : appConfig.title
    },
  },
  data() {
    return {
      switchTest: false,
      switchTest1: false,
      loading: false,
      eventBus: new Vue(),
      email: '',
      newData: [],
      gridColumns: [
        {
          key: 'firstName',
          label: 'First Name',
          sort: true,
        },
        {
          key: 'lastName',
          label: 'Last Name',
          sort: true,
        },
        {
          key: 'test.value',
          label: 'Test',
          sort: true,
        },
        {
          key: 'date',
          label: 'Date',
          sort: true,
        },
        {
          key: 'active',
          label: 'Active',
          sort: true,
        },
      ],
      gridData: [],
      query: {
        limit: 5,
        offset: 0,
        filterKey: '',
        sort: '',
        order: '',
        perPage: [
          { name: 5, value: 5 },
          { name: 10, value: 10 },
          { name: 20, value: 20 },
          { name: 30, value: 30 },
          { name: 100, value: 100 },
        ],
      },
    }
  },
  created() {
    this.setGridData()
  },
  methods: {
    fixDate(event) {
      return this.$moment(event).format('MM/DD/YYYY')
    },
    validateField(field) {
      const provider = this.$refs[field]

      // Validate the field
      return provider.validate()
    },
    getResultData(value) {
      this.newData = value
    },
    getData() {
      return this.$http.get('/api/grid').then((response) => {
        return response.body
      })
    },
    setGridData() {
      this.loading = true
      this.getData().then((response) => {
        this.gridData = response
        Vue.nextTick(() => {
          this.loading = false
          this.eventBus.$emit('onResetData')
        })
      })
    },
    test() {
      this.switchTest1 = true
    },
  },
}
</script>

<template>
  <div class="baseStyle">
    <!-- <form id="validated-form">
      <BaseValidation
        v-slot="{ validate, errors }"
        name="email"
        rules="required|email"
      >
        <label>Email:</label>
        <BaseInput v-model="email" name="email" @input="validate" />
        <p>{{ errors[0] }}</p>
      </BaseValidation>
      <BaseButton @click="validateField('myinput')">Test Validation</BaseButton>
    </form> -->
    <BaseSwitch
      v-model="switchTest"
      on-value="Yes 水电费第三方"
      off-value="No fsd fsd "
      name="test-switch"
    ></BaseSwitch>
    <BaseSwitch
      v-model="switchTest"
      on-value="Yes 水电费第三方"
      off-value="No fsd fsd "
      name="test-switch"
    ></BaseSwitch>
    <BaseGrid
      v-show="!loading"
      ref="grid"
      :query="query"
      :columns="gridColumns"
      :data="gridData"
      :event-bus="eventBus"
      @changes="getResultData"
    >
      <template v-slot:tbody>
        <tr v-for="(row, index) in newData" :key="index">
          <td>
            <div>{{ row.firstName }}</div>
          </td>
          <td>
            <div>{{ row.lastName }}</div>
          </td>
          <td>
            <div>{{ row.test.value }}</div>
          </td>
          <td>
            <div>{{ row.date }}</div>
          </td>
          <td>
            <div>
              <BaseCheckbox v-model="row.active"></BaseCheckbox>
            </div>
          </td>
        </tr>
      </template>
    </BaseGrid>
    <!-- <div v-show="loading" class="spinnerContainer">
      <BaseSpinner :spacing="15" message="Loading..."></BaseSpinner>
    </div> -->
    <!-- <BaseAlert theme="info">
      <template v-slot:title
        >Well Done!</template
      >
      You successfully read this important
      <BaseLink href="https://www.google.com">alert message</BaseLink>.
    </BaseAlert> -->
  </div>
</template>

<style lang="scss">
@import '@design';

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  @extend %typography-medium;

  background: $color-body-bg;
}

.baseStyle {
  ul,
  li {
    padding: 0;
    margin: 0;
    list-style: none;
  }
}

.stickyColumns {
  &:nth-child(1) {
    td {
      background-color: #d7e9bb !important;
    }
  }
  &:nth-child(2) {
    td {
      background-color: #f0f6e4 !important;
    }
  }
  &:nth-child(3) {
    td {
      background-color: #f7faf2 !important;
    }
  }
}
.formField {
  .error {
    display: none;
    width: 100%;
    margin-top: 5px;
    font-size: $font-size-small;
    color: $red;
    text-align: left;
  }

  &.formFieldError {
    .error {
      display: block;
    }

    .formControl {
      border-color: $red;
    }
  }
}

// table {
//   width: 3000px !important;
// }

// thead th:first-child,
// tbody td:first-child {
//   position: sticky;
//   left: 0;
//   z-index: 9;
//   box-shadow: inset -2px 0px 0px 0px black;
// }

// thead th:nth-child(2),
// tbody td:nth-child(2) {
//   position: sticky;
//   left: 582px;
//   z-index: 9;
//   box-shadow: inset -2px 0px 0px 0px black;
// }
</style>
