const core = require("@serverless-devs/core");
const CdnService = require("@serverless-cd/aliyun-cdn-cache").default;
const { lodash: _, popCore, getCredential } = core;
const logger = new core.Logger("cdn-cacheRefresh");

async function getCredentials(inputs) {
  const { credentials, project } = inputs;
  const access = project?.access;
  if (_.isEmpty(credentials)) {
    return await getCredential(access);
  }
  return credentials;
}

/**
 * Plugin 插件入口
 * @param inputs 组件的入口参数
 * @param args 插件的自定义参数
 * @return inputs
 */
module.exports = async function cdnCachePlugin(inputs, args) {
  logger.debug(`inputs params: ${JSON.stringify(inputs)}`);
  logger.debug(`args params: ${JSON.stringify(args)}`);

  function getCdnClient(credentials) {
    const { AccountID, AccessKeyID, AccessKeySecret, SecurityToken } =
      credentials;
    const client = new popCore({
      accessKeyId: AccessKeyID,
      accessKeySecret: AccessKeySecret,
      securityToken: SecurityToken,
      endpoint: "https://cdn.aliyuncs.com",
      apiVersion: "2018-05-10",
    });
    return client;
  }
  const credentials = getCredentials(inputs);
  const client = getCdnClient(credentials);
  const cdnService = new CdnService({
    logger,
    client: client,
    params: args,
  });
  await cdnService.pushOrRefreshCache(client, args);
  return inputs;
};
