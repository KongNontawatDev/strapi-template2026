import type { StrapiApp } from "@strapi/strapi/admin";
import th from "./translations/th.json";

// ลบการ import จากไฟล์ภายนอกออก เพื่อป้องกันปัญหา Webpack/Vite Path Resolution ของ Strapi v5

export default {
	config: {
		// 🌐 เปิดใช้งานภาษาไทย
		locales: ["th", "en"],

		// ผูกไฟล์รับภาษาไทยแบบสมบูรณ์
		translations: {
			th,
			en: {
				"Auth.form.welcome.title": "ยินดีต้อนรับเข้าสู่งานจัดการระบบ",
				"Auth.form.welcome.subtitle": "กรุณาเข้าสู่ระบบเพื่อจัดการเนื้อหา",
				"app.components.LeftMenu.navbrand.workplace": "ระบบควบคุมเนื้อหา",
			},
		},


		// auth: { logo: '/logo.png' },
		// menu: { logo: '/sidebar-logo.png' },

		tutorials: false,
		notifications: { releases: false },
	},
	bootstrap(app: StrapiApp) {
		document.title = "My CMS ระบบหลังบ้าน";
	},
};
