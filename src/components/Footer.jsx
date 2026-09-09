import { styles } from "../styles";
import { contact as details } from "../constans/content";
import { useLang } from "../context/Lang";

const Footer = () => {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className={`${styles.paddingX} relative z-10 border-t border-indigo-500/15 py-10`}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-[13px] text-secondary">
        <p>
          {year} {t.footer.rights}
        </p>
        <p>{t.footer.location}</p>
        <p>{t.footer.languages}</p>
        <a href={`mailto:${details.email}`} className="hover:text-white transition-colors">
          {details.email}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
