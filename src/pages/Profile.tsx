import ProfileSection from "../components/Profile/ProfileSection";
import { useSeo } from "../hooks/useSeo";

export default function Profile() {
  // صفحه‌ی شخصی هر کاربر - محتوایی نداره که برای گوگل مفید باشه
  useSeo({ title: "پروفایل من", noIndex: true });

  return <ProfileSection />;
}
