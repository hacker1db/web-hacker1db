import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import SocialIcons from '@/components/SocialIcons';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '3rem 0' }}>
      <div style={{ maxWidth: '32rem', margin: '0 auto' }}>
        {/* Profile Image */}
        <div style={{ marginBottom: '2rem' }}>
          <Image
            src="/images/profile.png"
            alt="Profile picture of hacker1db"
            width={200}
            height={200}
            className="circle"
            style={{ margin: '0 auto', display: 'block' }}
            priority
          />
        </div>

        {/* Title */}
        <h1 style={{ 
          fontSize: '2.25rem', 
          fontWeight: '700', 
          marginBottom: '1.5rem', 
          color: '#ffffff' 
        }}>
          {siteConfig.title}
        </h1>

        {/* Subtitle */}
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#d1d5db', 
          marginBottom: '2rem', 
          lineHeight: '1.6' 
        }}>
          {siteConfig.homeSubtitle}
        </p>

        {/* Social Icons */}
        <SocialIcons links={siteConfig.social} />

        {/* Call to Action */}
        <div style={{ marginTop: '3rem' }}>
          <Link
            href="/posts"
            style={{ 
              display: 'inline-block',
              padding: '0.75rem 2rem',
              borderRadius: '0.5rem',
              fontWeight: '600',
              textDecoration: 'none',
              backgroundColor: '#6FC1FF',
              color: '#000000',
              transition: 'all 0.2s ease'
            }}
          >
            Read My Posts
          </Link>
        </div>

        {/* Description */}
        <div style={{ marginTop: '3rem', color: '#9ca3af' }}>
          <p style={{ fontStyle: 'italic' }}>
            &ldquo;{siteConfig.description}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}