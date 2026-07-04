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

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const guide = db.prepare('SELECT seoTitle, metaDescription FROM guides WHERE id = ?').get(id) as any;
  if (!guide) return { title: 'Not Found' };
  
  return {
    title: guide.seoTitle,
    description: guide.metaDescription,
  };
}

// Bold text parser
function parseBold(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const boldRegex = /\*\*(.*?)\*\*/g;
  let lastIndex = 0;
  let match;
  while ((match = boldRegex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.substring(lastIndex, match.index));
    parts.push(<strong key={match.index}>{match[1]}</strong>);
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.substring(lastIndex));
  return parts.length > 0 ? parts : text;
}

// Comprehensive markdown renderer
function renderMarkdown(text: string): React.ReactNode[] {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // 제목 H3 / H2 / H1
    if (trimmed.startsWith('### ')) {
      elements.push(<h3 key={i} style={{ fontSize: '1.15rem', fontWeight: 700, margin: '1.5rem 0 0.5rem', color: '#1e293b' }}>{trimmed.slice(4)}</h3>);
      i++; continue;
    }
    if (trimmed.startsWith('## ')) {
      elements.push(<h2 key={i} style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.4rem' }}>{trimmed.slice(3)}</h2>);
      i++; continue;
    }
    if (trimmed.startsWith('# ')) {
      elements.push(<h1 key={i} style={{ fontSize: '1.6rem', fontWeight: 800, margin: '1.5rem 0 1rem', color: '#0f172a' }}>{trimmed.slice(2)}</h1>);
      i++; continue;
    }

    // 이미지 ![alt](url)
    const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      elements.push(
        <div key={i} style={{ margin: '1.5rem 0', textAlign: 'center' }}>
          <img
            src={imgMatch[2]}
            alt={imgMatch[1]}
            style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain', borderRadius: '10px', boxShadow: '0 4px 16px rgba(0,0,0,0.10)' }}
          />
          {imgMatch[1] && <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.4rem', fontStyle: 'italic' }}>{imgMatch[1]}</p>}
        </div>
      );

      i++; continue;
    }

    // iframe 태그 (쿠팡 파트너스 배너)
    if (trimmed.startsWith('<iframe')) {
      elements.push(
        <div key={i} style={{ margin: '1.5rem 0', padding: '1.2rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div dangerouslySetInnerHTML={{ __html: trimmed }} />
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>위 상품 정보는 제조사 및 판매처에서 제공하는 공개된 정보를 바탕으로 작성되었습니다. 상표권 및 저작권 등 관련 문의는 해당 판매처로 부탁드립니다.</p>
        </div>
      );
      i++; continue;
    }

    // 마크다운 테이블 (| 로 시작하는 줄)
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      if (tableLines.length >= 2) {
        const parseRow = (row: string) =>
          row.split('|').map(c => c.trim()).filter((c, idx, arr) => idx !== 0 && idx !== arr.length - 1);
        const headers = parseRow(tableLines[0]);
        const bodyRows = tableLines.slice(2).map(parseRow);
        elements.push(
          <div key={`table-${i}`} style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.95rem' }}>
              <thead>
                <tr style={{ background: '#1e40af' }}>
                  {headers.map((h, j) => (
                    <th key={j} style={{ padding: '10px 14px', textAlign: 'left', color: '#fff', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, j) => (
                  <tr key={j} style={{ background: j % 2 === 0 ? '#fff' : '#f8fafc' }}>
                    {row.map((cell, k) => (
                      <td key={k} style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>{parseBold(cell)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // 리스트 (* 로 시작)
    if (trimmed.startsWith('* ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('* ')) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} style={{ margin: '0.5rem 0 1rem 1.5rem', lineHeight: 1.9 }}>
          {items.map((item, j) => <li key={j} style={{ marginBottom: '0.2rem' }}>{parseBold(item)}</li>)}
        </ul>
      );
      continue;
    }

    // 번호 리스트 (1. 2. 3.)
    if (/^\d+\.\s/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ''));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} style={{ margin: '0.5rem 0 1rem 1.5rem', lineHeight: 1.9 }}>
          {items.map((item, j) => <li key={j} style={{ marginBottom: '0.2rem' }}>{parseBold(item)}</li>)}
        </ol>
      );
      continue;
    }

    // 빈 줄
    if (trimmed === '') {
      elements.push(<div key={i} style={{ height: '0.5rem' }} />);
      i++; continue;
    }

    // 일반 단락
    elements.push(<p key={i} style={{ lineHeight: 1.85, marginBottom: '0.5rem', color: '#334155' }}>{parseBold(trimmed)}</p>);
    i++;
  }

  return elements;
}


export default async function GuideDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const guide = db.prepare('SELECT * FROM guides WHERE id = ?').get(id) as any;
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
