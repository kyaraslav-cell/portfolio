import { useState, useRef } from "react";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import emailjs from "@emailjs/browser";
import { SectionWrapper } from "../hoc";
import Reveal, { SectionHeading } from "./Reveal";
import Button from "./ui/Button";
import LazyMount from "./LazyMount";
import { contact as details } from "../constans/content";
import { IconMail, IconPhone, IconLink } from "./Icons";
import { useLang } from "../context/Lang";

const EMAILJS_SERVICE = "service_lg3arxr";
const EMAILJS_TEMPLATE = "template_c3y73wp";
const EMAILJS_PUBLIC_KEY = "4LqHh0hihs5zQsH8O";

const field =
  "bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-indigo-500/35 hover:border-indigo-500 focus:border-indigo-500 transition duration-200 font-medium";

const Contact = () => {
  const { t } = useLang();
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setNotice(null);

    emailjs
      .send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          from_name: form.name,
          to_name: "Jaroslaw",
          from_email: form.email,
          to_email: details.email,
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setLoading(false);
        setNotice({ kind: "ok", text: t.contact.ok });
        setForm({ name: "", email: "", message: "" });
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        setNotice({ kind: "fail", text: t.contact.fail });
      });
  };

  return (
    <>
      <SectionHeading
        kicker={t.contact.kicker}
        heading={t.contact.heading}
        kickerClass={styles.sectionSubText}
        headingClass={styles.sectionHeadText}
      />

      <Reveal as="p" className={`${styles.sectionIntro} mt-7`}>
        {t.contact.intro}
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-5xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
      <Reveal className="rounded-3xl border border-line bg-white/[0.02] p-7 sm:p-9">

        <form ref={formRef} onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">
          <label className="flex flex-col gap-3">
            <span className="text-white font-medium">{t.contact.name}</span>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder={t.contact.namePlaceholder}
              className={field}
            />
          </label>

          <label className="flex flex-col gap-3">
            <span className="text-white font-medium">{t.contact.email}</span>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder={t.contact.emailPlaceholder}
              className={field}
            />
          </label>

          <label className="flex flex-col gap-3">
            <span className="text-white font-medium">{t.contact.message}</span>
            <textarea
              rows="7"
              name="message"
              required
              value={form.message}
              onChange={handleChange}
              placeholder={t.contact.messagePlaceholder}
              className={field}
            />
          </label>

          <Button as="button" type="submit" disabled={loading} className="w-fit disabled:opacity-60">
            {loading ? t.contact.sending : t.contact.send}
          </Button>

          {notice && (
            <p
              role="status"
              className={`text-[14px] ${notice.kind === "ok" ? "text-[#00cea8]" : "text-[#fc6767]"}`}
            >
              {notice.text}
            </p>
          )}
        </form>

        <div className="mt-10 pt-8 border-t border-indigo-500/20">
          <p className={styles.sectionSubText}>{t.contact.directKicker}</p>
          <ul className="mt-4 flex flex-col gap-3">
            <li>
              <a
                href={`mailto:${details.email}`}
                className="inline-flex items-center gap-3 text-white hover:text-[#b58bff] transition-colors text-[15px]"
              >
                <IconMail className="w-5 h-5" />
                {details.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${details.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-3 text-white hover:text-[#b58bff] transition-colors text-[15px]"
              >
                <IconPhone className="w-5 h-5" />
                {details.phone}
              </a>
            </li>
            <li>
              <a
                href={details.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-3 text-white hover:text-[#b58bff] transition-colors text-[15px]"
              >
                <IconLink className="w-5 h-5" />
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={details.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-3 text-white hover:text-[#b58bff] transition-colors text-[15px]"
              >
                <IconLink className="w-5 h-5" />
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </Reveal>

      <LazyMount className="h-[320px] w-full sm:h-[420px] lg:h-[480px]">
        <EarthCanvas />
      </LazyMount>
      </div>
    </>
  );
};

export default SectionWrapper(Contact, "contact");
