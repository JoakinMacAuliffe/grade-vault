import "./globals.css";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "../stack/client";
import Header from "../components/header";
import Footer from "../components/footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Grade Tracker</title>
      </head>
      <body><StackProvider app={stackClientApp}><StackTheme>
        <Header />
        <main>{children}</main>
        <Footer />
      </StackTheme></StackProvider></body>
    </html>
  );
}
