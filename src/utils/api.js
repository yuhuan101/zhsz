const PATH_HEAD = process.env.NODE_ENV == 'development' ? '/api' : 'http://192.168.1.242:8080/szxy';

//上传图片
export const sctpApi = {
  sfshxq: `${PATH_HEAD}/mobile_work/sctp_sctp.do`,
}

//资源上报
export const zysbApi = {
  sfshxq: `${PATH_HEAD}/mobile_work/zysb_sfshxq.do`, // 是否有审核权限
  zyList: `${PATH_HEAD}/mobile_work/zysb_list.do`, // 获取资源上报列表
  getZysbData: `${PATH_HEAD}/mobile_work/zysb_getZysbData.do`, // 获取资源上报的详情
  saveZysb: `${PATH_HEAD}/mobile_work/zysb_saveZysb.do`, // 保存,修改资源上报
  shList: `${PATH_HEAD}/mobile_work/zysb_shList.do`, // 根据登录人、状态、及搜索框内容模糊查询登录人有权限审批的记录列表
  zysbPlsh: `${PATH_HEAD}/mobile_work/zysb_zysbPlsh.do`, // 批量审批
  zysbsh: `${PATH_HEAD}/mobile_work/zysb_zysbsh.do`, // 单条审批
}

//实施上报
export const sssbApi = {
  sfshxq: `${PATH_HEAD}/mobile_work/zysb_sfshxq.do`, // 是否有审核权限
  ssList: `${PATH_HEAD}/mobile_work/sssb_list.do`, // 是否有审核权限
  shList: `${PATH_HEAD}/mobile_work/sssb_shList.do`, // 他人申请
  sssbPlsh: `${PATH_HEAD}/mobile_work/sssb_sssbPlsh.do`, // 批量审批
  sssbsh: `${PATH_HEAD}/mobile_work/sssb_sssbsh.do`, // 单条审批
  saveSssb: `${PATH_HEAD}/mobile_work/sssb_saveSssb.do`, // 保存实施上报
  updateSssb: `${PATH_HEAD}/mobile_work/sssb_updateSssb.do`, // 修改实施上报
  deleteSssb: `${PATH_HEAD}/mobile_work/sssb_deleteSssb.do`, // 删除实施上报
  getSssbData: `${PATH_HEAD}/mobile_work/sssb_getSssbData.do`, // 获取实施上报详情
  kmList: `${PATH_HEAD}/mobile_work/sssb_kmList.do`, // 科目列表
}

//技术上报
export const jssbApi = {
  jsList: `${PATH_HEAD}/mobile_work/jsbz_list.do`, // 技术保障上报信息列表
  shList: `${PATH_HEAD}/mobile_work/jsbz_shList.do`, // 他人上报列表
  getJsbzData: `${PATH_HEAD}/mobile_work/jsbz_getJsbzData.do`, // 获取技术保障详情信息
  saveJsbz: `${PATH_HEAD}/mobile_work/jsbz_saveJsbz.do`, // 保存技术保障详情信息
  updateJsbz: `${PATH_HEAD}/mobile_work/jsbz_updateJsbz.do`, // 修改技术保障
  deleteJsbz: `${PATH_HEAD}/mobile_work/jsbz_deleteJsbz.do`, // 删除技术保障
  JsbzPlsh: `${PATH_HEAD}/mobile_work/jsbz_JsbzPlsh.do`, // 批量审批
  jsbzsh: `${PATH_HEAD}/mobile_work/jsbz_jsbzsh.do`, // 单条审批
}

//公开课上报
export const gkkApi = {
  gkkList: `${PATH_HEAD}/mobile_work/gkksb_list.do`, // 公开课信息列表
  shList: `${PATH_HEAD}/mobile_work/gkksb_shList.do`, // 他人上报列表
  getGkksbData: `${PATH_HEAD}/mobile_work/gkksb_getGkksbData.do`, // 获取公开课详情信息
  saveGkksb: `${PATH_HEAD}/mobile_work/gkksb_saveGkksb.do`, // 保存公开课详情信息
  updateGkksb: `${PATH_HEAD}/mobile_work/gkksb_updateGkksb.do`, // 修改
  deleteGkksb: `${PATH_HEAD}/mobile_work/gkksb_deleteGkksb.do`, // 删除
  gkksbPlsh: `${PATH_HEAD}/mobile_work/gkksb_gkksbPlsh.do`, // 批量审批
  gkksbsh: `${PATH_HEAD}/mobile_work/gkksb_gkksbsh.do`, // 单条审批
  njList: `${PATH_HEAD}/mobile_work/gkksb_njList.do`, // 获取年级
}

//督导评课
export const ddpkApi = {
  shlist: `${PATH_HEAD}/mobile_work/ddpk_shlist.do`, // 督导评课上报信息列表
  getDdpkData: `${PATH_HEAD}/mobile_work/ddpk_getDdpkData.do`, // 详情
  updateDdpk: `${PATH_HEAD}/mobile_work/ddpk_updateDdpk.do`, // 督导评课评分
  bjList: `${PATH_HEAD}/mobile_work/ddpk_bjList.do`, // 获取当前学年学期的班级列表
}

