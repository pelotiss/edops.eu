const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const form = document.getElementById('contact-form');
const statusEl = document.querySelector('.form-status');

const validators = {
  name: value => value.trim().length >= 2,
  email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
  company: value => value.trim().length >= 2,
  message: value => value.trim().length >= 10,
};

if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(form);
    const errors = [];

    form.querySelectorAll('input, textarea').forEach(input => {
      const name = input.name;
      const value = formData.get(name) || '';
      const isValid = validators[name] ? validators[name](value) : true;
      input.classList.toggle('invalid', !isValid);
      if (!isValid) {
        errors.push(`${name} is required`);
      }
    });

    if (errors.length) {
      statusEl.textContent = 'Please complete all required fields before sending.';
      statusEl.classList.remove('success');
      statusEl.classList.add('error');
      return;
    }

    statusEl.textContent = 'Thanks! Your details were received. I will reply within one business day.';
    statusEl.classList.remove('error');
    statusEl.classList.add('success');
    form.reset();
  });

  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
      if (input.classList.contains('invalid')) {
        const validator = validators[input.name];
        if (validator && validator(input.value)) {
          input.classList.remove('invalid');
        }
      }
    });
  });
}

const toTopButton = document.querySelector('.to-top');
if (toTopButton) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      toTopButton.classList.add('is-visible');
    } else {
      toTopButton.classList.remove('is-visible');
    }
  });

  toTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
