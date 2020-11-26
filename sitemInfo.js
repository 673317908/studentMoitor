const siteinfo = {
  env: "dev", //环境变量 [dev开发 pro线上]
  siteroot: "", //请求链接
  apiEnv: "dev", //请求链接环境变量  [dev开发 pro线上]
};
siteinfo.siteroot = {
  pro: "", //线上
  dev: "", //测试
} [siteinfo.apiEnv]

export default siteinfo