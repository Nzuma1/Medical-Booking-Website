import { useState } from "react";
import emailjs from "emailjs-com";
import { HashLoader } from "react-spinners";

const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    emailjs
      .send(
        "service_jymo8nf",
        "template_4wuac37",
        {
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        import.meta.env.VITE_USER_ID
      )
      .then(
        (result) => {
          console.log("Message sent successfully!", result.text);
          alert("Your message has been sent!");
          setLoading(false);
          setFormData({ email: "", subject: "", message: "" });
        },
        (error) => {
          console.error("Failed to send the message.", error.text);
          alert("There was an error sending your message. Please try again.");
          setLoading(false);
        }
      )
      .catch((error) => {
        console.error("An unexpected error occurred:", error);
        alert("There was an unexpected error. Please try again later.");
        setLoading(false);
      });
  };

  return (
    <section>
      <div className="px-4 mx-auto max-w-screen-md">
        <h2 className="heading text-center">Contact Us</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text__para">
          Got a technical issue? Want to send feedback about a beta feature? Let
          us know.
        </p>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="email" className="form__label">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              className="form__input mt-1"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="subject" className="form__label">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              placeholder="Let us know how we can help you."
              className="form__input mt-1"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className="sw:col-span-2">
            <label htmlFor="message" className="form__label">
              Your Message
            </label>
            <textarea
              rows="6"
              id="message"
              placeholder="Leave a comment..."
              className="form__input mt-1"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn rounded" disabled={loading}>
            {loading ? <HashLoader size={22} color="#fff" /> : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
