# Design Token System — Integration Guide

## Overview

Single source of truth: CSS vars in `index.css` drive all custom styles.
Ant Design `ThemeConfig` in `themeProviderAntd.ts` mirrors the same values for antd components.
One `ConfigProvider` at app root — no nested ones inside pages.

---

## 1. `index.css` — Design Tokens in `:root`

```css
:root {
  /* Brand */
  --color-primary:          #001BB3;
  --color-primary-light:    #93AAE6;
  --color-primary-hover:    #0026e6;

  /* Status */
  --color-success:          #52C41A;
  --color-warning:          #FA8C16;
  --color-error:            #F5222D;
  --color-info:             #4096FF;

  /* Text */
  --color-text-base:        #434343;
  --color-text-heading:     #1f2937;
  --color-text-secondary:   #8C8C8C;
  --color-text-muted:       #6b7280;
  --color-text-inverse:     #ffffff;

  /* Surfaces */
  --color-bg-body:          #fafbfc;
  --color-bg-card:          #ffffff;
  --color-bg-navbar:        #001BB3;

  /* Borders */
  --color-border-base:      #f0f0f0;
  --color-border-muted:     #d9d9d9;
  --color-border-primary:   #001BB3;

  /* Shadows */
  --shadow-card:            0 4px 24px rgba(0, 0, 0, 0.04);
  --shadow-navbar:          0 2px 8px rgba(0, 0, 0, 0.15);

  /* Radius */
  --radius-sm:              4px;
  --radius-base:            8px;
  --radius-lg:              12px;
  --radius-xl:              16px;

  /* Sizing */
  --navbar-height:          64px;
}
```

---

## 2. `src/providers/themeProviderAntd.ts`

Mirrors the CSS vars for Ant Design components. Update both files together when changing a value.

```ts
import type { ThemeConfig } from 'antd';

export const dashboardTheme: ThemeConfig = {
  token: {
    colorPrimary:     '#001BB3',   // --color-primary
    colorInfo:        '#93AAE6',   // --color-primary-light
    colorSuccess:     '#52C41A',   // --color-success
    colorWarning:     '#FA8C16',   // --color-warning
    colorError:       '#F5222D',   // --color-error
    colorTextBase:    '#434343',   // --color-text-base
    borderRadius:     8,           // --radius-base
    fontFamily: "'Heebo', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  components: {
    Layout: { headerBg: '#001BB3' },
    Card:   { colorBorderSecondary: '#f0f0f0', borderRadiusLG: 16 },
    Alert: {
      colorInfoBg:    '#4096FF',
      colorSuccessBg: '#D9F7BE',
      colorErrorBg:   '#FFF1F0',
    },
  },
};
```

---

## 3. `main.tsx` — One `ConfigProvider` at App Root

```tsx
import { ConfigProvider } from 'antd';
import heIL from 'antd/locale/he_IL';
import { dashboardTheme } from './providers/themeProviderAntd';

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ReactFlowProvider>
          <ConfigProvider direction="rtl" locale={heIL} theme={dashboardTheme}>
            <ThemeProvider>
              <FlowProvider>
                <App />
              </FlowProvider>
            </ThemeProvider>
          </ConfigProvider>
        </ReactFlowProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
```

> Remove any `ConfigProvider` wrappers inside individual pages — one at root is enough.

---

## 4. Converting Components — The Pattern

### Before
```tsx
// hardcoded colors in inline style objects
const navItemStyle = { color: '#fff', fontSize: '16px' };

<Header style={{ background: '#001BB3', height: '64px' }}>
  <Button style={navItemStyle}>
```

### After
```css
/* navbar.module.css */
.header {
  background: var(--color-bg-navbar);
  height: var(--navbar-height);
  box-shadow: var(--shadow-navbar);
}

.navButton {
  color: var(--color-text-inverse);
  font-size: 16px;
}

.navButton:hover {
  background: rgba(255, 255, 255, 0.1) !important;
}
```

```tsx
/* navbar.tsx — inline only for runtime-dynamic values */
import classes from './navbar.module.css';

<Header className={classes.header}>
  <Button className={classes.navButton} type="text">
```

---

## 5. `mainLayout.tsx`

```css
/* mainLayout.module.css */
.layout {
  height: 100vh;
  background: transparent;
}

.layoutBody {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: calc(100vh - var(--navbar-height));
  display: flex;
}

.content {
  padding: 16px;
  background: transparent;
}
```

```tsx
import classes from './mainLayout.module.css';

const MainLayout = () => (
  <Layout className={classes.layout}>
    <Navbar />
    <Layout
      className={classes.layoutBody}
      style={{ backgroundImage: `url(${bgImage})` }}  {/* dynamic → inline ok */}
    >
      <Header style={{ background: 'transparent' }} />
      <Content className={classes.content}>
        <Outlet />
      </Content>
    </Layout>
  </Layout>
);
```

---

## 6. `subHeader.tsx` — Migrate Away from Mantine

```css
/* subHeader.module.css */
.subHeader {
  background: var(--color-bg-card);
  border-bottom: 1px solid var(--color-border-base);
  padding: 0 24px;
  height: 48px;
  display: flex;
  align-items: center;
}
```

```tsx
// Remove useMantineColorScheme / useMantineTheme
import classes from './subHeader.module.css';

const SubHeader = () => {
  const { fullPath, fullPathData } = usePath();
  return (
    <header className={classes.subHeader}>
      <NavigationPath nodeIdPath={fullPath} nodePathData={fullPathData} />
    </header>
  );
};
```

---

## 7. Rule of Thumb — When to Use What

| Situation | Where |
|---|---|
| Static color, spacing, radius | CSS module + `var(--...)` |
| Ant Design component skin | `themeProviderAntd.ts` token |
| Value computed at runtime (e.g. `bgImage`) | Inline `style={{}}` |
| Global resets, `:root` vars | `index.css` |
| Hover / focus / media queries | CSS module only (can't do with inline) |

**One rule:** if it never changes at runtime → it belongs in a CSS class, not `style={{}}`.

---

## 8. Token Reference

```
Brand       --color-primary           --color-primary-light
Status      --color-success           --color-error           --color-warning
Text        --color-text-heading      --color-text-base       --color-text-secondary
            --color-text-muted        --color-text-inverse
Surfaces    --color-bg-body           --color-bg-card         --color-bg-navbar
Borders     --color-border-base       --color-border-muted    --color-border-primary
Shadows     --shadow-card             --shadow-navbar
Radius      --radius-sm               --radius-base           --radius-lg    --radius-xl
Sizing      --navbar-height
```
