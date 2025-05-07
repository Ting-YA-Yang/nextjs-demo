'use client';

import React, { PropsWithChildren, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layout, Menu, MenuProps, Button } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import ScreenDebugger from './ScreenDebugger';

const { Header, Sider, Content, Footer } = Layout;

const menuItems = [
  { key: '/', icon: <UserOutlined />, label: '用户' },
  { key: '/video', icon: <VideoCameraOutlined />, label: '视频' },
  { key: '/upload', icon: <UploadOutlined />, label: '上传' },
];

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'fixed',
  left: 0,
  top: 0,
  bottom: 0,
  backgroundColor: '#fff',
  zIndex: 1000,
};

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 检测是否为移动设备
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Menu 点击事件
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    router.push(e.key);
    if (isMobile) {
      setCollapsed(true);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        style={siderStyle}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
        collapsedWidth={isMobile ? 0 : 80}
        trigger={null}
      >
        <div style={{ height: 32, margin: 16, background: '#fff' }} />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['/']}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 0 : 200, transition: 'all 0.2s' }}>
        <Header style={{ 
          background: '#fff', 
          padding: '0 16px', 
          display: 'flex', 
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 999,
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600, flex: 1, textAlign: 'center' }}>
            Next.js & antd
          </h2>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ 
            padding: 24, 
            background: '#fff', 
            minHeight: 360,
            borderRadius: 8,
          }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          ©{new Date().getFullYear()} Created by Vicky Yang
        </Footer>
      </Layout>
      <ScreenDebugger />
    </Layout>
  );
};

export default MainLayout;