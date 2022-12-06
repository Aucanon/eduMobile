<template>
  <div class="course-section">
    <h2 class="section">{{ sectionData.sectionName }}</h2>
    <p class="lesson" v-for="item in sectionData.courseLessons" :key="item.id" @click="handleClick(item)">
      <span v-text="item.theme"></span>
      <van-icon v-if="item.canPlay" name="play-circle"></van-icon>
      <van-icon v-else name="lock"></van-icon>
    </p>
  </div>
</template>

<script>
import { Icon } from 'vant'

export default {
  name: 'CourseSection',
  components: {
    VanIcon: Icon
  },
  props: {
    sectionData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    handleClick (lessonInfo) {
      if (lessonInfo.canPlay) {
        this.$router.push({
          name: 'lesson-video',
          params: {
            lessonId: lessonInfo.id
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .course-section {
    padding: 0 20px;
    .lesson {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
