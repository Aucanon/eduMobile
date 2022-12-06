<template>
  <div class="course-content">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="item in activeAdImgList" :key="item.id">
      <van-image :src="item.img"></van-image>
    </van-swipe-item>
  </van-swipe>
  <course-content-list :fetch-data="fetchData"></course-content-list>
  </div>
</template>

<script>
import CourseContentList from '@/components/CourseContentList.vue'
import { getAllAds, getAllCourse } from '@/services/course'
import { Swipe, SwipeItem, Image } from 'vant'

export default {
  name: 'CourseContent',
  components: {
    CourseContentList,
    VanSwipe: Swipe,
    VanSwipeItem: SwipeItem,
    VanImage: Image
  },
  data () {
    return {
      adImgList: []
    }
  },
  created () {
    this.loadAdsImg()
  },
  methods: {
    async loadAdsImg () {
      const { data } = await getAllAds({ spaceKeys: '999' })
      if (data.state === 1) {
        this.adImgList = data.content[0].adDTOList
      }
    },
    fetchData (options) {
      return getAllCourse(options)
    }
  },
  computed: {
    activeAdImgList () {
      return this.adImgList.filter(item => item.status === 1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .my-swip {
    width: 100%;
    .van-swipe-item {
      display: flex;
      justify-content: center;
      overflow: hidden;
    }
    .van-image {
      height: 170px;
    }
  }
  .course-content-list {
      top: 230px;
      bottom: 50px;
    }
</style>
