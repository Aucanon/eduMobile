<template>
  <div class="login">
    <van-nav-bar
      title="登录"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.phone"
        name="phone"
        label="手机号"
        placeholder="亲输入手机号"
        :rules="[
          {
            required: true,
            message: '请填写手机号'
          },
          {
            validator: phoneCheck,
            message: '格式有误，请重新输入！'
          }
        ]"
      />
      <van-field
        v-model="form.password"
        type="password"
        name="password"
        label="密码"
        placeholder="请输入密码"
        :rules="[
          {
            required: true,
            message: '请填写密码'
          },
          {
            pattern: /^[a-zA-Z0-9]{6,12}$/,
            message: '格式有误，请重新输入！'
          }
        ]"
      />
      <div style="margin: 16px;">
        <van-button :loading="isLoading" round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/services/user'
import { NavBar, Form, Field, Button, Toast } from 'vant'

export default {
  name: 'LoginIndex',
  components: {
    VanNavBar: NavBar,
    VanForm: Form,
    VanField: Field,
    VanButton: Button
  },
  data () {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      },
      isLoading: false
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    async onSubmit () {
      this.isLoading = true
      const { data } = await login(this.form)
      if (data.state === 1) {
        Toast.success('登陆成功！')
        this.$store.commit('SETUSER', data.content)
        this.$router.push(this.$route.query.redirect || '/')
      } else {
        Toast.fail('登陆失败')
      }
      this.isLoading = false
    },
    phoneCheck (val) {
      return /^1\d{10}$/.test(val)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
