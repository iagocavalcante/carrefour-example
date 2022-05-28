// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const cep = req.query.cep as string
  console.log(cep)
  const { data } = await axios.get(`https://mercado.carrefour.com.br/api/checkout/pub/regions?country=BRA&postalCode=${cep}`)
  console.log(data)
  res.status(200).json(data)
}