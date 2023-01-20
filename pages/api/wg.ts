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
    const body = { ClientID: session.user.id };

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
      `attachment; filename=${session.user.id}.conf`
    );

    res.send(data.data.data);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Error sending request to Wireguard server.' });
  }
}
