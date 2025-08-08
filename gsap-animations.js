// GSAP动画配置文件
// 确保在DOM加载完成后执行动画

document.addEventListener('DOMContentLoaded', function() {
    // 检查GSAP是否已加载
    if (typeof gsap === 'undefined') {
        console.warn('GSAP library is not loaded. Please include GSAP before this script.');
        // 如果GSAP未加载，确保所有元素可见
        const allElements = document.querySelectorAll('.navbar, .contact-buttons .btn, .skill-category, .contact-item, .other-experience, .modern-project-showcase');
        allElements.forEach(el => {
            if (el) {
                el.style.opacity = '1';
                el.style.visibility = 'visible';
                el.style.transform = '';
                console.log(`Made ${el.className} visible (GSAP fallback)`);
            }
        });
        return;
    }

    console.log('GSAP loaded successfully, initializing animations...');

    // ===== 页面加载动画 =====
    function initLoadingAnimations() {
        // 隐藏加载器的动画
        gsap.to("#loader", {
            opacity: 0,
            duration: 0.5,
            delay: 1,
            onComplete: function() {
                document.getElementById('loader').style.display = 'none';
            }
        });

        // 导航栏动画
        // 首先确保导航栏存在
        const navbarElement = document.querySelector(".navbar");
        if (navbarElement) {
            gsap.from(".navbar", {
                y: -100,
                opacity: 0,
                duration: 0.8,
                delay: 1.2,
                ease: "back.out(1.7)"
            });
        } else {
            console.warn('Navbar element not found for animation');
        }
    }

    // ===== 首页英雄区域动画 =====
    function initHeroAnimations() {
        // 确保元素初始可见，然后应用动画
        gsap.set([".hero-avatar", ".hero h1", ".hero .subtitle", ".hero .description", ".contact-buttons .btn"], {
            clearProps: "all"
        });
        
        const tl = gsap.timeline({ delay: 1.5 });
        
        tl.from(".hero-avatar", {
            scale: 0,
            rotation: 360,
            duration: 1,
            ease: "back.out(1.7)"
        })
        .from(".hero h1", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.5")
        .from(".hero .subtitle", {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.3")
        .from(".hero .description", {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.2")
        .from(".contact-buttons .btn", {
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.2");
    }

    // ===== 滚动触发动画 =====
    function initScrollAnimations() {
        // 注册ScrollTrigger插件
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        } else {
            console.warn('ScrollTrigger plugin not found. Elements will be visible immediately.');
            // 如果ScrollTrigger不可用，确保所有元素可见
            gsap.set([".skill-category", ".contact-item", ".other-experience", ".modern-project-showcase"], {
                opacity: 1,
                y: 0,
                x: 0
            });
            return;
        }

        // 基本资料部分动画
        gsap.from("#basic-info .section-title", {
            scrollTrigger: {
                trigger: "#basic-info",
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });

        gsap.from("#basic-info .project-card", {
            scrollTrigger: {
                trigger: "#basic-info",
                start: "top 70%",
                toggleActions: "play none none reverse"
            },
            y: 80,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: "power2.out"
        });

        gsap.from("#basic-info .education-item", {
            scrollTrigger: {
                trigger: "#basic-info .education-item",
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            x: -80,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });

        // 技能卡片动画
        gsap.from("#skills .section-title", {
            scrollTrigger: {
                trigger: "#skills",
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });

        gsap.to(".skill-category", {
            scrollTrigger: {
                trigger: "#skills",
                start: "top 70%",
                toggleActions: "play none none reverse"
            },
            opacity: 1,
            duration: 2,
            scale: 1,
            delay: 0.5,
            ease: "cire.out"
        });

        // 项目展示动画
        gsap.from("#experience .section-title", {
            scrollTrigger: {
                trigger: "#experience",
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });

        // 只为可见的项目卡片设置动画
        gsap.from("#industrial-design-content .modern-project-showcase", {
            scrollTrigger: {
                trigger: "#experience",
                start: "top 70%",
                toggleActions: "play none none reverse"
            },
            x: -100,
            opacity: 0,
            duration: 1.2,
            ease: "power2.out"
        });
        
        // 为其他标签的项目卡片设置初始可见状态
        gsap.set("#machining-content .modern-project-showcase, #automation-content .modern-project-showcase, #non-standard-content .modern-project-showcase", {
            opacity: 1,
            x: 0
        });

        // 实习经历标签动画
        gsap.from(".experience-tab-btn", {
            scrollTrigger: {
                trigger: ".experience-tabs",
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        });

        gsap.from(".placeholder-card", {
            scrollTrigger: {
                trigger: ".experience-tab-content",
                start: "top 70%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });

        // 个人总结动画 - 极宽松触发条件，适应所有标签页面高度
        gsap.from("#summary .section-title", {
            scrollTrigger: {
                trigger: "#summary",
                start: "top 50%", // 极宽松触发阈值，页面滚动即触发
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });

        gsap.from("#summary .summary-content", {
            scrollTrigger: {
                trigger: "#summary",
                start: "top 50%", // 极宽松触发阈值，页面滚动即触发
                toggleActions: "play none none reverse"
            },
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: "power2.out"
        });

        // 联系信息动画 - 极宽松触发条件，适应所有标签页面高度
        gsap.from("#contact .section-title", {
            scrollTrigger: {
                trigger: "#contact",
                start: "top 100%", // 极宽松触发阈值，页面滚动即触发
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });

        gsap.from(".contact-item", {
            scrollTrigger: {
                trigger: "#contact",
                start: "top 100%", // 极宽松触发阈值，页面滚动即触发
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out"
        });
    }

    // ===== 悬停交互动画 =====
    function initHoverAnimations() {
        // 项目卡片悬停动画
        const projectCard = document.querySelector('.modern-project-showcase');
        if (projectCard) {
            projectCard.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    y: -15,
                    scale: 1.02,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            projectCard.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        }

        // 技能卡片悬停动画
        document.querySelectorAll('.skill-category').forEach(card => {
            card.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    y: -8,
                    scale: 1.01,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }

    // ===== 弹窗动画增强 =====
    function initModalAnimations() {
        // 替换原有的职责弹窗动画
        window.openResponsibilitiesModalGSAP = function() {
            const modal = document.getElementById('responsibilitiesModal');
            const content = modal.querySelector('.responsibilities-modal-content');
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // GSAP弹窗动画
            gsap.fromTo(modal, 
                { opacity: 0 },
                { opacity: 1, duration: 0.3 }
            );
            
            gsap.fromTo(content,
                { x: '-100%', opacity: 0 },
                { x: '0%', opacity: 1, duration: 0.4, ease: "power2.out" }
            );
        };

        window.closeResponsibilitiesModalGSAP = function() {
            const modal = document.getElementById('responsibilitiesModal');
            const content = modal.querySelector('.responsibilities-modal-content');
            
            // GSAP关闭动画
            gsap.to(content, {
                x: '100%',
                opacity: 0,
                duration: 0.4,
                ease: "power2.in",
                onComplete: function() {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
            
            gsap.to(modal, {
                opacity: 0,
                duration: 0.3,
                delay: 0.1
            });
        };

        // 智能手表项目弹窗动画
        window.openWatchProjectModalGSAP = function() {
            const modal = document.getElementById('watchProjectModal');
            const content = modal.querySelector('.responsibilities-modal-content');
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // GSAP弹窗动画
            gsap.fromTo(modal, 
                { opacity: 0 },
                { opacity: 1, duration: 0.3 }
            );
            
            gsap.fromTo(content,
                { x: '-100%', opacity: 0 },
                { x: '0%', opacity: 1, duration: 0.4, ease: "power2.out" }
            );
        };

        window.closeWatchProjectModalGSAP = function() {
            const modal = document.getElementById('watchProjectModal');
            const content = modal.querySelector('.responsibilities-modal-content');
            
            // GSAP关闭动画
            gsap.to(content, {
                x: '100%',
                opacity: 0,
                duration: 0.4,
                ease: "power2.in",
                onComplete: function() {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
            
            gsap.to(modal, {
                opacity: 0,
                duration: 0.3,
                delay: 0.1
            });
        };
    }

    // ===== 机械加工工艺项目弹窗动画 =====
    function initMachiningProjectModalAnimations() {
        window.openMachiningProjectModalGSAP = function() {
            const modal = document.getElementById('machiningProjectModal');
            if (!modal) return;
            
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            const modalContent = modal.querySelector('.responsibilities-modal-content');
            
            // 重置初始状态
            gsap.set(modal, { opacity: 0 });
            gsap.set(modalContent, { x: '-100%', opacity: 0 });
            
            // 弹窗背景淡入
            gsap.to(modal, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            });
            
            // 内容区域从左侧滑入
            gsap.to(modalContent, {
                x: '0%',
                opacity: 1,
                duration: 0.5,
                delay: 0.1,
                ease: "power3.out"
            });
        };

        window.closeMachiningProjectModalGSAP = function() {
            const modal = document.getElementById('machiningProjectModal');
            if (!modal) return;
            
            const modalContent = modal.querySelector('.responsibilities-modal-content');
            
            // 内容区域向右侧滑出
            gsap.to(modalContent, {
                x: '100%',
                opacity: 0,
                duration: 0.4,
                ease: "power2.in",
                onComplete: function() {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
            
            gsap.to(modal, {
                opacity: 0,
                duration: 0.3,
                delay: 0.1
            });
        };
    }

    // ===== 自动化控制项目弹窗动画 =====
    function initAutomationProjectModalAnimations() {
        window.openAutomationProjectModalGSAP = function() {
            const modal = document.getElementById('automationProjectModal');
            if (!modal) return;
            
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            const modalContent = modal.querySelector('.responsibilities-modal-content');
            
            // 重置初始状态
            gsap.set(modal, { opacity: 0 });
            gsap.set(modalContent, { x: '-100%', opacity: 0 });
            
            // 弹窗背景淡入
            gsap.to(modal, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            });
            
            // 内容区域从左侧滑入
            gsap.to(modalContent, {
                x: '0%',
                opacity: 1,
                duration: 0.5,
                delay: 0.1,
                ease: "power3.out"
            });
        };

        window.closeAutomationProjectModalGSAP = function() {
            const modal = document.getElementById('automationProjectModal');
            if (!modal) return;
            
            const modalContent = modal.querySelector('.responsibilities-modal-content');
            
            // 内容区域向右侧滑出
            gsap.to(modalContent, {
                x: '100%',
                opacity: 0,
                duration: 0.4,
                ease: "power2.in",
                onComplete: function() {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
            
            gsap.to(modal, {
                opacity: 0,
                duration: 0.3,
                delay: 0.1
            });
        };
    }

    // ===== 非标自动化项目弹窗动画 =====
    function initNonStandardProjectModalAnimations() {
        window.openNonStandardProjectModalGSAP = function() {
            const modal = document.getElementById('nonStandardProjectModal');
            if (!modal) return;
            
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            const modalContent = modal.querySelector('.responsibilities-modal-content');
            
            // 重置初始状态
            gsap.set(modal, { opacity: 0 });
            gsap.set(modalContent, { x: '-100%', opacity: 0 });
            
            // 弹窗背景淡入
            gsap.to(modal, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            });
            
            // 内容区域从左侧滑入
            gsap.to(modalContent, {
                x: '0%',
                opacity: 1,
                duration: 0.5,
                delay: 0.1,
                ease: "power3.out"
            });
        };

        window.closeNonStandardProjectModalGSAP = function() {
            const modal = document.getElementById('nonStandardProjectModal');
            if (!modal) return;
            
            const modalContent = modal.querySelector('.responsibilities-modal-content');
            
            // 内容区域向右侧滑出
            gsap.to(modalContent, {
                x: '100%',
                opacity: 0,
                duration: 0.4,
                ease: "power2.in",
                onComplete: function() {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
            
            gsap.to(modal, {
                opacity: 0,
                duration: 0.3,
                delay: 0.1
            });
        };
    }

    // ===== 粒子背景动画增强 =====
    function initParticleAnimations() {
        // 可以在这里添加与粒子背景的GSAP交互
        // 例如：鼠标移动时的粒子响应动画
    }

    // ===== 返回顶部按钮动画管理 =====
    function initScrollTopButtonAnimation() {
        let scrollTopAnimation = null;
        const scrollTopButton = document.getElementById('scrollTop');
        
        if (!scrollTopButton) return;

        // 全局函数供外部调用
        window.startScrollTopAnimation = function() {
            if (!scrollTopAnimation) {
                scrollTopAnimation = gsap.to(scrollTopButton, {
                    y: -10,
                    duration: 1.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "power2.inOut"
                });
            }
        };

        window.stopScrollTopAnimation = function() {
            if (scrollTopAnimation) {
                scrollTopAnimation.kill();
                gsap.set(scrollTopButton, { y: 0 });
                scrollTopAnimation = null;
            }
        };
    }

    // ===== 统一的元素可见性确保机制 =====
    function ensureElementsVisible() {
        // 确保关键元素始终可见，防止动画失败导致元素消失
        const criticalElements = [
            '.navbar',                    // 导航栏
            '.contact-buttons .btn',      // 首页按钮
            '.skill-category',            // 技能卡片
            '.contact-item',              // 联系方式
            '.experience-tab-btn',        // 实习经历标签
            '.modern-project-showcase'    // 项目展示
        ];
        
        criticalElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                if (el) {
                    // 检查元素是否可能被隐藏
                    const computedStyle = window.getComputedStyle(el);
                    const isHidden = el.style.opacity === '0' || 
                                   el.style.visibility === 'hidden' ||
                                   computedStyle.opacity === '0' ||
                                   computedStyle.visibility === 'hidden';
                    
                    if (isHidden) {
                        console.log(`Making ${selector} visible as fallback`);
                        if (typeof gsap !== 'undefined') {
                            // 优先使用GSAP设置
                            gsap.set(el, { opacity: 1, visibility: 'visible', y: 0, x: 0 });
                        } else {
                            // 回退到原生CSS
                            el.style.opacity = '1';
                            el.style.visibility = 'visible';
                            el.style.transform = '';
                        }
                    }
                }
            });
        });
    }

    // ===== 初始化所有动画 =====
    function initAllAnimations() {
        try {
            initLoadingAnimations();
            initHeroAnimations();
            initScrollAnimations();
            initHoverAnimations();
            initModalAnimations();
            initMachiningProjectModalAnimations();
            initAutomationProjectModalAnimations();
            initNonStandardProjectModalAnimations();
            initParticleAnimations();
            initScrollTopButtonAnimation();
            
            // 延迟检查元素可见性
            setTimeout(ensureElementsVisible, 2000);
        } catch (error) {
            console.error('GSAP animation initialization failed:', error);
            // 如果动画初始化失败，确保所有元素可见
            ensureElementsVisible();
        }
    }

    // 启动动画系统
    initAllAnimations();

    // 暴露一些函数到全局作用域，以便HTML中调用
    window.gsapAnimations = {
        openModal: window.openResponsibilitiesModalGSAP,
        closeModal: window.closeResponsibilitiesModalGSAP,
        openWatchModal: window.openWatchProjectModalGSAP,
        closeWatchModal: window.closeWatchProjectModalGSAP
    };
});

// ===== 工具函数 =====
function createTextAnimation(selector, options = {}) {
    const defaults = {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
    };
    
    const settings = { ...defaults, ...options };
    
    return gsap.from(selector, settings);
}

function createFadeInAnimation(selector, direction = 'up', distance = 50) {
    const transforms = {
        up: { y: distance },
        down: { y: -distance },
        left: { x: distance },
        right: { x: -distance }
    };
    
    return gsap.from(selector, {
        ...transforms[direction],
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    });
} 