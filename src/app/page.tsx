"use client";

// import Image from "next/image";
import { Fireworks } from 'fireworks-js';
import { useEffect, useState, useMemo } from 'react';
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

  useEffect(() => {
    const container = document.getElementById('fireworks-container')!;
    const fireworks = new Fireworks(container, { /* options */ });
    fireworks.start();

    return () => fireworks.stop();
  }, []);

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
    <div>
      <div id="fireworks-container" style={{ position: 'fixed', width: '100%', height: '100%', zIndex: -1 }}></div>
      {!showGreeting && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
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
        <div style={{ textAlign: 'center', marginTop: '30vh', animation: 'fadeInUp 3s ease-in-out infinite', fontFamily: 'Helvetica, Arial, sans-serif' }}>
          <h1 style={{ color: '#333', fontSize: '2.5em', fontWeight: '300', backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
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
