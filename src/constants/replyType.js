const replyType = {
  TEXT: 0,
  IMAGE: 1,
  getName: (value) => {
    const map = ['文本', '图片']
    return map[value] || null
  },
  values: () => {
    return [replyType.TEXT, replyType.IMAGE]
  }
}

export default replyType
