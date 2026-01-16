import { extend } from 'flarum/extend';
import app from 'flarum/app';
import Page from 'flarum/components/Page';

app.initializers.add('qx-css-rain', () => {
    let rainContainer = null;
    let animationId = null;
    
    // 创建雨滴特效
    function createRainEffect() {
        if (!app.forum.attribute('rainEnabled')) return;
        
        if (!rainContainer) {
            rainContainer = document.createElement('div');
            rainContainer.id = 'rain-container';
            rainContainer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 9999;
                overflow: hidden;
            `;
            document.body.appendChild(rainContainer);
        }
        
        // 清除已有的雨滴
        while (rainContainer.firstChild) {
            rainContainer.removeChild(rainContainer.firstChild);
        }
        
        // 获取设置
        const density = app.forum.attribute('rainDensity') || 50;
        const speed = app.forum.attribute('rainSpeed') || 10;
        const color = app.forum.attribute('rainColor') || '#3498db';
        const opacity = app.forum.attribute('rainOpacity') || 0.6;
        
        // 创建雨滴
        for (let i = 0; i < density; i++) {
            const drop = document.createElement('div');
            drop.className = 'rain-drop';
            
            // 随机位置和大小
            const left = Math.random() * 100;
            const height = 10 + Math.random() * 20;
            const animationDuration = 0.5 + Math.random() * (2 - speed/20);
            
            drop.style.cssText = `
                position: absolute;
                background: linear-gradient(to bottom, transparent, ${color});
                width: 1px;
                height: ${height}px;
                left: ${left}%;
                top: -20px;
                opacity: ${opacity};
                animation: fall ${animationDuration}s linear infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            
            rainContainer.appendChild(drop);
        }
        
        // 添加涟漪效果
        for (let i = 0; i < density / 10; i++) {
            const ripple = document.createElement('div');
            ripple.className = 'rain-ripple';
            
            const left = Math.random() * 100;
            const size = 5 + Math.random() * 15;
            
            ripple.style.cssText = `
                position: absolute;
                border: 1px solid ${color};
                border-radius: 50%;
                width: ${size}px;
                height: ${size}px;
                left: ${left}%;
                bottom: 20px;
                opacity: ${opacity * 0.5};
                animation: ripple ${1 + Math.random()}s linear infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            
            rainContainer.appendChild(ripple);
        }
    }
    
    // 只在首页显示
    extend(Page.prototype, 'oncreate', function() {
        if (app.current.get('routeName') === 'index') {
            createRainEffect();
        } else {
            removeRainEffect();
        }
    });
    
    // 路由变化时处理
    extend(Page.prototype, 'onupdate', function() {
        if (app.current.get('routeName') === 'index') {
            createRainEffect();
        } else {
            removeRainEffect();
        }
    });
    
    // 移除雨滴特效
    function removeRainEffect() {
        if (rainContainer) {
            rainContainer.remove();
            rainContainer = null;
        }
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }
    
    // 页面卸载时清理
    extend(Page.prototype, 'onremove', function() {
        removeRainEffect();
    });
});