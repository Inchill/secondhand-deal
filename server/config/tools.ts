const bcrypt = require('bcryptjs');

module.exports = {
    // 加密
    enbcrypt(password) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        return hash;
    },
    // 解密
    debcrypt(password, hash) {
        return bcrypt.compareSync(password, hash);
    }
}