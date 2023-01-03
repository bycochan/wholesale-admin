/*
 * @Author: BycoChan
 * @Date: 2022-11-23 09:05:26
 * @LastEditTime: 2022-11-23 13:58:21
 * @LastEditors: BycoChan
 * @Description: mock会员管理
 * @FilePath: \vue-naive-admin-main\mock\api\member.js
 *
 */
const members = [
  {
    name: 'Justin Hu',
    code: 'justin',
    level: 'vvip',
    phone: '1234567890',
    mail: 'aa@123.com',
    isDisabled: true,
    remarks: '描述',
  },
  {
    name: 'Hioolong Huang',
    code: 'hioolong',
    level: 'vvip',
    phone: '1234567890',
    mail: 'aa@123.com',
    isDisabled: true,
    remarks: '描述',
  },
  {
    name: 'Byco Chan',
    code: 'byco',
    level: 'vvip',
    phone: '1234567890',
    mail: 'aa@123.com',
    isDisabled: true,
    remarks: '描述',
  },
]

export default [
  {
    url: '/api/members',
    method: 'get',
    response: (data = {}) => {
      const { name, pageNo, pageSize } = data.query
      let pageData = []
      let total = 60
      const filterData = members.filter((item) => item.name.includes(name) || (!name && name !== 0))
      if (filterData.length) {
        if (pageSize) {
          while (pageData.length < pageSize) {
            pageData.push(filterData[Math.round(Math.random() * (filterData.length - 1))])
          }
        } else {
          pageData = filterData
        }
        pageData = pageData.map((item, index) => ({
          id: pageSize * (pageNo - 1) + index + 1,
          ...item,
        }))
      } else {
        total = 0
      }
      return {
        code: 0,
        message: 'ok',
        data: {
          pageData,
          total,
          pageNo,
          pageSize,
        },
      }
    },
  },
  {
    url: '/api/member',
    method: 'post',
    response: ({ body }) => {
      return {
        code: 0,
        message: 'ok',
        data: body,
      }
    },
  },
  {
    url: '/api/member/:id',
    method: 'put',
    response: ({ query, body }) => {
      return {
        code: 0,
        message: 'ok',
        data: {
          id: query.id,
          body,
        },
      }
    },
  },
  {
    url: '/api/member/:id',
    method: 'delete',
    response: ({ query }) => {
      return {
        code: 0,
        message: 'ok',
        data: {
          id: query.id,
        },
      }
    },
  },
]
