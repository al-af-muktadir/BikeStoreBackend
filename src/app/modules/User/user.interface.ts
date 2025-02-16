type Tuser = {
  name: string;
  email: string;
  password: string;
  image: string;
  role: 'customer' | 'admin';
  isBlocked: boolean;
};

export default Tuser;
