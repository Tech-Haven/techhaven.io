// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import fetch from 'node-fetch';

type Response = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res
      .status(401)
      .json({ message: '401: Unauthorized. Please login.' });
  }

  if (req.method != 'GET') {
    return res.status(405).json({ message: '405: Method not allowed' });
  }

  try {
    const body = { ClientID: session.user.id.slice(0, 15) };

    const vpnRes = await fetch(`https://wg.vpn.lab.techhaven.io/clients`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${process.env.VPN_SERVER_SECRET}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = (await vpnRes.json()) as any;

    if (data['status'] && data['status'] != 200) {
      return res.status(data['status']).json({ message: data.data.data });
    }

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${session.user.username}.conf`
    );

    var webhookBody = {
      username: 'techhaven.io',
      avatar_url: '',
      embeds: [
        {
          title: 'User Successfully Requested WG VPN',
          color: 15258703,
          fields: [
            {
              name: 'TH Account ID',
              value: session.user.id,
              inline: true,
            },
            {
              name: 'TH Account Username',
              value: session.user.username,
              inline: true,
            },
          ],
        },
      ],
    };

    await fetch(process.env.WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(webhookBody),
    });

    res.send(data.data.data);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Error sending request to Wireguard server.' });
  }
}
