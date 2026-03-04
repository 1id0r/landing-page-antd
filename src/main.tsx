import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import heIL from 'antd/locale/he_IL'
import './index.css'
import App from './App.tsx'
import { dashboardTheme } from './providers/themeProviderAntd'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider direction="rtl" locale={heIL} theme={dashboardTheme}>
      <App />
    </ConfigProvider>
  </StrictMode>,
)
