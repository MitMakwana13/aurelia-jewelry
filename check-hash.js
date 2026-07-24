const bcrypt = require('bcryptjs');

async function check() {
  const hash = '$2b$12$vFEf.JvZ/dor0IJV9sqBy.2ETuGPLoaL/cPfXBo344ttZibEHfzle';
  const passwordsToTest = ['Admin@123', 'admin@123', 'Admin@1234'];
  
  for (const pw of passwordsToTest) {
    const isMatch = await bcrypt.compare(pw, hash);
    console.log(`Password "${pw}" matches: ${isMatch}`);
  }
}
check();
