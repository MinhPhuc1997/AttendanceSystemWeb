<template>
  <div>
    <a-card class="card" :title="$t('repository')" :bordered="false">
      <repository-form ref="repository" :showSubmit="false" />
    </a-card>
  </div>
</template>

<script>
import RepositoryForm from './RepositoryForm'


export default {
  name: 'AdvancedForm',
  components: { RepositoryForm},
  i18n: require('./i18n'),
  data () {
    return {
      loading: false
    }
  },
  computed: {
    desc() {
      return this.$t('desc')
    }
  },
  methods: {
    validate () {
      this.$refs.repository.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
      this.$refs.task.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .card{
    margin-bottom: 24px;
  }
</style>
