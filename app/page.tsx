// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Welcome to Survey Bull</h1>
      <p>Select a survey to participate:</p>
      <ul>
        <li>
          <Link href="/surveys/1">Survey 1</Link>
        </li>
        <li>
          <Link href="/surveys/2">Survey 2</Link>
        </li>
        {/* Add more survey links as needed */}
      </ul>
    </div>
  );
}
