'use client';

import React, { PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';
import { Layout, Menu, MenuProps } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content, Footer } = Layout;

const menuItems = [
  { key: '/', icon: <UserOutlined />, label: '用户' },
  { key: '/video', icon: <VideoCameraOutlined />, label: '视频' },
  { key: '/upload', icon: <UploadOutlined />, label: '上传' },
];

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  backgroundColor: '#fff',
};

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  // Menu 点击事件
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    // e.key 就是 menuItems 里设置的 key
    router.push(e.key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider style={siderStyle}>
        <div style={{ height: 32, margin: 16, background: '#fff' }} />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['/']}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0, textAlign: 'center' }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>Next.js & antd</h2>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          ©{new Date().getFullYear()} Created by Vicky Yang
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;