<script>
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
      username: '',
      options: [
        { key: 0, value: 'Jet Li' },
        { key: 1, value: 'Bruce Lee' },
        { key: 2, value: 'Jackie Chan' },
      ],
      file: new File([], '', {
        name: 'test',
      }),
      test: '',
      test1: '111',
      test2: '111',
      gridColumns: [
        {
          key: 'lastName',
          label: 'Last Name',
        },
        {
          key: 'firstName',
          label: 'First Name',
        },
      ],
      gridData: [],
      query: {
        limit: 5,
        offset: 0,
        filterKey: '',
        sort: '',
        order: '',
      },
      showSelectedItems: [],
    }
  },
  created: function() {
    this.gridData = [
      {
        lastName: 'Jett1',
        firstName: 'Liu1',
      },
      {
        lastName: 'Jett2',
        firstName: 'Liu2',
      },
      {
        lastName: 'Jett3',
        firstName: 'Liu3',
      },
      {
        lastName: 'Jett4',
        firstName: 'Liu4',
      },
      {
        lastName: 'Jett5',
        firstName: 'Liu5',
      },
      {
        lastName: 'Jett6',
        firstName: 'Liu6',
      },
      {
        lastName: 'Jett7',
        firstName: 'Liu7',
      },
      {
        lastName: 'Jett8',
        firstName: 'Liu8',
      },
      {
        lastName: 'Jett9',
        firstName: 'Liu9',
      },
    ]
  },
}
</script>

<template>
  <div class="baseStyle">
    <BaseGrid
      ref="grid"
      selector
      :data="gridData"
      :columns="gridColumns"
      :query="query"
    ></BaseGrid>
    <BaseButton type="button" @click="$refs.modal1.open()"
      >Launch Modal</BaseButton
    >
    <BaseModal
      ref="modal1"
      title="What is Lorem Ipsum?"
      blocking
      button-space="spaceBetween"
    >
      <div
        >Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.</div
      >
      <template slot="button">
        <BaseButton type="button">OK</BaseButton>
        <BaseButton
          type="button"
          theme="secondary"
          @click="$refs.modal1.close()"
          >Cancel</BaseButton
        >
      </template>
    </BaseModal>
    <BaseCheckbox v-model="test">Test</BaseCheckbox>
    <div class="radio-group">
      <BaseRadio v-model="test" value="Y" name="test">Test1</BaseRadio>
      <BaseRadio v-model="test" value="N" name="test">Test2</BaseRadio>
    </div>
    <BaseSelect v-model="username" :options="options" />
    <BaseTabs size="small">
      <BaseTab title="Tab 1" active>Tab 1 content</BaseTab>
      <BaseTab title="Tab 2">Tab 2 content</BaseTab>
      <BaseTab title="Tab 3" disabled>Tab 3 content</BaseTab>
    </BaseTabs>
    <BaseUpload v-model="file" />
    <BaseFasIcon :name="['far', 'clock']" />
    <BaseFasIcon :name="['far', 'user-circle']" />
    <BaseFasIcon name="sign-out-alt" />
    <BaseFasIcon name="cog" />
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
</style>
