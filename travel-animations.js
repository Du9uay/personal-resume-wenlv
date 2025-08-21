// 文旅主题动画和交互效果

// 初始化函数
document.addEventListener('DOMContentLoaded', function() {
    initMountainBackground();
    initCloudAnimation();
    initBambooLeaves();
    initScrollReveal();
    initMapNavigation();
    initJourneyTimeline();
    initInkTransition();
    initProjectCards();
    initParallaxEffect();
    initChineseScrollEffect();
});

// 创建动态山水背景
function initMountainBackground() {
    const body = document.body;
    
    // 创建山水画背景容器
    const mountainBg = document.createElement('div');
    mountainBg.className = 'mountain-bg';
    
    // 创建三层山峦
    const layers = ['back', 'mid', 'front'];
    layers.forEach(layer => {
        const mountainLayer = document.createElement('div');
        mountainLayer.className = `mountain-layer ${layer}`;
        mountainBg.appendChild(mountainLayer);
    });
    
    body.insertBefore(mountainBg, body.firstChild);
}

// 云雾飘动效果
function initCloudAnimation() {
    const cloudContainer = document.createElement('div');
    cloudContainer.className = 'cloud-container';
    
    // 创建多个云朵
    for (let i = 0; i < 3; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        cloud.style.left = `${Math.random() * -200}px`;
        cloudContainer.appendChild(cloud);
    }
    
    document.body.appendChild(cloudContainer);
}

// 竹叶飘落效果
function initBambooLeaves() {
    const leavesContainer = document.createElement('div');
    leavesContainer.className = 'bamboo-leaves';
    
    // 创建飘落的竹叶
    function createLeaf() {
        const leaf = document.createElement('div');
        leaf.className = 'leaf';
        leaf.style.left = `${Math.random() * window.innerWidth}px`;
        leaf.style.animationDelay = `${Math.random() * 15}s`;
        leaf.style.animationDuration = `${15 + Math.random() * 10}s`;
        leavesContainer.appendChild(leaf);
        
        // 动画结束后移除叶子
        setTimeout(() => {
            leaf.remove();
        }, 25000);
    }
    
    // 定期创建新叶子
    setInterval(createLeaf, 3000);
    
    // 初始创建一些叶子
    for (let i = 0; i < 5; i++) {
        setTimeout(createLeaf, i * 1000);
    }
    
    document.body.appendChild(leavesContainer);
}

// 卷轴展开效果
function initScrollReveal() {
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <=
            (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('active');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // 初始检查
    handleScrollAnimation();
}

// 地图导航交互
function initMapNavigation() {
    const mapNav = document.querySelector('.map-navigation');
    if (!mapNav) return;
    
    // 项目位置数据
    const projects = [
        { id: 1, name: '智慧景区管理系统', x: '20%', y: '40%' },
        { id: 2, name: '文化遗产数字化', x: '40%', y: '60%' },
        { id: 3, name: '旅游路线规划平台', x: '60%', y: '30%' },
        { id: 4, name: '民宿预订系统', x: '80%', y: '50%' }
    ];
    
    projects.forEach(project => {
        const point = document.createElement('div');
        point.className = 'map-point';
        point.style.left = project.x;
        point.style.top = project.y;
        point.dataset.project = project.id;
        
        const label = document.createElement('span');
        label.className = 'map-point-label';
        label.textContent = project.name;
        point.appendChild(label);
        
        point.addEventListener('click', () => {
            showProjectDetail(project.id);
        });
        
        mapNav.appendChild(point);
    });
    
    // 连接线动画
    createPathAnimation(mapNav, projects);
}

// 创建路径动画
function createPathAnimation(container, points) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.position = 'absolute';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.pointerEvents = 'none';
    
    // 创建路径
    for (let i = 0; i < points.length - 1; i++) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const x1 = parseFloat(points[i].x);
        const y1 = parseFloat(points[i].y);
        const x2 = parseFloat(points[i + 1].x);
        const y2 = parseFloat(points[i + 1].y);
        
        const d = `M ${x1} ${y1} Q ${(x1 + x2) / 2} ${y1} ${x2} ${y2}`;
        path.setAttribute('d', d);
        path.setAttribute('stroke', '#4a90a4');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke-dasharray', '5,5');
        path.style.animation = 'dashAnimation 2s linear infinite';
        
        svg.appendChild(path);
    }
    
    container.appendChild(svg);
}

// 旅程时间轴
function initJourneyTimeline() {
    const timeline = document.querySelector('.journey-timeline');
    if (!timeline) return;
    
    const stops = timeline.querySelectorAll('.journey-stop');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
                
                // 添加连接线动画
                const marker = entry.target.querySelector('.stop-marker');
                if (marker) {
                    marker.style.animation = 'pulse 2s infinite';
                }
            }
        });
    }, observerOptions);
    
    stops.forEach(stop => {
        observer.observe(stop);
    });
}

// 水墨晕染效果
function initInkTransition() {
    const inkElements = document.querySelectorAll('.ink-transition');
    
    inkElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.background = 'radial-gradient(circle, rgba(45, 80, 22, 0.3) 0%, transparent 70%)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.transition = 'width 0.6s ease, height 0.6s ease, opacity 0.6s ease';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.style.width = '400px';
                ripple.style.height = '400px';
                ripple.style.opacity = '0';
            }, 10);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// 项目卡片交互
function initProjectCards() {
    const cards = document.querySelectorAll('.travel-project-card');
    
    cards.forEach(card => {
        // 鼠标跟随效果
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 10;
            const angleY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
        
        // 点击展开详情
        card.addEventListener('click', function() {
            showProjectModal(this.dataset.projectId);
        });
    });
}

// 视差滚动效果
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// 中国画卷轴效果
function initChineseScrollEffect() {
    // 创建卷轴边框
    const sections = document.querySelectorAll('.content-section');
    
    sections.forEach(section => {
        // 添加卷轴装饰
        const scrollTop = document.createElement('div');
        scrollTop.className = 'scroll-decoration-top';
        scrollTop.innerHTML = `
            <svg width="100%" height="30" viewBox="0 0 200 30">
                <path d="M0,15 Q50,5 100,15 T200,15" stroke="#c0392b" stroke-width="2" fill="none"/>
                <circle cx="10" cy="15" r="5" fill="#c0392b"/>
                <circle cx="190" cy="15" r="5" fill="#c0392b"/>
            </svg>
        `;
        
        const scrollBottom = document.createElement('div');
        scrollBottom.className = 'scroll-decoration-bottom';
        scrollBottom.innerHTML = scrollTop.innerHTML;
        
        section.insertBefore(scrollTop, section.firstChild);
        section.appendChild(scrollBottom);
    });
}

// 显示项目详情模态框
function showProjectModal(projectId) {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-content pattern-border">
            <span class="close-modal">&times;</span>
            <h2 class="title-decoration">项目详情</h2>
            <div class="modal-body">
                <p>项目 ${projectId} 的详细信息...</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 关闭模态框
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // 显示动画
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// 显示项目详情（地图点击）
function showProjectDetail(projectId) {
    const targetSection = document.querySelector(`#project-${projectId}`);
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetSection.classList.add('highlight');
        setTimeout(() => {
            targetSection.classList.remove('highlight');
        }, 2000);
    }
}

// 添加加载完成后的入场动画
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // 依次显示页面元素
    const animatedElements = document.querySelectorAll('.animate-on-load');
    animatedElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('animated');
        }, index * 100);
    });
});

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// 添加 CSS 动画关键帧（如果尚未存在）
if (!document.querySelector('#travel-animations-styles')) {
    const style = document.createElement('style');
    style.id = 'travel-animations-styles';
    style.textContent = `
        @keyframes dashAnimation {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -10; }
        }
        
        .project-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .project-modal.show {
            opacity: 1;
        }
        
        .modal-content {
            background: white;
            padding: 40px;
            border-radius: 15px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        }
        
        .project-modal.show .modal-content {
            transform: scale(1);
        }
        
        .close-modal {
            position: absolute;
            top: 20px;
            right: 30px;
            font-size: 30px;
            cursor: pointer;
            color: #c0392b;
            transition: transform 0.3s ease;
        }
        
        .close-modal:hover {
            transform: rotate(90deg);
        }
        
        .highlight {
            animation: highlightPulse 2s ease;
        }
        
        @keyframes highlightPulse {
            0%, 100% { background: transparent; }
            50% { background: rgba(230, 126, 34, 0.1); }
        }
        
        .scroll-decoration-top,
        .scroll-decoration-bottom {
            width: 100%;
            height: 30px;
            opacity: 0.6;
        }
        
        .scroll-decoration-bottom {
            transform: rotate(180deg);
        }
        
        body.loaded .loader {
            opacity: 0;
            pointer-events: none;
        }
        
        .animate-on-load {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease;
        }
        
        .animate-on-load.animated {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}