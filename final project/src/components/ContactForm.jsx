import { useState } from "react";
import emailjs from "@emailjs/browser";
import { FaEnvelope, FaUser, FaPaperPlane, FaTimes } from "react-icons/fa";
import "../styles/contact.css";

const SERVICE_ID = "service_if2nzrh";
const TEMPLATE_ID = "template_z3q8bcl";
const PUBLIC_KEY = "p_PBZtTY2vrOzjqwh";

function ContactForm({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.user_name || !formData.user_email || !formData.message) {
      setStatus({ type: "error", message: "من فضلك املأ جميع الحقول" });
      return;
    }

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      // Send email using EmailJS
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.user_name,
          from_email: formData.user_email,
          message: formData.message,
        },
        PUBLIC_KEY
      );

      setStatus({ type: "success", message: "تم إرسال رسالتك بنجاح! 🎉" });
      setFormData({ user_name: "", user_email: "", message: "" });
      setTimeout(() => {
        onClose();
        setStatus({ type: "", message: "" });
      }, 2500);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus({
        type: "error",
        message: "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-overlay" onClick={onClose}>
      <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
        <button className="contact-close" onClick={onClose} aria-label="Close">
          <FaTimes />
        </button>

        <div className="contact-header">
          <div className="contact-icon-wrapper">
            <FaEnvelope />
          </div>
          <h3>تواصل معنا</h3>
          <p>يسعدنا سماع رأيك أو استفسارك في أي وقت!</p>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="input-group-custom">
            <label htmlFor="user_name">الاسم بالكامل</label>
            <div className="input-wrapper">
              <FaUser className="field-icon" />
              <input
                type="text"
                id="user_name"
                name="user_name"
                placeholder="أدخل اسمك"
                value={formData.user_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group-custom">
            <label htmlFor="user_email">البريد الإلكتروني</label>
            <div className="input-wrapper">
              <FaEnvelope className="field-icon" />
              <input
                type="email"
                id="user_email"
                name="user_email"
                placeholder="example@domain.com"
                value={formData.user_email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group-custom">
            <label htmlFor="message">الرسالة</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="اكتب رسالتك هنا..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {status.message && (
            <div className={`status-message ${status.type}`}>
              {status.message}
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              <>
                <span>إرسال الرسالة</span>
                <FaPaperPlane />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
