const posts = [
  {
    title: '德芙丝滑',
    prince: 8,
    author: '老板',
    category: '零食',
    imgList: [
      {
        status: 'finished',
        url: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
      },
    ],
    imgUrl: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
    content: '测试商品',
    isRecommend: true,
    isPublish: true,
    createDate: '2021-11-04T04:03:36.000Z',
    updateDate: '2021-11-04T04:03:36.000Z',
  },
  {
    title: '合味道',
    prince: 6,
    author: '老板',
    category: '泡面',
    imgUrl: '111',
    content: '测试商品',
    isRecommend: true,
    isPublish: true,
    createDate: '2021-10-25T08:57:47.000Z',
    updateDate: '2022-02-28T04:02:39.000Z',
  },
  {
    title: '人头马vsop',
    prince: 999,
    author: '老板',
    category: '酒',
    imgUrl: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
    content: '我之前写过一篇文章记录了一次上传图片的优化史',
    isRecommend: true,
    isPublish: true,
    createDate: '2021-06-24T18:46:19.000Z',
    updateDate: '2021-09-23T07:51:22.000Z',
  },

  {
    title: '果粒橙',
    prince: 3,
    author: '老板',
    category: '果汁',
    imgUrl: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
    content: '> 背景\n\n公司有个vue-cli3移动端web项目发版更新后发现部分用户手机在钉钉内置浏览器打开出现了缓存',
    isRecommend: true,
    isPublish: true,
    createDate: '2021-06-10T18:51:19.000Z',
    updateDate: '2021-09-17T09:33:24.000Z',
  },
  {
    title: '燕塘甜牛奶',
    prince: 2,
    author: '老板',
    category: '奶类',
    imgUrl: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
    content: '## 1. Promise.all\n\n并行执行多个 promise，并等待所有 promise 都准备就绪。再对它们进行处理。',
    isRecommend: true,
    isPublish: true,
    createDate: '2021-02-22T22:37:06.000Z',
    updateDate: '2021-09-17T09:33:24.000Z',
  },
]

export default [
  {
    url: '/api/posts',
    method: 'get',
    response: (data = {}) => {
      const { title, pageNo, pageSize } = data.query
      let pageData = []
      let total = 60
      const filterData = posts.filter((item) => item.title.includes(title) || (!title && title !== 0))
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
    url: '/api/post',
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
    url: '/api/post/:id',
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
    url: '/api/post/:id',
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
