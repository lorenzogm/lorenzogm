import RedirectPage from '@/components/pages/RedirectPage';

export const metadata = {
  title: 'Redirecting... | Lorenzo GM',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MCPServersSetupGuidePage() {
  return (
    <RedirectPage 
      redirectTo="/blog/mcp-servers-cheatsheet"
    />
  );
}
