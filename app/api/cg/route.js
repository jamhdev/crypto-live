export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const endpoint = searchParams.get('endpoint');

    const proxyUrl = process.env.PROXY_URL;
    const proxySecret = process.env.PROXY_SECRET;

    if (!endpoint) {
        return new Response(JSON.stringify({ error: 'Missing endpoint param' }), {
            status: 400,
        });
    }

    try {
        const res = await fetch(`${proxyUrl}/cg?endpoint=${encodeURIComponent(endpoint)}`, {
            headers: {
                'x-proxy-secret': proxySecret,
            },
        });

        const data = await res.json();
        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' },
            status: res.status,
        });

    } catch (err) {
        console.error('Proxy API error:', err);
        return new Response(JSON.stringify({ error: 'Proxy failed' }), {
            status: 500,
        });
    }
}
