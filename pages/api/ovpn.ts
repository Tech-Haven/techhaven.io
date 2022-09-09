// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import fetch, { FormData } from 'node-fetch';

const formData = new FormData();

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

  const { id } = session.user;

  formData.append('client', id);

  const vpnRes = await fetch(`https://vpn.lab.techhaven.io/ovpn`, {
    method: 'post',
    headers: { Authorization: `Bearer ${process.env.VPN_SERVER_SECRET}` },
    body: formData,
  });
  const data = (await vpnRes.json()) as any;

  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Disposition', `attachment; filename=${id}.ovpn`);

  res.send(data.data.data);
}
