const prompt = require('prompt');
const bcrypt = require('bcrypt');

prompt.start();

// Визначаємо, які поля запитати
const schema = {
  properties: {
    password: {
      description: 'Enter password',
      hidden: true,
      replace: '*',
      required: true
    },
    confirmPassword: {
      description: 'Confirm password',
      hidden: true,
      replace: '*',
      required: true
    }
  }
};

// Запускаємо запит паролів
prompt.get(schema, async (err, result) => {
  if (err) {
    console.error('Error:', err);
    return;
  }

  const { password, confirmPassword } = result;

  // Перевірка, чи паролі співпадають
  if (password !== confirmPassword) {
    console.error('❌ Passwords do not match!');
    return;
  }

  console.log('✅ Passwords match!');

  // Хешуємо пароль за допомогою bcrypt
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('🔐 Hashed Password:', hashedPassword);
  } catch (error) {
    console.error('Error hashing password:', error);
  }
});
