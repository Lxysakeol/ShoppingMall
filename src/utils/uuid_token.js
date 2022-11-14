import { v4 as uuidv4 } from 'uuid';//起别名引入方式
//要生成一个随机的字符串，且每次执行不能发生变化，游客身份持久存储
export const getUUID = () => {
  //先从本地存储看是否有uuid
  let uuid_token = localStorage.getItem('UUID')
  if (!uuid_token) {
    uuid_token = uuidv4();
    localStorage.setItem('UUID', uuid_token)
  }
  return uuid_token;
}