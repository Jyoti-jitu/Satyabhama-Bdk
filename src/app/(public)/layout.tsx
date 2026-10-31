import React from 'react';
import { TopInfoBar } from '@/components/layout/TopInfoBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { OdiaWelcomeModal } from '@/components/common/OdiaWelcomeModal';
import { WhatsAppFloatingButton } from '@/components/common/WhatsAppFloatingButton';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <TopInfoBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <OdiaWelcomeModal />
      <WhatsAppFloatingButton />
    </div>
  );
}
