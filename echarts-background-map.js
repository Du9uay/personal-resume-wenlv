// ECharts世界地图背景版 - 无飞行路线

class BackgroundWorldMap {
    constructor() {
        this.chart = null;
        this.mapData = null;
        this.visitedCountries = [
            '中国', '日本', '韩国', '泰国', '新加坡', '马来西亚', '印度尼西亚',
            '菲律宾', '越南', '印度', '阿联酋', '土耳其', '埃及', '南非',
            '美国', '加拿大', '墨西哥', '巴西', '阿根廷', '英国', '法国',
            '德国', '意大利', '西班牙', '荷兰', '比利时', '瑞士', '奥地利',
            '捷克', '波兰', '俄罗斯', '澳大利亚', '新西兰', '冰岛', '挪威',
            '瑞典', '芬兰', '丹麦', '葡萄牙', '希腊', '摩洛哥', '肯尼亚'
        ];
        this.initializeMap();
    }

    async initializeMap() {
        const container = document.getElementById('hero-map-background');
        if (!container) {
            console.error('地图容器不存在');
            return;
        }

        if (typeof echarts === 'undefined') {
            console.error('ECharts库未加载');
            return;
        }

        try {
            // 加载地图数据
            const response = await fetch('worldZH.json');
            if (!response.ok) {
                throw new Error('地图数据加载失败');
            }
            
            this.mapData = await response.json();
            
            // 修改地图数据，确保所有区域都有统一的样式
            if (this.mapData.features) {
                this.mapData.features.forEach(feature => {
                    if (!feature.properties) {
                        feature.properties = {};
                    }
                    // 给所有地区设置统一的属性值
                    feature.properties.value = 50; // 统一的值，配合visualMap使用
                });
            }
            
            echarts.registerMap('world', this.mapData);
            
            // 初始化图表
            this.initChart(container);
            
        } catch (error) {
            console.error('地图初始化失败:', error);
        }
    }

    initChart(container) {
        // 确保容器有正确的尺寸
        const rect = container.getBoundingClientRect();
        
        // 创建ECharts实例，明确指定尺寸
        this.chart = echarts.init(container, null, {
            renderer: 'canvas',
            width: rect.width || window.innerWidth,
            height: rect.height || window.innerHeight
        });
        
        // 立即调整大小以适应容器
        setTimeout(() => {
            this.chart.resize();
            // 重新设置中心点以确保居中
            this.adjustMapCenter();
        }, 100);

        // 所有国家现在都使用统一的绿色样式

        // 主要城市点 - 简化版本
        const cityPoints = [
            { name: '北京', value: [116.4074, 39.9042, 100] },
            { name: '东京', value: [139.6917, 35.6895, 95] },
            { name: '巴黎', value: [2.3522, 48.8566, 92] },
            { name: '纽约', value: [-74.0060, 40.7128, 95] },
            { name: '伦敦', value: [-0.1276, 51.5074, 90] },
            { name: '悉尼', value: [151.2093, -33.8688, 90] },
            { name: '迪拜', value: [55.2708, 25.2048, 85] },
            { name: '新加坡', value: [103.8198, 1.3521, 88] },
            { name: '巴厘岛', value: [115.1889, -8.4095, 100] }, // 当前位置
            { name: '罗马', value: [12.4964, 41.9028, 94] },
            { name: '马德里', value: [-3.7038, 40.4168, 86] },
            { name: '柏林', value: [13.4050, 52.5200, 88] },
            { name: '莫斯科', value: [37.6173, 55.7558, 76] },
            { name: '开罗', value: [31.2357, 30.0444, 72] },
            { name: '里约热内卢', value: [-43.1729, -22.9068, 82] }
        ];

        // 配置项 - 简洁的背景风格
        const option = {
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'item',
                backgroundColor: 'rgba(10, 14, 39, 0.95)',
                borderColor: 'rgba(0, 180, 216, 0.5)',
                borderWidth: 1,
                textStyle: {
                    color: '#90e0ef',
                    fontSize: 12
                },
                formatter: function(params) {
                    if (params.seriesType === 'scatter' || params.seriesType === 'effectScatter') {
                        return `<div style="padding: 5px;">
                            <strong style="color: #00b4d8;">${params.name}</strong><br/>
                            <span style="color: #ff6b35;">访问指数：${params.value[2] || 100}%</span>
                        </div>`;
                    } else if (params.componentType === 'geo') {
                        return `<div style="padding: 5px;">
                            <strong style="color: #52b788;">${params.name}</strong><br/>
                            <span style="color: #90e0ef;">点击查看详情</span>
                        </div>`;
                    }
                    return params.name;
                }
            },
            geo: {
                map: 'world',
                roam: false, // 禁用缩放和拖拽
                center: [0, 0], // 世界地图标准中心
                zoom: 1.2, // 适度放大
                silent: false, // 允许交互
                left: 'center', // 水平居中
                top: 'center', // 垂直居中
                aspectScale: 0.75, // 调整宽高比以补偿投影变形
                itemStyle: {
                    normal: {
                        areaColor: 'rgba(82, 183, 136, 0.35)', // 统一绿色高亮
                        borderColor: 'rgba(82, 183, 136, 0.3)',
                        borderWidth: 0.8
                    }
                },
                emphasis: {
                    disabled: false,
                    itemStyle: {
                        areaColor: 'rgba(82, 183, 136, 0.5)',
                        borderColor: 'rgba(82, 183, 136, 0.8)',
                        borderWidth: 2,
                        shadowBlur: 10,
                        shadowColor: 'rgba(82, 183, 136, 0.5)'
                    },
                    label: {
                        show: true,
                        color: '#52b788',
                        fontSize: 14,
                        fontWeight: 'bold'
                    }
                },
                regions: [] // 清空所有特殊区域配置
            },
            series: [
                // 地图底色 - 统一绿色
                {
                    type: 'map',
                    map: 'world',
                    roam: false,
                    silent: true,
                    itemStyle: {
                        normal: {
                            areaColor: 'rgba(82, 183, 136, 0.35)',
                            borderColor: 'rgba(82, 183, 136, 0.3)',
                            borderWidth: 0.8
                        },
                        emphasis: {
                            areaColor: 'rgba(82, 183, 136, 0.5)',
                            borderColor: 'rgba(82, 183, 136, 0.8)',
                            borderWidth: 2
                        }
                    },
                    label: {
                        show: false
                    },
                    data: []
                },
                // 城市散点 - 更简洁
                {
                    name: '城市',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: cityPoints,
                    symbolSize: function(val) {
                        return Math.max(val[2] / 12, 4); // 更小的点
                    },
                    itemStyle: {
                        color: function(params) {
                            const value = params.value[2];
                            // 使用更柔和的颜色
                            if (value >= 90) return 'rgba(255, 107, 53, 0.6)';
                            if (value >= 80) return 'rgba(244, 162, 97, 0.6)';
                            return 'rgba(0, 180, 216, 0.6)';
                        },
                        shadowBlur: 5,
                        shadowColor: 'rgba(0, 180, 216, 0.3)'
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(255, 107, 53, 0.5)'
                        },
                        label: {
                            show: true,
                            formatter: '{b}',
                            position: 'top',
                            color: '#fff',
                            fontSize: 12
                        }
                    },
                    silent: false // 允许交互
                },
                // 当前位置脉冲效果
                {
                    name: '当前位置',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: [{
                        name: '巴厘岛',
                        value: [115.1889, -8.4095]
                    }],
                    symbolSize: 15,
                    rippleEffect: {
                        period: 4,
                        scale: 2.5,
                        brushType: 'fill'
                    },
                    itemStyle: {
                        color: 'rgba(255, 107, 53, 0.7)',
                        shadowBlur: 10,
                        shadowColor: 'rgba(255, 107, 53, 0.5)'
                    },
                    silent: true // 不响应鼠标事件
                }
            ]
        };

        // 应用配置
        this.chart.setOption(option);

        // 响应式
        window.addEventListener('resize', () => {
            if (this.chart) {
                this.chart.resize();
            }
        });

        // 美化的点击交互
        this.chart.on('click', 'series.scatter', (params) => {
            this.showCityInfo(params);
        });
        
        // 点击地图区域显示国家信息
        this.chart.on('click', 'geo', (params) => {
            if (params.name) {
                this.showCountryInfo(params);
            }
        });
    }

    showCityInfo(params) {
        // 移除已存在的弹窗
        const existingModal = document.querySelector('.map-info-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        const modal = document.createElement('div');
        modal.className = 'map-info-modal';
        modal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(10, 14, 39, 0.98) 0%, rgba(38, 70, 83, 0.95) 100%);
            border: 2px solid rgba(0, 180, 216, 0.5);
            border-radius: 20px;
            padding: 30px;
            z-index: 10000;
            color: white;
            min-width: 320px;
            max-width: 400px;
            box-shadow: 
                0 20px 60px rgba(0, 0, 0, 0.5),
                0 0 100px rgba(0, 180, 216, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            animation: modalFadeIn 0.3s ease;
        `;
        
        const value = params.value[2] || 0;
        const cityData = this.getCityData(params.name);
        
        modal.innerHTML = `
            <style>
                @keyframes modalFadeIn {
                    from { opacity: 0; transform: translate(-50%, -45%) scale(0.95); }
                    to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                }
                .modal-close {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    width: 30px;
                    height: 30px;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.1);
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                    font-size: 18px;
                }
                .modal-close:hover {
                    background: rgba(255, 107, 53, 0.8);
                    border-color: #ff6b35;
                    transform: rotate(90deg);
                }
            </style>
            <button class="modal-close" onclick="this.parentElement.remove()">×</button>
            <div style="text-align: center;">
                <h3 style="
                    font-size: 28px;
                    margin-bottom: 15px;
                    background: linear-gradient(135deg, #00b4d8, #90e0ef);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    font-weight: bold;
                ">${params.name}</h3>
                <div style="
                    font-size: 60px;
                    margin: 20px 0;
                    filter: drop-shadow(0 0 20px rgba(0, 180, 216, 0.5));
                ">${cityData.emoji}</div>
                <p style="
                    color: #90e0ef;
                    font-size: 14px;
                    margin-bottom: 20px;
                    letter-spacing: 1px;
                ">${cityData.country}</p>
                <div style="
                    background: rgba(0, 180, 216, 0.1);
                    border: 1px solid rgba(0, 180, 216, 0.3);
                    border-radius: 15px;
                    padding: 15px;
                    margin: 20px 0;
                ">
                    <p style="color: #52b788; font-size: 16px; margin-bottom: 10px;">🌟 访问指数</p>
                    <div style="
                        font-size: 36px;
                        font-weight: bold;
                        background: linear-gradient(135deg, #ff6b35, #f4a261);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                    ">${value}%</div>
                </div>
                <p style="
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 14px;
                    line-height: 1.6;
                    margin-top: 15px;
                ">${cityData.description}</p>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 点击背景关闭
        setTimeout(() => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        }, 100);
    }
    
    showCountryInfo(params) {
        // 移除已存在的弹窗
        const existingModal = document.querySelector('.map-info-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        const modal = document.createElement('div');
        modal.className = 'map-info-modal';
        modal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(10, 14, 39, 0.98) 0%, rgba(38, 70, 83, 0.95) 100%);
            border: 2px solid rgba(82, 183, 136, 0.5);
            border-radius: 20px;
            padding: 30px;
            z-index: 10000;
            color: white;
            min-width: 320px;
            max-width: 400px;
            box-shadow: 
                0 20px 60px rgba(0, 0, 0, 0.5),
                0 0 100px rgba(82, 183, 136, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            animation: modalFadeIn 0.3s ease;
        `;
        
        const countryData = this.getCountryData(params.name);
        const isVisited = this.visitedCountries.includes(params.name);
        
        modal.innerHTML = `
            <style>
                @keyframes modalFadeIn {
                    from { opacity: 0; transform: translate(-50%, -45%) scale(0.95); }
                    to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                }
                .modal-close {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    width: 30px;
                    height: 30px;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.1);
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                    font-size: 18px;
                }
                .modal-close:hover {
                    background: rgba(82, 183, 136, 0.8);
                    border-color: #52b788;
                    transform: rotate(90deg);
                }
            </style>
            <button class="modal-close" onclick="this.parentElement.remove()">×</button>
            <div style="text-align: center;">
                <h3 style="
                    font-size: 28px;
                    margin-bottom: 15px;
                    background: linear-gradient(135deg, #52b788, #90e0ef);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    font-weight: bold;
                ">${params.name}</h3>
                <div style="
                    font-size: 60px;
                    margin: 20px 0;
                    filter: drop-shadow(0 0 20px rgba(82, 183, 136, 0.5));
                ">${countryData.flag}</div>
                <div style="
                    display: inline-block;
                    padding: 8px 20px;
                    background: ${isVisited ? 'rgba(82, 183, 136, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
                    border: 1px solid ${isVisited ? '#52b788' : 'rgba(255, 255, 255, 0.3)'};
                    border-radius: 20px;
                    margin: 15px 0;
                    font-size: 14px;
                    color: ${isVisited ? '#52b788' : 'rgba(255, 255, 255, 0.6)'};
                ">
                    ${isVisited ? '✓ 已访问' : '◯ 未访问'}
                </div>
                ${isVisited ? `
                    <div style="
                        background: rgba(0, 180, 216, 0.1);
                        border: 1px solid rgba(0, 180, 216, 0.3);
                        border-radius: 15px;
                        padding: 15px;
                        margin: 20px 0;
                    ">
                        <p style="color: #90e0ef; font-size: 14px; margin-bottom: 8px;">访问记录</p>
                        <p style="color: white; font-size: 16px;">${countryData.visitInfo}</p>
                    </div>
                ` : ''}
                <p style="
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 14px;
                    line-height: 1.6;
                    margin-top: 15px;
                ">${countryData.description}</p>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 点击背景关闭
        setTimeout(() => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        }, 100);
    }
    
    getCityData(cityName) {
        const cityDatabase = {
            '北京': { emoji: '🏛️', country: '中国', description: '千年古都，现代化国际大都市' },
            '东京': { emoji: '🗼', country: '日本', description: '繁华都市，传统与现代的完美融合' },
            '巴黎': { emoji: '🗼', country: '法国', description: '浪漫之都，艺术与时尚的天堂' },
            '纽约': { emoji: '🗽', country: '美国', description: '世界之都，梦想开始的地方' },
            '伦敦': { emoji: '🎡', country: '英国', description: '雾都传奇，历史与现代交织' },
            '悉尼': { emoji: '🌉', country: '澳大利亚', description: '海港城市，阳光与海滩的乐园' },
            '迪拜': { emoji: '🏙️', country: '阿联酋', description: '沙漠奇迹，奢华与创新的象征' },
            '新加坡': { emoji: '🦁', country: '新加坡', description: '花园城市，多元文化的交汇点' },
            '巴厘岛': { emoji: '🏝️', country: '印度尼西亚', description: '诸神之岛，心灵净化的圣地' },
            '罗马': { emoji: '🏛️', country: '意大利', description: '永恒之城，历史在每个角落' },
            '马德里': { emoji: '🎭', country: '西班牙', description: '热情之都，弗拉明戈的故乡' },
            '柏林': { emoji: '🏰', country: '德国', description: '历史见证，艺术与创意的中心' },
            '莫斯科': { emoji: '🏰', country: '俄罗斯', description: '红场传说，东西方文化的桥梁' },
            '开罗': { emoji: '🔺', country: '埃及', description: '金字塔之城，古文明的守护者' },
            '里约热内卢': { emoji: '🏖️', country: '巴西', description: '狂欢之都，桑巴与海滩的天堂' }
        };
        return cityDatabase[cityName] || { emoji: '📍', country: '未知', description: '等待探索的神秘之地' };
    }
    
    getCountryData(countryName) {
        const countryDatabase = {
            '中国': { flag: '🇨🇳', visitInfo: '2次访问 · 30天', description: '五千年文明，山河壮丽，美食天堂' },
            '日本': { flag: '🇯🇵', visitInfo: '3次访问 · 21天', description: '樱花之国，匠人精神，科技与传统并存' },
            '美国': { flag: '🇺🇸', visitInfo: '2次访问 · 15天', description: '自由之地，多元文化，创新的摇篮' },
            '法国': { flag: '🇫🇷', visitInfo: '1次访问 · 10天', description: '浪漫国度，美食美酒，艺术殿堂' },
            '英国': { flag: '🇬🇧', visitInfo: '1次访问 · 7天', description: '绅士之国，皇家传统，现代金融中心' },
            '澳大利亚': { flag: '🇦🇺', visitInfo: '1次访问 · 14天', description: '袋鼠之国，自然奇观，冲浪天堂' },
            '新加坡': { flag: '🇸🇬', visitInfo: '2次访问 · 5天', description: '狮城，花园城市，美食汇聚' },
            '印度尼西亚': { flag: '🇮🇩', visitInfo: '1次访问 · 10天', description: '千岛之国，热带风情，文化多样' },
            '意大利': { flag: '🇮🇹', visitInfo: '1次访问 · 12天', description: '艺术之国，美食故乡，历史瑰宝' },
            '西班牙': { flag: '🇪🇸', visitInfo: '1次访问 · 8天', description: '热情国度，弗拉明戈，阳光海岸' },
            '德国': { flag: '🇩🇪', visitInfo: '1次访问 · 6天', description: '严谨之国，啤酒文化，工业强国' },
            '俄罗斯': { flag: '🇷🇺', visitInfo: '1次访问 · 9天', description: '战斗民族，文学艺术，广袤国土' },
            '埃及': { flag: '🇪🇬', visitInfo: '1次访问 · 7天', description: '法老之国，金字塔，尼罗河文明' },
            '巴西': { flag: '🇧🇷', visitInfo: '1次访问 · 10天', description: '桑巴王国，亚马逊雨林，足球圣地' }
        };
        return countryDatabase[countryName] || { 
            flag: '🏳️', 
            visitInfo: '', 
            description: '尚未探索的神秘土地，等待下一次冒险' 
        };
    }
    
    adjustMapCenter() {
        // 动态调整地图中心以适应容器
        const containerWidth = this.chart.getWidth();
        const containerHeight = this.chart.getHeight();
        const aspectRatio = containerWidth / containerHeight;
        
        // 根据容器宽高比调整中心点
        let centerX = -100;
        let centerY = 20;
        
        // 如果容器更宽，稍微向左偏移
        if (aspectRatio > 1.5) {
            centerX = 160;
        }
        
        // 更新地图中心，保持原有的颜色配置
        this.chart.setOption({
            geo: {
                center: [centerX, centerY],
                itemStyle: {
                    normal: {
                        areaColor: 'rgba(82, 183, 136, 0.35)', // 保持统一绿色
                        borderColor: 'rgba(82, 183, 136, 0.3)',
                        borderWidth: 0.8
                    }
                }
            }
        });
    }
    
    destroy() {
        if (this.chart) {
            this.chart.dispose();
            this.chart = null;
        }
    }
}

// 初始化背景地图
document.addEventListener('DOMContentLoaded', () => {
    // 确保容器存在后再初始化
    setTimeout(() => {
        const container = document.getElementById('hero-map-background');
        if (container) {
            window.backgroundMap = new BackgroundWorldMap();
        } else {
            console.warn('地图容器尚未准备好，延迟初始化');
            // 再次尝试
            setTimeout(() => {
                window.backgroundMap = new BackgroundWorldMap();
            }, 1000);
        }
    }, 100);
});