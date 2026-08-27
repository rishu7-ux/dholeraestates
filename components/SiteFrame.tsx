import Header from "./Header";
import Footer from "./Footer";
import SideEnquiry from "./SideEnquiry";
import PopupForm from "./PopupForm";
export default function SiteFrame({ children }: { children: React.ReactNode }) { return <><Header />{children}<SideEnquiry /><PopupForm /><Footer /></>; }
