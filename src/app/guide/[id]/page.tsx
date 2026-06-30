import { Metadata } from 'next';
import db from '../../../lib/db';
import styles from '../guide.module.css';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  const guides = db.prepare('SELECT id FROM guides').all() as any[];
  return guides.map((g) => ({
    id: g.id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const guide = db.prepare('SELECT seoTitle, metaDescription FROM guides WHERE id = ?').get(params.id) as any;
  if (!guide) return { title: 'Not Found' };
  
  return {
    title: guide.seoTitle,
    description: guide.metaDescription,
  };
}

// Simple markdown to React nodes converter to avoid external dependencies
function renderMarkdown(text: string) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    if (line.startsWith('### ')) return <h3 key={i}>{line.replace('### ', '')}</h3>;
    if (line.startsWith('## ')) return <h2 key={i}>{line.replace('## ', '')}</h2>;
    if (line.startsWith('# ')) return <h1 key={i}>{line.replace('# ', '')}</h1>;
    if (line.startsWith('* ')) return <li key={i}>{line.replace('* ', '')}</li>;
    
    // Image parsing: ![alt](url)
    const imgMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      return (
        <div key={i} style={{ margin: '2rem 0', textAlign: 'center' }}>
          <img src={imgMatch[2]} alt={imgMatch[1]} style={{ maxWidth: '100%', borderRadius: '8px' }} />
        </div>
      );
    }
    
    // Bold text parsing
    let parsedLine = line;
    const boldRegex = /\*\*(.*?)\*\*/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    
    while ((match = boldRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.substring(lastIndex, match.index));
      }
      parts.push(<strong key={match.index}>{match[1]}</strong>);
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < line.length) {
      parts.push(line.substring(lastIndex));
    }
    
    if (line.trim() === '') return <br key={i} />;
    return <p key={i}>{parts.length > 0 ? parts : line}</p>;
  });
}

export default function GuideDetailPage({ params }: { params: { id: string } }) {
  const guide = db.prepare('SELECT * FROM guides WHERE id = ?').get(params.id) as any;
  if (!guide) {
    notFound();
  }

  let relatedGuides: any[] = [];
  try {
    if (guide.relatedGuides) {
      const ids = JSON.parse(guide.relatedGuides);
      if (ids.length > 0) {
        const placeholders = ids.map(() => '?').join(',');
        relatedGuides = db.prepare(`SELECT id, title FROM guides WHERE id IN (${placeholders})`).all(...ids) as any[];
      }
    }
  } catch (e) {
    console.error('Failed to parse related guides', e);
  }

  // Schema.org JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": guide.seoTitle,
    "description": guide.metaDescription,
    "datePublished": guide.createdAt,
    "dateModified": guide.updatedAt
  };

  return (
    <div className={styles.container}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className={styles.title}>{guide.title}</h1>
      <p className={styles.summary}>{guide.summary}</p>
      
      <div className={styles.content}>
        {renderMarkdown(guide.content)}
      </div>

      {relatedGuides.length > 0 && (
        <div className={styles.relatedSection}>
          <h2>관련 가이드</h2>
          <div className={styles.relatedList}>
            {relatedGuides.map(rg => (
              <Link href={`/guide/${rg.id}`} key={rg.id} className={styles.relatedItem}>
                {rg.title} &rarr;
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
