import app from './app';
import variables from './app/config';
import mongoose from 'mongoose';

async function main() {
  try {
    mongoose.connect(variables.database_url as string);
    app.listen(variables.port, () => {
      console.log(`Bike is listening on port ${variables.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
