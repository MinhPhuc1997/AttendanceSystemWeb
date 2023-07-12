<template>
  <!-- <div :class="['page-header', layout, pageWidth]">
    <div class="page-header-wide">
      <div class="breadcrumb">
        <a-breadcrumb>
          <a-breadcrumb-item :key="index" v-for="(item, index) in breadcrumb">
            <span>{{item}}</span>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>

      

    </div>
  </div> -->
  <div>
    
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'PageHeader',
  props: {
    title: {
      type: [String, Boolean],
      required: false
    },
    breadcrumb: {
      type: Array,
      required: false
    },
    logo: {
      type: String,
      required: false
    },
    avatar: {
      type: String,
      required: false
    },
  },
  computed: {
    ...mapState('setting', ['layout', 'showPageTitle', 'pageWidth'])
  }
}
</script>

<style lang="less" scoped>
  @import "index";
</style>
