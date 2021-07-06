const adminUserStatus = {
  ENABLED: 0,
  DISABLED: 1,
  getName: (value) => {
    const map = ['已启用', '已禁用']
    return map[value] || null
  },
  values: () => {
    return [adminUserStatus.ENABLED, adminUserStatus.DISABLED]
  }
}
