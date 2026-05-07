import { http, HttpResponse } from "msw"; // 从 msw 里引入接口拦截方法和响应工具。

export const handlers = [ // 导出接口拦截列表，给 browser.ts 使用。
  http.post("/api/login", () => { // 拦截登录接口 api/login。
    return HttpResponse.json({ // 返回 JSON 格式的假数据。
      token: "mock-token", // 返回一个假的 token。
      userName: "admin", // 返回一个假的用户名。
    }); // 结束登录接口响应。
  }), // 结束登录接口拦截。
  http.get("/api/users", () => { // 拦截用户列表接口 api/users。
    return HttpResponse.json({ // 返回 JSON 格式的用户列表对象。
      list: [ // list 才是真正的用户数组。
        { id: 1, name: "张三", age: 18, gender: "男", address: "北京" }, // 第一条假用户数据。
        { id: 2, name: "李四", age: 20, gender: "女", address: "上海" }, // 第二条假用户数据。
      ], // 结束用户数组。
    }); // 结束用户列表接口响应。
  }), // 结束用户列表接口拦截。
]; // 结束接口拦截列表。
