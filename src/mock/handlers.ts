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
  http.get("/api/products", () => { // 拦截商品列表接口 api/products。
    return HttpResponse.json({ // 返回 JSON 格式的商品列表对象。
      list: [ // list 才是真正的商品数组。
        { id: 1, name: "无线蓝牙耳机", price: 299, stock: 86, category: "数码", image: "https://picsum.photos/seed/product-1/120/120" }, // 第一条假商品数据。
        { id: 2, name: "轻薄办公笔记本", price: 5299, stock: 24, category: "电脑", image: "https://picsum.photos/seed/product-2/120/120" }, // 第二条假商品数据。
        { id: 3, name: "纯棉短袖 T 恤", price: 89, stock: 150, category: "服饰", image: "https://picsum.photos/seed/product-3/120/120" }, // 第三条假商品数据。
      ], // 结束商品数组。
    }); // 结束商品列表接口响应。
  }), // 结束商品列表接口拦截。
  http.get("/api/orders", () => { // 拦截订单列表接口 api/orders。
    const statuses = ["待付款", "已付款", "已发货", "已完成"] as const; // 准备订单状态假数据。
    const customerNames = ["张三", "李四", "王五", "赵六", "钱七", "孙八", "周九", "吴十", "郑一", "冯二"]; // 准备客户姓名假数据。
    const products = ["无线蓝牙耳机", "轻薄办公笔记本", "纯棉短袖 T 恤", "智能手表", "机械键盘", "护眼台灯", "保温水杯", "人体工学椅", "空气炸锅", "运动跑鞋"]; // 准备商品名称假数据。

    return HttpResponse.json({ // 返回 JSON 格式的订单列表对象。
      list: Array.from({ length: 50 }, (_, index) => ({ // 生成 50 条订单假数据。
        id: index + 1,
        orderId: 202605080001 + index,
        customerName: customerNames[index % customerNames.length],
        amount: Number((99 + index * 37.8).toFixed(2)),
        status: statuses[index % statuses.length],
        createdAt: `2026-04-${String((index % 30) + 1).padStart(2, "0")}`,
        product: products[index % products.length],
      })),
    }); // 结束订单列表接口响应。
  }), // 结束订单列表接口拦截。
]; // 结束接口拦截列表。
