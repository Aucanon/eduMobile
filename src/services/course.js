import request from '@/utils/request'

// 获取广告位及其对应广告
export const getAllAds = (params) => request({ method: 'GET', url: '/front/ad/getAllAds', params })

// 分页查询课程信息
export const getAllCourse = (data) => request({ method: 'POST', url: '/boss/course/getQueryCourses', data })

// 获取已购课程
export const getPurchaseCourse = () => request({ method: 'GET', url: '/front/course/getPurchaseCourse' })

// 获取课程详情
export const getCourseById = (params) => request({ method: 'GET', url: '/front/course/getCourseById', params })

// 获取课程章节
export const getServtionAndLesson = (params) => request({ method: 'GET', url: '/front/course/session/getSectionAndLesson', params })

// 根据 fileId 获取阿里云对应视频播放信息
export const getVideoInfo = (params) => request({ method: 'GET', url: '/front/course/media/videoPlayInfo', params })
