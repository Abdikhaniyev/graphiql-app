import { ThemeConfig } from 'antd';

const antConfig: ThemeConfig = {
  token: {
    fontFamily: 'Inter, sans-serif',
    colorPrimary: '#1c83de',
    colorInfo: '#1c83de',
    fontSize: 14,
    borderRadius: 8,
  },
  components: {
    Layout: {
      headerBg: 'rgba(255, 255, 255, 0.1)',
      footerBg: 'rgba(255, 255, 255, 0.75)',
      bodyBg: '#f9fafb',
    },
  },
};

export default antConfig;
