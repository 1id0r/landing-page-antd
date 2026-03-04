import { Layout, Select, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { IconStarFilled, IconMail, IconPhone } from "@tabler/icons-react";
import "./LandingPage.css";

const { Header, Content } = Layout;

// Define interfaces
interface FavoriteNode {
  id: string;
  name: string;
}

// Mock Data from "Backend"
const backendFavorites: FavoriteNode[] = [
  { id: "1", name: "ניהול מכירות חדש" },
  { id: "2", name: "אנליטיקת נתונים" },
  { id: "3", name: "לקוחות" },
  { id: "4", name: "מעקב אחר ביצועים" },
  { id: "5", name: "דאשבורד מכירות יומי 21/12/23" },
  { id: "6", name: "הגדרות" },
  { id: "7", name: "סטטוסים" },
  { id: "8", name: "ניהול משאבים" },
  { id: "9", name: "מעקב אחרי יעדים" },
];

const helpMenuItems: MenuProps["items"] = [
  {
    key: "title",
    label: (
      <div
        style={{
          fontSize: "15px",
          fontWeight: 600,
          textAlign: "right",
        }}
      >
        זמינים לכל שאלה
      </div>
    ),
    disabled: true,
    style: { cursor: "default", backgroundColor: "transparent" },
  },
  {
    type: "divider",
  },
  {
    key: "email",
    icon: <IconMail size={18} stroke={1.5} />,
    label: (
      <span style={{ fontSize: "14px" }}>
        פרודקט CCC + Ctrl f
      </span>
    ),
  },
  {
    key: "phone",
    icon: <IconPhone size={18} stroke={1.5} />,
    label: (
      <span style={{ fontSize: "14px" }}>#6666, 6565</span>
    ),
  },
];

export function LandingPage() {
  // Logic for dynamic favorites rendering
  const visibleFavorites = backendFavorites.slice(0, 4);
  const hiddenFavorites = backendFavorites.slice(4);

  const dynamicFavoritesItems: MenuProps["items"] = hiddenFavorites.map(
    (fav) => ({
      key: fav.id,
      icon: <IconStarFilled size={16} />,
      label: fav.name,
    }),
  );

  return (
    <Layout className="app-container">
      {/* Header */}
      <Header className="header-container">
        <div className="header-logo">לוגו</div>
        <div className="user-profile">
          <div className="user-name">שם מלא</div>
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=e5e7eb"
            alt="User profile"
            className="user-avatar"
          />
          <Dropdown
            menu={{ items: helpMenuItems }}
            placement="bottomRight"
            trigger={["click", "hover"]}
          >
            <div className="help-button">?</div>
          </Dropdown>
        </div>
      </Header>

      {/* Main Content */}
      <Content className="main-content">
        {/* Welcome Card */}
        <div className="welcome-card">
          {/* Left side decoration */}
          <img
            src="/main-card-deocration.svg"
            alt="Card decoration"
            className="card-decoration-svg"
          />

          <h1 className="welcome-title">ברוך הבא למערכת פורמולה</h1>
          <p className="welcome-subtitle">
            מערכת לטובת החזקה, בנייה ושיקוף תמונת מצב של מערכות, מסלולים
            וחטיפים לטובת תפעול ואחיזה מירביים של הכשירות
          </p>

          <Select
            className="dashboard-select"
            placeholder="בחר דאשבורד קיים"
            options={[
              { value: "dash1", label: "דאשבורד מנהלים" },
              { value: "dash2", label: "מצב מערכות מרכזי" },
            ]}
            allowClear
          />
        </div>

        {/* Favorites Section */}
        <div className="favorites-section">
          <div className="favorites-title">
            המועדפים שלי ({backendFavorites.length})
          </div>
          <div className="favorites-list">
            {visibleFavorites.map((fav) => (
              <div key={fav.id} className="favorite-tag">
                <IconStarFilled size={16} className="tag-icon" />
                <span>{fav.name}</span>
              </div>
            ))}
            {hiddenFavorites.length > 0 && (
              <Dropdown
                menu={{ items: dynamicFavoritesItems }}
                placement="bottomCenter"
              >
                <div className="tag-more">+{hiddenFavorites.length}</div>
              </Dropdown>
            )}
          </div>
        </div>
      </Content>
    </Layout>
  );
}
