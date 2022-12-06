<template>
  <div class="course-content-list">
    <van-pull-refresh v-model="isRefreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false">
        <van-cell
        v-for="item, index in list"
        :key="index"
        @click="$router.push({
          name: 'course-info',
          params: {
            courseId: item.id
          }
        })">
          <div class="course-img">
            <img :src="item.courseImgUrl || item.image" alt="">
          </div>
          <div class="course-info">
            <h3 v-text="(item.courseName || item.name)"></h3>
            <p class="course-priview" v-html="item.previewFirstField"></p>
            <p class="price-container" v-if="item.price">
              <span class="course-discount">￥{{ item.discounts }}</span>
              <s class="course-price">￥{{ item.price }}</s>
            </p>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { PullRefresh, List, Cell, Toast } from 'vant'

export default {
  name: 'CourseContentList',
  components: {
    VanPullRefresh: PullRefresh,
    VanCell: Cell,
    VanList: List
  },
  props: {
    fetchData: {
      type: Function,
      require: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      currentPage: 1,
      isRefreshing: false
    }
  },
  created () {
    this.onLoad()
  },
  methods: {
    async onLoad () {
      const { data } = await this.fetchData({
        currentPage: this.currentPage,
        pageSize: 10,
        status: 1
      })
      if (data.data && data.data.records && data.data.records.length !== 0) {
        this.list.push(...data.data.records)
      } else if (data.content && data.content.length !== 0) {
        this.list.push(...data.content)
      }
      this.currentPage++
      this.loading = false
      if (data.data && data.data.records && data.data.records.length < 10) {
        this.finished = true
      } else if (data.content && data.content.length < 10) {
        this.finished = true
      }
    },
    async onRefresh () {
      this.currentPage = 1
      const { data } = await this.fetchData({
        currentPage: this.currentPage,
        pageSize: 10,
        status: 1
      })
      if (data.data && data.data.records && data.data.records.length !== 0) {
        this.list = data.data.records
      } else if (data.content && data.content.length !== 0) {
        this.list.push(...data.content)
      }
      this.isRefreshing = false
      Toast('刷新成功！')
    }
  }
}
</script>

<style lang="scss" scoped>
  p,h3 {
    margin: 0;
  }
  .course-content-list {
    position: fixed;
    overflow-y: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    .van-cell__value {
      display: flex;
      height: 100px;
      padding: 10px 0;
      img {
        height: 100%;
        width: 80px;
        border-radius: 5px;
      }
      .course-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 0 10px;
        .course-priview {
          flex-grow: 1;
        }
        .course-discount {
          color: #ff7452;
          margin-right: 10px;
        }
      }
    }
  }
</style>
