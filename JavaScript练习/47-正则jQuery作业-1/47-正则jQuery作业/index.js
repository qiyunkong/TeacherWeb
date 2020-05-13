function regFn() {
  var reg = {
    // 用户名的正则,6-18,数字字母_ 必须字母开头
    user: /^[a-z]\w{5,17}$/i,
    // 密码的正则,数字字母_ 以及其他特殊字符
    pwd: /^[\w\-\[\]\{\}\\<>,.*/=+)(:;&%^@!~|]$/,
    // 手机号码
    tel: /^1[3-9]\d{9}$/,
    // qq 5-10  只能是数字,第一位不能是0
    qq: /^[1-9]\d{4,9}$/,
    // 邮箱 @ .
    email: /^[a-z1-9_]\w{0,17}@[0-9a-z]{2,}\.[a-z]{2,4}$/i,
    getReg: function (str) {
      return reg[str]
    }
  }
  return reg.getReg;
}