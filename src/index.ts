import { NODE_PORT } from './api/constants/global';
import app from './app';

const port: Number = NODE_PORT;

app.listen(port, () => {
  console.log(`server running on port ${port}`)
});