<template>
  <i v-if="type == 'element'"  :class="'icon el-icon-' + icon" />
  <span v-else class="icon material-icons">{{icon}}</span>
</template>

<script>
export default {
  props: ['icon', 'type'],
}
</script>