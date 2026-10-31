import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Login | Satyabhama Health Care',
};

export default function LoginPage() {
  redirect('/');
}
