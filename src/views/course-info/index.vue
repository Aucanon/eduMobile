<template>
  <div class="course-info">
    <van-nav-bar
      title="课程详情"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <van-cell-group :style="styleOptions">
      <van-cell class="course-img">
        <img :src="course.courseImgUrl">
      </van-cell>
      <van-cell class="course-desc">
        <h2 v-text="course.courseName"></h2>
        <p v-text="course.previewFirstField"></p>
        <div class="course-sale-info">
          <p class="course-price">
            <span class="discounts">￥{{ course.discounts }}</span>
            <span>￥{{ course.sales }}</span>
          </p>
          <span class="tag">{{ course.sales }}人已购</span>
          <span class="tag">每周三、五更新</span>
        </div>
      </van-cell>
      <van-cell class="course-detail">
        <van-tabs scrollspy sticky>
          <van-tab title="详情">
            <div v-html="course.courseDescription"></div>
          </van-tab>
          <van-tab title="内容">
            <course-section  v-for="item in sections" :key="item.id" :sectionData="item"></course-section>
          </van-tab>
        </van-tabs>
      </van-cell>
    </van-cell-group>
    <van-tabbar v-if="!course.isBuy">
      <div class="price">
        <span v-text="course.discountsTag"></span>
        <span class="discounts">￥{{ course.discounts }}</span>
        <span>￥{{ course.price }}</span>
      </div>
      <van-button type="primary" @click="handlePay">立即购买</van-button>
    </van-tabbar>
  </div>
</template>

<script>
import { getCourseById, getServtionAndLesson } from '@/services/course'
import CourseSection from './components/CourseSection.vue'
import { NavBar, CellGroup, Cell, Tabs, Tab, Tabbar, Button } from 'vant'

export default {
  name: 'CourseInfo',
  components: {
    CourseSection,
    VanNavBar: NavBar,
    VanCellGroup: CellGroup,
    VanCell: Cell,
    VanTab: Tab,
    VanTabs: Tabs,
    VanTabbar: Tabbar,
    VanButton: Button
  },
  props: {
    courseId: {
      type: [Number, String],
      require: true
    }
  },
  data () {
    return {
      course: {},
      sections: {},
      flag: false,
      styleOptions: {}
    }
  },
  created () {
    this.loadCourse()
    this.loadSections()
  },
  methods: {
    async loadCourse () {
      const { data } = await getCourseById({ courseId: this.courseId })
      if (data.state === 1) {
        this.course = data.content
      }
    },
    async loadSections () {
      const { data } = await getServtionAndLesson({ courseId: this.courseId })
      if (data.state === 1) {
        this.sections = data.content.courseSectionList
        if (!data.content.isBuy) {
          this.styleOptions.bottom = 0
        }
      }
    },
    handlePay () {
      if (this.$store.state.user) {
        this.$router.push({
          name: 'pay',
          params: {
            courseId: this.courseId
          }
        })
      } else {
        this.$router.push({
          name: 'login',
          query: {
            redirect: this.$route.fullPath
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .van-cell {
    padding: 0;
  }
  .van-cell-group {
    width: 100%;
    position: fixed;
    top: 46px;
    bottom: 50px;
    overflow-y: auto;
      .course-img {
      height: 280px;
      img {
        height: 280px;
        width: 100%;
      }
    }
    .course-desc {
      padding: 10px 20px;
      height: 150px;
      h2 {
        padding: 0;
      }
      .course-sale-info {
        display: flex;
        .course-price {
          flex: 1;
          margin: 0;
        }
        .tag {
          background-color: #f8f9fa;
          font-size: 12px;
          font-weight: 700;
          color: #666;
          margin-left: 10px;
          padding: 7px;
          line-height: 15px;
          border-radius: 5px;
        }
      }
    }
  }
  .discounts {
    color: #ff7452;
    font-size: 24px !important;
    font-weight: 700;
    margin-right: 5px;
  }
  .van-tabbar {
    box-sizing: border-box;
    line-height: 50px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 14px;
    }
    .van-button {
      width: 50%;
      height: 80%;
    }
  }
</style>
