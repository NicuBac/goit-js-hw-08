import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageTextarea = feedbackForm.querySelector('textarea[name="message"]');

feedbackForm.addEventListener(
  'input',
  throttle(() => {
    const formState = {
      email: emailInput.value,
      message: messageTextarea.value,
    };
    localStorage.setItem('feedback-form-state', JSON.stringify(formState));
  }, 500)
);

document.addEventListener('DOMContentLoaded', () => {
  const savedState = localStorage.getItem('feedback-form-state');
  if (savedState) {
    const formState = JSON.parse(savedState);
    emailInput.value = formState.email;
    messageTextarea.value = formState.message;
  }
});

feedbackForm.addEventListener('submit', event => {
  event.preventDefault();
  const formState = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  console.log(formState);
  localStorage.removeItem('feedback-form-state');
});
