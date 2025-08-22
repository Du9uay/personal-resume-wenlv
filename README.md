# 文旅个人简历网站

一个现代化的文旅行业个人简历展示网站，采用青春活力的设计风格。

🔗 **在线访问**: https://du9uay.github.io/personal-resume-wenlv/

## 🌟 特性

- 🎨 青春活力的视觉设计
- 🗺️ 世界地图背景动画
- 📊 技能雷达图展示
- 💼 精选文旅项目展示
- 📱 完全响应式设计
- ⚡ 流畅的交互体验

## 🚀 本地运行

### 方式一：Python HTTP Server（推荐）
```bash
# Python 3
python3 -m http.server 8888

# Python 2
python -m SimpleHTTPServer 8888
```

### 方式二：使用启动脚本
```bash
chmod +x start-server.sh
./start-server.sh
```

然后在浏览器中访问：`http://localhost:8888`

## 📂 项目结构

```
├── index.html                    # 主页面
├── youth-travel-style.css        # 主样式文件
├── skills-modern-style.css      # 技能模块样式
├── hero-map-style.css           # 地图背景样式
├── echarts-background-map.js    # 世界地图配置
├── worldZH.json                 # 世界地图数据
└── public/                      # 项目图片资源
    ├── 舟山某民宿180天提升入住率项目/
    ├── 谷子店开店与经营管理/
    ├── 春风450MT新品上市营销活动策划项目/
    └── 某自驾游平台SEO:SEM全流程优化项目/
```

## 🎯 功能模块

### 1. 英雄区域
- 动态世界地图背景
- 个人信息展示
- 打字机效果标语

### 2. 个人概况
- 教育背景
- 专业技能
- 个人优势

### 3. 精选项目
- 4个文旅项目展示
- 详细流程弹窗
- 项目成果展示

### 4. 技能护照
- 技能雷达图
- 专业技能说明

### 5. 联系方式
- 多渠道联系方式
- 社交媒体链接

## 🛠️ 技术栈

- HTML5
- CSS3 (Flexbox, Grid, Animations)
- JavaScript (ES6+)
- ECharts (地图可视化)
- Canvas API (雷达图)

## 📝 许可

MIT License

## 👤 作者

万圆 (Wan Yuan)

## 🌐 部署说明

### GitHub Pages 部署（已配置）

项目已配置GitHub Actions自动部署。每次推送到main分支时会自动部署到GitHub Pages。

**访问地址**: https://du9uay.github.io/personal-resume-wenlv/

### 手动开启GitHub Pages

1. 进入仓库 Settings
2. 找到 Pages 选项
3. Source 选择 "GitHub Actions"
4. 等待几分钟后即可访问

### 其他部署方式

#### Vercel 部署
1. 访问 https://vercel.com
2. 导入GitHub项目
3. 一键部署

#### Netlify 部署
1. 访问 https://netlify.com
2. 拖拽项目文件夹上传
3. 自动部署

## 🤝 贡献

欢迎提交 Issues 和 Pull Requests！