
/* ==========================================================================
   ENHANCED AI PORTFOLIO WEBSITE - CONTACT FORM HANDLER
   # PURPOSE: Form validation, direct email delivery to projectranji@gmail.com,
   and instant user feedback.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});

function initContactForm() {
  const form = document.getElementById('contact-form');
  const alertBox = document.getElementById('form-alert');
  const submitBtn = document.getElementById('submit-btn');

  if (!form || !submitBtn || !alertBox) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const subjectInput = document.getElementById('form-subject');
    const messageInput = document.getElementById('form-message');

    // Reset alert box
    alertBox.className = 'form-alert';
    alertBox.style.display = 'none';

    // Basic Validation
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !subject || !message) {
      showAlert('Please fill out all fields before sending.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert('Please enter a valid email address.', 'error');
      return;
    }

    // Set loading state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Message...';

    try {
      // Send directly to projectranji@gmail.com using FormSubmit AJAX service
      const response = await fetch('https://formsubmit.co/ajax/projectranji@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          _subject: `[Portfolio Contact] ${subject}`,
          message: message
        })
      });

      const data = await response.json();

      if (response.ok && data.success !== "false") {
        showAlert('Thank you! Your message has been sent successfully to projectranji@gmail.com.', 'success');
        form.reset();
      } else {
        throw new Error(data.message || 'Form submission failed');
      }
    } catch (error) {
      console.error('Contact Form Error:', error);
      // Fallback: If network issue, open mailto link with prefilled details
      const mailtoUrl = `mailto:projectranji@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      showAlert('Thank you! Opening your email client to send message...', 'success');
      window.location.href = mailtoUrl;
      form.reset();
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });

  function showAlert(msg, type) {
    alertBox.textContent = msg;
    alertBox.className = `form-alert ${type}`;
    alertBox.style.display = 'block';
  }
}
