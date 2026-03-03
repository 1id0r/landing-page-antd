import { ConfigProvider, Layout, Select } from "antd";
import { IconStarFilled } from "@tabler/icons-react";
import "./LandingPage.css";

const { Content } = Layout;

// Define interfaces
interface FavoriteNode {
  id: string;
  name: string;
}

// Mock Data
const mockFavorites: FavoriteNode[] = [
  { id: "1", name: "ניהול מכירות חדש" },
  { id: "2", name: "אנליטיקת נתונים" },
  { id: "3", name: "לקוחות" },
  { id: "4", name: "מעקב אחר ביצועים" },
];

// Reusable Background Mock Widget
const BackgroundWidget = ({
  className,
  colorClass,
}: {
  className: string;
  colorClass?: string;
}) => (
  <div className={`bg-abstract ${className}`}>
    <div className="mock-card">
      <div
        className="card-decoration"
        style={{ top: "8px", left: "8px", zIndex: 1, position: "relative" }}
      >
        <div className="dot dot-gray"></div>
        <div className="dot dot-blue"></div>
      </div>
      <div className="mock-row">
        <div className={`mock-item ${colorClass}`} style={{ flex: 2 }}></div>
        <div className={`mock-item ${colorClass}`}></div>
      </div>
      <div className="mock-row">
        <div className={`mock-item ${colorClass}`}></div>
        <div className={`mock-item ${colorClass}`} style={{ flex: 3 }}></div>
      </div>
      <div className="mock-row">
        <div className={`mock-item ${colorClass}`}></div>
        <div className={`mock-item ${colorClass}`}></div>
      </div>
    </div>
  </div>
);

export function LandingPage() {
  return (
    <ConfigProvider
      direction="rtl"
      theme={{ token: { fontFamily: "Heebo, sans-serif" } }}
    >
      <Layout className="app-container">
        {/* Abstract Background Elements */}
        <BackgroundWidget className="bg-abstract-1" colorClass="blue" />
        <div className="bg-abstract bg-abstract-2">
          <div className="mock-card">
            <div
              className="card-decoration"
              style={{
                top: "8px",
                right: "8px",
                position: "relative",
                left: "auto",
                flexDirection: "row-reverse",
              }}
            >
              <div className="dot dot-red"></div>
              <div className="dot dot-blue"></div>
            </div>
            <div className="mock-row">
              <div className="mock-item red" style={{ height: "32px" }}></div>
            </div>
            <div className="mock-row">
              <div className="mock-item red"></div>
              <div className="mock-item red"></div>
            </div>
          </div>
        </div>
        <BackgroundWidget className="bg-abstract-3" colorClass="gray" />
        <BackgroundWidget className="bg-abstract-4" colorClass="green" />

        {/* Main Content */}
        <Content className="main-content">
          {/* Welcome Card */}
          <div className="welcome-card">
            {/* Left side decoration */}
            <div className="card-decoration">
              <div className="dot dot-gray"></div>
              <div className="dot dot-yellow"></div>
              <div className="dot dot-blue"></div>
            </div>

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
            <div className="favorites-title">המועדפים שלי (9)</div>
            <div className="favorites-list">
              {mockFavorites.map((fav) => (
                <div key={fav.id} className="favorite-tag">
                  <IconStarFilled size={16} className="tag-icon" />
                  <span>{fav.name}</span>
                </div>
              ))}
              <div className="tag-more">+5</div>
            </div>
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
