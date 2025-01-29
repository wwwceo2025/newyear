"use client";

import React from 'react';
// import Image from "next/image";
import { Fireworks } from 'fireworks-js';
import { useEffect, useState, useMemo, useCallback } from 'react';
// const router = useRouter();

export default function Home() {
  // const { name: queryName, title: queryTitle } = router.query;

  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [showGreeting, setShowGreeting] = useState(false);
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [shuffledGreetings, setShuffledGreetings] = useState<string[]>([]);

  const greetings = useMemo(() => [
    '蛇年快乐！愿您在新的一年里幸福安康！',
    '愿您的每一天都充满快乐与惊喜！',
    '祝您在新的一年里实现所有梦想！',
    '愿您在新的一年里健康快乐！',
    '祝您在新的一年里事业有成！',
    '愿您在新的一年里好运连连！',
    '祝您在新的一年里心想事成！',
    '愿您在新的一年里幸福美满！',
    '祝您在新的一年里财源广进！',
    '愿您在新的一年里平安喜乐！',
    '祝您在新的一年里万事如意！',
    '愿您在新的一年里笑口常开！',
    '祝您在新的一年里吉祥如意！',
    '愿您在新的一年里步步高升！',
    '祝您在新的一年里幸福安康！',
    '愿您在新的一年里快乐无忧！',
    '祝您在新的一年里好运常伴！',
    '愿您在新的一年里心想事成！',
    '祝您在新的一年里幸福美满！',
    '愿您在新的一年里财源广进！',
    '蛇年大吉，愿您前程似锦！',
    '金蛇献瑞，祝您事业腾飞！',
    '蛇年纳福，愿您生活美满！',
    '蛇年吉祥，愿您梦想成真！',
    '蛇年如意，祝您步步高升！',
    '金蛇报喜，愿您喜事连连！',
    '蛇年祝福，愿您幸福安康！',
    '蛇年大旺，祝您财运亨通！',
    '蛇年祈福，愿您阖家欢乐！',
    '蛇年献瑞，祝您前程锦绣！'
  ], []);

  const handleClick = useCallback((e: { clientX: number; clientY: number }) => {
    const x = e.clientX;
    const y = e.clientY;
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    
    // 创建文字元素
    const text = document.createElement('div');
    text.textContent = randomGreeting;
    text.style.position = 'fixed';
    text.style.left = `${x}px`;
    text.style.top = `${y}px`;
    text.style.background = 'linear-gradient(45deg, #ff6b6b, #ffd93d)';
    text.style.webkitBackgroundClip = 'text';
    text.style.webkitTextFillColor = 'transparent';
    text.style.backgroundClip = 'text';
    text.style.color = 'transparent';
    text.style.fontSize = '1.2em';
    text.style.fontWeight = 'bold';
    text.style.textShadow = '2px 2px 4px rgba(0,0,0,0.3), -1px -1px 1px rgba(255,255,255,0.5)';
    text.style.transition = 'all 2s';
    text.style.opacity = '1';
    text.style.transform = 'translateY(0)';
    text.style.pointerEvents = 'none';
    text.style.padding = '5px 10px';
    text.style.borderRadius = '4px';
    text.style.backdropFilter = 'blur(5px)';
    
    const container = document.getElementById('fireworks-container');
    if (container) {
      container.appendChild(text);

      // 文字动画
      setTimeout(() => {
        text.style.opacity = '0';
        text.style.transform = 'translateY(-50px) scale(1.2)';
      }, 100);

      // 移除文字元素
      setTimeout(() => {
        container.removeChild(text);
      }, 2000);
    }
  }, [greetings]);

  useEffect(() => {
    const container = document.getElementById('fireworks-container')!;
    const fireworks = new Fireworks(container, {
      explosion: 10,
      mouse: {
        click: true,
        move: false,
        max: 1
      },
      boundaries: {
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight
      },
      sound: {
        enabled: false
      },
      delay: {
        min: 30,
        max: 60
      },
      hue: {
        min: 0,
        max: 360
      },
      rocketsPoint: {
        min: 0,
        max: 100
      },
      lineWidth: {
        explosion: {
          min: 1,
          max: 3
        },
        trace: {
          min: 1,
          max: 2
        }
      },
      brightness: {
        min: 50,
        max: 80
      },
      decay: {
        min: 0.015,
        max: 0.03
      },
      acceleration: 1.05
    });

    // 添加点击事件监听器
    container.addEventListener('click', handleClick);
    fireworks.start();

    return () => {
      fireworks.stop();
      container.removeEventListener('click', handleClick);
      container.innerHTML = '';
    };
  }, [handleClick]);

  useEffect(() => {
    if (showGreeting) {
      // 随机打乱祝福语数组
      const shuffled = [...greetings].sort(() => Math.random() - 0.5);
      setShuffledGreetings(shuffled);
      const interval = setInterval(() => {
        setCurrentGreeting((prev) => (prev + 1) % shuffled.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [showGreeting, greetings]);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const encodedName = params.get('name');
    const encodedTitle = params.get('title');
    if (encodedName && encodedTitle) {
      setName(decode(encodedName));
      setTitle(decode(encodedTitle));
      setShowGreeting(true);
    }
  }, []);

  // 编码函数
  const encode = (text: string): string => {
    return encodeURIComponent(text);
  };

  // 解码函数
  const decode = (encodedText: string): string => {
    return decodeURIComponent(encodedText);
  };

  // 在确认时编码数据
  const handleConfirm = () => {
    const encodedName = encode(name);
    const encodedTitle = encode(title);
    const url = `${window.location.origin}${window.location.pathname}#name=${encodedName}&title=${encodedTitle}`;
    navigator.clipboard.writeText(url);
    alert('链接已复制，可以发送给朋友！');
    setShowGreeting(true);
  };

  const handleReset = () => {
    setShowGreeting(false);
    setName('');
    setTitle('');
    setCurrentGreeting(0);
  };

  return (
    <div style={{ 
      width: '100%', 
      minHeight: '100vh',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start'
    }}>
      <div id="fireworks-container" style={{ 
        position: 'fixed', 
        top: 0,
        left: 0,
        width: '100%', 
        height: '100%', 
        zIndex: 1
      }}></div>
      {showGreeting ? null : (
        <div style={{ 
          position: 'relative',
          zIndex: 2,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          padding: '20px',
          borderRadius: '12px',
          marginTop: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            <label>
              <input
                type="radio"
                value="亲爱的"
                checked={title === '亲爱的'}
                onChange={() => setTitle('亲爱的')}
              />
              亲爱的
            </label>
            <label>
              <input
                type="radio"
                value="尊敬的"
                checked={title === '尊敬的'}
                onChange={() => setTitle('尊敬的')}
              />
              尊敬的
            </label>
            <input
              type="text"
              placeholder="请输入名字"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ 
                padding: '10px', 
                fontSize: '1em', 
                border: '1px solid #ccc', 
                borderRadius: '4px',
                width: '120px' 
              }}
            />
            <button 
              onClick={handleConfirm} 
              style={{ 
                padding: '10px 20px', 
                fontSize: '1em', 
                backgroundColor: '#007aff', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer' 
              }}
            >
              确认
            </button>
          </div>
        </div>
      )}
      {showGreeting && (
        <div 
          style={{ 
            position: 'relative',
            zIndex: 2,
            width: '100%',
            textAlign: 'center', 
            animation: 'fadeInUp 3s ease-in-out infinite', 
            fontFamily: 'Helvetica, Arial, sans-serif',
            marginTop: '20vh'
          }}
          onClick={handleClick}
        >
          <h1 style={{ 
            display: 'inline-block',
            background: 'linear-gradient(45deg, #ff6b6b, #ffd93d)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
            fontSize: '2.5em', 
            fontWeight: 'bold',
            padding: '20px', 
            borderRadius: '12px', 
            backdropFilter: 'blur(10px)',
            textShadow: '2px 2px 4px rgba(0,0,0,0.2), -1px -1px 1px rgba(255,255,255,0.3)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1), 0 -2px 6px rgba(255, 255, 255, 0.2)',
            maxWidth: '90%',
            margin: '0 auto'
          }}>
            {title ? `${title} ${name}, ` : ''}{shuffledGreetings[currentGreeting] || greetings[0]}
          </h1>
        </div>
      )}
      
        <button 
          onClick={handleReset} 
          style={{ 
            position: 'fixed', 
            top: '10px', 
            right: '10px', 
            padding: '10px', 
            fontSize: '1.2em', 
            backgroundColor: 'transparent', 
            color: '#007aff', 
            border: 'none', 
            borderRadius: '50%', 
            cursor: 'pointer', 
            zIndex: 1000,
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        >
          ⚙️
        </button>
      
      <style jsx>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          50% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}
