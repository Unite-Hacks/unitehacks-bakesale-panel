import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import qrcode from "../public/assets/qrcode_bank.hackclub.com.png"


const api_url = 'https://bank.hackclub.com/api/v3/organizations/unite-hacks/donations'

interface Donation {
  id: string;
  object: string;
  href: string;
  donor: {
    name: string;
  };
  amount_cents: number;
}

interface Props {
  donations: Donation[];
}


const Home: NextPage<Props> = (props) => {
  return (
<>
    <Head>
        <title>Unite Hacks Bake Sale</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className='font-extrabold text-[24px]'>Unite Hacks Bake Sale🍪</div>
      <Image src={qrcode} alt="qrcode" width={300} height={300}/>
      {props.donations.map((donation: Donation) => (
        <div key={donation.id}>
           <div className='flex text-center background2'>
             <span className='text-[18px] background'>DONATION FROM {donation.donor.name}</span>
             <span className='text-[18px] background'>${donation.amount_cents/100}.00</span>
           </div> 
         </div>
      ))}
    </div>  
</>
  )
}

export const getStaticProps = async () => {
  const res = await fetch(api_url);
  const data = await  res.json();

  return {
    props: {donations: data}
  }
}

export default Home;