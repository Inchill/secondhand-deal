const OSS = require('ali-oss');

const client = new OSS({
    bucket: 'goods-images-chuck',
    region: 'oss-cn-beijing',
    accessKeyId: '',
    accessKeySecret: ''
});

export default client;
