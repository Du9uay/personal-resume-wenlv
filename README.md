# 个人简历网站 - 增强版

这是一个现代化的响应式个人简历网站，融合了优秀的设计理念和用户体验。

## ✨ 主要特性

### 🎨 视觉设计
- **现代化界面**: 采用渐变背景和卡片式布局
- **响应式设计**: 完美适配桌面端、平板和移动端
- **流畅动画**: 滚动动画和交互效果
- **优雅配色**: 专业的渐变色彩搭配

### 🚀 功能特性
- **固定导航栏**: 智能导航，自动高亮当前区域
- **GSAP动画系统**: 统一的动画管理，替代原有CSS/AOS动画
- **代码优化**: 清理冗余文件和代码，提升性能
- **技能展示**: 分点罗列式专业技能展示，复合能力区域支持滚动
- **现代项目展示**: 
  - 左侧深色区域：项目标题和正方形图片预览
  - 右侧浅色区域：项目分类、职位、时间、公司、项目描述
  - 支持图片点击放大查看
  - 职责详情弹窗展示
  - 简洁现代的卡片设计和悬停动效
- **平滑滚动**: 流畅的页面滚动体验
- **返回顶部**: 便捷的页面导航
- **打印优化**: 支持完美的简历打印

### 📱 用户体验
- **快速加载**: 优化的资源加载策略
- **无障碍访问**: 良好的键盘导航支持
- **SEO友好**: 完整的搜索引擎优化
- **多浏览器兼容**: 支持主流浏览器

## 📁 文件结构

```
个人简历/
├── index-enhanced.html # 主要简历网站 ⭐
├── drone-project.jpg   # 无人机项目设计图
├── particles.min.js    # 粒子背景库
├── gsap-animations.js  # GSAP动画配置文件 ✨
├── README.md          # 说明文档
├── rule.md            # 设计规范
├── 个人简历.md        # 原始简历内容
└── reference/         # 参考项目
```

## 📑 页面结构

增强版简历网站包含以下七个主要部分：

1. **主页** - 个人介绍和粒子背景展示
2. **基本资料** - 姓名、联系方式、教育背景、主修课程
3. **专业技能** - 核心能力、复合能力
4. **实习/工作经历** - 无人机结构设计项目经验
5. **其他经历** - 竞赛获奖、专业证书、志愿服务
6. **个人总结** - 综合能力和求职意向
7. **联系方式** - 邮箱、电话、地址、期望职位

## 🚀 快速开始

### 方法一：直接打开
```bash
# macOS
open index-enhanced.html

# Windows
start index-enhanced.html

# Linux
xdg-open index-enhanced.html
```

### 方法二：本地服务器（推荐）
```bash
# 使用Python启动本地服务器
python3 -m http.server 8080

# 然后在浏览器中访问
http://localhost:8080/index-enhanced.html
```

### 方法三：局域网部署
```bash
# 启动局域网可访问的服务器
python3 -m http.server 8080 --bind 0.0.0.0

# 局域网内其他设备访问（替换为您的实际IP）
http://192.168.2.22:8080/index-enhanced.html
```

### 方法四：使用Node.js
```bash
# 安装http-server
npm install -g http-server

# 启动服务器
http-server -p 8080 -o
```

## 🎮 交互功能

网站提供了丰富的交互体验：

- **📸 图片查看**: 点击项目图片可放大查看详细的无人机设计草图
- **📋 职责详情**: 点击"主要职责"区域查看完整的7项工作职责详情
- **📜 滚动浏览**: 复合能力区域支持隐藏滚动条的流畅滚动体验
- **⌨️ 键盘操作**: 支持ESC键关闭弹窗，Home/End键快速导航
- **🖱️ 悬停效果**: 各个区域都有精美的悬停动画和反馈

## 🎬 GSAP动画系统

项目已集成GSAP动画库，提供专业级动画效果：

### 📁 动画文件结构
```
gsap-animations.js    # 主要的GSAP动画配置文件
├── 页面加载动画     # 加载器淡出、导航栏滑入
├── 英雄区域动画     # 头像旋转缩放、文字依次出现
├── 滚动触发动画     # 技能卡片、项目展示、联系信息
├── 悬停交互动画     # 卡片悬停效果增强
├── 弹窗动画增强     # 左滑入、右滑出弹窗效果
└── 工具函数        # 可复用的动画函数
```

### 🎯 如何添加自定义GSAP动画

**方法1: 直接在 `gsap-animations.js` 中添加**
```javascript
// 在相应的函数中添加新动画
function initHeroAnimations() {
    // 现有动画...
    
    // 添加你的自定义动画
    gsap.from(".my-element", {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 2,
        ease: "power2.out"
    });
}
```

**方法2: 创建新的动画函数**
```javascript
// 在gsap-animations.js中添加新函数
function initMyCustomAnimations() {
    gsap.timeline()
        .from(".element1", { opacity: 0, x: -100, duration: 0.8 })
        .from(".element2", { opacity: 0, x: 100, duration: 0.8 }, "-=0.4");
}

// 在initAllAnimations()中调用
function initAllAnimations() {
    // 现有初始化...
    initMyCustomAnimations(); // 添加这行
}
```

**方法3: 使用提供的工具函数**
```javascript
// 使用预定义的工具函数
createTextAnimation(".my-text", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1
});

createFadeInAnimation(".my-image", 'left', 100);
```

### 🔧 ScrollTrigger滚动动画
```javascript
gsap.from(".my-section", {
    scrollTrigger: {
        trigger: ".my-section",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        // markers: true // 调试时启用
    },
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
});
```

### 📱 性能优化建议
- 使用 `will-change: transform` CSS属性优化动画元素
- 避免同时运行过多复杂动画
- 在移动设备上适当减少动画复杂度
- 使用 `gsap.set()` 预设初始状态

### 🔧 动画冲突解决方案
项目已解决GSAP与原有CSS/AOS动画的冲突问题：

**已移除的冲突动画**:
- AOS (Animate On Scroll) 库及其CSS
- 原有的CSS关键帧动画 (slideInDown, slideInUp, fadeInUp)
- 页面加载时的CSS动画

**安全机制**:
- 多层元素可见性保护机制
- 动画初始化失败时的回退方案  
- 立即执行的紧急可见性修复
- ScrollTrigger不可用时的兼容处理
- 导航栏强制显示保护（CSS + JS双重保障）

**调试模式**:
```javascript
// 在浏览器控制台中启用ScrollTrigger标记来调试动画
ScrollTrigger.batch(".your-elements", {
    markers: true // 显示触发点标记
});
```

### 🧹 代码清理
项目已完成全面的代码清理和优化：

**已移除的冗余文件**:
- `index.html` - 原始版本，已被index-enhanced.html替代
- `app.js` - 粒子配置已内联到HTML中
- `config.js` - 未使用的配置文件

**已清理的冗余代码**:
- 重复的CSS规则（合并了两个.navbar规则）
- 被注释掉的CSS动画代码和@keyframes
- 整合了三个重复的可见性修复函数
- 移除了过时的注释和调试代码

**优化效果**:
- 减少文件数量，简化项目结构
- 提升代码可维护性
- 减少冗余CSS，优化加载性能
- 统一动画管理系统

## ⚙️ 自定义配置

### 修改个人信息
编辑 `config.js` 文件中的配置项：

```javascript
const resumeConfig = {
    personal: {
        name: "您的姓名",
        position: "您的职位",
        email: "your.email@example.com",
        phone: "您的电话",
        location: "您的地址",
        description: "个人简介..."
    },
    // ... 其他配置项
};
```

### 自定义主题颜色
```javascript
theme: {
    primary: "#667eea",      // 主色调
    secondary: "#764ba2",    // 次要色
    accent: "#f093fb",       // 强调色
    dark: "#2c3e50",         // 深色
    light: "#ecf0f1"         // 浅色
}
```

### 添加技能项目
```javascript
skills: {
    core: {
        title: "核心技能",
        icon: "fas fa-star",
        items: {
            "技能名称": 85,  // 技能名称: 掌握程度(0-100)
            "另一个技能": 90
        }
    }
}
```

## 🎯 版本对比

| 特性 | 原版 | 增强版 |
|------|------|--------|
| 基础功能 | ✅ | ✅ |
| 响应式设计 | ✅ | ✅ |
| 加载动画 | ❌ | ✅ |
| 固定导航 | ❌ | ✅ |
| 滚动动画 | ❌ | ✅ |
| 粒子背景 | ❌ | ✅ |
| 技能展示 | 简单 | 详细分点+滚动 |
| 项目展示 | 基础卡片 | 现代化左右布局 |
| 交互弹窗 | ❌ | ✅ |
| 图片放大 | ❌ | ✅ |
| 配置化数据 | ❌ | ✅ |
| SEO优化 | 基础 | 完整 |
| 打印优化 | 基础 | 完整 |

## 🛠️ 技术栈

- **HTML5**: 语义化标签、模态框、响应式图片
- **CSS3**: Flexbox、Grid、渐变、动画、毛玻璃效果
- **JavaScript**: ES6+、DOM操作、事件处理、模态框交互
- **Bootstrap 5**: 响应式框架、网格系统
- **AOS**: 滚动动画库
- **particles.js**: 粒子背景动画
- **GSAP**: 专业动画库 + ScrollTrigger插件
- **Font Awesome**: 图标库

## 📱 响应式断点

- **桌面端**: > 992px
- **平板端**: 768px ~ 992px
- **移动端**: < 768px

## 🌐 浏览器支持

- Chrome/Edge (推荐)
- Firefox
- Safari
- IE 11+ (基础支持)

## 📝 使用建议

1. **个人定制**: 根据config.js修改个人信息
2. **颜色调整**: 可以修改CSS变量来更换主题色
3. **内容优化**: 根据实际情况调整简历内容
4. **图片添加**: 可以替换头像和项目图片
5. **SEO优化**: 修改title、description等元信息

## 🔧 常见问题

### Q: 如何修改头像？
A: 目前使用的是Font Awesome图标，可以在config.js中修改avatar字段，或者直接替换HTML中的图标为图片。

### Q: 如何添加更多项目经历？
A: 在config.js的projects数组中添加新的项目对象。

### Q: 如何部署到网络？
A: 将所有文件上传到Web服务器或使用GitHub Pages等静态托管服务。

## 📄 许可证

此项目仅供个人简历使用，请根据需要自由修改和使用。

## 🙏 致谢

- 参考项目: [happysnaker/Resume](https://github.com/happysnaker/Resume)
- 设计灵感来源于现代网页设计趋势
- 感谢开源社区提供的优秀库和工具

---

**祝您求职顺利！** 🎉 