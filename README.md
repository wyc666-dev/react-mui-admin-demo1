# W-Admin Dashboard 🚀

[🇮🇹 Italiano](#italiano) | [🇺🇸 English](#english) | [🇨🇳 中文](#中文)

---

<a name="italiano"></a>
## 🇮🇹 Italiano (Versione Integrale)

### 🌟 Panoramica del Progetto
W-Admin Dashboard è un'applicazione di gestione amministrativa all'avanguardia, costruita con l'ultima versione di **React 19** e **Material UI 6**. Questo progetto nasce come "Showcase" per dimostrare la capacità di implementare un ecosistema frontend completo, robusto e scalabile, integrando strumenti moderni come React Query e MSW per la gestione dei dati e delle API.

### 🚀 Funzionalità Principali
- **Autenticazione Sicura**: Sistema di login completo con validazione dei dati (Zod) e persistenza del token tramite localStorage.
- **Visualizzazione Dati (Analytics)**: Grafici interattivi e responsivi realizzati con Recharts per il monitoraggio di vendite e metriche.
- **Gestione CRUD Avanzata**: 
  - **Utenti**: Visualizzazione, aggiunta ed eliminazione di profili utente.
  - **Prodotti**: Catalogo prodotti con gestione stock e categorie.
  - **Ordini**: Sistema di tracciamento ordini con filtri per stato e ricerca testuale.
- **Infrastruttura Mock**: Intercettazione delle chiamate di rete tramite MSW (Mock Service Worker), permettendo al progetto di funzionare senza un backend reale ma comportandosi come se ci fosse.
- **Design Adattivo**: Interfaccia pulita e professionale basata sui principi del Material Design.

### 🛠 Stack Tecnologico
- **Frontend**: React 19, TypeScript, Vite
- **UI & Styling**: Material UI (MUI) v6, Emotion
- **Gestione Stato & API**: TanStack Query (React Query) v5, Axios
- **Validazione & Form**: Zod, React Hook Form
- **Routing**: React Router v7
- **Grafici**: Recharts
- **Simulazione Backend**: MSW (Mock Service Worker)

### 📂 Struttura del Progetto
- `src/api`: Definizioni dei servizi e configurazione Axios.
- `src/components`: Componenti UI riutilizzabili e layout.
- `src/hooks`: Hook personalizzati per la logica condivisa.
- `src/mock`: Handlers e configurazione per MSW.
- `src/pages`: Componenti di pagina (Dashboard, Login, Orders, etc.).
- `src/schemas`: Schemi di validazione Zod.

### ⚙️ Installazione e Utilizzo
1.  **Clona il repository**:
    ```bash
    git clone https://github.com/wyc666-dev/react-mui-admin-demo1.git
    ```
2.  **Installa le dipendenze**:
    ```bash
    npm install
    ```
3.  **Avvia in modalità sviluppo**:
    ```bash
    npm run dev
    ```

### 🔐 Credenziali di Accesso
- **Username**: `wyc666`
- **Password**: `20020911`

---

<a name="english"></a>
## 🇺🇸 English (Full Version)

### 🌟 Project Overview
W-Admin Dashboard is a cutting-edge administrative management application built with the latest **React 19** and **Material UI 6**. This project serves as a "Showcase" to demonstrate the ability to implement a complete, robust, and scalable frontend ecosystem, integrating modern tools like React Query and MSW for data and API management.

### 🚀 Key Features
- **Secure Authentication**: Complete login system with data validation (Zod) and token persistence via localStorage.
- **Data Visualization (Analytics)**: Interactive and responsive charts built with Recharts for monitoring sales and metrics.
- **Advanced CRUD Management**:
  - **Users**: View, add, and delete user profiles.
  - **Products**: Product catalog with stock and category management.
  - **Orders**: Order tracking system with status filters and text search.
- **Mock Infrastructure**: Network call interception via MSW (Mock Service Worker), allowing the project to function without a real backend while behaving as if there were one.
- **Adaptive Design**: Clean and professional interface based on Material Design principles.

### 🛠 Tech Stack
- **Frontend**: React 19, TypeScript, Vite
- **UI & Styling**: Material UI (MUI) v6, Emotion
- **State & API Management**: TanStack Query (React Query) v5, Axios
- **Validation & Forms**: Zod, React Hook Form
- **Routing**: React Router v7
- **Charts**: Recharts
- **Backend Simulation**: MSW (Mock Service Worker)

### 📂 Project Structure
- `src/api`: Service definitions and Axios configuration.
- `src/components`: Reusable UI components and layouts.
- `src/hooks`: Custom hooks for shared logic.
- `src/mock`: MSW handlers and configuration.
- `src/pages`: Page components (Dashboard, Login, Orders, etc.).
- `src/schemas`: Zod validation schemas.

### ⚙️ Installation and Setup
1.  **Clone the repository**:
    ```bash
    git clone https://github.com/wyc666-dev/react-mui-admin-demo1.git
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Start development server**:
    ```bash
    npm run dev
    ```

### 🔐 Login Credentials
- **Username**: `wyc666`
- **Password**: `20020911`

---

<a name="中文"></a>
## 🇨🇳 中文 (完整版)

### 🌟 项目概览
W-Admin Dashboard 是一款基于最新的 **React 19** 和 **Material UI 6** 构建的前沿管理后台应用。本项目作为一个“技术展示”作品，旨在体现构建完整、健壮且可扩展的前端生态系统的能力，集成了 React Query 和 MSW 等现代工具进行数据及 API 管理。

### 🚀 核心功能
- **安全身份验证**: 完善的登录系统，包含数据校验 (Zod) 及基于 localStorage 的 Token 持久化。
- **数据可视化 (Analytics)**: 使用 Recharts 构建的交互式响应图表，用于监控销售趋势和核心指标。
- **高级增删改查 (CRUD)**:
  - **用户管理**: 支持查看、新增和删除用户档案。
  - **产品管理**: 包含库存管理和分类筛选的产品目录。
  - **订单管理**: 带有状态过滤和全文搜索功能的订单追踪系统。
- **模拟基础设施**: 通过 MSW (Mock Service Worker) 拦截网络请求，使项目在没有真实后端的情况下也能像真实环境一样运行。
- **响应式设计**: 基于 Material Design 原则打造的简洁、专业的界面。

### 🛠 技术栈
- **核心框架**: React 19, TypeScript, Vite
- **UI 与样式**: Material UI (MUI) v6, Emotion
- **状态与数据管理**: TanStack Query (React Query) v5, Axios
- **校验与表单**: Zod, React Hook Form
- **路由**: React Router v7
- **图表库**: Recharts
- **后端模拟**: MSW (Mock Service Worker)

### 📂 项目结构
- `src/api`: 接口定义与 Axios 配置。
- `src/components`: 可复用的 UI 组件与布局结构。
- `src/hooks`: 共享逻辑的自定义 Hook。
- `src/mock`: MSW 处理程序与配置。
- `src/pages`: 页面组件（仪表盘、登录、订单、产品等）。
- `src/schemas`: Zod 校验模式。

### ⚙️ 安装与启动
1.  **克隆仓库**:
    ```bash
    git clone https://github.com/wyc666-dev/react-mui-admin-demo1.git
    ```
2.  **安装依赖**:
    ```bash
    npm install
    ```
3.  **启动开发服务器**:
    ```bash
    npm run dev
    ```

### 🔐 登录凭据
- **用户名**: `wyc666`
- **密码**: `20020911`

---

## 🌿 Git 策略 / Git Strategy
Questo progetto segue la convenzione **Conventional Commits**. Il codice stabile e le manutenzioni future sono gestiti direttamente sul ramo `main`.
*This project follows the **Conventional Commits** convention. Stable code and future maintenance are managed directly on the `main` branch.*
*本项目遵循 **Conventional Commits** 提交规范。稳定代码及后续维护将直接在 `main` 分支进行。*
