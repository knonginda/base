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
      eventBus: new Vue(),
      erros: ['test'],
      email: '',
      dispositionOptions: [
        { name: 'All', value: '' },
        { name: 'None', value: 'None' },
        { name: 'Other', value: 'Other' },
        { name: 'Enrolled', value: 'Enrolled' },
        { name: 'No Sale', value: 'No Sale' },
        { name: 'Pipeline Pipeline', value: 'Pipeline' },
        { name: 'Unworkable', value: 'Unworkable' },
        { name: 'No Contact/Phone Related', value: 'No Contact/Phone Related' },
      ],
      scriptPhaseOptions: [
        { name: 'All', value: '' },
        { name: 'Introduction', value: 'Introduction' },
        { name: 'Needs Analysis', value: 'Needs Analysis' },
        { name: 'Eligibility', value: 'Eligibility' },
        { name: 'Enrollment', value: 'Enrollment' },
        { name: 'None', value: 'None' },
      ],
      electionPeriodOptions: [
        { name: 'All', value: '' },
        { name: 'AEP', value: 'AEP' },
        { name: 'IEP/ICEP', value: 'IEP/ICEP' },
        { name: 'MEDIGAP', value: 'MEDIGAP' },
        { name: 'OEP', value: 'OEP' },
        { name: 'GI', value: 'GI' },
        { name: 'Underwriting', value: 'Underwriting' },
      ],
      newData: [],
      filteredData: [],
      gridColumns: [
        {
          key: 'firstName',
          label: 'Customer Name',
          sort: true,
        },
        {
          key: 'createdWhen',
          label: 'Update',
          sort: true,
        },
        {
          key: 'disposition',
          label: 'Disposition',
        },
        {
          key: 'electionPeriod',
          label: 'Election Period',
        },
        {
          key: 'scriptPhase',
          label: 'Script Phase',
        },
        {
          key: 'duration',
          label: 'Call Duration',
        },
        {
          key: 'appointed[0].appointed',
          label: 'AK',
          sort: true,
        },
        {
          key: 'appointed[1].appointed',
          label: 'AL',
          sort: true,
        },
        {
          key: 'appointed[2].appointed',
          label: 'AR',
          sort: true,
        },
        {
          key: 'disposition.key',
          label: 'Key',
          sort: true,
        },
      ],
      gridData: [],
      query: {
        limit: 10,
        offset: 0,
        filterKey: {
          disposition: '',
          electionPeriod: '',
          scriptPhase: '',
          createdWhen: {
            startDate: '',
            endDate: '',
          },
        },
        sort: '',
        order: '',
        perPage: [
          { name: 5, value: 5 },
          { name: 10, value: 10 },
          { name: 20, value: 20 },
          { name: 30, value: 30 },
        ],
      },
      showSelectedItems: [],
      hideColumns: [],
    }
  },
  created: function() {
    this.gridData = [
      {
        firstName: 'Jett',
        lastName: 'Liu',
        createdWhen: '2019-07-13T22:46:48.000+0000',
        electionPeriod: 'GI',
        currentCover: null,
        primaryDisposition: 'No Sale',
        secondaryDisposition: 'Customer will call back',
        duration: '48',
        scriptPhase: 'Enrollment',
        disposition: {
          key: '1 No Sale',
          value: 'Customer will call back',
        },
        appointed: [
          {
            mcSalesStateAppointId: 23432432,
            state: 'AK',
            appointed: '1',
          },
          {
            mcSalesStateAppointId: 23432432,
            state: 'AL',
            appointed: '3',
          },
          {
            mcSalesStateAppointId: 23432432,
            state: 'AR',
            appointed: '4',
          },
        ],
      },
      {
        firstName: 'Tes',
        lastName: 'Fd',
        createdWhen: '2019-01-13T22:46:48.000+0000',
        electionPeriod: 'GI',
        currentCover: null,
        primaryDisposition: 'No Sale',
        secondaryDisposition: 'Customer will call back',
        duration: '48',
        scriptPhase: 'Enrollment',
        disposition: {
          key: '2 No Sale',
          value: 'Customer will call back',
        },
        appointed: [
          {
            mcSalesStateAppointId: 23432432,
            state: 'AK',
            appointed: '5',
          },
          {
            mcSalesStateAppointId: 23432432,
            state: 'AL',
            appointed: '6',
          },
          {
            mcSalesStateAppointId: 23432432,
            state: 'AR',
            appointed: '2',
          },
        ],
      },
      {
        firstName: 'Cdds',
        lastName: 'Ssd',
        createdWhen: '2019-03-13T22:46:48.000+0000',
        electionPeriod: 'GI',
        currentCover: null,
        primaryDisposition: 'No Sale',
        secondaryDisposition: 'Customer will call back',
        duration: '48',
        scriptPhase: 'Enrollment',
        disposition: {
          key: '3 No Sale',
          value: 'Customer will call back',
        },
        appointed: [
          {
            mcSalesStateAppointId: 23432432,
            state: 'AK',
            appointed: '11',
          },
          {
            mcSalesStateAppointId: 23432432,
            state: 'AL',
            appointed: '15',
          },
          {
            mcSalesStateAppointId: 23432432,
            state: 'AR',
            appointed: '9',
          },
        ],
      },
    ]
  },
  methods: {
    test() {
      this.eventBus.$emit('onResetData')
    },
    resetData(value) {
      this.newData = value
    },
    fixDate(event) {
      return this.$moment(event).format('MM/DD/YYYY')
    },
    validateField(field) {
      const provider = this.$refs[field]

      // Validate the field
      return provider.validate()
    },
  },
}
</script>

<template>
  <div class="baseStyle">
    <!-- <BaseTabs>
      <BaseTab title="Tab 1" active>Tab 1 content</BaseTab>
      <BaseTab title="Tab 2">Tab 2 content</BaseTab>
      <BaseTab title="Tab 3" :disabled="isDisabled">Tab 3 content</BaseTab>
    </BaseTabs>
    <form id="validated-form">
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
    </form>
    <div>
      <BaseSpinner
        :spacing="15"
        size="large"
        :font-size="17"
        message="Loading..."
      ></BaseSpinner>
    </div>
    <div style="display: flex;">
      <div class="formField" style=" width: 160px;margin-right: 20px;">
        <label class="formLabel">Disposition</label>
        <BaseSelect
          v-model="query.filterKey.disposition"
          :options="dispositionOptions"
        />
      </div>
      <div class="formField" style=" width: 160px;margin-right: 20px;">
        <label class="formLabel">Script Phase</label>
        <BaseSelect
          v-model="query.filterKey.scriptPhase"
          :options="scriptPhaseOptions"
        />
      </div>
      <div class="formField" style=" width: 160px;margin-right: 20px;">
        <label class="formLabel">Election Period</label>
        <BaseSelect
          v-model="query.filterKey.electionPeriod"
          :options="electionPeriodOptions"
        />
      </div>
      <div class="formField" style=" width: 160px;margin-right: 20px;">
        <label for="form-field" class="formLabel">Start Date</label>
        <BaseDatePicker
          id="form-field"
          v-model="query.filterKey.createdWhen.startDate"
          placeholder="Start Date"
          :calendar-button="true"
          calendar-button-icon="calendar"
          format="MM/dd/yyyy"
          @input="query.filterKey.createdWhen.startDate = fixDate($event)"
        />
      </div>
      <div class="formField" style=" width: 160px;margin-right: 20px;">
        <label for="form-field" class="formLabel">End Date</label>
        <BaseDatePicker
          id="form-field"
          v-model="query.filterKey.createdWhen.endDate"
          placeholder="End Date"
          :calendar-button="true"
          calendar-button-icon="calendar"
          format="MM/dd/yyyy"
          @input="query.filterKey.createdWhen.endDate = fixDate($event)"
        />
      </div>
      <div class="formField" style=" width: 160px;margin-right: 20px;">
        <BaseButton @click="$refs.modal.open()">Open</BaseButton>
        <BaseModal ref="modal" theme="info">
          <template slot="title">
            <h2>This is custom title</h2>
          </template>
          <div
            >Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.</div
          >
        </BaseModal>
      </div>
    </div> -->
    <!-- <select class="select-css">
      <option>This is a native select element</option>
      <option>Apples</option>
      <option>Bananas</option>
      <option>Grapes</option>
      <option>Oranges</option>
    </select> -->
    <ul>
      <li>
        <BaseRadio
          v-model="hideColumns"
          :value="['createdWhen', 'scriptPhase']"
          name="radio-group"
          >Agent Info</BaseRadio
        >
      </li>
      <li>
        <BaseRadio
          v-model="hideColumns"
          :value="['disposition']"
          name="radio-group"
          >State</BaseRadio
        >
      </li>
    </ul>
    {{ hideColumns }}
    <BaseGrid
      ref="grid"
      :hide-columns="hideColumns"
      :query="query"
      :columns="gridColumns"
      :data="gridData"
      :event-bus="eventBus"
      @changes="resetData"
    >
      <template v-slot:tbody>
        <template v-for="(row, index) in newData">
          <tr :key="index">
            <td> {{ row.firstName }}, {{ row.lastName }} </td>
            <td>{{ row.createdWhen }}</td>
            <td>{{ row.disposition.value }}</td>
            <td>{{ row.electionPeriod }}</td>
            <td>{{ row.scriptPhase }}</td>
            <td>{{ row.duration }}</td>
            <td>{{ row.appointed[0].appointed }}</td>
            <td>{{ row.appointed[1].appointed }}</td>
            <td>{{ row.appointed[2].appointed }}</td>
            <td>{{ row.disposition.key }}</td>
          </tr>
        </template>
      </template>
    </BaseGrid>
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

/* class applies to select element itself, not a wrapper element */
// .select-css {
// 	box-sizing: border-box;
// 	display: block;
// 	width: 100%;
// 	max-width: 100%; /* useful when width is set to anything other than 100% */
// 	padding: .6em 1.4em .5em .8em;
// 	margin: 0;
// 	font-family: sans-serif;
// 	font-size: 16px;
// 	font-weight: 500;
// 	line-height: 1.3;
// 	color: #444;
//   color: #F69234;
// 	background-color: #fff;
//   background-color: #FEF9D9;

// 	/* note: bg image below uses 2 urls. The first is an svg data uri for the arrow icon, and the second is the gradient.
// 		for the icon, if you want to change the color, be sure to use `%23` instead of `#`, since it's a url. You can also swap in a different svg icon or an external image reference

// 	*/
// 	background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23333333%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
// 	background-repeat: no-repeat, repeat;

// 	/* arrow icon position (1em from the right, 50% vertical) , then gradient position */
// 	background-position: right .7em top 50%, 0 0;

// 	/* icon size, then gradient */
//   background-size: .65em auto, 100%;
// 	border: 1px solid #aaa;
// 	border-radius: 0;
// 	-moz-appearance: none;
// 	-webkit-appearance: none;
// 	appearance: none;
// }

// /* Hide arrow icon in IE browsers */
// .select-css::-ms-expand {
// 	display: none;
// }

// /* Hover style */
// .select-css:hover {
// 	border-color: #888;
// }

// /* Focus style */
// .select-css:focus {
// 	border-color: #aaa;
// 	outline: none;

// 	/* It'd be nice to use -webkit-focus-ring-color here but it doesn't work on box-shadow */
// 	box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
// 	box-shadow: 0 0 0 3px -moz-mac-focusring;
// }

// /* Set options to normal weight */
// .select-css option {
// 	font-weight:normal;
// }

// /* Support for rtl text, explicit support for Arabic and Hebrew */
// *[dir="rtl"] .select-css, :root:lang(ar) .select-css, :root:lang(iw) .select-css {
// 	padding: .6em .8em .5em 1.4em;
// 	background-position: left .7em top 50%, 0 0;
// }

// /* Disabled styles */
// .select-css:disabled, .select-css[aria-disabled=true] {
// 	color: graytext;
// 	background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22graytext%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
// 	  linear-gradient(to bottom, #fff 0%,#e5e5e5 100%);
// }

// .select-css:disabled:hover, .select-css[aria-disabled=true] {
// 	border-color: #aaa;
// }

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
