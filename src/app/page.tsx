"use client";

// import Image from "next/image";
import { Fireworks } from 'fireworks-js';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const { name: queryName, title: queryTitle } = router.query;

  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [showGreeting, setShowGreeting] = useState(false);
  const [currentGreeting, setCurrentGreeting] = useState(0);

  const greetings = [
    '蛇年快乐！愿你在新的一年里幸福安康！',
    '愿你的每一天都充满快乐与惊喜！',
    '祝你在新的一年里实现所有梦想！',
    '愿你在新的一年里健康快乐！',
    '祝你在新的一年里事业有成！',
    '愿你在新的一年里好运连连！',
    '祝你在新的一年里心想事成！',
    '愿你在新的一年里幸福美满！',
    '祝你在新的一年里财源广进！',
    '愿你在新的一年里平安喜乐！',
    '祝你在新的一年里万事如意！',
    '愿你在新的一年里笑口常开！',
    '祝你在新的一年里吉祥如意！',
    '愿你在新的一年里步步高升！',
    '祝你在新的一年里幸福安康！',
    '愿你在新的一年里快乐无忧！',
    '祝你在新的一年里好运常伴！',
    '愿你在新的一年里心想事成！',
    '祝你在新的一年里幸福美满！',
    '愿你在新的一年里财源广进！'
  ];

  useEffect(() => {
    const container = document.getElementById('fireworks-container')!;
    const fireworks = new Fireworks(container, { /* options */ });
    fireworks.start();

    return () => fireworks.stop();
  }, []);

  useEffect(() => {
    if (showGreeting) {
      const interval = setInterval(() => {
        setCurrentGreeting((prev) => (prev + 1) % greetings.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [showGreeting, greetings.length]);

  useEffect(() => {
    if (queryName && queryTitle) {
      setName(queryName as string);
      setTitle(queryTitle as string);
      setShowGreeting(true);
    }
  }, [queryName, queryTitle]);

  const handleConfirm = () => {
    const url = `${window.location.origin}?name=${name}&title=${title}`;
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
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
            <label style={{ marginRight: '10px' }}>
              <input
                type="radio"
                value="亲爱的"
                checked={title === '亲爱的'}
                onChange={() => setTitle('亲爱的')}
              />
              亲爱的
            </label>
            <label style={{ marginRight: '10px' }}>
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
              style={{ padding: '10px', fontSize: '1em', border: '1px solid #ccc', borderRadius: '4px', marginRight: '10px' }}
            />
     
          <button onClick={handleConfirm} style={{ padding: '10px 20px', fontSize: '1em' }}>确认</button>
          </div>
        </div>
      )}
      {showGreeting && (
        <div style={{ textAlign: 'center', marginTop: '40vh', animation: 'fadeInUp 3s ease-in-out infinite', fontFamily: 'Helvetica, Arial, sans-serif' }}>
          <h1 style={{ color: '#333', fontSize: '2.5em', fontWeight: '300', backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            {title ? `${title} ${name}, ` : ''}{greetings[currentGreeting]}
          </h1>
        
        </div>
      )}
      <button onClick={handleReset} style={{ position: 'fixed', top: '10px', right: '10px', padding: '10px 15px', fontSize: '0.9em', backgroundColor: '#007aff', color: '#fff', border: 'none', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', cursor: 'pointer', zIndex: 1000 }}>发送祝福</button>
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
