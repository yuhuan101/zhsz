const PATH_HEAD = process.env.NODE_ENV == 'development' ? '/api' : 'http://192.168.1.242:8080/szxy';

//综合素质首页
export const HomeApi = {
  getTeacherEvaluationClassList: `${PATH_HEAD}/teacherClassEvaluation/getTeacherEvaluationClassList`, // 获取教师评价班级列表
};

// 学生
export const StudentApi = {
  getEvaluationClassStudentList: `${PATH_HEAD}/teacherClassEvaluation/getEvaluationClassStudentList`, // 获取评价班级学生列表
};

// 评价
export const PjApi = {
  list: `${PATH_HEAD}/evaluationItem/custom/list`, // 评价项列表
  getAll: `${PATH_HEAD}/dimensionItem/getAll`, // 获取所有维度
};

// 文件上传
export const FileApi = {
  uploadFile: `${PATH_HEAD}/file/uploadFile`, // 文件上传
};

