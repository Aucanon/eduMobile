import request from '@/utils/request'

// 创建商品订单
export const createOrder = (data) => request({ method: 'POST', url: '/front/order/saveOrder', data })

// 获取支付方式
export const getPayInfo = (params) => request({ method: 'GET', url: '/front/pay/getPayInfo', params })

// 创建订单(发起支付)
export const initPayment = (data) => request({ method: 'POST', url: '/front/pay/saveOrder', data })

// 查询订单(支付结果)
export const getPayResult = (params) => request({ method: 'GET', url: '/front/pay/getPayResult', headers: { 'content-type': 'application/json' }, params })
