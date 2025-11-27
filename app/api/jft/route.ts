import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://www.jftna.org/jft/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NA Happy Hour Site)',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch JFT: ${response.status}`);
    }

    const html = await response.text();

    // Parse the HTML to extract meditation data
    // The JFT page has a table structure with the content
    const tableMatch = html.match(/<table[^>]*>([\s\S]*?)<\/table>/i);

    if (!tableMatch) {
      throw new Error('Could not find content table');
    }

    // Extract text content, removing HTML tags
    const tableContent = tableMatch[1];
    const textContent = tableContent
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(code));

    const lines = textContent
      .split('\n')
      .map(line => line.trim())
      .filter(line => line !== '');

    // Parse the structured content
    const date = lines[0] || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    const title = lines[1] || 'Daily Meditation';
    const quote = lines[2] || '';

    // Find the "Just for today:" line
    const reflectionIndex = lines.findIndex(line =>
      line.toLowerCase().startsWith('just for today:')
    );

    let content: string[] = [];
    let reflection = 'Just for today, I will focus on my recovery.';

    if (reflectionIndex > 3) {
      content = lines.slice(3, reflectionIndex);
      reflection = lines[reflectionIndex].replace(/^just for today:\s*/i, '');
    } else if (lines.length > 3) {
      content = lines.slice(3, -1);
      reflection = lines[lines.length - 1] || reflection;
    }

    return NextResponse.json({
      date,
      title,
      quote,
      content,
      reflection,
      success: true
    });

  } catch (error) {
    console.error('JFT API Error:', error);

    // Return fallback data
    return NextResponse.json({
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
      title: 'Daily Meditation',
      quote: 'We can find meaning and purpose in our lives through recovery.',
      content: ['Unable to load today\'s meditation. Please visit jftna.org directly for the daily reading.'],
      reflection: 'I will stay clean and work my program today.',
      success: false
    });
  }
}
