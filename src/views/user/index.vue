<template>
  <div class="user">
    <van-cell-group>
      <van-cell :border="false" class="user-info">
        <van-image :src="userInfo.portrait || 'http://www.lgstatic.com/thumbnail_100x100/i/image2/M01/5E/65/CgotOVszSAOANi0LAAAse2IVWAE693.jpg'" width="50" height="50" round></van-image>
        <div class="user-info-content">
          <h3>{{ userInfo.userName }}</h3>
          <span>
            <van-icon name="edit"/>
            编辑个人资料
          </span>
        </div>
      </van-cell>
      <van-cell class="acount-info">
        <van-grid :border="false">
          <van-grid-item>
            <span class="grid-item-value">14.05</span>
            <span>学习时长</span>
          </van-grid-item>
          <van-grid-item>
            <span class="grid-item-value">200</span>
            <span>钱包/勾豆</span>
          </van-grid-item>
          <van-grid-item>
            <span class="grid-item-value">1</span>
            <span>优惠券</span>
          </van-grid-item>
          <van-grid-item>
            <span class="grid-item-value">213</span>
            <span>学分</span>
          </van-grid-item>
        </van-grid>
      </van-cell>
      <van-cell icon="user-o" title="分销中心" is-link value="收益200元"></van-cell>
      <van-cell icon="setting-o" title="个性化设置" is-link></van-cell>
      <van-cell icon="down" title="我的下载" is-link></van-cell>
      <van-cell icon="question-o" title="帮助与反馈" is-link></van-cell>
      <van-cell icon="info-o" title="关于" is-link value="V1.0.0"></van-cell>
    </van-cell-group>
    <layout-footer></layout-footer>
  </div>
</template>

<script>
import LayoutFooter from '@/components/LayoutFooter.vue'
import { getUserInfo } from '@/services/user'
import { CellGroup, Cell, Image, Icon, Grid, GridItem } from 'vant'

export default {
  name: 'UserIndex',
  data () {
    return {
      userInfo: {}
    }
  },
  components: {
    LayoutFooter,
    VanCellGroup: CellGroup,
    VanCell: Cell,
    VanImage: Image,
    VanIcon: Icon,
    VanGrid: Grid,
    VanGridItem: GridItem
  },
  created () {
    this.loadUserInfo()
  },
  methods: {
    async loadUserInfo () {
      const { data } = await getUserInfo()
      if (data.state === 1) {
        this.userInfo = data.content
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-info {
    padding: 30px 20px;
    background-color: rgb(248, 150, 3);
    .van-cell__value {
      display: flex;
      .user-info-content {
        padding-left: 15px;
        h3 {
          margin: 5px;
          font-size: 18px;
        }
      }
    }
  }
  .acount-info {
    background-color: rgb(248, 150, 3);
    margin-top: -1px;
    .van-grid {
      border-radius: 10px;
      overflow: hidden;
      .grid-item-value {
        font-size: 22px;
        font-weight: 700;
      }
    }
  }
</style>
