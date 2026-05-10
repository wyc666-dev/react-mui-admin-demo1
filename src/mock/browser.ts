import { setupWorker } from "msw/browser"; // 从 msw/browser 里引入浏览器 Mock Worker 初始化方法。

import { handlers } from "./handlers"; // 引入接口拦截列表。

export const worker = setupWorker(...handlers); // 创建并导出浏览器 Mock Worker 实例。
