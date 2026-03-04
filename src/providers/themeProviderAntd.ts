import type { ThemeConfig } from 'antd';

// These values mirror the CSS vars defined in index.css :root.
// Update both places together when changing design tokens.
export const dashboardTheme: ThemeConfig = {
  token: {
    // Brand
    colorPrimary:       '#001BB3',  // --color-primary
    colorInfo:          '#93AAE6',  // --color-primary-light

    // Status
    colorSuccess:       '#52C41A',  // --color-success
    colorWarning:       '#FA8C16',  // --color-warning
    colorError:         '#F5222D',  // --color-error

    // Text
    colorTextBase:      '#434343',  // --color-text-base

    // Radius
    borderRadius:       8,          // --radius-base

    // Typography
    fontFamily: "'Heebo', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  components: {
    Layout: {
      headerBg: '#001BB3',          // --color-bg-navbar
    },
    Card: {
      colorBorderSecondary: '#f0f0f0', // --color-border-base
      borderRadiusLG: 16,              // --radius-xl
    },
    Alert: {
      colorInfoBg:    '#4096FF',    // --color-info
      colorSuccessBg: '#D9F7BE',
      colorErrorBg:   '#FFF1F0',
    },
    Select: {
      borderRadius: 8,              // --radius-base
    },
  },
};
